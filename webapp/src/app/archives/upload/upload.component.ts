import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { httpResponseMap, watchUploadProgress } from 'src/app/shared/operators';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { ArchivesService } from '../archives.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss', '../../shared/forms.scss']
})
export class UploadComponent implements OnDestroy {

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  private subscription?: Subscription;

  files: Set<File> = new Set();
  progress = 0;

  constructor(
    private service: ArchivesService,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) { }

  add(event: Event): void {
    const files = (event.target as HTMLInputElement).files!;

    for (let i = 0; i < files?.length; i++) this.files.add(files[i]);

    this.reset();
  }

  remove(file: File): void {
    this.files.delete(file);
  }

  onUpload(): void {
    if (this.files.size > 0) {
      this.progress = 0.1;

      this.subscription = this.service
        .upload(this.files, this.authService.user!.id)
        .pipe(
          watchUploadProgress(progress => this.progress = progress),
          httpResponseMap(),
          catchError((err) => {
            console.error(err);
            this.snackBarService.showError('Could not save your files');
            this.reset(false, false);

            return EMPTY;
          }),
        )
        .subscribe(response => {
            this.snackBarService.showSuccess(response!.message);
            this.reset(true);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private reset(resetFiles = false, resetInput = true): void {
    this.progress = 0;

    if (resetInput) this.fileInputRef.nativeElement.value = '';
    if (resetFiles) this.files = new Set();
  }

}
