import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../shared/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss', '../shared/courses.scss']
})
export class CourseFormComponent implements OnInit {

  course?: Course;

  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data.course;
  }

  return(): void {
    this.location.back();
  }

}
