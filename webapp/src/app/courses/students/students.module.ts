import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from 'src/app/shared/shared.module';
import {
  StudentsEnrolledComponent
} from './students-enrolled/students-enrolled.component';


@NgModule({
  declarations: [
    StudentsEnrolledComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule
  ]
})
export class StudentsModule { }
