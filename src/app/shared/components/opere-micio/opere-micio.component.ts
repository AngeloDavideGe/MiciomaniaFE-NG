import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ModalIndyComponent } from '../../../../library/components/modal/modal-indy.component';
import { Canzoni, Manga } from '../../interfaces/opere.interface';
import { GetFiltriCustom } from '../../../../library/functions/pagination.function';
import { effectTimeoutCustom } from '../../../../library/functions/debounce.function';
import { AppConfigService } from '../../../core/api/appConfig.service';

@Component({
  selector: 'app-opere-micio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalIndyComponent],
  templateUrl: './opere-micio.component.html',
  styleUrl: './opere-micio.component.scss',
})
export class OpereMicioComponent {
  public opere = input.required<Canzoni[] | Manga[]>();
  public close = output<void>();
  public addOperaToUtente = output<number>();

  public readonly appConfig = inject(AppConfigService);
  public readonly lang = this.appConfig.lang.Feature.Opere;

  public searchQuery = signal<string>('');
  public debounceQuery = signal<string>('');

  public opereFilter = GetFiltriCustom<Canzoni | Manga>({
    elemTable: this.opere,
    tipoSelect: 'some',
    select: [
      {
        key: 'nome',
        query: this.debounceQuery,
      },
    ],
  });

  constructor() {
    effectTimeoutCustom(
      this.searchQuery,
      (value: string) => {
        this.debounceQuery.set(value);
      },
      500,
    );
  }
}
