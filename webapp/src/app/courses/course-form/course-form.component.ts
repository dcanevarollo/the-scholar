import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatListOption } from '@angular/material/list';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { CoursesService } from '../courses.service';
import { Course } from '../shared/course.model';
import { Student } from '../../students/shared/student.model';
import { StudentsService } from 'src/app/students/shared/students.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: [
    './course-form.component.scss',
    '../courses.scss',
    '../../shared/forms.scss',
    '../../shared/avatars.scss'
  ]
})
export class CourseFormComponent extends BaseFormComponent implements OnInit {

  query!: FormControl;
  course?: Course;
  form!: FormGroup;
  students$?: Observable<Student[]>;

  constructor(
    private service: CoursesService,
    private studentsService: StudentsService,
    private authService: AuthService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    protected snackBarService: SnackBarService
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

  ngOnInit(): void {
    this.query = new FormControl('');

    this.course = this.route.snapshot.data.course as Course | undefined;

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
        students: [this.course?.students]
      })
    });

    this.students$ = this.query.valueChanges
      .pipe(
        filter(query => typeof query === 'string'),
        map((query: string) => query.trim()),
        filter(query => query.length >= 3),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(query => this.studentsService.list({ 'name_like': query })),
        map(students => students.sort(
          (s1, s2) => s1.name.localeCompare(s2.name)
        ))
      );
  }

  back(): void {
    this.location.back();
  }

  displayStudent(student: Student): string {
    return student && student.name ? student.name : '';
  }

  selectStudent({ option }: MatAutocompleteSelectedEvent) {
    const student = option.value as Student;
    const control = this.form.get('step2.students') as FormControl;

    if (!control.value) control.setValue([student]);
    else if (!(control.value as Student[]).find(s => s.id === student.id))
      control.setValue([...control.value, student])

    this.query.setValue('');
  }

  removeStudents(options: MatListOption[]) {
    const selectedStudents = options.map(option => option.value) as Student[];
    const control = this.form.get('step2.students') as FormControl;

    const currStudents = control.value as Student[];
    selectedStudents.forEach(student => {
      const index = currStudents.findIndex(s => s.id === student.id);

      if (index > -1) currStudents.splice(index, 1);
    });

    control.setValue(currStudents);
  }

  onSubmit(): void {
    const { step1, step2 } = this.form.value;

    const data = { ...step1, ...step2 };

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

}
