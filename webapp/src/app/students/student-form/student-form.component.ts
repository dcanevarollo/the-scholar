import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Student } from '../shared/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['../../shared/forms.scss']
})
export class StudentFormComponent implements OnInit {

  student?: Student;

  constructor(private route: ActivatedRoute) { }

  get title(): string {
    return this.student ? 'Edit student info' : 'Add new student';
  }

  get subtitle(): string {
    return this.student
      ? `Edit ${this.student.name} information`
      : 'Create a new student and enroll him into a course';
  }

  ngOnInit(): void {
    this.student = this.route.snapshot.data.student as Student | undefined;
  }

}
