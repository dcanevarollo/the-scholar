import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { StudentsModule } from './students/students.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseResolver } from './guards/course.resolver';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StudentsModule,
    MatGridListModule
  ],
  providers: [
    CoursesService,
    CourseResolver
  ]
})
export class CoursesModule { }
