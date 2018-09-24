import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: Http) { }

  public getLogsJSON(): Observable<any> {
    return this.http.get(`assets/logs/${environment.game}/versions.json`).pipe(
      map((res: any) => res.json())
    );
  }

}
