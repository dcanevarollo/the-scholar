import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth/shared/auth.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { SnackBarService } from '../shared/snack-bar.service';
import { CoursesService } from './courses.service';
import { Course } from './shared/course.model';
import {
  StudentsEnrolledComponent
} from '../students/students-enrolled/students-enrolled.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [
    './courses.component.scss',
    './courses.scss',
    '../shared/avatars.scss'
  ]
})
export class CoursesComponent implements OnInit {

  courses?: Course[];

  constructor(
    private service: CoursesService,
    private authService: AuthService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service
      .list({ '_embed': 'students', userId: this.authService.user!.id })
      .pipe(
        map(courses => courses.sort(
          (c1, c2) => c1.name.localeCompare(c2.name)
        ))
      )
      .subscribe(courses => this.courses = courses);
  }

  viewStudents(course: Course): void {
    this.matDialog.open(StudentsEnrolledComponent, {
      width: '500px',
      maxHeight: '450px',
      data: { course }
    });
  }

  onDelete(course: Course): void {
    this.dialogService
      .showDialog(`Delete "${course.name}"`)
      .pipe(switchMap(confirmed => {
        return confirmed ? this.service.remove(course.id) : EMPTY;
      }))
      .subscribe(
        () => {
          const index = this.courses?.findIndex(c => c.id === course.id);

          this.courses?.splice(index!, 1);
          this.snackBarService.showSuccess(`Course "${course.name}" deleted`);
        },
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

}
