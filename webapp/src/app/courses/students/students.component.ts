import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Course } from '../shared/course.model';
import { Student } from './shared/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students?: Student[];

  constructor(
    public matDialogRef: MatDialogRef<StudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course }
  ) { }

  ngOnInit(): void {
    this.students = this.data.course.students.sort(
      (s1, s2) => s1.name.localeCompare(s2.name)
    );
  }

}
