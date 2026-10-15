import { User } from '../../../../../shared/interfaces/users.interface';

export interface iProfilo {
  user: User;
  tweets: ProfilePost[];
}

export interface ProfilePost {
  id: number;
  dataCreazione: string;
  testo: string;
  idUtente: string;
  immaginePost?: string | null;
}

export enum TabsProfilo {
  text = 'text',
  photo = 'photo',
}
