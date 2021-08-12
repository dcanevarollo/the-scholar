import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Student } from '../shared/student.model';
import { StudentsService } from '../shared/students.service';

@Injectable()
export class StudentResolver implements Resolve<Student> {

  constructor(private service: StudentsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Student> {
    return this.service.loadById(route.params.id);
  }

}
