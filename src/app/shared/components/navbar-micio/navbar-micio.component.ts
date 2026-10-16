import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavbarIndyComponent } from '../../../../library/components/navbar/navbar-indy.component';
import { PaginazioneIndyComponent } from '../../../../library/components/pagination/pagination-indy.component';
import { ToggleIndyComponent } from '../../../../library/components/toggle/toggle-indy.component';
import {
  debounceTimeoutCustom,
  effectTimeoutCustom,
} from '../../../../library/functions/debounce.function';
import { GetFiltriCustom } from '../../../../library/functions/pagination.function';
import { PulsanteNavbar } from '../../../../library/interfaces/navbar.interface';
import { AppConfigService } from '../../../core/api/appConfig.service';
import { ILang } from '../../../core/interfaces/lang.interface';
import { UserParams } from '../../interfaces/users.interface';
import { AuthService } from '../../services/auth.service';
import { ToggleStyles } from '../../../../library/interfaces/toggle.interface';

@Component({
  selector: 'app-navbar-micio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarIndyComponent, ToggleIndyComponent, PaginazioneIndyComponent],
  templateUrl: './navbar-micio.component.html',
  styleUrl: './navbar-micio.component.scss',
})
export class NavbarMicioComponent {
  private appConfig = inject(AppConfigService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public readonly lang = this.appConfig.lang.Feature.Navbar;
  public readonly defaultPic = this.appConfig.config.defaultPicsUrl.user;
  public readonly pulsantiNavbar = getMicioNavbar(this.router, this.lang);

  public menuOpen = signal<string>('');
  public searchQuery = signal<string>('');
  public debounceQuery = signal<string>('');
  public isMobile = signal<boolean>(window.innerWidth < 768);

  public caricamento = computed<boolean>(
    () => this.authService.users().length == 0,
  );

  public filtri = GetFiltriCustom<UserParams>({
    elemTable: this.authService.users,
    tipoSelect: 'some',
    select: [
      {
        key: 'nome',
        query: this.debounceQuery,
      },
      {
        key: 'id',
        query: this.debounceQuery,
      },
    ],
  });

  public toggleStyles = computed<ToggleStyles>(() =>
    this.isMobile()
      ? { width: '100%', height: '100vh' }
      : {
          width: 'min(22rem, calc(100vw - 2rem))',
          height: 'min(32rem, calc(100vh - 5rem))',
        },
  );

  constructor() {
    effectTimeoutCustom(this.searchQuery, (value: string) => {
      this.debounceQuery.set(value);
      this.filtri.currentPage.set(1);
    });
  }

  @HostListener('window:resize')
  onResize = debounceTimeoutCustom(() => {
    this.isMobile.set(window.innerWidth < 768);
  });

  public aggiornaRicerca(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value.trim());
  }

  public apriProfilo(idUtente: string): void {
    this.menuOpen.set('');
    this.router.navigate(['auth/user', idUtente]);
  }
}

function getMicioNavbar(
  router: Router,
  lang: ILang['Feature']['Navbar'],
): PulsanteNavbar[] {
  return [
    {
      id: 'home',
      icon: 'bi-house',
      text: lang.Home,
      condition: true,
      azione: () => router.navigate(['home']),
    },
  ];
}
