import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Student } from '../shared/student.model';
import { StudentsService } from '../students.service';

@Injectable()
export class StudentsResolver implements Resolve<Student[]> {

  constructor(private service: StudentsService) { }

  resolve(): Observable<Student[]> {
    return this.service.list();
  }

}
