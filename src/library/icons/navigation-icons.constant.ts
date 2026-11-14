import { geticon } from '../functions/icons.function';

export const NAVIGATION_ICONS = {
  home: () => geticon(['m3 10 9-7 9 7', 'M5 9v12h14V9', 'M9 21v-8h6v8']),
  menu: () => geticon(['M4 6h16', 'M4 12h16', 'M4 18h16']),
  close: () => geticon(['m18 6-12 12', 'm6 6 12 12']),
  arrowUp: () => geticon(['M12 19V5', 'm5 12 7-7 7 7']),
  arrowDown: () => geticon(['M12 5v14', 'm19 12-7 7-7-7']),
  arrowLeft: () => geticon(['M19 12H5', 'm12 19-7-7 7-7']),
  arrowRight: () => geticon(['M5 12h14', 'm12 5 7 7-7 7']),
  chevronRight: () => geticon(['m9 18 6-6-6-6']),
  chevronLeft: () => geticon(['m15 18-6-6 6-6']),
  chevronUp: () => geticon(['m6 15 6-6 6 6']),
  chevronDown: () => geticon(['m6 9 6 6 6-6']),
  externalLink: () =>
    geticon([
      'M15 3h6v6',
      'M10 14 21 3',
      'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    ]),
  moreHorizontal: () => geticon(['M5 12h.01', 'M12 12h.01', 'M19 12h.01']),
  moreVertical: () => geticon(['M12 5h.01', 'M12 12h.01', 'M12 19h.01']),
} as const;
