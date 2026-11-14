import { geticon } from '../functions/icons.function';

export const STATUS_ICONS = {
  info: () =>
    geticon([
      'M12 11v5',
      'M12 7h.01',
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    ]),
  alert: () =>
    geticon([
      'M12 9v4',
      'M12 17h.01',
      'M10.3 3.9 1.8 18.2A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z',
    ]),
  alertCircle: () =>
    geticon([
      'M12 8v4',
      'M12 16h.01',
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    ]),
  alertTriangle: () =>
    geticon([
      'M12 9v4',
      'M12 17h.01',
      'm10.3 3.9-8.5 14.3A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z',
    ]),
  help: () =>
    geticon([
      'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3',
      'M12 17h.01',
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    ]),
  checkCircle: () =>
    geticon(['m9 12 2 2 4-4', 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z']),
  xCircle: () =>
    geticon([
      'm15 9-6 6',
      'm9 9 6 6',
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    ]),
  minusCircle: () =>
    geticon(['M8 12h8', 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z']),
  plusCircle: () =>
    geticon([
      'M12 8v8',
      'M8 12h8',
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    ]),
  loader: () =>
    geticon([
      'M12 2v4',
      'M12 18v4',
      'm4.93 4.93 2.83 2.83',
      'm16.24 16.24 2.83 2.83',
      'M2 12h4',
      'M18 12h4',
      'm4.93 19.07 2.83-2.83',
      'm16.24 7.76 2.83-2.83',
    ]),
} as const;
