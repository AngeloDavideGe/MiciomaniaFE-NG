import { geticon } from '../functions/icons.function';

export const DATA_ICONS = {
  chartBar: () => geticon(['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3']),
  chartLine: () => geticon(['M3 3v18h18', 'm5 15 5-5 4 4 7-8']),
  chartPie: () =>
    geticon([
      'M21.2 15A9 9 0 0 1 9 2.8',
      'M12 2v10h10A10 10 0 0 0 12 2Z',
      'M2 12a10 10 0 1 0 10-10',
    ]),
  table: () =>
    geticon(['M3 3h18v18H3z', 'M3 9h18', 'M3 15h18', 'M9 3v18', 'M15 3v18']),
  database: () =>
    geticon([
      'M12 3c5 0 9 1.8 9 4s-4 4-9 4-9-1.8-9-4 4-4 9-4Z',
      'M3 7v10c0 2.2 4 4 9 4s9-1.8 9-4V7',
      'M3 12c0 2.2 4 4 9 4s9-1.8 9-4',
    ]),
  server: () =>
    geticon([
      'M4 4h16v6H4z',
      'M4 14h16v6H4z',
      'M7 7h.01',
      'M7 17h.01',
      'M11 7h6',
      'M11 17h6',
    ]),
  layers: () =>
    geticon(['m12 2 10 5-10 5L2 7Z', 'm2 12 10 5 10-5', 'm2 17 10 5 10-5']),
  list: () =>
    geticon([
      'M8 6h13',
      'M8 12h13',
      'M8 18h13',
      'M3 6h.01',
      'M3 12h.01',
      'M3 18h.01',
    ]),
  listChecks: () =>
    geticon([
      'm3 6 2 2 4-4',
      'M11 6h10',
      'm3 12 2 2 4-4',
      'M11 12h10',
      'm3 18 2 2 4-4',
      'M11 18h10',
    ]),
} as const;
