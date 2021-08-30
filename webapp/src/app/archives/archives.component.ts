import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

import { AuthService } from '../auth/shared/auth.service';
import { SnackBarService } from '../shared/snack-bar.service';
import { Archive } from './archive.model';
import { ArchivesService } from './archives.service';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html'
})
export class ArchivesComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  archives?: Archive[];
  error$?: Subject<boolean>;

  constructor(
    private service: ArchivesService,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  onDownload(archive: Archive): void {
    this.subscription = this.service.download(archive);
  }

  onDelete(archive: Archive): void {
    this.dialogService
      .showDialog(`Delete file "${archive.name}"`)
      .pipe(
        switchMap(confirmed =>
          confirmed ? this.service.remove(archive.id) : EMPTY
        )
      )
      .subscribe(
        () => {
          this.snackBarService.showSuccess(`File "${archive.name}" deleted`);
          setTimeout(() => this.refresh(), 1500);
        },
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private refresh(): void {
    this.error$ = new Subject();

    this.service
      .list({ userId: this.authService.user!.id })
      .pipe(
        map(archives => archives.sort((a1, a2) => {
          if (a1.createdAt > a2.createdAt) return -1;
          if (a1.createdAt < a2.createdAt) return 1;
          return 0;
        })),
        map(archives => archives.map(archive => {
          const formattedDate = moment(archive.createdAt).format('LL');

          return { ...archive, formattedDate };
        }))
      )
      .subscribe(
        archives => this.archives = archives,
        () => {
          this.snackBarService.showError('Could not load your files');
          this.error$?.next(true);
        }
      );
  }

}
