import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsService } from './shared/students.service';
import {
  StudentsEnrolledComponent
} from './shared/students-enrolled/students-enrolled.component';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentResolver } from './guards/student.resolver';


@NgModule({
  declarations: [
    StudentsEnrolledComponent,
    StudentsComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  providers: [
    StudentsService,
    StudentResolver
  ],
  exports: [
    StudentsEnrolledComponent
  ]
})
export class StudentsModule { }
