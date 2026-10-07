import {
  Component,
  input,
  OnInit,
  output,
  model,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChangeCheckEvent, ICheckBox } from '../../interfaces/form.interface';

@Component({
  selector: 'app-checkbox-indy',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox-indy.component.html',
  styleUrl: './checkbox-indy.component.scss',
})
export class CheckBoxIndyComponent implements OnInit {
  public checks = input.required<ICheckBox[]>();
  public initialChecked = input<string | undefined>(undefined);
  public tipo = input<'single' | 'multiple'>('single');

  public selectedItems = model<ICheckBox[]>([]);

  public changeCheck = output<ChangeCheckEvent>();
  public checkChangeString = output<string>();
  public allChecked = output<boolean>();

  ngOnInit(): void {
    if (this.selectedItems().length === 0 && this.initialChecked()) {
      const initialItem = this.checks().find(
        (check) => check.id === this.initialChecked(),
      );
      if (initialItem) this.selectedItems.set([initialItem]);
    }
  }

  public onCheckChange(event: Event, check: ICheckBox): void {
    const checkbox = event.target as HTMLInputElement;
    const selectedItems = this.selectedItems();
    const remainingItems = selectedItems.filter((item) => item.id !== check.id);

    switch (this.tipo()) {
      case 'single': {
        if (checkbox.checked) {
          this.selectedItems.set([check]);
        } else {
          this.selectedItems.set([]);
        }
        break;
      }
      case 'multiple': {
        this.selectedItems.set(
          checkbox.checked ? [...remainingItems, check] : remainingItems,
        );
        break;
      }
    }

    const selectedIds = this.selectedItems().map((item) => item.id);
    this.checkChangeString.emit(selectedIds.join(', '));
    this.changeCheck.emit({ checked: checkbox.checked, item: check });
    this.allChecked.emit(selectedIds.length === this.checks().length);
  }
}
