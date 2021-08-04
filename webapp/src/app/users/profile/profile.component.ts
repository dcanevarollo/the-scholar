import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { User } from '../shared/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../shared/users.scss']
})
export class ProfileComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private service: UsersService,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private fb: FormBuilder
  ) { }

  get user(): User {
    return this.authService.user!;
  }

  get emailError(): string {
    const control = this.form.get('email');

    if (control?.hasError('required')) return 'E-mail is required';

    return control?.hasError('email') ? 'Not a valid e-mail' : '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (!this.form.pristine && this.form.valid) {
      const { value: data }: { value: User } = this.form;

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

}
