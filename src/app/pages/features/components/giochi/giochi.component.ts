import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { isCurrentRoute } from '../../../../../library/functions/router.function';
import { ICheckBox } from '../../../../../library/interfaces/form.interface';
import { FiltriInterface } from '../../../../../library/interfaces/pagination.interface';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import {
  defaultGiochiArrayPags,
  getGiochi,
  getGiochiCheckbox,
  getGiochiDescrizione,
} from './functions/giochi.function';
import { giochi_imports } from './giochi.import';
import { DescrizioneGiochi, IGiochi } from './models/giochi.model';

@Component({
  selector: 'app-giochi',
  standalone: true,
  imports: giochi_imports,
  templateUrl: './giochi.component.html',
  styleUrl: './giochi.component.scss',
})
export class GiochiComponent {
  private appConfig = inject(AppConfigService);
  private router = inject(Router);

  public readonly lang = this.appConfig.lang.Giochi;
  public readonly arrayRaggi = defaultGiochiArrayPags();
  public readonly giochiSelect = getGiochiCheckbox();

  public selectedItems = signal<ICheckBox[]>([]);

  public currentDescrizione = signal<DescrizioneGiochi>({
    Titolo: '...',
    Descrizione: '...',
  });

  public filtri = computed<FiltriInterface<IGiochi>>(() =>
    GetFiltriCustom<IGiochi, null>({
      elemTable: signal<IGiochi[]>(getGiochi(this.lang, this.router)),
      multiSelect: [
        {
          key: 'filtro',
          query: this.selectedItems,
        },
      ],
    }),
  );

  public isGiochi$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/feature/giochi',
    mapFunc: (event: { url: string }) => {
      const url = event.url.split(/[?#]/)[0];

      if (url === '/feature/giochi') {
        this.currentDescrizione.set({
          Titolo: this.lang.Titolo,
          Descrizione: this.lang.Descrizione,
        });

        return true;
      }

      this.currentDescrizione.set(getGiochiDescrizione(url, this.lang));

      return false;
    },
  });
}
