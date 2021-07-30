import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from 'src/app/auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private location: Location) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      this.location.back();

      return false;
    }

    return true;
  }

}
