import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.service.isLoggedIn) {
      const token = localStorage.getItem('@the-scholar/access-token');

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
    }

    return next.handle(request);
  }

}
