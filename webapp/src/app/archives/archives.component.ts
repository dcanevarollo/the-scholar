import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { AuthService } from '../auth/shared/auth.service';
import { SnackBarService } from '../shared/snack-bar.service';
import { Archive } from './archive.model';
import { ArchivesService } from './archives.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html'
})
export class ArchivesComponent implements OnInit {

  archives?: Archive[];
  error$?: Subject<boolean>;

  constructor(
    private service: ArchivesService,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
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

  onDownload(archive: Archive): void {
  }

  onDelete(archive: Archive): void {
  }

}
