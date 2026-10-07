import { boardEmpty } from '../../../../../../../../library/functions/confronto.function';
import {
  BattagliaNavaleCell,
  battagliaNavaleCols,
  battagliaNavaleRows,
  numNaviGrandi,
  numNaviPiccole,
} from '../models/battaglia-navale.model';

export function initializeBNBoard(): BattagliaNavaleCell[][] {
  const board = boardEmpty<BattagliaNavaleCell>(
    battagliaNavaleRows,
    battagliaNavaleCols,
    {
      state: null,
      colpito: false,
    },
  );

  posizionaNavi(board, numNaviGrandi, 'grande', 3);
  posizionaNavi(board, numNaviPiccole, 'piccola', 2);

  return board;
}

function posizionaNavi(
  board: BattagliaNavaleCell[][],
  quantita: number,
  tipo: 'grande' | 'piccola',
  dimensione: number,
): void {
  let posizionate: number = 0;
  let tentativi: number = 0;
  const maxTentativi = 1000;

  while (posizionate < quantita && tentativi < maxTentativi) {
    tentativi++;

    const orizzontale: boolean = Math.random() < 0.5;

    const maxRow: number = orizzontale
      ? battagliaNavaleRows
      : battagliaNavaleRows - dimensione;

    const maxCol: number = orizzontale
      ? battagliaNavaleCols - dimensione
      : battagliaNavaleCols;

    const startRow: number = Math.floor(Math.random() * maxRow);
    const startCol: number = Math.floor(Math.random() * maxCol);

    if (puoPosizionare(board, startRow, startCol, dimensione, orizzontale)) {
      for (let i = 0; i < dimensione; i++) {
        const r = orizzontale ? startRow : startRow + i;
        const c = orizzontale ? startCol + i : startCol;
        board[r][c].state = tipo;
      }
      posizionate++;
    }
  }
}

function puoPosizionare(
  board: BattagliaNavaleCell[][],
  startRow: number,
  startCol: number,
  dimensione: number,
  orizzontale: boolean,
): boolean {
  for (let i = 0; i < dimensione; i++) {
    const r = orizzontale ? startRow : startRow + i;
    const c = orizzontale ? startCol + i : startCol;

    if (r >= battagliaNavaleRows || c >= battagliaNavaleCols) return false;
    if (board[r][c].state !== null) return false;

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nr < battagliaNavaleRows &&
          nc >= 0 &&
          nc < battagliaNavaleCols &&
          board[nr][nc].state !== null
        ) {
          return false;
        }
      }
    }
  }

  return true;
}
