import { geticon } from '../functions/icons.function';

export const LOCATION_ICONS = {
  mapPin: () =>
    geticon([
      'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z',
      'M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    ]),
  map: () =>
    geticon(['m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z', 'M9 3v15', 'M15 6v15']),
  navigation: () => geticon(['m3 11 19-9-9 19-2-8-8-2Z']),
  compass: () =>
    geticon([
      'm16.2 7.8-4.2 8.4-4.2-4.2Z',
      'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    ]),
  globe: () =>
    geticon([
      'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
      'M2 12h20',
      'M12 2a15 15 0 0 1 0 20',
      'M12 2a15 15 0 0 0 0 20',
    ]),
  locate: () =>
    geticon([
      'M12 2v4',
      'M12 18v4',
      'M2 12h4',
      'M18 12h4',
      'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    ]),
} as const;
