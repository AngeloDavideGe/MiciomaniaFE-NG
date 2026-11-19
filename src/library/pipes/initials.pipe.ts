import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    limit: number = 2,
  ): string {
    return initials(value, limit);
  }
}

export function initials(
  value: string | null | undefined,
  limit: number = 2,
): string {
  if (!value) return '';

  const words = value.trim().split(/\s+/).filter(Boolean);
  const safeLimit = Math.max(0, Math.floor(limit));

  return words
    .slice(0, safeLimit)
    .map((word) => Array.from(word)[0]?.toUpperCase() ?? '')
    .join('');
}
