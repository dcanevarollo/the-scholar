import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/forms.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  hidePassword = true;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    protected snackBarService: SnackBarService
  ) {
    super(snackBarService);
  }

  ngOnInit(): void {
    this.authService.showNavEmitter.emit(false);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authService.login(this.form.value);
  }

}
