import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { User } from 'src/app/users/shared/user.model';
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
  private innerUser: User | null = null;

  showNavEmitter = new EventEmitter<boolean>();
  redirectUrl = '/home';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  get isLoggedIn(): boolean {
    if (!this.innerUser) {
      const token = localStorage.getItem('@the-scholar/access-token');
      const user = localStorage.getItem('@the-scholar/user');

      if (token && user) this.innerUser = JSON.parse(user);
    }

    return !!this.innerUser;
  }

  get user(): User | null {
    return this.innerUser;
  }

  set user(user: User | null) {
    this.innerUser = user;

    if (user) localStorage.setItem('@the-scholar/user', JSON.stringify(user));
  }

  login(credentials: { email: string; password: string }): void {
    this.httpClient
      .post<Auth>(this.API, credentials)
      .pipe(take(1))
      .subscribe(
        response => {
          const { token, user } = response;

          localStorage.setItem('@the-scholar/access-token', token);

          this.user = user;
          this.showNavEmitter.emit(true);
          this.router.navigate([this.redirectUrl]);
        },
        ({ error }: HttpErrorResponse) => this.snackBarService.showError(error)
      );
  }

  logout(): void {
    localStorage.clear();

    this.user = null;
    this.redirectUrl = '/home';
    this.router.navigate(['/login']);
  }

}
