import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    reference: Date | string | number = new Date(),
  ): string {
    return relativeTime(value, reference);
  }
}

export function relativeTime(
  value: Date | string | number | null | undefined,
  reference: Date | string | number = new Date(),
): string {
  if (value === null || value === undefined || value === '') return '';

  const date = value instanceof Date ? value : new Date(value);
  const referenceDate =
    reference instanceof Date ? reference : new Date(reference);

  if (isNaN(date.getTime()) || isNaN(referenceDate.getTime())) {
    return 'Data non disponibile';
  }

  const seconds = Math.round((referenceDate.getTime() - date.getTime()) / 1000);
  const absoluteSeconds = Math.abs(seconds);
  const future = seconds < 0;
  const prefix = future ? 'tra ' : '';
  const suffix = future ? '' : ' fa';

  if (absoluteSeconds < 60) return 'adesso';
  if (absoluteSeconds < 3600) {
    const minutes = Math.floor(absoluteSeconds / 60);
    return `${prefix}${minutes} minut${minutes === 1 ? 'o' : 'i'}${suffix}`;
  }
  if (absoluteSeconds < 86400) {
    const hours = Math.floor(absoluteSeconds / 3600);
    return `${prefix}${hours} or${hours === 1 ? 'a' : 'e'}${suffix}`;
  }
  if (absoluteSeconds < 2592000) {
    const days = Math.floor(absoluteSeconds / 86400);
    return `${prefix}${days} giorn${days === 1 ? 'o' : 'i'}${suffix}`;
  }
  if (absoluteSeconds < 31536000) {
    const months = Math.floor(absoluteSeconds / 2592000);
    return `${prefix}${months} mes${months === 1 ? 'e' : 'i'}${suffix}`;
  }

  const years = Math.floor(absoluteSeconds / 31536000);
  return `${prefix}${years} ann${years === 1 ? 'o' : 'i'}${suffix}`;
}
