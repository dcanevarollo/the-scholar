import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './shared/user.model';

interface NewPassword {
  currentPassword: string;
  newPassword: string;
}

@Injectable()
export class UsersService {

  private readonly RETRIALS_COUNT = 1;

  constructor(private httpClient: HttpClient) { }

  update(data: User, id: string): Observable<User> {
    return this.httpClient
      .put<User>(`${environment.apiUrl}/users/${id}`, data)
      .pipe(take(this.RETRIALS_COUNT));
  }

  changePassword(data: NewPassword, id: string): Observable<{}> {
    return this.httpClient
      .put(`${environment.apiUrl}/new-password/${id}`, data)
      .pipe(take(this.RETRIALS_COUNT));
  }

}
