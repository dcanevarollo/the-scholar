import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesComponent } from './archives.component';
import { SharedModule } from '../shared/shared.module';
import { ArchivesService } from './archives.service';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    ArchivesComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArchivesRoutingModule,
    MatListModule,
    MatChipsModule
  ],
  providers: [
    ArchivesService
  ]
})
export class ArchivesModule { }
