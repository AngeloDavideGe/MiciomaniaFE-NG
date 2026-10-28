import { AsyncPipe } from '@angular/common';
import { Type } from '@angular/core';
import { CardIndyComponent } from '../../../library/components/card/card-indy.component';
import { NavbarIndyComponent } from '../../../library/components/navbar/navbar-indy.component';
import { ToggleIndyComponent } from '../../../library/components/toggle/toggle-indy.component';
import { ContaierMicioComponent } from '../../shared/components/container-micio.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { SocialLinkComponent } from './components/ui/social-link/social-link.component';

export const home_imports: Type<any>[] = [
  NavbarIndyComponent,
  ToggleIndyComponent,
  CardIndyComponent,
  ContaierMicioComponent,
  SocialLinkComponent,
  FooterComponent,
  AsyncPipe,
];
