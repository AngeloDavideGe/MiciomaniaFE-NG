import { Type } from '@angular/core';
import { ModalIndyComponent } from '../../../../../library/components/modal/modal-indy.component';
import { TabsIndyComponent } from '../../../../../library/components/tabs/tabs-indy.component';
import { DateFormatPipe } from '../../../../../library/pipes/date-format.pipe';
import { ContaierMicioComponent } from '../../../../shared/components/container-micio.component';
import { NavbarMicioComponent } from '../../../../shared/components/navbar-micio/navbar-micio.component';
import { EditUserComponent } from './components/edit-user.component';
import { PostsUserComponent } from './components/posts-user/posts-user.component';

export const profilo_imports: Type<any>[] = [
  ContaierMicioComponent,
  TabsIndyComponent,
  ModalIndyComponent,
  EditUserComponent,
  DateFormatPipe,
  NavbarMicioComponent,
  PostsUserComponent,
];
