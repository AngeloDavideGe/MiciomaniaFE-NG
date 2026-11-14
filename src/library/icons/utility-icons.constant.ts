import { geticon } from '../functions/icons.function';

export const UTILITY_ICONS = {
  hourglass: () =>
    geticon(['M6 2h12', 'M6 22h12', 'M7 2v5l5 5-5 5v5', 'M17 2v5l-5 5 5 5v5']),
  stopwatch: () =>
    geticon([
      'M12 8v4l3 2',
      'M12 2v3',
      'M8 2h8',
      'M19 5l2 2',
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    ]),
  repeat: () =>
    geticon([
      'M17 2l4 4-4 4',
      'M3 11V9a3 3 0 0 1 3-3h15',
      'M7 22l-4-4 4-4',
      'M21 13v2a3 3 0 0 1-3 3H3',
    ]),
  zap: () => geticon(['M13 2 3 14h8l-1 8 11-12h-8Z']),
  printer: () =>
    geticon([
      'M6 9V2h12v7',
      'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2',
      'M6 14h12v8H6z',
    ]),
  qrCode: () =>
    geticon([
      'M3 3h6v6H3z',
      'M15 3h6v6h-6z',
      'M3 15h6v6H3z',
      'M15 15h3v3h-3z',
      'M21 15v6',
      'M15 21h3',
    ]),
} as const;
