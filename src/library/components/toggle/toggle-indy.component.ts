import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ToggleProps, ToggleStyles } from '../../interfaces/toggle.interface';
import { SpinnerIndyComponent } from '../spinner/spinner-indy.component';

@Component({
  selector: 'app-toggle-indy',
  standalone: true,
  imports: [SpinnerIndyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toggle-indy.component.html',
  styleUrl: './toggle-indy.component.scss',
})
export class ToggleIndyComponent {
  public currentButton = signal<string>('');

  public titolo = input<string>('');
  public titoloVisible = input<boolean>(false);
  public imgIcona = input<string>('');
  public dimToggleIcona = input<string>('2.5rem');
  public icona = input<string>('bi bi-list');
  public toggleMenus = input<ToggleProps[]>([]);
  public toggleStyles = input<ToggleStyles>({});
  public tipo = input<'single' | 'multiple' | 'content'>('multiple');
  public caricamento = input<boolean>(false);

  public menuOpen = model<string>('');
  public aperturaMenu = output<boolean>();

  public styles = computed<ToggleStyles>(() => ({
    top: '3.5rem',
    width: '15rem',
    position: 'fixed',
    right: 0,
    ...this.toggleStyles(),
  }));

  public toggleMenu(): void {
    this.menuOpen.update((x: string) =>
      x == this.titolo() ? '' : this.titolo(),
    );
    this.aperturaMenu.emit(this.menuOpen() == this.titolo());
  }

  public cambiaDropdown(drop: string): void {
    this.currentButton.update((x: string) => (x === drop ? '' : drop));
  }
}
