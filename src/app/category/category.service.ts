import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Group } from 'src/app/category/group/group.model';
import { Category } from 'src/app/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http) { }

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
    for(let group of category.groups) {
      if(!this.groupAllChecked(group)) return false;
    }
    return true;
  }

}
