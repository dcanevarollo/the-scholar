import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsService } from './shared/students.service';
import {
  StudentsEnrolledComponent
} from './shared/students-enrolled/students-enrolled.component';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students-routing.module';


@NgModule({
  declarations: [
    StudentsEnrolledComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatListModule,
    MatTableModule
  ],
  providers: [
    StudentsService
  ],
  exports: [
    StudentsEnrolledComponent
  ]
})
export class StudentsModule { }
