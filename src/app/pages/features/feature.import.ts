import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from '../../../library/components/navbar-bottom/bottom-navbar-indy.component';
import { NavbarMicioComponent } from '../../shared/components/navbar-micio/navbar-micio.component';

export const feature_imports: Type<any>[] = [
  NavbarMicioComponent,
  BottomNavbarComponent,
  RouterOutlet,
  AsyncPipe,
];
