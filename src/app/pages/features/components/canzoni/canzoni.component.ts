import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { CardIndyComponent } from '../../../../../library/components/card/card-indy.component';
import { SidebarIndyComponent } from '../../../../../library/components/sidebar/sidebar-indy.component';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { AudioService } from '../../../../../library/dialogs/audio/audio.service';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { FiltriInterface } from '../../../../../library/interfaces/pagination.interface';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { OpereMicioComponent } from '../../../../shared/components/opere-micio/opere-micio.component';
import { ToolbarMicioComponent } from '../../../../shared/components/toolbar-micio.component';
import {
  Canzoni,
  CanzoniGet,
  OpereToolbar,
  OpereUtente,
} from '../../../../shared/interfaces/opere.interface';
import { User } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { OpereService } from '../../../../shared/services/opere.service';
import {
  defaultCanzoniArrayPags,
  getCanzoniSidebar,
  getCanzoniToolbar,
} from './functions/canzoni.function';
import { CategorieCanzoni } from './models/canzoni.model';

@Component({
  selector: 'app-canzoni',
  standalone: true,
  imports: [
    ContaierMicioComponent,
    ToolbarMicioComponent,
    SidebarIndyComponent,
    SpinnerIndyComponent,
    CardIndyComponent,
    OpereMicioComponent,
  ],
  templateUrl: './canzoni.component.html',
})
export class CanzoniComponent implements OnInit {
  private opereService = inject(OpereService);
  private audioService = inject(AudioService);
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Canzoni;
  public readonly categorie = getCanzoniSidebar(this.lang.Categorie);
  public readonly arrayRaggi = defaultCanzoniArrayPags();

  public currentButton: string | null = null;
  public currentButtonSignal = signal<string | null>(null);

  public searchQuery = signal<string>('');
  public debounceQuery = signal<string>('');
  public currentCategoria = signal<CategorieCanzoni>(CategorieCanzoni.tutte);
  public showCategoriaToAdd = signal<boolean>(false);

  public cardVoidFunction = computed<Function | null>(() => {
    const categoria: CategorieCanzoni = this.currentCategoria();

    let voidFunction: Function | null = null;

    if (categoria == CategorieCanzoni.tutte) {
      voidFunction = null;
    } else {
      voidFunction = () => this.showCategoriaToAdd.set(true);
    }

    return voidFunction;
  });

  public currentUser = computed<User | null>(() =>
    this.authService.currentUser(),
  );

  public canzoniToolbar = computed<OpereToolbar[]>(() => {
    const canzoni: Canzoni[] = this.opereService.canzoni();
    let cantanti: Record<string, boolean> = {};

    canzoni.forEach((canzoni: Canzoni) => {
      cantanti[canzoni.autore] = true;
    });

    const volumi: number = Object.values(cantanti).length;
    return getCanzoniToolbar(volumi, canzoni.length, this.lang.Toolbar);
  });

  public canzoniAll = computed<Canzoni[]>(() => this.opereService.canzoni());

  public canzoniPreferite = computed<Canzoni[]>(() => {
    const canzoni: Canzoni[] = this.opereService.canzoni();
    const preferiti: string | null | undefined =
      this.opereService.opereUtente()?.canzonimicio;

    if (!preferiti || canzoni.length === 0) return [];

    let recordPreferiti: Record<string, boolean> = {};
    let canzoniPreferite: Canzoni[] = [];

    preferiti.split(',').forEach((id: string) => {
      recordPreferiti[id] = true;
    });

    canzoni.forEach((canzone: Canzoni) => {
      if (recordPreferiti[canzone.id.toString()]) {
        canzoniPreferite.push(canzone);
      }
    });

    return canzoniPreferite;
  });

  public recordPreferiti = computed<Record<string, string>>(() => {
    const canzoniPreferite: Canzoni[] = this.canzoniPreferite();
    let recordPreferiti: Record<string, string> = {};

    canzoniPreferite.forEach(
      (x: Canzoni) => (recordPreferiti[x.id.toString()] = 'bi bi-star'),
    );

    return recordPreferiti;
  });

  public filtri = computed<FiltriInterface<Canzoni>>(() => {
    const currentCategoria: string = this.currentCategoria();

    if (currentCategoria == CategorieCanzoni.tutte) {
      return this.getCanzoniFiltri(this.canzoniAll);
    } else {
      return this.getCanzoniFiltri(this.canzoniPreferite);
    }
  });

  public dataCard = computed<iCard[]>(() =>
    this.filtri()
      .elemFilter()
      .map((canzone: Canzoni) => this.mapCanzoneToCard(canzone)),
  );

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debounceQuery.set(value),
    );
  }

  ngOnInit(): void {
    handlerFunc<CanzoniGet>({
      skipCall: this.opereService.canzoniLoaded,
      callHttp: () => this.opereService.getAllCanzoni(this.currentUser()),
      nextCall: (data: CanzoniGet) => {
        this.opereService.canzoni.set(data.canzoni);
        this.opereService.opereUtente.set(data.opereUtente);
      },
      errorCall: () => (this.opereService.canzoniLoaded = false),
    });

    this.opereService.canzoniLoaded = true;
  }

  private mapCanzoneToCard(canzone: Canzoni): iCard {
    return {
      id: canzone.id.toString(),
      titolo: canzone.nome,
      urlPic: canzone.copertina,
      descrizione: canzone.genere,
      bottone: this.lang.BottoneAscolta,
      azione: () => {
        if (this.currentButton && this.currentButton == canzone.nome) {
          this.audioService.stopTrack();
        } else {
          this.audioService.playTrack(
            canzone.path.replace('dl=0', 'dl=1'),
            () => this.currentButtonSignal.set(null),
          );
        }
      },
    };
  }

  private getCanzoniFiltri(
    canzoni: Signal<Canzoni[]>,
  ): FiltriInterface<Canzoni> {
    return GetFiltriCustom<Canzoni>({
      elemTable: canzoni,
      tipoSelect: 'some',
      select: [
        {
          key: 'nome',
          query: this.debounceQuery,
        },
        {
          key: 'autore',
          query: this.debounceQuery,
        },
      ],
    });
  }

  public addCanzoneToUtente(mangaId: number): void {
    const opereUtente: OpereUtente | null = this.opereService.opereUtente();
    let keyOpere: keyof OpereUtente | null = 'canzonimicio';

    if (!opereUtente) return;
    if (!keyOpere) return;

    const ids = opereUtente?.[keyOpere]?.split(',').filter(Boolean) ?? [];
    if (ids.includes(mangaId.toString())) return;

    this.opereService.opereUtente.set({
      ...opereUtente,
      [keyOpere]: [...ids, mangaId.toString()].join(','),
    });

    this.showCategoriaToAdd.set(false);
  }
}
