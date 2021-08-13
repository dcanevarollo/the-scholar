import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArchivesComponent } from './archives.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', component: ArchivesComponent },
  { path: 'new', component: UploadComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivesRoutingModule { }
