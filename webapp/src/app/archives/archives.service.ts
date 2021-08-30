import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud.service';
import { Archive } from './archive.model';

interface ServerResponse {
  message: string;
}

@Injectable()
export class ArchivesService extends CrudService<Archive, string> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'archives');
  }

  upload(
    files: Set<File>,
    userId: string
  ): Observable<HttpEvent<ServerResponse>> {
    const formData = new FormData();

    files.forEach(file => formData.append('files', file, file.name));

    return this.httpClient.post<ServerResponse>(
      `${environment.apiUrl}/upload/${userId}`,
      formData,
      {
        observe: 'events',
        reportProgress: true
      });
  }

  download(archive: Archive): Subscription {
    return this.httpClient
      .get<Blob>(`${environment.apiUrl}/download/${archive.id}`, {
        responseType: 'blob' as 'json'
      })
      .subscribe(response => this.handleDownload(response, archive.name));
  }

  private handleDownload(file: Blob, fileName: string): void {
    // IE
    if (!!window.navigator?.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);

      return;
    }

    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = blob;
    link.download = fileName;

    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }

}
