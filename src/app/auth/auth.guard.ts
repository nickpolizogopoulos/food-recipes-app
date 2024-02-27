import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean | UrlTree> | Promise<boolean  | UrlTree> | boolean  | UrlTree

  {

    return this.authService.user
      .pipe(
        take(1),
        map(user => {
          const isAuthenticated = !!user;
          if (isAuthenticated) return true;
          return this.router.createUrlTree(['/auth'])
        })
      )

  }
}