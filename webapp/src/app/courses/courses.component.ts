import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoursesService } from './courses.service';
import { Course } from './shared/course.model';
import {
  StudentsEnrolledComponent
} from './students/students-enrolled/students-enrolled.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss', './shared/courses.scss']
})
export class CoursesComponent implements OnInit {

  courses$?: Observable<Course[]>;

  constructor(private service: CoursesService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.courses$ = this.service
      .list()
      .pipe(
        map(courses => courses.sort(
          (c1, c2) => c1.name.localeCompare(c2.name)
        ))
      );
  }

  viewStudents(course: Course): void {
    this.matDialog.open(StudentsEnrolledComponent, {
      width: '500px',
      maxHeight: '450px',
      data: { course }
    });
  }

}
