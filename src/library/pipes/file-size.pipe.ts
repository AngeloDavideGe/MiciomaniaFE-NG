import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    decimals: number = 1,
  ): string {
    return fileSizeFormat(value, decimals);
  }
}

export function fileSizeFormat(
  value: number | string | null | undefined,
  decimals: number = 1,
): string {
  if (value === null || value === undefined || value === '') return '';

  const bytes = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(bytes) || bytes < 0) return String(value);

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if (bytes < 1024) return `${bytes} B`;

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const size = bytes / 1024 ** unitIndex;
  const safeDecimals = Math.max(0, Math.floor(decimals));

  return `${size.toFixed(safeDecimals).replace(/\.0+$/, '')} ${units[unitIndex]}`;
}
