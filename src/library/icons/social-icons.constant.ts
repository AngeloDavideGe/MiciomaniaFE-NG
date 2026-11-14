import { geticon } from '../functions/icons.function';

export const SOCIAL_ICONS = {
  heart: () =>
    geticon([
      'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z',
    ]),
  star: () =>
    geticon([
      'm12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2l-5-4.9 6.9-1Z',
    ]),
  bookmark: () => geticon(['M6 3h12v18l-6-4-6 4Z']),
  share: () => geticon(['M12 16V3', 'm7 8 5-5 5 5', 'M5 12v8h14v-8']),
  thumbsUp: () =>
    geticon([
      'M7 10v12H3V10z',
      'M7 10l5-8a3 3 0 0 1 3 3v5h4a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2H7',
    ]),
  thumbsDown: () =>
    geticon([
      'M7 14V2H3v12z',
      'M7 14l5 8a3 3 0 0 0 3-3v-5h4a2 2 0 0 0 2-2l-2-8a2 2 0 0 0-2-2H7',
    ]),
} as const;
