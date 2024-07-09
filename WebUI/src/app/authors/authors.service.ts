import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from '../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiUrl = environment.apiUrl; 

   constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    const url = `${this.apiUrl}/GetAllAuthors`; 
    return this.http.get<any[]>(url);
  }
  get(Id:string): Observable<any[]> {
    const url = `${this.apiUrl}/GetAuthor?id=${Id}`; 
    return this.http.get<any[]>(url);
  }
  public AuthorAdd( name: string,surname:string): Observable<string> {

    const urlWithParams = `${this.apiUrl}/CreateAuthor?Name=${name}&Surname=${surname}`;
    return this.http.post(urlWithParams, {name,surname}, { responseType: 'text' });
  }
  public AuthorUpdate(name: string,surname:string ,id: string): Observable<string> {
    const urlWithParams = `${this.apiUrl}/UpdateAuthor?Id=${id}&Name=${name}&Surname=${surname}`;
    return this.http.post(urlWithParams, { name, surname,id }, { responseType: 'text' });
  }
  deleteAuthor(id: string): Observable<any> {
    const url = `${this.apiUrl}/DeleteAuthor?id=${id}`;
    return this.http.delete(url);
  }

}
