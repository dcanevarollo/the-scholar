import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from 'src/app/shared/shared.module';
import {
  StudentsEnrolledComponent
} from './students-enrolled/students-enrolled.component';
import { StudentsService } from './students.service';


@NgModule({
  declarations: [
    StudentsEnrolledComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule
  ],
  providers: [
    StudentsService
  ]
})
export class StudentsModule { }
