import { geticon } from '../functions/icons.function';

export const USER_ICONS = {
  user: () =>
    geticon(['M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M5 21a7 7 0 0 1 14 0']),
  users: () =>
    geticon([
      'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
      'M20 21v-2a4 4 0 0 0-3-3.87',
      'M16 3.13a4 4 0 0 1 0 7.75',
    ]),
  userPlus: () =>
    geticon([
      'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
      'M19 8v6',
      'M22 11h-6',
    ]),
  userMinus: () =>
    geticon([
      'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
      'M16 11h6',
    ]),
  userCheck: () =>
    geticon([
      'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
      'm16 11 2 2 4-4',
    ]),
  userX: () =>
    geticon([
      'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
      'm17 9 5 5',
      'm22 9-5 5',
    ]),
  userCircle: () =>
    geticon([
      'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
      'M4.9 19a8 8 0 0 1 14.2 0',
      'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
    ]),
  logIn: () =>
    geticon([
      'M10 17l5-5-5-5',
      'M15 12H3',
      'M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7',
    ]),
  logOut: () =>
    geticon([
      'M14 7l5 5-5 5',
      'M19 12H9',
      'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7',
    ]),
  lock: () => geticon(['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4']),
  unlock: () => geticon(['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 7-2']),
  key: () =>
    geticon([
      'M21 2l-2 2',
      'M7 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
      'm14 7 7 7',
      'm18 11 3-3',
    ]),
} as const;
