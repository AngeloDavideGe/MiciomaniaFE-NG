import { Type } from '@angular/core';
import { SpinnerIndyComponent } from '../../../../../library/components/spinner/spinner-indy.component';
import { SvgIndyComponent } from '../../../../../library/components/svg/svg-indy.component';
import { TabellaIndyComponent } from '../../../../../library/components/table/table-indy.component';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';

export const classifica_imports: Type<any>[] = [
  ContaierMicioComponent,
  SpinnerIndyComponent,
  TabsIndyComponent,
  TabellaIndyComponent,
  SvgIndyComponent,
];
