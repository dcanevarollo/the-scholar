import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseResolver } from './guards/course.resolver';
import { StudentsService } from '../students/shared/students.service';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    MatGridListModule,
    MatStepperModule,
    MatListModule,
    MatAutocompleteModule,
    MatExpansionModule,
  ],
  providers: [
    CoursesService,
    CourseResolver,
    StudentsService
  ]
})
export class CoursesModule { }
