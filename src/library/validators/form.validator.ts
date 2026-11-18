import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fieldsMatchValidator(
  firstControlName: string,
  secondControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstValue = control.get(firstControlName)?.value;
    const secondValue = control.get(secondControlName)?.value;

    if (firstValue === undefined || secondValue === undefined) {
      return null;
    }

    return firstValue === secondValue
      ? null
      : { fieldsMismatch: { firstControlName, secondControlName } };
  };
}

export function atLeastOneFieldRequiredValidator(
  controlNames: string[],
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasValue = controlNames.some((controlName) => {
      const value = control.get(controlName)?.value;

      if (typeof value === 'string') {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== null && value !== undefined && value !== false;
    });

    return hasValue ? null : { atLeastOneRequired: { controlNames } };
  };
}

export function dateRangeValidator(
  startControlName: string,
  endControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startValue = control.get(startControlName)?.value;
    const endValue = control.get(endControlName)?.value;

    if (
      startValue == null ||
      endValue == null ||
      startValue === '' ||
      endValue === ''
    ) {
      return null;
    }

    const startDate = new Date(startValue).getTime();
    const endDate = new Date(endValue).getTime();

    if (Number.isNaN(startDate) || Number.isNaN(endDate)) {
      return null;
    }

    return startDate <= endDate
      ? null
      : { dateRange: { startControlName, endControlName } };
  };
}
