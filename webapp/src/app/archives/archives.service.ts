import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
