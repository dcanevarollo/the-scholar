import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class AppValidators {

  static equalsTo(otherField: string, label: string): ValidatorFn {
    const validator = (control: FormControl) => {
      if (!control.root || !(control.root as FormGroup).controls)
        return null;

      const field = (control.root as FormGroup).get(otherField);

      if (!field) throw new Error(`Invalid field: ${otherField}`);

      return field.value === control.value ? null : { equalsTo: label };
    };

    return validator as ValidatorFn;
  }

  static getErrorMessage(
    label: string,
    validatorName: string,
    validatorValue?: any
  ): string {
    const config: Record<string, string> = {
      required: `${label} is required`,
      minlength: `${label} must have at least ${validatorValue?.requiredLength} characters`,
      maxlength: `${label} must have at most ${validatorValue?.requiredLength} characters`,
      min: `Minimum value is ${validatorValue?.min}`,
      email: 'Not a valid e-mail address',
      equalsTo: `${validatorValue} don't match each other`
    };

    return config[validatorName];
  }

}
