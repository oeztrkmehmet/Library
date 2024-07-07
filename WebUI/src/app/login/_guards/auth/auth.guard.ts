import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.isAuthenticated()) {
      return true; // Allow navigation if authenticated
    } else {
      this.router.navigateByUrl('/login');
      return false; // Redirect to login and deny navigation
    }
  }
}
