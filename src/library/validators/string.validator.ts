import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }

    return value.trim().length === 0 ? { whitespace: true } : null;
  };
}

export function noLeadingOrTrailingWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.length === 0) {
      return null;
    }

    return value.trim() === value
      ? null
      : { leadingOrTrailingWhitespace: true };
  };
}

export function minWordsValidator(minWords: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }

    const actualWords = countWords(value);
    return actualWords >= minWords
      ? null
      : { minWords: { required: minWords, actual: actualWords } };
  };
}

export function maxWordsValidator(maxWords: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }

    const actualWords = countWords(value);
    return actualWords <= maxWords
      ? null
      : { maxWords: { required: maxWords, actual: actualWords } };
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }

    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:'
        ? null
        : { url: { value } };
    } catch {
      return { url: { value } };
    }
  };
}

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const valid = /^[a-z0-9]+$/.test(value);

    return valid ? null : { invalidUsername: { value } };
  };
}

function countWords(value: string): number {
  const trimmedValue = value.trim();
  return trimmedValue.length === 0 ? 0 : trimmedValue.split(/\s+/).length;
}
