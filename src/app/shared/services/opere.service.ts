import { Injectable, signal } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { BaseMicioService } from './base-micio.service';
import {
  Canzoni,
  CanzoniGet,
  Classifica,
  iManga,
  MangaGet,
  OpereUtente,
} from '../interfaces/opere.interface';
import { User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class OpereService extends BaseMicioService {
  public manga = signal<iManga | null>(null);
  public canzoni = signal<Canzoni[]>([]);
  public opereUtente = signal<OpereUtente | null>(null);
  public classifica = signal<Classifica | null>(null);

  public mangaLoaded: boolean = false;
  public canzoniLoaded: boolean = false;
  public classificaLoaded: boolean = false;

  constructor() {
    super('CS');
  }

  getClassifica(): Observable<Classifica> {
    return this.getCustom<Classifica>('Squadre/get_squadre_e_giocatori');
  }

  getManga(currentUser: User | null): Observable<MangaGet> {
    return forkJoin({
      manga: this.getCustom<iManga>('Manga/get_all_manga'),
      opereUtente: this.getOpereUtente(currentUser),
    });
  }

  getAllCanzoni(currentUser: User | null): Observable<CanzoniGet> {
    return forkJoin({
      canzoni: this.getCustom<Canzoni[]>('Manga/get_all_canzoni'),
      opereUtente: this.getOpereUtente(currentUser),
    });
  }

  private getOpereUtente(currentUser: User | null): Observable<OpereUtente> {
    if (!currentUser) {
      return of({
        manga: null,
        mangamicio: null,
        canzonimicio: null,
      });
    }

    if (this.opereUtente()) {
      return of(this.opereUtente()!);
    } else {
      return this.getCustom<OpereUtente>(
        `Manga/get_manga_utente/${currentUser?.id}`,
      );
    }
  }
}
