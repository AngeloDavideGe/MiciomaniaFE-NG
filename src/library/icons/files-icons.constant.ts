import { geticon } from '../functions/icons.function';

export const FILE_ICONS = {
  file: () =>
    geticon([
      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
      'M14 2v6h6',
    ]),
  fileText: () =>
    geticon([
      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
      'M14 2v6h6',
      'M8 13h8',
      'M8 17h8',
    ]),
  filePlus: () =>
    geticon([
      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
      'M14 2v6h6',
      'M12 12v6',
      'M9 15h6',
    ]),
  fileCheck: () =>
    geticon([
      'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
      'M14 2v6h6',
      'm9 15 2 2 4-4',
    ]),
  folder: () =>
    geticon([
      'M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
    ]),
  folderOpen: () =>
    geticon(['M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2', 'M3 11h18l-2 9H5Z']),
  image: () =>
    geticon([
      'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
      'M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
      'm21 15-5-5L5 21',
    ]),
  paperclip: () =>
    geticon([
      'm21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l8.5-8.5a4 4 0 0 1 5.7 5.7l-8.5 8.5a2 2 0 0 1-2.8-2.8l8.5-8.5',
    ]),
  archive: () => geticon(['M3 4h18v4H3z', 'M5 8v12h14V8', 'M10 12h4']),
  clipboard: () =>
    geticon([
      'M9 4h6',
      'M9 2h6v4H9z',
      'M5 4H3v18h18V4h-2',
      'M8 12h8',
      'M8 16h8',
    ]),
} as const;
