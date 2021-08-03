import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { SharedModule } from '../shared.module';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: SharedModule
})
export class DialogService {

  private result$ = new Subject<boolean>();

  constructor(private matDialog: MatDialog) { }

  showDialog(message = 'Are you sure?', title?: string): Observable<boolean> {
    const dialogRef = this.matDialog.open(DialogComponent, {
      width: '250px',
      data: { title, message }
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => this.result$?.next(result));

    return this.result$.asObservable();
  }

}
