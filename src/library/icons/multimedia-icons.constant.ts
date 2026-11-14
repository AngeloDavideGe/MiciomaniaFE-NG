import { geticon, IconOptions } from '../functions/icons.function';

export const MULTIMEDIA_ICONS = {
  camera: (options?: IconOptions) =>
    geticon([
      'M3 7h4l2-3h6l2 3h4v13H3z',
      'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    ], options),
  play: (options?: IconOptions) => geticon(['m8 5 12 7-12 7Z'], options),
  pause: (options?: IconOptions) => geticon(['M7 4h4v16H7z', 'M15 4h4v16h-4z'], options),
  stop: (options?: IconOptions) => geticon(['M5 5h14v14H5z'], options),
  volume: (options?: IconOptions) =>
    geticon([
      'M11 5 6 9H3v6h3l5 4Z',
      'M15.5 8.5a5 5 0 0 1 0 7',
      'M18.5 5.5a9 9 0 0 1 0 13',
    ], options),
  volumeOff: (options?: IconOptions) => geticon(['M11 5 6 9H3v6h3l5 4Z', 'm17 9 5 6', 'm22 9-5 6'], options),
  music: (options?: IconOptions) =>
    geticon([
      'M9 18V5l12-2v13',
      'M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z',
      'M21 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z',
    ], options),
  mic: (options?: IconOptions) =>
    geticon([
      'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z',
      'M19 10v2a7 7 0 0 1-14 0v-2',
      'M12 19v3',
      'M8 22h8',
    ], options),
} as const;
