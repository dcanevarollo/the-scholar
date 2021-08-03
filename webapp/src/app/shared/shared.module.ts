import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { ContainerDirective } from './container.directive';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ContainerDirective,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    ContainerDirective,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
