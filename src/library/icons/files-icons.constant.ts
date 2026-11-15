import { geticon, IconOptions } from '../functions/icons.function';

export const FILE_ICONS = {
  file: (options?: IconOptions) =>
    geticon(
      [
        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
        'M14 2v6h6',
      ],
      options,
    ),
  fileText: (options?: IconOptions) =>
    geticon(
      [
        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
        'M14 2v6h6',
        'M8 13h8',
        'M8 17h8',
      ],
      options,
    ),
  filePlus: (options?: IconOptions) =>
    geticon(
      [
        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
        'M14 2v6h6',
        'M12 12v6',
        'M9 15h6',
      ],
      options,
    ),
  fileCheck: (options?: IconOptions) =>
    geticon(
      [
        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
        'M14 2v6h6',
        'm9 15 2 2 4-4',
      ],
      options,
    ),
  folder: (options?: IconOptions) =>
    geticon(
      [
        'M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
      ],
      options,
    ),
  folderOpen: (options?: IconOptions) =>
    geticon(
      ['M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2', 'M3 11h18l-2 9H5Z'],
      options,
    ),
  image: (options?: IconOptions) =>
    geticon(
      [
        'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
        'M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
        'm21 15-5-5L5 21',
      ],
      options,
    ),
  paperclip: (options?: IconOptions) =>
    geticon(
      [
        'm21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l8.5-8.5a4 4 0 0 1 5.7 5.7l-8.5 8.5a2 2 0 0 1-2.8-2.8l8.5-8.5',
      ],
      options,
    ),
  archive: (options?: IconOptions) =>
    geticon(['M3 4h18v4H3z', 'M5 8v12h14V8', 'M10 12h4'], options),
  clipboard: (options?: IconOptions) =>
    geticon(
      ['M9 4h6', 'M9 2h6v4H9z', 'M5 4H3v18h18V4h-2', 'M8 12h8', 'M8 16h8'],
      options,
    ),
  fileSearch: (options?: IconOptions) =>
    geticon(
      [
        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6',
        'M14 2v6h6',
        'M15.5 18.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
        'm18 18 3 3',
      ],
      options,
    ),
  fileX: (options?: IconOptions) =>
    geticon(
      [
        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z',
        'M14 2v6h6',
        'm9 13 6 6',
        'm15 13-6 6',
      ],
      options,
    ),
  folderPlus: (options?: IconOptions) =>
    geticon(
      [
        'M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
        'M12 11v6',
        'M9 14h6',
      ],
      options,
    ),
  folderMinus: (options?: IconOptions) =>
    geticon(
      [
        'M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
        'M9 14h6',
      ],
      options,
    ),
} as const;
