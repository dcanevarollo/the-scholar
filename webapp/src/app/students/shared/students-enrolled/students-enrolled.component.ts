import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Course } from '../../../courses/shared/course.model';
import { Student } from '../student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students-enrolled.component.html',
  styleUrls: [
    './students-enrolled.component.scss',
    '../../../shared/avatars.scss'
  ]
})
export class StudentsEnrolledComponent implements OnInit {

  students?: Student[];

  constructor(
    public matDialogRef: MatDialogRef<StudentsEnrolledComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course }
  ) { }

  ngOnInit(): void {
    this.students = this.data.course.students.sort(
      (s1, s2) => s1.name.localeCompare(s2.name)
    );
  }

}
