import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CoursesService } from 'src/app/courses/courses.service';
import { Course } from 'src/app/courses/shared/course.model';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Student } from '../shared/student.model';
import { StudentsService } from '../shared/students.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['../../shared/forms.scss']
})
export class StudentFormComponent extends BaseFormComponent implements OnInit {

  student?: Student;
  form!: FormGroup;
  courses$?: Observable<Course[]>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private service: StudentsService,
    private coursesService: CoursesService,
    protected snackBarService: SnackBarService
  ) {
    super(snackBarService);
  }

  get title(): string {
    return this.student ? 'Edit student info' : 'Add new student';
  }

  get subtitle(): string {
    return this.student
      ? `Edit ${this.student.name} information`
      : 'Create a new student and enroll him into a course';
  }

  ngOnInit(): void {
    this.courses$ = this.coursesService.list();

    this.student = this.route.snapshot.data.student as Student | undefined;

    this.form = this.fb.group({
      id: [this.student?.id],
      name: [this.student?.name, Validators.required],
      email: [this.student?.email, [Validators.required, Validators.email]],
      courseId: [this.student?.courseId]
    });
  }

  onSubmit(): void {
    const { value: data } = this.form;

    this.service
      .save(data, data.id)
      .subscribe(
        student => {
          const goal = data.id ? 'updated' : 'created';

          this.snackBarService.showSuccess(`Student "${student.name}" ${goal}`);
          this.location.back();
        },
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

}
