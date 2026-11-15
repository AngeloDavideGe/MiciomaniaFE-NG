import { geticon, IconOptions } from '../functions/icons.function';

export const DEVELOPMENT_ICONS = {
  code: (options?: IconOptions) =>
    geticon(['m8 17-5-5 5-5', 'm16 7 5 5-5 5', 'm14 4-4 16'], options),
  terminal: (options?: IconOptions) =>
    geticon(['M4 17l6-5-6-5', 'M12 19h8', 'M2 3h20v18H2z'], options),
  bug: (options?: IconOptions) =>
    geticon(
      [
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
      ],
      options,
    ),
  cpu: (options?: IconOptions) =>
    geticon(
      [
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
      ],
      options,
    ),
  wifi: (options?: IconOptions) =>
    geticon(
      [
        'M5 12.5a10 10 0 0 1 14 0',
        'M8.5 16a5 5 0 0 1 7 0',
        'M12 20h.01',
        'M2 9a15 15 0 0 1 20 0',
      ],
      options,
    ),
  wifiOff: (options?: IconOptions) =>
    geticon(
      [
        'M3 3l18 18',
        'M8.5 16a5 5 0 0 1 4-.5',
        'M5 12.5a10 10 0 0 1 7-2.5',
        'M2 9a15 15 0 0 1 11-3',
      ],
      options,
    ),
  bluetooth: (options?: IconOptions) =>
    geticon(['M7 7l10 10-5 5V2l5 5L7 17'], options),
  cloud: (options?: IconOptions) =>
    geticon(
      [
        'M20 16.2A4.5 4.5 0 0 0 18 7.5a6 6 0 0 0-11.6 1.8A4 4 0 0 0 7 17h11a4 4 0 0 0 2-0.8Z',
      ],
      options,
    ),
  cloudOff: (options?: IconOptions) =>
    geticon(
      [
        'm2 2 20 20',
        'M8.5 8.5A6 6 0 0 1 18 7.5a4.5 4.5 0 0 1 2 8.7',
        'M7 9.3A4 4 0 0 0 7 17h10',
      ],
      options,
    ),
  monitor: (options?: IconOptions) =>
    geticon(['M3 4h18v13H3z', 'M8 21h8', 'M12 17v4'], options),
  smartphone: (options?: IconOptions) =>
    geticon(
      [
        'M5 2h14v20H5z',
        'M11 18h2',
      ],
      options,
    ),
  tablet: (options?: IconOptions) =>
    geticon(['M4 2h16v20H4z', 'M11 18h2'], options),
  hardDrive: (options?: IconOptions) =>
    geticon(
      [
        'M3 5h18v14H3z',
        'M3 15h18',
        'M7 18h.01',
        'M11 18h.01',
      ],
      options,
    ),
} as const;
