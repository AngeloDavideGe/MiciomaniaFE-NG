import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { User } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { getProfileNavbar, getProfiloTabs } from './functions/profilo.function';
import { profilo_imports } from './profilo.imports';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { paraMapCustom } from '../../../../../library/functions/router.function';
import { Subject } from 'rxjs';
import { iTab } from '../../../../../library/interfaces/navbar.interface';
import { iProfilo, ProfilePost, TabsProfilo } from './models/profilo.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: profilo_imports,
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Profilo;
  public readonly tabs: iTab[] = getProfiloTabs(this.lang.Tabs);
  public readonly defaultPic = this.appConfig.config.defaultPicsUrl.user;
  public readonly pulsantiNavbar = getProfileNavbar(
    this.router,
    this.appConfig.lang.Feature.Navbar,
  );

  public currentTab = signal<string>(TabsProfilo.text);
  public editProfiloOpen = signal<boolean>(false);
  public profilo = signal<iProfilo | null>(null);
  private destroy$ = new Subject<void>();

  public user = computed<User>(() => this.profilo()?.user || ({} as User));
  public posts = computed<ProfilePost[]>(() => this.profilo()?.tweets || []);
  public currentUser = computed<User | null>(() =>
    this.authService.currentUser(),
  );
  public isPersonalProfile = computed<boolean>(
    () => !!this.user() && this.user()?.id === this.currentUser()?.id,
  );

  ngOnInit(): void {
    paraMapCustom({
      route: this.route,
      nameParam: 'id',
      destroy: this.destroy$,
      func: (id: string) => this.loadProfile(id),
    });
  }

  private loadProfile(idUser: string): void {
    handlerFunc<iProfilo | null>({
      skipCall: !!this.authService.profiliCaricati[idUser],
      destroy$: this.destroy$,
      callHttp: () => this.authService.getProfiloById(idUser),
      elseCall: () =>
        this.profilo.set(this.authService.profiliCaricati[idUser]),
      nextCall: (data: iProfilo | null) => {
        if (!data) {
          this.router.navigate(['home']);
          return;
        }

        this.profilo.set(data);
        this.authService.profiliCaricati[idUser] = data;

        const accountPersonale: User | undefined = this.authService
          .accountsUser()
          .find((x: User) => x.id == idUser);

        if (accountPersonale) {
          this.authService.accountsUser.update((users: User[]) =>
            users.map((user: User) => (user.id == idUser ? data.user : user)),
          );
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openEditProfile(): void {
    if (this.isPersonalProfile()) {
      this.editProfiloOpen.set(true);
    }
  }
}
