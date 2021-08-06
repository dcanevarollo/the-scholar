import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/crud.service';
import { Course } from './shared/course.model';

@Injectable()
export class CoursesService extends CrudService<Course, string> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'courses');
  }

}
