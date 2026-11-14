import { geticon } from '../functions/icons.function';

export const COMMUNICATION_ICONS = {
  mail: () =>
    geticon([
      'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
      'm22 6-10 7L2 6',
    ]),
  mailOpen: () => geticon(['M3 9l9-6 9 6', 'M3 9v12h18V9', 'm3 9 9 7 9-7']),
  send: () => geticon(['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13']),
  messageCircle: () =>
    geticon([
      'M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8.5Z',
    ]),
  messageSquare: () =>
    geticon(['M21 15a4 4 0 0 1-4 4H7l-4 3V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z']),
  phone: () =>
    geticon([
      'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.2a2 2 0 0 1-.6 1.7L7.7 9.9a16 16 0 0 0 6.4 6.4l1.3-1.3a2 2 0 0 1 1.7-.6l3.2.5a2 2 0 0 1 1.7 2Z',
    ]),
  video: () => geticon(['M15 10l5-3v10l-5-3', 'M3 6h12v12H3z']),
  microphone: () =>
    geticon([
      'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z',
      'M19 10v2a7 7 0 0 1-14 0v-2',
      'M12 19v3',
      'M8 22h8',
    ]),
} as const;
