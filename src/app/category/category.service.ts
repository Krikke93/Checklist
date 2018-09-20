import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Group } from 'src/app/category/group/group.model';
import { Category } from 'src/app/category/category.model';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Item } from './group/item/item.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http, @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public getJSON(): Observable<any> {
    return this.http.get(`../../assets/hierarchy/${environment.game}/hierarchy.json`).pipe(
      map((res: any) => res.json())
    );
  }

  public groupAllChecked(group: Group): boolean {
      for(let item of group.items) {
          if(!item.checked) return false;
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

  public storeAll(categories: Category[]) {
    const items = this.getAllItems(categories);
    for(let item of items) {
      this.storage.set(this.getStorageKey(item), item.checked);
    }
  }

  private getStorageKey(item: Item): string {
    return `${environment.game}_checked_${item.src}`;
  }

  public loadAll(categories: Category[]) {
    const items = this.getAllItems(categories);
    for(let item of items) {
      const storedValue = this.storage.get(this.getStorageKey(item));
      item.checked = storedValue;
    }
  }

  public eraseAll(categories: Category[]) {
    const items = this.getAllItems(categories);
    for(let item of items) {
      this.storage.remove(this.getStorageKey(item));
    }
  }

}
