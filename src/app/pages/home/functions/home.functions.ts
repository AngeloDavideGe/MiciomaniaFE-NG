import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { ConfirmService } from '../../../../library/dialogs/confirm/confirm.service';
import { iCard } from '../../../../library/interfaces/card.interface';
import { RaggioPage } from '../../../../library/interfaces/pagination.interface';
import { ToggleProps } from '../../../../library/interfaces/toggle.interface';
import {
  AppConfigService,
  LangEnum,
} from '../../../core/api/appConfig.service';
import { ILang } from '../../../core/interfaces/lang.interface';
import { User } from '../../../shared/interfaces/users.interface';
import { AuthService } from '../../../shared/services/auth.service';

export function getCategorieCard(lang: ILang['Home']): iCard[] {
  return [
    {
      titolo: lang.Card1.titolo,
      descrizione: lang.Card1.descrizione,
      bottone: lang.Card1.bottone,
      urlPic: 'https://i.postimg.cc/N0MRzTJn/Manga-Card.png',
      routerLink: 'feature/manga',
      color: 'var(--primary)',
    },
    {
      titolo: lang.Card2.titolo,
      descrizione: lang.Card2.descrizione,
      bottone: lang.Card2.bottone,
      urlPic: 'https://i.postimg.cc/6QkTfGD4/Canzoni-Card.png',
      routerLink: 'feature/canzoni',
      color: 'var(--primary)',
    },
    {
      titolo: lang.Card3.titolo,
      descrizione: lang.Card3.descrizione,
      bottone: lang.Card3.bottone,
      urlPic: 'https://i.postimg.cc/Y0w3Z0mW/Giochi-Card.png',
      routerLink: 'feature/giochi',
      color: 'var(--primary)',
    },
    {
      titolo: lang.Card4.titolo,
      descrizione: lang.Card4.descrizione,
      bottone: lang.Card4.bottone,
      urlPic: 'https://i.postimg.cc/Y0w3Z0mW/Giochi-Card.png',
      routerLink: 'feature/classifica',
      color: 'var(--primary)',
    },
  ];
}

export function getToggleProps(
  authService: AuthService,
  router: Router,
  confirmService: ConfirmService,
  appConfig: AppConfigService,
  lang: ILang['Home']['Toggle'],
  icons: HomeToggleIcons,
): ToggleProps[] {
  const currentUser: User | null = authService.currentUser();

  return [
    {
      titolo: lang.Account,
      icona: icons.account,
      menuElementi: [
        {
          testo: lang.Profilo,
          icona: icons.profile,
          condition: !!authService.currentUser(),
          azione: () =>
            router.navigate(['auth/user/' + authService.currentUser()?.id]),
        },
      ],
    },
    {
      titolo: lang.Cursore,
      icona: icons.cursor,
      menuElementi: [
        {
          testo: lang.CursoreContagocce,
          icona: icons.eyedropper,
          condition: true,
          azione: () => appConfig.currentCursor.set('bi bi-eyedropper'),
        },
        {
          testo: lang.CursorePiuma,
          icona: icons.feather,
          condition: true,
          azione: () => appConfig.currentCursor.set('bi bi-feather'),
        },
        {
          testo: lang.CursoreFulmine,
          icona: icons.lightning,
          condition: true,
          azione: () => appConfig.currentCursor.set('bi bi-lightning-fill'),
        },
        {
          testo: lang.CursoreBacchetta,
          icona: icons.wand,
          condition: true,
          azione: () => appConfig.currentCursor.set('bi bi-magic'),
        },
        {
          testo: lang.CursoreCacciavite,
          icona: icons.screwdriver,
          condition: true,
          azione: () => appConfig.currentCursor.set('bi bi-screwdriver'),
        },
        {
          testo: lang.CursoreDisattiva,
          icona: icons.cancel,
          condition: true,
          azione: () => appConfig.currentCursor.set(''),
        },
      ],
    },
    {
      titolo: lang.Lingua,
      icona: icons.globe,
      menuElementi: Object.values(LangEnum).map((x: LangEnum) => {
        return {
          testo: x.toUpperCase(),
          icona:
            x === appConfig.currentLang()
              ? icons.selectedLanguage
              : icons.language,
          condition: true,
          azione: () => appConfig.changeLang(x),
        };
      }),
    },
    {
      titolo: lang.Auth,
      icona: icons.auth,
      menuElementi: [
        {
          testo: lang.Esci,
          icona: icons.logout,
          condition: !!currentUser,
          azione: () => {
            const accountsUser: User[] = authService.accountsUser();
            const currentUser: User | null = authService.currentUser();

            confirmService.confirmCustom({
              titolo: lang.LogoutTitolo,
              messaggio: `${lang.LogoutMessaggio} ${currentUser?.id}?`,
              confirmFunc: () => {
                if (accountsUser.length > 1 && currentUser) {
                  authService.accountsUser.update((x: User[]) =>
                    x.filter((y: User) => y.id != currentUser.id),
                  );
                  authService.currentUser.set(authService.accountsUser()[0]);
                } else {
                  authService.accountsUser.set([]);
                  authService.currentUser.set(null);
                }
              },
              notConfirmFunc: () => {},
            });
          },
        },
        {
          testo: lang.Login,
          icona: icons.login,
          condition: !currentUser,
          azione: () => router.navigate(['auth/login']),
        },
      ],
    },
  ];
}

export function defaultHomeArrayPags(): RaggioPage[] {
  return [
    ...[5, 4, 3, 2].map((x: number) => ({
      width: 40 + 344 * x,
      raggio: x,
    })),
    {
      width: 0,
      raggio: 1,
    },
  ];
}

export interface HomeToggleIcons {
  account: SafeHtml;
  profile: SafeHtml;
  cursor: SafeHtml;
  eyedropper: SafeHtml;
  feather: SafeHtml;
  lightning: SafeHtml;
  wand: SafeHtml;
  screwdriver: SafeHtml;
  cancel: SafeHtml;
  globe: SafeHtml;
  selectedLanguage: SafeHtml;
  language: SafeHtml;
  auth: SafeHtml;
  logout: SafeHtml;
  login: SafeHtml;
}
