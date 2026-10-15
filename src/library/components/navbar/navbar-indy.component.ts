import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { PulsanteNavbar } from '../../interfaces/navbar.interface';

@Component({
  selector: 'app-navbar-indy',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar-indy.component.html',
  styleUrl: './navbar-indy.component.scss',
})
export class NavbarIndyComponent {
  public selectPulsante = model<string>('');
  public pulsantiInizio = input<PulsanteNavbar[]>([]);
  public pulsantiCentro = input<PulsanteNavbar[]>([]);
  public pulsantiFine = input<PulsanteNavbar[]>([]);
  public altezzaNavbar = input<string>('3.5rem');

  public clickPulsante(pulsante: PulsanteNavbar): void {
    this.selectPulsante.update((x: string) =>
      pulsante.id === x ? '' : pulsante.id,
    );
    pulsante.azione();
  }
}
