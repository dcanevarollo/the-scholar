import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { AppValidators } from 'src/app/shared/validators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../shared/users.scss', '../../shared/forms.scss']
})
export class ChangePasswordComponent
  extends BaseFormComponent
  implements OnInit
{

  private visibilityControls?: Record<string, boolean>;

  form!: FormGroup;

  constructor(
    private service: UsersService,
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder,
    protected snackBarService: SnackBarService
  ) {
    super(snackBarService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmNewPassword: ['', [
        Validators.required,
        AppValidators.equalsTo('newPassword', 'Passwords')
      ]]
    });

    this.visibilityControls = {
      currentPassword: true,
      newPassword: true,
      confirmNewPassword: true
    };
  }

  isHidden(field: string): boolean {
    return this.visibilityControls![field];
  }

  setHidden(field: string): void {
    this.visibilityControls![field] = !this.visibilityControls![field];
  }

  onSubmit(): void {
    const { value: data } = this.form;
    delete data.confirmNewPassword;

    const { id } = this.authService.user!;

    this.service
      .changePassword(data, id)
      .subscribe(
        () => {
          this.snackBarService.showSuccess('Password updated');
          this.location.back();
        },
        (err: HttpErrorResponse) => this.snackBarService.showError(err.error)
      );
  }

}
