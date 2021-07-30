import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { User } from 'src/app/core/shared/user.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { environment } from 'src/environments/environment';

interface Auth {
  token: string;
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.apiUrl}/auth`;

  user: User | null = null;
  redirectUrl = '/dashboard';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  get isLoggedIn(): boolean {
    if (!this.user) {
      const token = localStorage.getItem('@the-scholar/access-token');
      let user = localStorage.getItem('@the-scholar/user');

      if (token && user) this.user = JSON.parse(user);
    }

    return !!this.user;
  }

  login(credentials: { email: string; password: string }): void {
    this.httpClient
      .post<Auth>(this.API, credentials)
      .pipe(take(1))
      .subscribe(
        response => {
          const { token, user } = response;

          localStorage.setItem('@the-scholar/access-token', token);
          localStorage.setItem('@the-scholar/user', JSON.stringify(user));

          this.user = user;
          this.router.navigate([this.redirectUrl]);
        },
        ({ error }: HttpErrorResponse) => this.snackBarService.showError(error)
      );
  }

  logout(): void {
    localStorage.clear();

    this.user = null;
    this.redirectUrl = '/dashboard';
    this.router.navigate(['/login']);
  }

}
