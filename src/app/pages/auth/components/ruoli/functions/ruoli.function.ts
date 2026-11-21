import { CHART_COLORS } from '../../../../../../library/constants/utility.constant';
import { iTab } from '../../../../../../library/interfaces/navbar.interface';
import { RecordColonne } from '../../../../../../library/interfaces/table.interface';
import { ILang } from '../../../../../core/interfaces/lang.interface';
import { Ruolo } from '../../../../../shared/enums/users.enum';
import { UserParams } from '../../../../../shared/interfaces/users.interface';
import { TabsRuoli } from '../models/ruoli.model';

export function getRuoliTabs(lang: ILang['Ruoli']['Tabs']): iTab[] {
  return [
    {
      id: TabsRuoli.perRuolo,
      label: lang.PerRuolo,
      color: 'var(--primary-light)',
    },
    {
      id: TabsRuoli.tutti,
      label: lang.TuttiGliUtenti,
      color: 'var(--primary-light)',
    },
  ];
}

export function getRuoliColum(
  lang: ILang['Ruoli'],
): Partial<RecordColonne<UserParams>> {
  return {
    id: {
      titolo: lang.Colonne.Id,
      sortCol: true,
    },
    nome: {
      titolo: lang.Colonne.Nome,
      sortCol: true,
    },
  };
}

export function getUsersByRole(
  roles: Ruolo[],
  users: UserParams[],
): Record<Ruolo, UserParams[]> {
  const grouped = {} as Record<Ruolo, UserParams[]>;

  for (const role of roles) {
    grouped[role] = [];
  }

  for (const user of users) {
    grouped[user.ruolo]?.push(user);
  }

  return grouped;
}

export function getBadgeRuoli(roles: Ruolo[]): Record<string, string> {
  const badge = {} as Record<string, string>;

  roles.forEach((role: Ruolo, index: number) => {
    const colore: string = CHART_COLORS[index];
    badge[role] = `badge-chart-color-${colore.slice(1).toLowerCase()}`;
  });

  return badge;
}
