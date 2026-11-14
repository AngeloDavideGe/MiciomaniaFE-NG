import {
  iTab,
  ISidebarItem,
} from '../../../../../../library/interfaces/navbar.interface';
import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import {
  OpereToolbar,
  OpereToolbarIcons,
} from '../../../../../shared/interfaces/opere.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import {
  CategorieManga,
  SottoCategorieManga,
  TabsManga,
} from '../models/manga.model';
import { getIconSafe } from '../../../../../../library/functions/icons.function';
import { INTERFACE_ICONS } from '../../../../../../library/icons/interface-icons.constant';
import { SOCIAL_ICONS } from '../../../../../../library/icons/social-icons.constant';

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
  const icone = {
    ufficiali: getIconSafe(INTERFACE_ICONS.menuGrid),
    miciomania: getIconSafe(INTERFACE_ICONS.menuGrid),
  };

  return [
    {
      id: CategorieManga.ufficiali,
      nome: lang.Ufficiali,
      icona: icone.ufficiali,
    },
    {
      id: CategorieManga.miciomania,
      nome: lang.Miciomania,
      icona: icone.miciomania,
    },
  ];
}

export function getMangaSidebarSub(
  lang: ILang['Manga']['Sottocategorie'],
): ISidebarItem[] {
  const icons = {
    tutti: getIconSafe(INTERFACE_ICONS.menuGrid),
    preferiti: getIconSafe(SOCIAL_ICONS.heart),
    leggendo: getIconSafe(INTERFACE_ICONS.eye),
  };

  return [
    {
      id: SottoCategorieManga.tutti,
      nome: lang.Tutti,
      icona: icons.tutti,
    },
    {
      id: SottoCategorieManga.preferiti,
      nome: lang.Preferiti,
      icona: icons.preferiti,
    },
    {
      id: SottoCategorieManga.leggendo,
      nome: lang.Leggendo,
      icona: icons.leggendo,
    },
  ];
}

export function getMangaToolbar(
  manga: number,
  capitoli: number,
  lang: ILang['Manga']['Toolbar'],
  icons: OpereToolbarIcons,
): OpereToolbar[] {
  return [
    {
      icon: icons.book,
      value: manga,
      title: lang.MangaDisponibili,
    },
    {
      icon: icons.grid,
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
      width: 1553,
      raggio: 4,
    },
    {
      width: 1249,
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
