import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { SnackBarService } from './snack-bar.service';
import { AppValidators } from './validators';

@Component({ template: '' })
export abstract class BaseFormComponent {

  form!: FormGroup;

  constructor(protected snackBarService: SnackBarService) { }

  abstract onSubmit(): void;

  submit(): void {
    if (this.form.valid) {
      this.onSubmit();
      this.form.reset();
    } else {
      this.snackBarService.showError('There are errors in the form');
      this.verifyValidations(this.form);
    }
  }

  getError(controlName: string, label: string): string | null {
    const control = this.form.get(controlName);

    if (!control) throw new Error(`Invalid control name: ${controlName}`);

    for (const prop in control.errors)
      if (control.errors.hasOwnProperty(prop) && control.touched)
        return AppValidators.getErrorMessage(label, prop, control.errors[prop]);

    return null;
  }

  private verifyValidations(form: FormGroup | FormArray): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field)!;

      control.markAsDirty();
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray)
        this.verifyValidations(control);
    });
  }

}
