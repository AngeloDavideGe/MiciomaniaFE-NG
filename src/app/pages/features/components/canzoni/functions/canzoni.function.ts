import { ISidebarItem } from '../../../../../../library/interfaces/navbar.interface';
import { RaggioPage } from '../../../../../../library/interfaces/pagination.interface';
import { OpereToolbar } from '../../../../../shared/interfaces/opere.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import { CategorieCanzoni } from '../models/canzoni.model';

export function getCanzoniToolbar(
  album: number,
  canzoni: number,
  lang: ILang['Canzoni']['Toolbar'],
): OpereToolbar[] {
  return [
    {
      icon: 'bi-book',
      value: album,
      title: lang.AlbumDisponibili,
    },
    {
      icon: 'bi-grid',
      value: canzoni,
      title: lang.CanzoniTotali,
    },
  ];
}

export function getCanzoniSidebar(
  lang: ILang['Canzoni']['Categorie'],
): ISidebarItem[] {
  return [
    {
      id: CategorieCanzoni.tutte,
      nome: lang.Tutte,
      icona: 'bi-grid',
    },
    {
      id: CategorieCanzoni.preferite,
      nome: lang.Preferite,
      icona: 'bi-play-circle',
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
