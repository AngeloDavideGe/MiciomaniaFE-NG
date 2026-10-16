import {
  iTab,
  ISidebarItem,
} from '../../../../../../library/interfaces/navbar.interface';
import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import { OpereToolbar } from '../../../../../shared/interfaces/opere.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import {
  CategorieManga,
  SottoCategorieManga,
  TabsManga,
} from '../models/manga.model';

export function getMangaTabs(lang: ILang['Manga']['Tabs']): iTab[] {
  return [
    {
      id: TabsManga.tutti,
      label: lang.Tutti,
      color: 'var(--primary-light)',
    },
    {
      id: TabsManga.inCorso,
      label: lang.InCorso,
      color: 'var(--primary-light)',
    },
    {
      id: TabsManga.completati,
      label: lang.Completati,
      color: 'var(--primary-light)',
    },
  ];
}

export function getRecordMangaTabs(): Record<string, boolean | null> {
  return {
    [TabsManga.tutti]: null,
    [TabsManga.inCorso]: false,
    [TabsManga.completati]: true,
  };
}

export function getMangaSidebar(
  lang: ILang['Manga']['Categorie'],
): ISidebarItem[] {
  return [
    {
      id: CategorieManga.ufficiali,
      nome: lang.Ufficiali,
      icona: 'bi-grid',
    },
    {
      id: CategorieManga.miciomania,
      nome: lang.Miciomania,
      icona: 'bi-play-circle',
    },
  ];
}

export function getMangaSidebarSub(
  lang: ILang['Manga']['Sottocategorie'],
): ISidebarItem[] {
  return [
    {
      id: SottoCategorieManga.tutti,
      nome: lang.Tutti,
      icona: 'bi-grid',
    },
    {
      id: SottoCategorieManga.preferiti,
      nome: lang.Preferiti,
      icona: 'bi-heart',
    },
  ];
}

export function getMangaToolbar(
  manga: number,
  capitoli: number,
  lang: ILang['Manga']['Toolbar'],
): OpereToolbar[] {
  return [
    {
      icon: 'bi-book',
      value: manga,
      title: lang.MangaDisponibili,
    },
    {
      icon: 'bi-grid',
      value: capitoli,
      title: lang.CapitoliTotali,
    },
  ];
}

export function defaultMangaArrayPags(): RaggioPage[] {
  return [
    {
      width: 1871,
      raggio: 5,
    },
    {
      width: 1567,
      raggio: 4,
    },
    {
      width: 1263,
      raggio: 3,
    },
    {
      width: 978,
      raggio: 2,
    },
    {
      width: 0,
      raggio: 1,
    },
  ];
}
