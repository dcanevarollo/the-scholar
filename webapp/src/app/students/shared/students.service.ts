import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from 'src/app/shared/crud.service';
import { Student } from './student.model';

@Injectable()
export class StudentsService extends CrudService<Student, string> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'students');
  }

}
