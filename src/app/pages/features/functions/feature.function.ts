import { Router } from '@angular/router';
import { PulsanteNavbar } from '../../../../library/interfaces/navbar.interface';
import { ILang } from '../../../core/interfaces/lang.interface';

export function getBottomNavItems(
  router: Router,
  lang: ILang['Feature']['Navbar'],
): PulsanteNavbar[] {
  return [
    {
      id: 'manga',
      icon: 'bi-book',
      text: lang.Manga,
      condition: true,
      azione: () => router.navigate(['feature/manga']),
    },
    {
      id: 'canzoni',
      icon: 'bi-music-note',
      text: lang.Canzoni,
      condition: true,
      azione: () => router.navigate(['feature/canzoni']),
    },
    {
      id: 'giochi',
      icon: 'bi-joystick',
      text: lang.Giochi,
      condition: true,
      azione: () => router.navigate(['feature/giochi']),
    },
    {
      id: 'post',
      icon: 'bi-chat',
      text: lang.Post,
      condition: true,
      azione: () => router.navigate(['feature/post']),
    },
    {
      id: 'classifica',
      icon: 'bi-trophy',
      text: lang.Classifica,
      condition: true,
      azione: () => router.navigate(['feature/classifica']),
    },
  ];
}
