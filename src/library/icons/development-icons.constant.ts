import { geticon } from '../functions/icons.function';

export const DEVELOPMENT_ICONS = {
  code: () => geticon(['m8 17-5-5 5-5', 'm16 7 5 5-5 5', 'm14 4-4 16']),
  terminal: () => geticon(['M4 17l6-5-6-5', 'M12 19h8', 'M2 3h20v18H2z']),
  bug: () =>
    geticon([
      'M8 8h8v11H8z',
      'M12 8V4',
      'M8 4l2 2',
      'M16 4l-2 2',
      'M3 10h5',
      'M16 10h5',
      'M3 16h5',
      'M16 16h5',
      'M9 19l-2 3',
      'M15 19l2 3',
    ]),
  cpu: () =>
    geticon([
      'M5 5h14v14H5z',
      'M9 9h6v6H9z',
      'M9 1v4',
      'M15 1v4',
      'M9 19v4',
      'M15 19v4',
      'M1 9h4',
      'M1 15h4',
      'M19 9h4',
      'M19 15h4',
    ]),
  wifi: () =>
    geticon([
      'M5 12.5a10 10 0 0 1 14 0',
      'M8.5 16a5 5 0 0 1 7 0',
      'M12 20h.01',
      'M2 9a15 15 0 0 1 20 0',
    ]),
  wifiOff: () =>
    geticon([
      'M3 3l18 18',
      'M8.5 16a5 5 0 0 1 4-.5',
      'M5 12.5a10 10 0 0 1 7-2.5',
      'M2 9a15 15 0 0 1 11-3',
    ]),
  bluetooth: () => geticon(['M7 7l10 10-5 5V2l5 5L7 17']),
} as const;
