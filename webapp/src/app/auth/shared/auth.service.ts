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

  user: User | null = null;
  redirectUrl = '/dashboard';

  constructor(private httpClient: HttpClient, private router: Router) { }

  get isLoggedIn(): boolean {
    if (!this.user) {
      const token = localStorage.getItem('@the-scholar/access-token');
      let user = localStorage.getItem('@the-scholar/user');

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

          localStorage.setItem('@the-scholar/access-token', token);
          localStorage.setItem('@the-scholar/user', JSON.stringify(user));

          this.user = user;
          this.router.navigate([this.redirectUrl]);
        })
      );
  }

  logout(): void {
    localStorage.clear();

    this.user = null;
    this.redirectUrl = '/dashboard';
    this.router.navigate(['/login']);
  }

}
