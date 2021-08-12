import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth/shared/auth.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { SnackBarService } from '../shared/snack-bar.service';
import { CoursesService } from './courses.service';
import { Course } from './shared/course.model';
import {
  StudentsEnrolledComponent
} from '../students/shared/students-enrolled/students-enrolled.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: [
    './courses.component.scss',
    '../shared/avatars.scss',
    '../shared/back-button/back-button.component.scss'
  ]
})
export class CoursesComponent implements OnInit {

  courses$?: Observable<Course[]>;
  error$?: Subject<boolean>;

  constructor(
    private service: CoursesService,
    private authService: AuthService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refresh();
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
      .pipe(
        switchMap(confirmed =>
          confirmed ? this.service.remove(course.id) : EMPTY
        )
      )
      .subscribe(
        () => this.refresh(),
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

  private refresh(): void {
    this.error$ = new Subject();

    this.courses$ = this.service
      .list({ userId: this.authService.user!.id })
      .pipe(
        map(courses => courses.sort(
          (c1, c2) => c1.name.localeCompare(c2.name)
        )),
        catchError(() => {
          this.snackBarService.showError('Could not load your courses');
          this.error$?.next(true);

          return EMPTY;
        })
      );
  }

}
