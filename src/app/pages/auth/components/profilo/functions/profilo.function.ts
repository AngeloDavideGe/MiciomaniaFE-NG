import { Router } from '@angular/router';
import {
  iTab,
  PulsanteNavbar,
} from '../../../../../../library/interfaces/navbar.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';

export function getProfiloTabs(lang: ILang['Profilo']['Tabs']): iTab[] {
  return [
    {
      id: 'text',
      label: lang.PostTesto,
      color: 'var(--primary-light)',
      icona: 'bi bi-chat-left-text',
    },
    {
      id: 'photo',
      label: lang.PostFoto,
      color: 'var(--primary-light)',
      icona: 'bi bi-images',
    },
  ];
}

export function getProfileNavbar(
  router: Router,
  lang: ILang['Feature']['Navbar'],
): PulsanteNavbar[] {
  return [
    {
      id: 'home',
      icon: 'bi-house',
      text: lang.Home,
      azione: () => router.navigate(['home']),
    },
  ];
}
