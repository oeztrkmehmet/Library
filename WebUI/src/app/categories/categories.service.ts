import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from '../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = environment.apiUrl; 

   constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    const url = `${this.apiUrl}/GetAllCategories`; 
    return this.http.get<any[]>(url);
  }
  get(Id:string): Observable<any[]> {
    const url = `${this.apiUrl}/GetCategory?id=${Id}`; 
    return this.http.get<any[]>(url);
  }
  public CategoryAdd( body:string): Observable<string> {

    const urlWithParams = `${this.apiUrl}/CreateCategory?Name=${body}`;
    return this.http.post(urlWithParams, {name:body}, { responseType: 'text' });
  }
  public CategoryUpdate(name: string, id: string): Observable<string> {
    const urlWithParams = `${this.apiUrl}/UpdateCategory?Id=${id}&Name=${name}`;
    return this.http.post(urlWithParams, { name, id }, { responseType: 'text' });
  }
  deleteCategory(id: string): Observable<any> {
    const url = `${this.apiUrl}/DeleteCategory?id=${id}`;
    return this.http.delete(url);
  }
  getAllBook(): Observable<any[]> {
    const url = `${this.apiUrl}/GetAllBooks`; 
    return this.http.get<any[]>(url);
  }

}
