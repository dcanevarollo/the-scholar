import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentResolver } from './guards/student.resolver';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'new', component: StudentFormComponent },
  {
    path: 'edit/:id',
    component: StudentFormComponent,
    resolve: { student: StudentResolver }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
