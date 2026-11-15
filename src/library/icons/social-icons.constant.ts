import { geticon, IconOptions } from '../functions/icons.function';

export const SOCIAL_ICONS = {
  heart: (options?: IconOptions) =>
    geticon([
      'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z',
    ], options),
  star: (options?: IconOptions) =>
    geticon([
      'm12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2l-5-4.9 6.9-1Z',
    ], options),
  bookmark: (options?: IconOptions) => geticon(['M6 3h12v18l-6-4-6 4Z'], options),
  share: (options?: IconOptions) => geticon(['M12 16V3', 'm7 8 5-5 5 5', 'M5 12v8h14v-8'], options),
  thumbsUp: (options?: IconOptions) =>
    geticon([
      'M7 10v12H3V10z',
      'M7 10l5-8a3 3 0 0 1 3 3v5h4a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2H7',
    ], options),
  thumbsDown: (options?: IconOptions) =>
    geticon([
      'M7 14V2H3v12z',
      'M7 14l5 8a3 3 0 0 0 3-3v-5h4a2 2 0 0 0 2-2l-2-8a2 2 0 0 0-2-2H7',
    ], options),
  link: (options?: IconOptions) =>
    geticon(
      [
        'M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
        'M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.71-1.71',
        'm8 16 8-8',
      ],
      options,
    ),
  atSign: (options?: IconOptions) =>
    geticon(
      [
        'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8',
        'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
      ],
      options,
    ),
  rss: (options?: IconOptions) =>
    geticon(
      [
        'M5 19h.01',
        'M5 12a7 7 0 0 1 7 7',
        'M5 5a14 14 0 0 1 14 14',
      ],
      options,
    ),
  hashtag: (options?: IconOptions) =>
    geticon(['M4 9h16', 'M3 15h16', 'm10 3-2 18', 'm16 3-2 18'], options),
  shareNodes: (options?: IconOptions) =>
    geticon(
      [
        'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
        'M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
        'M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
        'm8.6 13.5 6.8 4',
        'm15.4 6.5-6.8 4',
      ],
      options,
    ),
} as const;
