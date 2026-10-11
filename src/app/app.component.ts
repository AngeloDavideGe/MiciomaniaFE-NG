import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { gestisciCursore } from '../library/functions/cursor.functions';
import { setLocalStorage } from '../library/functions/storage.function';
import { AppConfigService, LangEnum } from './core/api/appConfig.service';
import { User } from './shared/interfaces/users.interface';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main id="main">
      <router-outlet />
    </main>
  `,
  styles: `
    #main {
      background-color: var(--background);
    }
  `,
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private appConfig = inject(AppConfigService);
  private readonly keys = environment.LocalStorageKeys;

  ngOnInit(): void {
    gestisciCursore(this.appConfig.currentCursor());
  }

  @HostListener('window:beforeunload')
  setLocalStorageFunc(): void {
    setLocalStorage<User | null>(
      this.keys.ACCOUNTS_USER,
      this.authService.currentUser(),
    );
    setLocalStorage<User[]>(
      this.keys.ACCOUNTS_USER,
      this.authService.accountsUser(),
    );
    setLocalStorage<LangEnum>(
      this.keys.CURRENT_LANG,
      this.appConfig.currentLang(),
    );
    setLocalStorage<string>(
      this.keys.CURRENT_CURSOR,
      this.appConfig.currentCursor(),
    );
  }
}
