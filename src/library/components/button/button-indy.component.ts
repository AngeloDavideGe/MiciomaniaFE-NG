import { Component, input, output } from '@angular/core';
import { NAVIGATION_ICONS } from '../../icons/navigation-icons.constant';
import { getIconSafe } from '../../functions/icons.function';

@Component({
  selector: 'app-button-indy',
  standalone: true,
  imports: [],
  templateUrl: './button-indy.component.html',
  styleUrl: './button-indy.component.scss',
})
export class ButtonIndyComponent {
  public text = input.required<string>();
  public disabled = input<boolean>(false);
  public backgroundColor = input<string>('var(--primary)');
  public clickButton = output<void>();

  public readonly chevronRight = getIconSafe(NAVIGATION_ICONS.chevronRight);
}
