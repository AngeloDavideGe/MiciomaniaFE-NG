import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { isCurrentRoute } from '../../../library/functions/router.function';
import { AppConfigService } from '../../core/api/appConfig.service';
import { loadAllUsers } from '../../shared/functions/users.handler';
import { AuthService } from '../../shared/services/auth.service';
import { getBottomNavItems } from './functions/feature.function';
import { AsyncPipe } from '@angular/common';
import { BottomNavbarComponent } from '../../../library/components/navbar-bottom/bottom-navbar-indy.component';
import { NavbarMicioComponent } from '../../shared/components/navbar-micio/navbar-micio.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NavbarMicioComponent,
    BottomNavbarComponent,
    RouterOutlet,
    AsyncPipe,
  ],
  template: `
    @if (!(isFeature$ | async)) {
      <app-navbar-micio />

      <section class="router-section">
        <router-outlet />
      </section>

      <app-bottom-navbar-indy
        [pulsanti]="pulsantiBottombar"
        [selectPulsante]="initialPulsante()"
      />
    }
  `,
  styles: `
    .router-section {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  `,
})
export class FeatureComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Feature;
  public readonly pulsantiBottombar = getBottomNavItems(
    this.router,
    this.lang.Navbar,
  );

  public initialPulsante = signal<string>('manga');

  public isFeature$: Observable<boolean> = isCurrentRoute({
    router: this.router,
    eventName: '/feature',
    mapFunc: (event: { url: string }) => {
      const cond: boolean = event.url == '/feature';

      if (cond) {
        this.router.navigate(['feature/manga']);
        this.initialPulsante.set('manga');
      } else {
        this.initialPulsante.set(event.url.split('/')[2]);
      }

      return cond;
    },
  });

  ngOnInit(): void {
    loadAllUsers(this.authService);
  }
}
