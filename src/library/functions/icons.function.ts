import { inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export function getIconSafe(
  icon: (options?: IconOptions) => string,
  options?: IconOptions,
): SafeHtml {
  return inject(DomSanitizer).bypassSecurityTrustHtml(icon(options));
}

export function geticon(paths: string[], options?: IconOptions): string {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${options?.size ?? 24}"
      height="${options?.size ?? 24}"
      viewBox="0 0 24 24"
      fill="${options?.fill ?? 'none'}"
      stroke="${options?.stroke || 'currentColor'}"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      ${paths.map((path) => `<path d="${path}"/>`).join('\n')}
    </svg>
  `;
}

export interface IconOptions {
  stroke?: string;
  fill?: string;
  size?: string | number;
}
