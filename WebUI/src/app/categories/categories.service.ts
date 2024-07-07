import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from '../../environment/environment';

import { UserForAuthenticationDto } from '../login/models/user.model';


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


}
