import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/crud.service';
import { Archive } from './archive.model';

@Injectable()
export class ArchivesService extends CrudService<Archive, string> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, 'archives');
  }

}
