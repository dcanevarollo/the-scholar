import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
