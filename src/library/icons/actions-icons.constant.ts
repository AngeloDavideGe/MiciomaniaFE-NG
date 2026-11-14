import { geticon } from '../functions/icons.function';

export const ACTION_ICONS = {
  plus: () => geticon(['M12 5v14', 'M5 12h14']),
  minus: () => geticon(['M5 12h14']),
  edit: () =>
    geticon(['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z']),
  trash: () =>
    geticon([
      'M3 6h18',
      'M8 6V4h8v2',
      'm19 6-1 14H6L5 6',
      'M10 11v5',
      'M14 11v5',
    ]),
  copy: () => geticon(['M8 8V4h12v12h-4', 'M4 8h12v12H4z']),
  paste: () =>
    geticon(['M8 4h8', 'M9 4V2h6v2', 'M8 4H5v18h14v-3', 'M10 12h8v8h-8z']),
  download: () =>
    geticon([
      'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
      'M7 10l5 5 5-5',
      'M12 15V3',
    ]),
  upload: () =>
    geticon([
      'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
      'M17 8l-5-5-5 5',
      'M12 3v12',
    ]),
  save: () =>
    geticon([
      'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z',
      'M17 21v-8H7v8',
      'M7 3v5h8',
    ]),
  refresh: () =>
    geticon([
      'M20 7v5h-5',
      'M4 17v-5h5',
      'M5.6 9a7 7 0 0 1 11.5-2L20 12',
      'M4 12l2.9 5a7 7 0 0 0 11.5-2',
    ]),
  undo: () => geticon(['M3 7v6h6', 'M5 13a8 8 0 1 1 2 5']),
  redo: () => geticon(['M21 7v6h-6', 'M19 13a8 8 0 1 0-2 5']),
  check: () => geticon(['m5 12 4 4L19 6']),
  x: () => geticon(['m18 6-12 12', 'm6 6 12 12']),
  filter: () => geticon(['M4 4h16l-6 7v7l-4 2v-9z']),
  sort: () => geticon(['M4 7h16', 'M7 12h10', 'M10 17h4']),
  sliders: () =>
    geticon([
      'M4 21v-7',
      'M4 10V3',
      'M12 21v-9',
      'M12 8V3',
      'M20 21v-5',
      'M20 12V3',
      'M2 14h4',
      'M10 8h4',
      'M18 16h4',
    ]),
} as const;
