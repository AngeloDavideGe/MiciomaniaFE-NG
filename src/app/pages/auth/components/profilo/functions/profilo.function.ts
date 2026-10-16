import { iTab } from '../../../../../../library/interfaces/navbar.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import { TabsProfilo } from '../models/profilo.model';

export function getProfiloTabs(lang: ILang['Profilo']['Tabs']): iTab[] {
  return [
    {
      id: TabsProfilo.text,
      label: lang.PostTesto,
      color: 'var(--primary-light)',
      icona: 'bi bi-chat-left-text',
    },
    {
      id: TabsProfilo.photo,
      label: lang.PostFoto,
      color: 'var(--primary-light)',
      icona: 'bi bi-images',
    },
  ];
}
