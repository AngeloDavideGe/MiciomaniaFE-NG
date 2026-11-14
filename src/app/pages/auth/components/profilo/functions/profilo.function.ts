import { getIconSafe } from '../../../../../../library/functions/icons.function';
import { FILE_ICONS } from '../../../../../../library/icons/files-icons.constant';
import { iTab } from '../../../../../../library/interfaces/navbar.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import { TabsProfilo } from '../models/profilo.model';

export function getProfiloTabs(lang: ILang['Profilo']['Tabs']): iTab[] {
  const icons = {
    testo: getIconSafe(FILE_ICONS.fileText),
    photo: getIconSafe(FILE_ICONS.image),
  };

  return [
    {
      id: TabsProfilo.text,
      label: lang.PostTesto,
      color: 'var(--primary-light)',
      icona: icons.testo,
    },
    {
      id: TabsProfilo.photo,
      label: lang.PostFoto,
      color: 'var(--primary-light)',
      icona: icons.photo,
    },
  ];
}
