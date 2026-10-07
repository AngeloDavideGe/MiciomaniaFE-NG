import { Component, inject, signal } from '@angular/core';
import { boardEmpty } from '../../../../../../../library/functions/confronto.function';
import { checkForWinnerTris } from './functions/tris.function';
import { TrisState, trisRows, trisCols } from './models/tris.model';
import { TrisBotMove } from './functions/tris.bot';
import { AppConfigService } from '../../../../../../core/api/appConfig.service';

@Component({
  selector: 'app-tris',
  standalone: true,
  imports: [],
  templateUrl: './tris.component.html',
  styleUrl: './tris.component.scss',
})
export class TrisComponent {
  private appConfigService = inject(AppConfigService);

  public lang = this.appConfigService.lang.Giochi;
  public board = signal<TrisState[][]>(boardEmpty(trisRows, trisCols, null));
  public status = signal<string>(this.lang.TuoTurno);
  public isGameOver = signal<boolean>(false);
  public currentMoves: number = 0;

  public handleCellClick(row: number, col: number): void {
    if (this.status() !== this.lang.TuoTurno) return;

    const currentBoard: TrisState[][] = this.board();

    if (this.isGameOver() || currentBoard[row][col] !== null) {
      return;
    }

    this.currentMoves += 1;
    this.board.update((board: TrisState[][]) => {
      board[row][col] = 'X';
      return board;
    });

    if (this.controlGameOver('X')) return;
    this.status.set(this.lang.TurnoDelBot);

    setTimeout(() => {
      const [randomRow, randomCol] = TrisBotMove(this.board());

      this.currentMoves += 1;
      this.board.update((board: TrisState[][]) => {
        board[randomRow][randomCol] = 'O';
        return board;
      });

      if (!this.controlGameOver('O')) {
        this.status.set(this.lang.TuoTurno);
      }
    }, 400);
  }

  private controlGameOver(player: 'X' | 'O'): boolean {
    if (checkForWinnerTris(this.board(), player)) {
      this.status.set(
        player === 'X' ? this.lang.HaiVinto : this.lang.HaVintoIlBot,
      );
      this.isGameOver.set(true);
      return true;
    }

    if (this.currentMoves >= trisRows * trisCols) {
      this.status.set(this.lang.AvetePareggiato);
      this.isGameOver.set(true);
      return true;
    }

    return false;
  }

  public resetBoard(): void {
    if (this.currentMoves === 0) return;

    this.board.set(boardEmpty(trisRows, trisCols, null));
    this.status.set(this.lang.TuoTurno);
    this.isGameOver.set(false);
    this.currentMoves = 0;
  }
}
