import {
  BattagliaNavaleCell,
  BattagliaNavaleDifficulty,
  BNUltimiColpi,
} from '../models/battaglia-navale.model';

export function BattagliaNavaleBotMove(
  board: BattagliaNavaleCell[][],
  difficulty: BattagliaNavaleDifficulty = 'easy',
  ultimiColpi: BNUltimiColpi = [null, null],
): [number, number] {
  return (
    BattagliaNavaleBotMoves(board, difficulty, ultimiColpi)[0] ?? [0, 0]
  );
}

export function BattagliaNavaleBotMoves(
  board: BattagliaNavaleCell[][],
  difficulty: BattagliaNavaleDifficulty = 'easy',
  ultimiColpi: BNUltimiColpi = [null, null],
): [number, number][] {
  switch (difficulty) {
    case 'easy':
      return [BNBotEasyMove(board)];
    case 'medium':
      return [BNBotMediumMove(board, ultimiColpi)];
    case 'hard':
      return BNBotHardMove(board, ultimiColpi);
  }
}

function BNBotEasyMove(board: BattagliaNavaleCell[][]): [number, number] {
  return pickRandomMove(getAvailableMoves(board));
}

function BNBotMediumMove(
  board: BattagliaNavaleCell[][],
  ultimiColpi: BNUltimiColpi,
): [number, number] {
  const availableMoves = getAvailableMoves(board);
  const last = ultimiColpi[0];

  if (last && isHit(board, last)) {
    const around = getSurroundingShipMoves(board, last[0], last[1]);
    if (around.length) return pickRandomMove(around);
  }

  return pickRandomMove(availableMoves);
}

function BNBotHardMove(
  board: BattagliaNavaleCell[][],
  ultimiColpi: BNUltimiColpi,
): [number, number][] {
  const availableMoves = getAvailableMoves(board);
  const last = ultimiColpi[0];
  if (!last || !isHit(board, last)) {
    return [pickRandomMove(availableMoves)];
  }

  const moves: [number, number][] = [];
  let target = last;

  while (moves.length < 3) {
    const around = getSurroundingShipMoves(
      board,
      target[0],
      target[1],
      moves,
    );
    if (!around.length) {
      if (!moves.length) return [pickRandomMove(availableMoves)];
      break;
    }

    target = pickRandomMove(around);
    moves.push(target);
  }

  return moves;
}

function isHit(
  board: BattagliaNavaleCell[][],
  coord: [number, number],
): boolean {
  const cell = board[coord[0]]?.[coord[1]];
  return !!cell?.colpito && cell.state !== null;
}

function getAvailableMoves(board: BattagliaNavaleCell[][]): [number, number][] {
  const moves: [number, number][] = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (!board[row][col].colpito) moves.push([row, col]);
    }
  }
  return moves;
}

function getSurroundingShipMoves(
  board: BattagliaNavaleCell[][],
  row: number,
  col: number,
  alreadySelected: [number, number][] = [],
): [number, number][] {
  const deltas: [number, number][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return deltas
    .map(([dr, dc]) => [row + dr, col + dc] as [number, number])
    .filter(([r, c]) => {
      const cell = board[r]?.[c];
      return (
        !!cell &&
        !cell.colpito &&
        cell.state !== null &&
        !alreadySelected.some(
          ([selectedRow, selectedCol]) =>
            selectedRow === r && selectedCol === c,
        )
      );
    });
}

function pickRandomMove(moves: [number, number][]): [number, number] {
  if (!moves.length) return [0, 0];
  return moves[Math.floor(Math.random() * moves.length)];
}
