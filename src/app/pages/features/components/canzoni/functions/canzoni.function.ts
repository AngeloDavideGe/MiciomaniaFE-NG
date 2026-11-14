import { ISidebarItem } from '../../../../../../library/interfaces/navbar.interface';
import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import {
  OpereToolbar,
  OpereToolbarIcons,
} from '../../../../../shared/interfaces/opere.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import { CategorieCanzoni } from '../models/canzoni.model';
import { getIconSafe } from '../../../../../../library/functions/icons.function';
import { INTERFACE_ICONS } from '../../../../../../library/icons/interface-icons.constant';
import { SOCIAL_ICONS } from '../../../../../../library/icons/social-icons.constant';

export function getCanzoniToolbar(
  album: number,
  canzoni: number,
  lang: ILang['Canzoni']['Toolbar'],
  icons: OpereToolbarIcons,
): OpereToolbar[] {
  return [
    {
      icon: icons.book,
      value: album,
      title: lang.AlbumDisponibili,
    },
    {
      icon: icons.grid,
      value: canzoni,
      title: lang.CanzoniTotali,
    },
  ];
}

export function getCanzoniSidebar(
  lang: ILang['Canzoni']['Categorie'],
): ISidebarItem[] {
  const icons = {
    tutte: getIconSafe(INTERFACE_ICONS.menuGrid),
    preferite: getIconSafe(SOCIAL_ICONS.heart),
  };

  return [
    {
      id: CategorieCanzoni.tutte,
      nome: lang.Tutte,
      icona: icons.tutte,
    },
    {
      id: CategorieCanzoni.preferite,
      nome: lang.Preferite,
      icona: icons.preferite,
    },
  ];
}

export function defaultCanzoniArrayPags(): RaggioPage[] {
  return [
    {
      width: 1862,
      raggio: 5,
    },
    {
      width: 1553,
      raggio: 4,
    },
    {
      width: 1241,
      raggio: 3,
    },
    {
      width: 987,
      raggio: 2,
    },
    {
      width: 0,
      raggio: 1,
    },
  ];
}
