import { geticon, IconOptions } from '../functions/icons.function';

export const ECOMMERCE_ICONS = {
  shoppingCart: (options?: IconOptions) =>
    geticon(
      [
        'M3 3h2l2.5 12h11L21 7H6',
        'M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
        'M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      ],
      options,
    ),
  shoppingBag: (options?: IconOptions) =>
    geticon(['M5 8h14l1 13H4L5 8Z', 'M9 8V6a3 3 0 0 1 6 0v2'], options),
  creditCard: (options?: IconOptions) =>
    geticon(['M2 5h20v14H2z', 'M2 10h20', 'M6 15h4'], options),
  wallet: (options?: IconOptions) =>
    geticon(
      [
        'M3 5h17a2 2 0 0 1 2 2v12H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h15',
        'M16 12h6',
        'M17 12h.01',
      ],
      options,
    ),
  dollar: (options?: IconOptions) =>
    geticon(
      ['M12 2v20', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
      options,
    ),
  euro: (options?: IconOptions) =>
    geticon(
      ['M17 5a6 6 0 0 0-9 5 6 6 0 0 0 9 5', 'M4 10h11', 'M4 14h11'],
      options,
    ),
  receipt: (options?: IconOptions) =>
    geticon(
      [
        'M4 2v20l4-2 4 2 4-2 4 2V2l-4 2-4-2-4 2Z',
        'M8 9h8',
        'M8 13h8',
        'M8 17h4',
      ],
      options,
    ),
  tag: (options?: IconOptions) =>
    geticon(['M20 12l-8 8-10-10V2h8Z', 'M7 7h.01'], options),
  gift: (options?: IconOptions) =>
    geticon(
      [
        'M20 12v10H4V12',
        'M2 7h20v5H2z',
        'M12 22V7',
        'M12 7H7.5a2.5 2.5 0 1 1 2.5-2.5C10 6 12 7 12 7Z',
        'M12 7h4.5A2.5 2.5 0 1 0 14 4.5C14 6 12 7 12 7Z',
      ],
      options,
    ),
} as const;
