import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private service: AuthService, private router: Router) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): true | UrlTree {
    if (this.service.isLoggedIn) return true;

    this.service.redirectUrl = state.url;

    return this.router.parseUrl('/login');
  }

  canLoad(): boolean {
    if (this.service.isLoggedIn) return true;

    this.router.navigate(['/login']);
    return false;
  }

}
