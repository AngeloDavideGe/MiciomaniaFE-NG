import { iCard } from '../../../../../../library/interfaces/card.interface';

export enum CategorieGiochi {
  pvp = 'pvp',
  pvb = 'pvb',
  pve = 'pve',
}

export interface DescrizioneGiochi {
  Titolo: string;
  Descrizione: string;
}

export interface IGiochi extends iCard {
  filtro: string;
}
