import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  get emailError(): string {
    const control = this.form.get('email');

    if (control?.hasError('required')) return 'E-mail is required';

    return control?.hasError('email') ? 'Not a valid e-mail' : '';
  }

  ngOnInit(): void {
    this.authService.showNavEmitter.emit(false);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) this.authService.login(this.form.value);
  }

}
