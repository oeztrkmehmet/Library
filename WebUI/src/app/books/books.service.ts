import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from '../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = environment.apiUrl; 

   constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    const url = `${this.apiUrl}/GetAllBooks`; 
    return this.http.get<any[]>(url);
  }
  get(Id:string): Observable<any[]> {
    const url = `${this.apiUrl}/GetBook?id=${Id}`; 
    return this.http.get<any[]>(url);
  }
  public BookAdd( Title: string,Description:string,AuthorID:string,CategoryID:string): Observable<string> {

    const urlWithParams = `${this.apiUrl}/CreateBook?Title=${Title}&Description=${Description}&AuthorID=${AuthorID}&CategoryID=${CategoryID}`;
    return this.http.post(urlWithParams, {Title,Description,AuthorID,CategoryID}, { responseType: 'text' });
  }
  public BookUpdate( id: string,Title: string,Description:string,AuthorID:string,CategoryID:string): Observable<string> {
    const urlWithParams = `${this.apiUrl}/UpdateBook?Id=${id}&Title=${Title}&Description=${Description}&AuthorID=${AuthorID}&CategoryID=${CategoryID}`;
    return this.http.post(urlWithParams, {id,Title,Description,AuthorID,CategoryID}, { responseType: 'text' });
  }
  deleteBook(id: string): Observable<any> {
    const url = `${this.apiUrl}/DeleteBook?id=${id}`;
    return this.http.delete(url);
  }
  GetAllAuthors(): Observable<any[]> {
    const url = `${this.apiUrl}/GetAllAuthors`; 
    return this.http.get<any[]>(url);
  }
  GetAllCategories(): Observable<any[]> {
    const url = `${this.apiUrl}/GetAllCategories`; 
    return this.http.get<any[]>(url);
  }

}
