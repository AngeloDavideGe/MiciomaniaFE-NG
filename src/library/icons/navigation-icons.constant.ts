import { geticon, IconOptions } from '../functions/icons.function';

export const NAVIGATION_ICONS = {
  home: (options?: IconOptions) => geticon(['m3 10 9-7 9 7', 'M5 9v12h14V9', 'M9 21v-8h6v8'], options),
  menu: (options?: IconOptions) => geticon(['M4 6h16', 'M4 12h16', 'M4 18h16'], options),
  close: (options?: IconOptions) => geticon(['m18 6-12 12', 'm6 6 12 12'], options),
  arrowUp: (options?: IconOptions) => geticon(['M12 19V5', 'm5 12 7-7 7 7'], options),
  arrowDown: (options?: IconOptions) => geticon(['M12 5v14', 'm19 12-7 7-7-7'], options),
  arrowLeft: (options?: IconOptions) => geticon(['M19 12H5', 'm12 19-7-7 7-7'], options),
  arrowRight: (options?: IconOptions) => geticon(['M5 12h14', 'm12 5 7 7-7 7'], options),
  arrowUpDown: (options?: IconOptions) =>
    geticon(['M12 3v18', 'm7 8 5-5 5 5', 'm7 16 5 5 5-5'], options),
  chevronRight: (options?: IconOptions) => geticon(['m9 18 6-6-6-6'], options),
  chevronLeft: (options?: IconOptions) => geticon(['m15 18-6-6 6-6'], options),
  chevronUp: (options?: IconOptions) => geticon(['m6 15 6-6 6 6'], options),
  chevronDown: (options?: IconOptions) => geticon(['m6 9 6 6 6-6'], options),
  externalLink: (options?: IconOptions) =>
    geticon([
      'M15 3h6v6',
      'M10 14 21 3',
      'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    ], options),
  moreHorizontal: (options?: IconOptions) => geticon(['M5 12h.01', 'M12 12h.01', 'M19 12h.01'], options),
  moreVertical: (options?: IconOptions) => geticon(['M12 5h.01', 'M12 12h.01', 'M12 19h.01'], options),
} as const;
