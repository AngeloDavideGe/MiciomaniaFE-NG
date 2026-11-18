import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function conditionRequiredValidator(condition: boolean): ValidatorFn {
  return condition ? Validators.required : Validators.nullValidator;
}

export function dynamicValidator(
  conditionFn: (control: AbstractControl) => boolean,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!conditionFn(control)) {
      return { invalidValue: { value: control.value } };
    }

    return null;
  };
}

export function arrayNotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || [];

    if (Array.isArray(value) && value.length === 0) {
      return { arrayEmpty: true };
    }

    return null;
  };
}
