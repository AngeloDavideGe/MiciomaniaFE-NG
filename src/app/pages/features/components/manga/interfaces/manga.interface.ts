import { iCard } from '../../../../../../library/interfaces/card.interface';

export interface IManga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: boolean;
}

export interface MangaCard extends iCard {
  filtro: boolean | null;
}
