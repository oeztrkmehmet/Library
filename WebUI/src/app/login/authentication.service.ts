import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel, UserForAuthenticationDto } from './models/user.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl; // Kendi API URL'inizi buraya yazın

  constructor(private http: HttpClient) {}

  public loginUser(route: string, body: UserForAuthenticationDto): Observable<string> {
    const params = new HttpParams()
      .set('userName', body.userName)
      .set('password', body.password);

    const urlWithParams = `${this.apiUrl}/${route}?${params.toString()}`;
    return this.http.post(urlWithParams, body, { responseType: 'text' });
  }

  public logOut(): Observable<string> {
    const userForAuth: UserForAuthenticationDto = {
      userName: '',
      password: ''
    };
    const urlWithParams = `${this.apiUrl}/${'api/Account/Logout'}}`;
    localStorage.removeItem('token');
    return this.http.post(urlWithParams, userForAuth, { responseType: 'text' });
 
    
  }

  registerUser(registerModel: RegisterModel): Observable<any> {
    const urlWithParams = `${this.apiUrl}/${'api/Account/Register'}`;

    return this.http.post<any>(urlWithParams, registerModel);
  }

 
}
