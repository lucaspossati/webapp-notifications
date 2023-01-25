import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private urls = {
    v1: `${environment.urls.api.v1}/notifications`
  }
  
  constructor(private http: HttpClient) { }

  getAll(filter: any = undefined): Observable<any> {
    return this.http.get<any>(filter == null ? `${this.urls.v1}` : `${this.urls.v1}?filter=${filter}`).pipe(map(resp => resp));
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.urls.v1}/${id}`).pipe(map(resp => resp));
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.urls.v1}`, data).pipe(map(resp => resp));
  }

  update(data: any): Observable<any> {
    return this.http.put<any>(`${this.urls.v1}`, data).pipe(map(resp => resp));
  }

  remove(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urls.v1}/${id}`).pipe(map(resp => resp));
  }
}
