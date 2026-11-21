import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { capitalizeFirstLetter } from '../../../../../library/pipes/capitalize.pipe';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { TabellaIndyComponent } from '../../../../../library/components/table/table-indy.component';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { NavbarMicioComponent } from '../../../../shared/components/navbar-micio/navbar-micio.component';
import { Ruolo } from '../../../../shared/enums/users.enum';
import { loadAllUsers } from '../../../../shared/functions/users.handler';
import { UserParams } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import {
  getBadgeRuoli,
  getRuoliColum,
  getRuoliTabs,
  getUsersByRole,
} from './functions/ruoli.function';
import { TabsRuoli } from './models/ruoli.model';

@Component({
  selector: 'app-ruoli',
  standalone: true,
  imports: [
    NavbarMicioComponent,
    ContaierMicioComponent,
    TabellaIndyComponent,
    TabsIndyComponent,
  ],
  templateUrl: './ruoli.component.html',
  styleUrl: './ruoli.component.scss',
})
export class RuoliComponent implements OnInit {
  private readonly appConfig = inject(AppConfigService);
  private readonly authService = inject(AuthService);

  public readonly enumTabs = TabsRuoli;
  public readonly lang = this.appConfig.lang.Ruoli;
  public readonly roles = Object.values(Ruolo);
  public readonly tabs = getRuoliTabs(this.lang.Tabs);
  public readonly badgeRuoli = getBadgeRuoli(this.roles);
  public readonly columns = getRuoliColum(this.lang);
  public readonly columnsAll = {
    ...this.columns,
    ruolo: {
      titolo: this.lang.Colonne.Ruolo,
      sortCol: true,
      formatCell: (value: Ruolo) => capitalizeFirstLetter(value),
    },
  };

  public currentTab = signal<string>(TabsRuoli.perRuolo);
  public allUsers = computed<UserParams[]>(() => this.authService.users());
  public usersByRole = computed<Record<Ruolo, UserParams[]>>(() =>
    getUsersByRole(this.roles, this.authService.users()),
  );

  ngOnInit(): void {
    loadAllUsers(this.authService, true);
  }
}
