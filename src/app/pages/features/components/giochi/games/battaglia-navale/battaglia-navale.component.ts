import { Component, inject, signal } from '@angular/core';
import { inizialiAlfabeto } from '../../../../../../../library/constants/utility.constant';
import { AppConfigService } from '../../../../../../core/api/appConfig.service';
import { BattagliaNavaleBotMoves } from './functions/battaglia-navale.bot';
import { initializeBNBoard } from './functions/battaglia-navale.function';
import {
  BattagliaNavaleCell,
  battagliaNavaleCols,
  BattagliaNavaleDifficulty,
  BNUltimiColpi,
  naviTotale,
} from './models/battaglia-navale.model';

@Component({
  selector: 'app-battaglia-navale',
  standalone: true,
  imports: [],
  templateUrl: './battaglia-navale.component.html',
  styleUrl: './battaglia-navale.component.scss',
})
export class BattagliaNavaleComponent {
  private appConfigService = inject(AppConfigService);

  public lang = this.appConfigService.lang.Giochi;
  public playerBoard = signal<BattagliaNavaleCell[][]>(initializeBNBoard());
  public botBoard = signal<BattagliaNavaleCell[][]>(initializeBNBoard());
  public status = signal<string>(this.lang.TuoTurno);
  public difficulty = signal<BattagliaNavaleDifficulty>('hard');
  public naviRimastePlayer: number = structuredClone(naviTotale);
  public naviRimasteBot: number = structuredClone(naviTotale);
  public colonne = inizialiAlfabeto.slice(0, battagliaNavaleCols);
  public ultimiColpi: BNUltimiColpi = [null, null];

  public playerMove(rowIndex: number, colIndex: number): void {
    if (this.status() !== this.lang.TuoTurno) return;

    const cell = this.botBoard().at(rowIndex)?.at(colIndex);

    if (!cell || cell.colpito) return;

    cell.colpito = true;
    this.naviRimasteBot -= cell.state ? 1 : 0;

    if (this.naviRimasteBot === 0) {
      this.status.set(this.lang.HaiVinto);
      return;
    }

    this.status.set(this.lang.TurnoDelBot);

    setTimeout(() => {
      const botMoves = BattagliaNavaleBotMoves(
        this.playerBoard(),
        this.difficulty(),
        this.ultimiColpi,
      );

      for (const [botRow, botCol] of botMoves) {
        const botCell = this.playerBoard().at(botRow)?.at(botCol);

        if (!botCell || botCell.colpito) continue;

        botCell.colpito = true;

        if (botCell.state) {
          this.naviRimastePlayer -= 1;
          this.ultimiColpi = [[botRow, botCol], this.ultimiColpi[0]];
        } else {
          this.ultimiColpi = [null, null];
        }

        if (this.naviRimastePlayer === 0) {
          this.status.set('Ha vinto il bot!');
          return;
        }
      }

      this.status.set(this.lang.TuoTurno);
    }, 400);
  }

  public resetGame(): void {
    if (this.naviRimastePlayer === naviTotale) return;

    this.playerBoard.set(initializeBNBoard());
    this.botBoard.set(initializeBNBoard());
    this.ultimiColpi = [null, null];
    this.naviRimastePlayer = structuredClone(naviTotale);
    this.naviRimasteBot = structuredClone(naviTotale);
    this.status.set(this.lang.TuoTurno);
  }
}
