import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from './shared/user.model';

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  update(data: User, id: string): Observable<User> {
    return this.httpClient
      .put<User>(`${environment.apiUrl}/users/${id}`, data)
      .pipe(take(1));
  }

}
