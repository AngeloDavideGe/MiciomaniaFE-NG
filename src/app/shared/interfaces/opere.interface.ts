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

export interface Manga {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
  completato: boolean;
  capitoli: number;
}

export interface OpereUtente {
  manga: string | null;
  mangamicio: string | null;
  canzonimicio: string | null;
}

export interface Canzoni {
  id: number;
  nome: string;
  autore: string;
  genere: string;
  copertina: string;
  path: string;
}

export interface OpereToolbar {
  icon: string;
  value: number;
  title: string;
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
