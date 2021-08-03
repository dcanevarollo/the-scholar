import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoursesService } from './courses.service';
import { Course } from './shared/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$?: Observable<Course[]>;

  constructor(private service: CoursesService) { }

  ngOnInit(): void {
    this.courses$ = this.service
      .list()
      .pipe(
        map(courses => courses.sort(
          (c1, c2) => c1.name.localeCompare(c2.name)
        ))
      );
  }

}
