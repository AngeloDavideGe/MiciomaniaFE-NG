import { geticon, IconOptions } from '../functions/icons.function';

export const ENTERTAINMENT_ICONS = {
  book: (options?: IconOptions) =>
    geticon(
      [
        'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5Z',
        'M4 18.5A2.5 2.5 0 0 1 6.5 16H20',
        'M8 7h8',
        'M8 11h8',
      ],
      options,
    ),
  bookOpen: (options?: IconOptions) =>
    geticon(
      [
        'M12 7v14',
        'M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13',
        'M3 18a3 3 0 0 1 3-3h2a4 4 0 0 1 4 4',
        'M21 18a3 3 0 0 0-3-3h-2a4 4 0 0 0-4 4',
      ],
      options,
    ),
  headphones: (options?: IconOptions) =>
    geticon(
      [
        'M3 14v-3a9 9 0 0 1 18 0v3',
        'M5 14h2v7H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2Z',
        'M17 14h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2Z',
      ],
      options,
    ),
  disc: (options?: IconOptions) =>
    geticon(
      [
        'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
        'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
        'M12 12h.01',
      ],
      options,
    ),
  gamepad: (options?: IconOptions) =>
    geticon(
      [
        'M6 11h4',
        'M8 9v4',
        'M15 10h.01',
        'M18 12h.01',
        'M7 6h10a4 4 0 0 1 3.9 3.1l1 5a3 3 0 0 1-5.2 2.6l-2.2-2.4h-5l-2.2 2.4A3 3 0 0 1 2.1 14l1-5A4 4 0 0 1 7 6Z',
      ],
      options,
    ),
  trophy: (options?: IconOptions) =>
    geticon(
      [
        'M8 21h8',
        'M12 17v4',
        'M7 4h10v5a5 5 0 0 1-10 0Z',
        'M7 6H4v2a4 4 0 0 0 4 4',
        'M17 6h3v2a4 4 0 0 1-4 4',
      ],
      options,
    ),
  medal: (options?: IconOptions) =>
    geticon(
      [
        'm8 3 4 5 4-5',
        'm8 3-2 7',
        'm16 3 2 7',
        'M12 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z',
        'm10 16 1.3 1.3L14 14.5',
      ],
      options,
    ),
  dice: (options?: IconOptions) =>
    geticon(
      [
        'M4 4h16v16H4z',
        'M8 8h.01',
        'M16 8h.01',
        'M12 12h.01',
        'M8 16h.01',
        'M16 16h.01',
      ],
      options,
    ),
} as const;
