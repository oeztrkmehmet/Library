import { Injectable } from '@angular/core';
import { AuthResponseDto, UserForAuthenticationDto } from './models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient) { }

  
}
