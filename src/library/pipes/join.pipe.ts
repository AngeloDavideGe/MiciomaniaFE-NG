import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: true,
})
export class JoinPipe implements PipeTransform {
  transform(
    value: readonly unknown[] | null | undefined,
    separator: string = ', ',
  ): string {
    return joinValues(value, separator);
  }
}

export function joinValues(
  value: readonly unknown[] | null | undefined,
  separator: string = ', ',
): string {
  if (!value) return '';

  return value
    .filter((item) => item !== null && item !== undefined && item !== '')
    .map((item) => String(item))
    .join(separator);
}
