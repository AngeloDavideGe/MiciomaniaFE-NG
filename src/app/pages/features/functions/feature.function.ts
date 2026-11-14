import { Router } from '@angular/router';
import { PulsanteNavbar } from '../../../../library/interfaces/navbar.interface';
import { getIconSafe } from '../../../../library/functions/icons.function';
import { COMMUNICATION_ICONS } from '../../../../library/icons/communication-icons.constant';
import { DATA_ICONS } from '../../../../library/icons/data-icons.constant';
import { FILE_ICONS } from '../../../../library/icons/files-icons.constant';
import { MULTIMEDIA_ICONS } from '../../../../library/icons/multimedia-icons.constant';
import { ILang } from '../../../core/interfaces/lang.interface';

export function getBottomNavItems(
  router: Router,
  lang: ILang['Feature']['Navbar'],
): PulsanteNavbar[] {
  const icons = {
    manga: getIconSafe(FILE_ICONS.fileText, { stroke: 'currentColor' }),
    songs: getIconSafe(MULTIMEDIA_ICONS.music, { stroke: 'currentColor' }),
    games: getIconSafe(MULTIMEDIA_ICONS.play, { stroke: 'currentColor' }),
    posts: getIconSafe(COMMUNICATION_ICONS.messageCircle, {
      stroke: 'currentColor',
    }),
    ranking: getIconSafe(DATA_ICONS.chartBar, { stroke: 'currentColor' }),
  };

  return [
    {
      id: 'manga',
      icon: icons.manga,
      text: lang.Manga,
      condition: true,
      azione: () => router.navigate(['feature/manga']),
    },
    {
      id: 'canzoni',
      icon: icons.songs,
      text: lang.Canzoni,
      condition: true,
      azione: () => router.navigate(['feature/canzoni']),
    },
    {
      id: 'giochi',
      icon: icons.games,
      text: lang.Giochi,
      condition: true,
      azione: () => router.navigate(['feature/giochi']),
    },
    {
      id: 'post',
      icon: icons.posts,
      text: lang.Post,
      condition: true,
      azione: () => router.navigate(['feature/post']),
    },
    {
      id: 'classifica',
      icon: icons.ranking,
      text: lang.Classifica,
      condition: true,
      azione: () => router.navigate(['feature/classifica']),
    },
  ];
}
