import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

}
