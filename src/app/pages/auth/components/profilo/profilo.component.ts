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
import { ModalIndyComponent } from '../../../../../library/components/modal/modal-indy.component';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { handlerFunc } from '../../../../../library/functions/handler.function';
import { paraMapCustom } from '../../../../../library/functions/router.function';
import { iTab } from '../../../../../library/interfaces/navbar.interface';
import { DateFormatPipe } from '../../../../../library/pipes/date-format.pipe';
import { AppConfigService } from '../../../../core/api/appConfig.service';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { NavbarMicioComponent } from '../../../../shared/components/navbar-micio/navbar-micio.component';
import { loadAllUsers } from '../../../../shared/functions/users.handler';
import { User } from '../../../../shared/interfaces/users.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { EditUserComponent } from './components/edit-user.component';
import { PostsUserComponent } from './components/posts-user/posts-user.component';
import { getProfiloTabs } from './functions/profilo.function';
import { iProfilo, ProfilePost, TabsProfilo } from './models/profilo.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ContaierMicioComponent,
    TabsIndyComponent,
    ModalIndyComponent,
    EditUserComponent,
    DateFormatPipe,
    NavbarMicioComponent,
    PostsUserComponent,
  ],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly appConfig = inject(AppConfigService);

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

    loadAllUsers(this.authService);
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
}
