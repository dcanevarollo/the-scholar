import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { DialogService } from '../shared/dialog/dialog.service';
import { SnackBarService } from '../shared/snack-bar.service';
import { Student } from './shared/student.model';
import { StudentsService } from './shared/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss', '../shared/forms.scss']
})
export class StudentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tableColumns = ['select', 'id', 'name', 'email'];

  filter!: FormControl;
  selection!: SelectionModel<Student>;
  students?: MatTableDataSource<Student>;
  error$?: Subject<boolean>;

  constructor(
    private service: StudentsService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.filter = new FormControl('');
    this.selection = new SelectionModel<Student>(false, []);

    this.filter.valueChanges
      .pipe(
        map((value: string) => value.trim().toLowerCase()),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.students!.filter = value

        if (this.students?.paginator) this.students.paginator.firstPage();
      });

    this.refresh();
  }

  onDelete(): void {
    const student = this.selection.selected[0];

    this.dialogService
      .showDialog(`Remove "${student.name}"`)
      .pipe(
        switchMap(confirmed =>
          confirmed ? this.service.remove(student.id) : EMPTY
        )
      )
      .subscribe(
        () => {
          this.snackBarService.showSuccess(`Student "${student.name}" removed`);
          this.refresh();
        },
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

  private refresh(): void {
    this.error$ = new Subject();

    this.service
      .list()
      .pipe(
        map(students => students.sort(
          (s1, s2) => s1.name.localeCompare(s2.name)
        ))
      )
      .subscribe(
        students => {
          this.students = new MatTableDataSource<Student>(students);
          this.students!.paginator = this.paginator;
        },
        () => {
          this.snackBarService.showError('Could not load the students list');
          this.error$?.next(true);
        }
      );
  }

}
