import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import {
  Mappa,
  PathSvgCustom,
} from '../../../../../library/interfaces/svg.interface';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import {
  Classifica,
  Giocatore,
  Squadra,
} from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import {
  computedPathsClassifica,
  computedTabellaClassifica,
} from './functions/classifica.computed';
import {
  getBadgeTable,
  getClassificaTabs,
  getColonneTabellaGiocatori,
  getColonneTabellaSquadre,
} from './functions/classifica.functions';
import { TabsClassifica } from './models/classifica.model';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { SvgIndyComponent } from '../../../../../library/components/svg/svg-indy.component';
import { TabellaIndyComponent } from '../../../../../library/components/table/table-indy.component';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';

@Component({
  selector: 'app-classifica',
  standalone: true,
  imports: [
    ContaierMicioComponent,
    SpinnerIndyComponent,
    TabsIndyComponent,
    TabellaIndyComponent,
    SvgIndyComponent,
  ],
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss',
})
export class ClassificaComponent implements OnInit {
  private readonly opereService = inject(OpereService);
  private readonly appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Classifica;
  public readonly tabs = getClassificaTabs(this.lang.Tabs);
  public readonly colonneGiocatori = getColonneTabellaGiocatori(
    this.lang.Colonne,
  );
  public readonly enumTabs = TabsClassifica;
  public readonly colonneSquadre = getColonneTabellaSquadre(this.lang.Colonne);
  public readonly badgeTable = getBadgeTable();

  public currentTab = signal<string>(TabsClassifica.giocatori);
  public modaleClassifica = signal<Mappa | null>(null);
  public spinner = computed<boolean>(() => !this.opereService.classifica());

  public giocatori = computed<Giocatore[]>(
    () =>
      computedTabellaClassifica(
        'giocatori',
        this.opereService.classifica(),
      ) as Giocatore[],
  );

  public squadre = computed<Squadra[]>(
    () =>
      computedTabellaClassifica(
        'squadre',
        this.opereService.classifica(),
      ) as Squadra[],
  );

  public pathGiocatori = computed<PathSvgCustom[]>(() =>
    computedPathsClassifica('giocatori', this.opereService.classifica()),
  );

  public pathSquadre = computed<PathSvgCustom[]>(() =>
    computedPathsClassifica(
      'squadre',
      this.opereService.classifica(),
      (item: Squadra) =>
        this.modaleClassifica.set({
          proprietario: (item as Squadra).nome,
          descrizione: (item as Squadra).descrizione,
        }),
    ),
  );

  public graficoAltezzaSquadre = computed<number>(() =>
    Math.max(150, this.pathSquadre().length * 10 + 10),
  );

  ngOnInit(): void {
    handlerFunc<Classifica>({
      skipCall: this.opereService.classificaLoaded,
      callHttp: () => this.opereService.getClassifica(),
      nextCall: (data: Classifica) => this.opereService.classifica.set(data),
      errorCall: () => (this.opereService.classificaLoaded = false),
    });

    this.opereService.classificaLoaded = true;
  }

  constructor() {
    effect(() => {
      this.currentTab();
      this.modaleClassifica.set(null);
    });
  }
}
