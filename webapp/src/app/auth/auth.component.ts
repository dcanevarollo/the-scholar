import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  hidePassword = true;
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  get emailError(): string {
    const control = this.form.get('email');

    if (control?.hasError('required')) return 'E-mail is required';

    return control?.hasError('email') ? 'Not a valid e-mail' : '';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}
