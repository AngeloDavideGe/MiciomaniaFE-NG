export type BattagliaNavaleState = 'grande' | 'piccola' | null;
export type BattagliaNavaleDifficulty = 'easy' | 'medium' | 'hard';

export const battagliaNavaleRows: number = 6;
export const battagliaNavaleCols: number = 6;
export const numNaviPiccole: number = 3;
export const numNaviGrandi: number = 2;
export const naviTotale: number = 2 * numNaviPiccole + 3 * numNaviGrandi;

export interface BattagliaNavaleCell {
  state: BattagliaNavaleState;
  colpito: boolean;
}

export type BNUltimiColpi = [[number, number] | null, [number, number] | null];
