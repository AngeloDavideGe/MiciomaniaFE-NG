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
import { iProfilo, ProfilePost } from './interfaces/profilo.interface';

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

  public currentTab = signal<string>('text');
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
    this.profilo.set(null);
    this.editProfiloOpen.set(false);
    handlerFunc<iProfilo>({
      destroy$: this.destroy$,
      callHttp: () => this.authService.getProfiloById(idUser),
      nextCall: (data: iProfilo | null) => {
        if (!data) {
          this.router.navigate(['home']);
          return;
        }

        this.updateLoadedUser(data.user);
        this.profilo.set(data);
      },
      errorCall: () => (this.authService.currentUsersCaricati[idUser] = false),
    });

    if (this.authService.accountsUser().some((user) => user.id === idUser)) {
      this.authService.currentUsersCaricati[idUser] = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateLoadedUser(user: User): void {
    if (user.id === this.authService.currentUser()?.id) {
      this.authService.currentUser.set(user);
    }

    const accountExists = this.authService
      .accountsUser()
      .some((account) => account.id === user.id);

    if (accountExists) {
      this.authService.accountsUser.update((accounts) =>
        accounts.map((account) => (account.id === user.id ? user : account)),
      );
      this.authService.currentUsersCaricati[user.id] = true;
    }
  }

  public openEditProfile(): void {
    if (this.isPersonalProfile()) {
      this.editProfiloOpen.set(true);
    }
  }
}
