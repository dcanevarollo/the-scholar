import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../auth/shared/auth.service';
import { CrudService } from '../shared/crud.service';
import { Course } from './shared/course.model';

@Injectable()
export class CoursesService extends CrudService<Course, string> {

  constructor(
    protected httpClient: HttpClient,
    private authService: AuthService
  ) {
    super(httpClient, 'courses');
  }

  list(): Observable<Course[]> {
    const { id: userId } = this.authService.user!;

    const params = new HttpParams()
      .set('_embed', 'students')
      .set('userId', userId);

    return this.httpClient
      .get<Course[]>(this.API, { params })
      .pipe(take(this.RETRIALS_COUNT));
  }

}
