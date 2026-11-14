import { SafeHtml } from '@angular/platform-browser';

export interface MangaGet {
  manga: iManga;
  opereUtente: OpereUtente;
}

export interface CanzoniGet {
  canzoni: Canzoni[];
  opereUtente: OpereUtente;
}

export interface iManga {
  listaManga: Manga[];
  micioManga: Manga[];
}

export interface Canzoni {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
}

export interface Manga extends Canzoni {
  completato: boolean;
  capitoli: number;
}

export interface OpereUtente {
  mangaPreferito: string | null;
  mangaMicioPreferito: string | null;
  canzonimicio: string | null;
  mangaLeggendo: string | null;
  mangaMicioLeggendo: string | null;
}

export interface OpereToolbar {
  icon: SafeHtml;
  value: number;
  title: string;
}

export interface OpereToolbarIcons {
  book: SafeHtml;
  grid: SafeHtml;
}

export interface Classifica {
  squadre: Squadra[];
  giocatori: Giocatore[];
}

export interface Squadra {
  nome: string;
  punteggio: number;
  descrizione: string;
  colore: string;
  posizione: string;
}

export interface Giocatore {
  idUtente: string;
  punteggio: number;
  squadra: string;
  posizione: string;
}
