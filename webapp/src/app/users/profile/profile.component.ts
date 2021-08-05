import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { User } from '../shared/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.scss',
    '../shared/users.scss',
    '../../shared/forms.scss'
  ]
})
export class ProfileComponent extends BaseFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private service: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
    protected snackBarService: SnackBarService
  ) {
    super(snackBarService);
  }

  ngOnInit(): void {
    const user = this.authService.user!;

    this.form = this.fb.group({
      id: [user.id],
      name: [user.name, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    const data = this.form.value as User;

    this.service
      .update(data, data.id)
      .subscribe(
        (user) => {
          this.authService.user = user;
          this.snackBarService.showSuccess('Profile updated');
        },
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

}
