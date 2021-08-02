import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class AppValidators {

  static equalsTo(otherField: string): ValidatorFn {
    const validator = (formControl: FormControl) => {
      if (!otherField) throw new Error('Invalid field to compare with');

      if (!formControl.root || !(formControl.root as FormGroup).controls)
        return null;

      const field = (formControl.root as FormGroup).get(otherField);

      if (!field) throw new Error(`Invalid field: ${otherField}`);

      return field.value === formControl.value ? null : { equalsTo: true };
    };

    return validator as ValidatorFn;
  }

}
