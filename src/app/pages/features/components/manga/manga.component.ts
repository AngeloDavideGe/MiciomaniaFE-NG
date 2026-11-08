import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { CardIndyComponent } from '../../../../../library/components/card/card-indy.component';
import { SidebarIndyComponent } from '../../../../../library/components/sidebar/sidebar-indy.component';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { FiltriInterface } from '../../../../../library/interfaces/pagination.interface';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { ToolbarMicioComponent } from '../../../../shared/components/toolbar-micio.component';
import {
  iManga,
  Manga,
  MangaGet,
  OpereToolbar,
  OpereUtente,
} from '../../../../shared/interfaces/opere.interface';
import { User } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { OpereService } from '../../../../shared/services/opere.service';
import {
  defaultMangaArrayPags,
  getMangaSidebar,
  getMangaSidebarSub,
  getMangaTabs,
  getMangaToolbar,
  getRecordMangaTabs,
} from './functions/manga.function';
import { CategorieManga, SottoCategorieManga } from './models/manga.model';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [
    ContaierMicioComponent,
    ToolbarMicioComponent,
    SidebarIndyComponent,
    TabsIndyComponent,
    CardIndyComponent,
    SpinnerIndyComponent,
  ],
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent implements OnInit {
  private readonly opereService = inject(OpereService);
  private readonly authService = inject(AuthService);
  private readonly appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Manga;
  public readonly categorie = getMangaSidebar(this.lang.Categorie);
  public readonly sottoCategorie = getMangaSidebarSub(this.lang.Sottocategorie);
  public readonly tabs = getMangaTabs(this.lang.Tabs);
  public readonly recordTabs = getRecordMangaTabs();
  public readonly arrayRaggi = defaultMangaArrayPags();

  public searchQuery = signal<string>('');
  public debounceQuery = signal<string>('');
  public currentCategoria = signal<string>(CategorieManga.ufficiali);
  public currentSottoCategoria = signal<string>(SottoCategorieManga.tutti);
  public currentTabs = signal<boolean | null>(null);
  public mangaToolbar = signal<OpereToolbar[]>(
    getMangaToolbar(0, 0, this.lang.Toolbar),
  );

  public viewSpinner = computed<boolean>(() => !this.opereService.manga());
  public currentUser = computed<User | null>(() =>
    this.authService.currentUser(),
  );

  public manga = computed<Manga[]>(
    () => this.opereService.manga()?.listaManga || [],
  );
  public mangaMicio = computed<Manga[]>(
    () => this.opereService.manga()?.micioManga || [],
  );

  public mangaPreferiti = computed<Manga[]>(() =>
    this.mangaUtenteComputed('listaManga', 'mangaPreferito'),
  );
  public mangaMicioPreferiti = computed<Manga[]>(() =>
    this.mangaUtenteComputed('micioManga', 'mangaMicioPreferito'),
  );

  public mangaLeggendo = computed<Manga[]>(() =>
    this.mangaUtenteComputed('listaManga', 'mangaLeggendo'),
  );
  public mangaMicioLeggendo = computed<Manga[]>(() =>
    this.mangaUtenteComputed('micioManga', 'mangaMicioLeggendo'),
  );

  public recordPreferiti = computed<Record<string, string>>(() => {
    const mangaPreferiti: Manga[] = this.mangaPreferiti();
    const micioPreferiti: Manga[] = this.mangaMicioPreferiti();
    const mangaLeggendo: Manga[] = this.mangaLeggendo();
    const micioLeggendo: Manga[] = this.mangaMicioLeggendo();
    const categoria: string = this.currentCategoria();

    let preferiti: Manga[] = [];
    let leggendo: Manga[] = [];

    switch (categoria) {
      case CategorieManga.ufficiali:
        preferiti = mangaPreferiti;
        leggendo = mangaLeggendo;
        break;
      case CategorieManga.miciomania:
        preferiti = micioPreferiti;
        leggendo = micioLeggendo;
        break;
    }

    let recordPreferiti: Record<string, string> = {};

    preferiti.forEach(
      (x: Manga) => (recordPreferiti[x.id.toString()] = 'bi bi-heart'),
    );

    leggendo.forEach(
      (x: Manga) => (recordPreferiti[x.id.toString()] = 'bi bi-book'),
    );

    return recordPreferiti;
  });

  public filtri = computed<FiltriInterface<Manga>>(() => {
    const categoria: string = this.currentCategoria();
    const sottoCategoria: string = this.currentSottoCategoria();

    if (categoria == CategorieManga.ufficiali) {
      switch (sottoCategoria) {
        case SottoCategorieManga.tutti:
          return this.mangaFiltri(this.manga);
        case SottoCategorieManga.preferiti:
          return this.mangaFiltri(this.mangaPreferiti);
        case SottoCategorieManga.leggendo:
          return this.mangaFiltri(this.mangaLeggendo);
        default:
          return this.mangaFiltri(signal<Manga[]>([]));
      }
    } else {
      switch (sottoCategoria) {
        case SottoCategorieManga.tutti:
          return this.mangaFiltri(this.mangaMicio);
        case SottoCategorieManga.preferiti:
          return this.mangaFiltri(this.mangaMicioPreferiti);
        case SottoCategorieManga.leggendo:
          return this.mangaFiltri(this.mangaMicioLeggendo);
        default:
          return this.mangaFiltri(signal<Manga[]>([]));
      }
    }
  });

  public dataCard = computed<iCard[]>(() =>
    this.getMangaToCard(this.filtri().elemFilter()),
  );

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) =>
      this.debounceQuery.set(value),
    );

    effect(() => this.setMangaToolbar(this.opereService.manga()));
  }

  ngOnInit(): void {
    handlerFunc<MangaGet>({
      skipCall: this.opereService.mangaLoaded,
      callHttp: () => this.opereService.getManga(this.currentUser()),
      nextCall: (data: MangaGet) => {
        this.opereService.manga.set(data.manga);
        this.opereService.opereUtente.set(data.opereUtente);
      },
      errorCall: () => (this.opereService.mangaLoaded = false),
    });

    this.opereService.mangaLoaded = true;
  }

  private getMangaToCard(manga: Manga[]): iCard[] {
    return manga.map((x: Manga) => ({
      id: x.id.toString(),
      titolo: x.nome,
      urlPic: x.copertina,
      descrizione: x.genere,
      bottone: this.lang.BottoneLeggi,
      filtro: x.completato,
      azione: () => {},
    }));
  }

  private mangaUtenteComputed(
    key: keyof iManga,
    mangaUtenteKey: keyof OpereUtente,
  ): Manga[] {
    const manga: iManga | null = this.opereService.manga();
    const mangaUtente: string | null | undefined =
      this.opereService.opereUtente()?.[mangaUtenteKey];

    if (!mangaUtente || !manga) return [];

    let recordMangaUtente: Record<string, boolean> = {};
    let arrayMangaUtente: Manga[] = [];

    mangaUtente.split(',').forEach((id: string) => {
      recordMangaUtente[id] = true;
    });

    manga[key].forEach((manga: Manga) => {
      if (recordMangaUtente[manga.id.toString()]) {
        arrayMangaUtente.push(manga);
      }
    });

    return arrayMangaUtente;
  }

  private mangaFiltri(manga: Signal<Manga[]>): FiltriInterface<Manga> {
    return GetFiltriCustom<Manga, boolean | null>({
      elemTable: manga,
      tipoSelect: 'every',
      select: [
        {
          key: 'nome',
          query: this.debounceQuery,
        },
      ],
      tabs: [
        {
          key: 'completato',
          query: this.currentTabs,
        },
      ],
    });
  }

  private setMangaToolbar(data: iManga | null): void {
    if (!data) return;

    let capitoliTotali: number = 0;
    const mangaDisponibili: number =
      data.listaManga.length + data.micioManga.length;

    data.listaManga.forEach((x: Manga) => (capitoliTotali += x.capitoli));
    data.micioManga.forEach((x: Manga) => (capitoliTotali += x.capitoli));

    this.mangaToolbar.set(
      getMangaToolbar(mangaDisponibili, capitoliTotali, this.lang.Toolbar),
    );
  }
}
