import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request',request)
    console.log('${this.auth.getToken()',this.auth.getToken())
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}