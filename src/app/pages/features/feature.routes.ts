import { Routes } from '@angular/router';
import {
  canzoniPermissionGuard,
  classificaPermissionGuard,
  giochiPermissionGuard,
  mangaPermissionGuard,
} from '../../core/guards/permission.guard';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manga',
        loadComponent: () =>
          import('./components/manga/manga.component').then(
            (m) => m.MangaComponent,
          ),
        canActivate: [mangaPermissionGuard],
      },
      {
        path: 'canzoni',
        loadComponent: () =>
          import('./components/canzoni/canzoni.component').then(
            (m) => m.CanzoniComponent,
          ),
        canActivate: [canzoniPermissionGuard],
      },
      {
        path: 'classifica',
        loadComponent: () =>
          import('./components/classifica/classifica.component').then(
            (m) => m.ClassificaComponent,
          ),
        canActivate: [classificaPermissionGuard],
      },
      {
        path: 'giochi',
        loadComponent: () =>
          import('./components/giochi/giochi.component').then(
            (m) => m.GiochiComponent,
          ),
        loadChildren: () =>
          import('./components/giochi/giochi.routes').then(
            (m) => m.GIOCHI_ROUTES,
          ),
        canActivate: [giochiPermissionGuard],
      },
      // {
      //   path: 'post',
      //   loadComponent: () =>
      //     import('./components/manga/manga.component').then(
      //       (m) => m.MangaComponent,
      //     ),
      // },
      {
        path: 'no-permission',
        loadComponent: () =>
          import('./components/permission-no/feature-permission.component').then(
            (m) => m.FeaturePermissionComponent,
          ),
      },
    ],
  },
];
