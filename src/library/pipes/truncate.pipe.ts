import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    length: number = 100,
    suffix: string = '...',
  ): string {
    return truncateText(value, length, suffix);
  }
}

export function truncateText(
  value: string | null | undefined,
  length: number = 100,
  suffix: string = '...',
): string {
  if (!value) return '';

  const safeLength = Math.max(0, Math.floor(length));
  if (value.length <= safeLength) return value;
  if (safeLength === 0) return '';

  return value.slice(0, safeLength).trimEnd() + suffix;
}
