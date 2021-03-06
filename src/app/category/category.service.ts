import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Group } from 'src/app/category/group/group.model';
import { Category } from 'src/app/category/category.model';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Item } from './group/item/item.model';
import { Settings } from '../settings/settings.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public getCategoriesJSON(): Observable<any> {
    return this.http.get(`assets/hierarchy/${environment.game}/hierarchy.json`).pipe(
      map((res: any) => res.json())
    );
  }

  public getGroupFiltersJSON(): Observable<any> {
    return this.http.get(`assets/hierarchy/${environment.game}/group-filters.json`).pipe(
      map((res: any) => res.json())
    );
  }

  public getSpecialFiltersJSON(): Observable<any> {
    return this.http.get(`assets/hierarchy/${environment.game}/special-filters.json`).pipe(
      map((res: any) => res.json())
    );
  }

  public getUniqueFiltersJSON(): Observable<any> {
    return this.http.get(`assets/hierarchy/${environment.game}/unique-filters.json`).pipe(
      map((res: any) => res.json())
    );
  }

  public groupAllVisibleChecked(group: Group, settings: Settings): boolean {
    for(let item of group.items) {
      if(this.isItemVisible(item, settings) && !item.checked) return false; 
    }
    return true;
  }

  public groupAllChecked(group: Group): boolean {
      for(let item of group.items) {
          if(!item.checked) return false;
      }
      return true;
  }

  public groupAllUnChecked(group: Group): boolean {
    for(let item of group.items) {
        if(item.checked) return false;
    }
    return true;
  }

  public isGroupVisible(group: Group, settings: Settings): boolean {
    for(let item of group.items) {
      if(this.isItemVisible(item, settings) && settings.hasGroupFilterActive(group.src)) return true;
    }
    return false;
  }

  public categoryAllVisibleChecked(category: Category, settings: Settings): boolean {
    if(category.subCategories && category.subCategories.length > 0) {
      for(let subCategory of category.subCategories) {
        if(!this.categoryAllVisibleChecked(subCategory, settings)) return false;
      }
    }
    if(category.groups && category.groups.length > 0) {
      for(let group of category.groups) {
        if(!this.groupAllVisibleChecked(group, settings)) return false;
      }
    }
    return true;
  }

  public categoryAllChecked(category: Category): boolean {
    if(category.subCategories && category.subCategories.length > 0) {
      for(let subCategory of category.subCategories) {
        if(!this.categoryAllChecked(subCategory)) return false;
      }
    }
    if(category.groups && category.groups.length > 0) {
      for(let group of category.groups) {
        if(!this.groupAllChecked(group)) return false;
      }
    }
    return true;
  }

  public categoryAllUnChecked(category: Category): boolean {
    if(category.subCategories && category.subCategories.length > 0) {
      for(let subCategory of category.subCategories) {
        if(!this.categoryAllUnChecked(subCategory)) return false;
      }
    }
    if(category.groups && category.groups.length > 0) {
      for(let group of category.groups) {
        if(!this.groupAllUnChecked(group)) return false;
      }
    }
    return true;
  }

  public categoryAllInvisible(category: Category, settings: Settings): boolean {
    if(category.subCategories && category.subCategories.length > 0) {
      for(let subCategory of category.subCategories) {
        if(!this.categoryAllInvisible(subCategory, settings)) return false;
      }
    }
    if(category.groups && category.groups.length > 0) {
      for(let group of category.groups) {
        if(this.isGroupVisible(group, settings)) return false;
      }
    }
    return true;
  }

  public getAllItems(categories: Category[]): Item[] {
    let items = [];
    for(let category of categories) {
      items = [ ...items, ...this.getAllItemsFromCategory(category)];
    }
    return items;
  }

  public getAllItemsFromCategory(category: Category): Item[] {
    let items = [];
    if(category.subCategories && category.subCategories.length > 0) {
      for(let subCategory of category.subCategories) {
        items = [ ...items, ...this.getAllItemsFromCategory(subCategory)];
      }
    }
    if(category.groups && category.groups.length > 0) {
      for(let group of category.groups) {
        items = [ ...items, ...group.items];
      }
    }
    return items;
  }

  public getAllGroups(categories: Category[]): Group[] {
    let groups = [];
    for(let category of categories) {
      groups = [ ...groups, ...this.getAllGroupsFromCategory(category) ];
    }
    return groups;
  }

  public getAllGroupsFromCategory(category: Category): Group[] {
    let groups = [];
    if(category.subCategories && category.subCategories.length > 0) {
      for(let subCategory of category.subCategories) {
        groups = [ ...groups, ...this.getAllGroupsFromCategory(subCategory) ];
      }
    }
    if(category.groups && category.groups.length > 0) {
      groups = [ ...groups, ...category.groups ];
    }
    return groups;
  }

  public getCompactCategory(categories: Category[], groupFilters: Item[]): Category {
    let groupMap = [];
    for(let category of categories) {
      groupMap = this.addToGroupMap(groupMap, category);
    }
    let compactCategory = new Category('All Items');
    compactCategory.groups = [];
    for(let filter of groupFilters) {
      compactCategory.groups.push(groupMap[filter.src]);
    }
    return compactCategory;
  }

  private addToGroupMap(groupMap: any, category: Category): any {
    if(category.subCategories && category.subCategories.length > 0) {
      for(let subCategory of category.subCategories) {
        groupMap = this.addToGroupMap(groupMap, subCategory);
      }
    }
    if(category.groups && category.groups.length > 0) {
      for(let group of category.groups) {
        if(!groupMap[group.src]) {
          groupMap[group.src] = new Group(group.name, group.src, []);
        }
        groupMap[group.src].items = [ ...groupMap[group.src].items, ...group.items];
      }
    }
    return groupMap;
  }

  public isItemVisible(item: Item, settings: Settings): boolean {
    if(item.isFilter) {
      return true;
    }
    if(item.checked && settings.onlyEmpty) {
        return false;
    }
    if(!item.checked && settings.onlyChecked) {
        return false;
    }
    for(let filter of settings.specialFilters) {
      if(item.specialFilters != undefined && item.specialFilters.length > 0 && !filter.checked && item.specialFilters.indexOf(filter.src) > -1) {
        return false;
      }
    }

    if(settings.activeUniqueFilter !== 'none') {
      if(item.specialFilters == undefined) {
        return false;
      }
      if(item.specialFilters.length == 0) {
        return false;
      }
      if(item.specialFilters.indexOf(settings.activeUniqueFilter) == -1 && item.specialFilters.indexOf('all-unique') == -1) {
        return false;
      }
    }
    return true;
  }

}
