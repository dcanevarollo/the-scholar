import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsService } from './students.service';
import {
  StudentsEnrolledComponent
} from './students-enrolled/students-enrolled.component';
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
    MatListModule
  ],
  providers: [
    StudentsService
  ],
  exports: [
    StudentsEnrolledComponent
  ]
})
export class StudentsModule { }
