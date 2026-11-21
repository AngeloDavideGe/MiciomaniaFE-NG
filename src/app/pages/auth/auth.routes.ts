import { Routes } from '@angular/router';
import { authGuard, userGuard } from '../../core/guards/auth.guard';
import { ruoliUtentePermissionGuard } from '../../core/guards/permission.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login.component').then((m) => m.LoginComponent),
        canActivate: [authGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register.component').then(
            (m) => m.RegisterComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('./components/profilo/profilo.component').then(
            (m) => m.ProfileComponent,
          ),
      },
      {
        path: 'ruoli',
        loadComponent: () =>
          import('./components/ruoli/ruoli.component').then(
            (m) => m.RuoliComponent,
          ),
        canActivate: [ruoliUtentePermissionGuard],
      },
    ],
  },
];
