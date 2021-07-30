import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { User } from 'src/app/core/shared/user.model';
import { environment } from 'src/environments/environment';
import { Auth } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.apiUrl}/auth`;
  private readonly APP_KEY = '@the-scholar';

  user: User | null = null;
  redirectUrl: string | null = null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  get isLoggedIn(): boolean {
    if (!this.user) {
      const token = localStorage.getItem(`${this.APP_KEY}/access-token`);
      let user = localStorage.getItem(`${this.APP_KEY}/user`);

      if (token && user) this.user = JSON.parse(user);
    }

    return !!this.user;
  }

  login(credentials: { email: string; password: string }): Observable<void> {
    return this.httpClient
      .post<Auth>(this.API, credentials)
      .pipe(
        take(1),
        map(response => {
          const { token, user } = response;

          localStorage.setItem(`${this.APP_KEY}/access-token`, token);
          localStorage.setItem(`${this.APP_KEY}/user`, JSON.stringify(user));

          this.user = user;
          this.router.navigate([this.redirectUrl]);
        })
      );
  }

  logout(): void {
    localStorage.clear();

    this.user = null;
    this.router.navigate(['/']);
  }

}
