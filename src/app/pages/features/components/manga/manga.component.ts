import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { effectTimeoutCustom } from '../../../../../library/functions/debounce.function';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { GetFiltriCustom } from '../../../../../library/functions/pagination.function';
import { FiltriInterface } from '../../../../../library/interfaces/pagination.interface';
import {
  iManga,
  Manga,
  MangaGet,
  MangaUtente,
  OpereToolbar,
} from '../../../../shared/interfaces/opere.interface';
import { OpereService } from '../../../../shared/services/opere.service';
import {
  defaultMangaArrayPags,
  getMangaSidebar,
  getMangaSidebarSub,
  getMangaTabs,
  getMangaToolbar,
  getRecordMangaTabs,
} from './functions/manga.function';
import { manga_imports } from './manga.import';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/interfaces/users.interface';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { iCard } from '../../../../../library/interfaces/card.interface';
import { CategorieManga, SottoCategorieManga } from './models/manga.model';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: manga_imports,
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent implements OnInit {
  private opereService = inject(OpereService);
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

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
    this.mangaPreferitiComputed('listaManga', 'manga'),
  );
  public mangaMicioPreferiti = computed<Manga[]>(() =>
    this.mangaPreferitiComputed('micioManga', 'mangamicio'),
  );

  public filtri = computed<FiltriInterface<Manga>>(() => {
    const categoria: string = this.currentCategoria();
    const sottoCategoria: string = this.currentSottoCategoria();

    if (categoria == CategorieManga.ufficiali) {
      if (sottoCategoria == SottoCategorieManga.preferiti) {
        return this.mangaFiltri(this.mangaPreferiti);
      } else {
        return this.mangaFiltri(this.manga);
      }
    } else {
      if (sottoCategoria == SottoCategorieManga.preferiti) {
        return this.mangaFiltri(this.mangaMicioPreferiti);
      } else {
        return this.mangaFiltri(this.mangaMicio);
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
        this.opereService.mangaUtente.set(data.mangaUtente);
      },
      errorCall: () => (this.opereService.mangaLoaded = false),
    });

    this.opereService.mangaLoaded = true;
  }

  private getMangaToCard(manga: Manga[]): iCard[] {
    return manga.map((x: Manga) => ({
      titolo: x.nome,
      urlPic: x.copertina,
      descrizione: x.genere,
      bottone: this.lang.BottoneLeggi,
      filtro: x.completato,
      azione: () => {},
    }));
  }

  private mangaPreferitiComputed(
    key: keyof iManga,
    preferitiKey: keyof MangaUtente,
  ): Manga[] {
    const manga: iManga | null = this.opereService.manga();
    const preferiti: string | null | undefined =
      this.opereService.mangaUtente()?.[preferitiKey];

    if (!preferiti || !manga) return [];

    let recordPreferiti: Record<string, boolean> = {};
    let mangaPreferite: Manga[] = [];

    preferiti.split(',').forEach((id: string) => {
      recordPreferiti[id] = true;
    });

    manga[key].forEach((manga: Manga) => {
      if (recordPreferiti[manga.id.toString()]) {
        mangaPreferite.push(manga);
      }
    });

    return mangaPreferite;
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
