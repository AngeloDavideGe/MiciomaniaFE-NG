import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ChangeCheckEvent, ICheckBox } from '../../interfaces/form.interface';
import { CheckBoxIndyComponent } from '../checkbox/checkbox-indy.component';

@Component({
  selector: 'app-multi-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckBoxIndyComponent],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent {
  public items = input.required<ICheckBox[]>();
  public initialChecked = input<string | undefined>(undefined);
  public tipo = input<'single' | 'multiple'>('multiple');
  public selectedItems = model<ICheckBox[]>([]);

  public checkChangeString = output<string>();
  public changeCheck = output<ChangeCheckEvent>();
  public allChecked = output<boolean>();

  public open = signal<boolean>(false);
}
