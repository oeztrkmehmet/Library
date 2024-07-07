import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return token ? token : '';
    } else {
      return '';
    }
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired

    return token !== '';
  }
}

