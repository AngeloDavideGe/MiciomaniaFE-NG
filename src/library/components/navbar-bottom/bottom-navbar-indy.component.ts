import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { PulsanteNavbar } from '../../interfaces/navbar.interface';

@Component({
  selector: 'app-bottom-navbar-indy',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bottom-navbar-indy.component.html',
  styleUrl: './bottom-navbar-indy.component.scss',
})
export class BottomNavbarComponent {
  public selectPulsante = model<string>('');
  public pulsanti = input<PulsanteNavbar[]>([]);
  public altezzaNavbar = input<string>('3.5rem');

  public clickPulsante(pulsante: PulsanteNavbar): void {
    this.selectPulsante.update((x: string) =>
      pulsante.id === x ? '' : pulsante.id,
    );
    pulsante.azione();
  }
}
