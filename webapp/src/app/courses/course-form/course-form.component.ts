import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { CoursesService } from '../courses.service';
import { Course } from '../shared/course.model';
import { Student } from '../students/shared/student.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: [
    './course-form.component.scss',
    '../shared/courses.scss',
    '../../shared/forms.scss'
  ]
})
export class CourseFormComponent extends BaseFormComponent implements OnInit {

  form!: FormGroup;
  course?: Course;
  students!: Student[];

  constructor(
    protected snackBarService: SnackBarService,
    private service: CoursesService,
    private authService: AuthService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(snackBarService);
  }

  get title(): string {
    return this.course ? `Edit ${this.course.name}` : 'New course';
  }

  get subtitle(): string {
    return this.course
      ? 'Edit the course information'
      : 'Create a new course and enroll students';
  }

  get studentsFormArray(): FormArray {
    return this.form.get('step2.students') as FormArray;
  }

  ngOnInit(): void {
    const { data } = this.route.snapshot;

    this.course = data.course as Course | undefined;
    this.students = data.students as Student[];

    this.form = this.fb.group({
      step1: this.fb.group({
        id: [this.course?.id],
        userId: [this.authService.user!.id],
        name: [this.course?.name, Validators.required],
        description: [this.course?.description || '', [
          Validators.required,
          Validators.maxLength(255)
        ]],
        hours: [this.course?.hours, [Validators.required, Validators.min(3)]],
      }),
      step2: this.fb.group({
        students: this.buildStudents(this.course?.students)
      })
    });
  }

  onSubmit(): void {
    const { step1, step2 } = this.form.value;

    const data = { ...step1, ...step2 };

    data.students = data.students
      .map((v: boolean, i: number) => v ? this.students[i] : null)
      .filter((s: Student) => !!s);

    this.service
      .save(data, data.id)
      .subscribe(
        (course) => {
          const goal = data.id ? 'updated' : 'created';

          this.snackBarService.showSuccess(`Course "${course.name}" ${goal}`);
          this.back();
        },
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

  back(): void {
    this.location.back();
  }

  private buildStudents(enrolledStudents?: Student[]): FormArray {
    return this.fb.array(
      this.students.map(s => {
        if (enrolledStudents && enrolledStudents.find(es => es.id === s.id))
          return new FormControl(true);

        return new FormControl(false);
      })
    );
  }

}
