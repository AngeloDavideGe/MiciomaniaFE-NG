import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardIndyComponent } from '../../../../../library/components/card/card-indy.component';
import { SidebarIndyComponent } from '../../../../../library/components/sidebar/sidebar-indy.component';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { ToolbarMicioComponent } from '../../../../shared/components/toolbar-micio.component';

export const giochi_imports: Type<any>[] = [
  ContaierMicioComponent,
  ToolbarMicioComponent,
  SidebarIndyComponent,
  SpinnerIndyComponent,
  CardIndyComponent,
  RouterOutlet,
  AsyncPipe,
];
