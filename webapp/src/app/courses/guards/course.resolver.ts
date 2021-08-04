import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CoursesService } from '../courses.service';
import { Course } from '../shared/course.model';

@Injectable()
export class CourseResolver implements Resolve<Course> {

  constructor(private service: CoursesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    if (route.params?.id) return this.service.loadById(route.params.id);

    return of({} as Course);
  }

}
