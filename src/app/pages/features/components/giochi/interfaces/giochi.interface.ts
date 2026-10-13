import { iCard } from '../../../../../../library/interfaces/card.interface';

export interface DescrizioneGiochi {
  Titolo: string;
  Descrizione: string;
}

export interface IGiochi extends iCard {
  filtro: string;
}
