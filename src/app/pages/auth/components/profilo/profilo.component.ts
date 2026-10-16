import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { paraMapCustom } from '../../../../../library/functions/router.function';
import { iTab } from '../../../../../library/interfaces/navbar.interface';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import {
  User,
  UserParams,
} from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { getProfiloTabs } from './functions/profilo.function';
import { iProfilo, ProfilePost, TabsProfilo } from './models/profilo.model';
import { profilo_imports } from './profilo.imports';

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

    this.loadAllUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  public openEditProfile(): void {
    if (this.isPersonalProfile()) {
      this.editProfiloOpen.set(true);
    }
  }

  private loadAllUsers(): void {
    handlerFunc<UserParams[]>({
      skipCall: this.authService.usersCaricati,
      callHttp: () => this.authService.getAllUsersHttp(),
      nextCall: (data: UserParams[]) => this.authService.users.set(data),
      errorCall: () => (this.authService.usersCaricati = false),
    });

    this.authService.usersCaricati = true;
  }
}
