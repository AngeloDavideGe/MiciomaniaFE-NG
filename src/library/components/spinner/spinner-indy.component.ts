import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner-indy',
  standalone: true,
  imports: [],
  template: `
    <div class="spinner-template-stile" [style.padding-top]="mt()">
      <div class="spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [
    `
      .spinner-template-stile {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .spinner {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 4px solid var(--border);
        border-top-color: var(--primary);
        border-right-color: var(--primary-light);
        animation: spin 0.9s linear infinite;
        box-shadow: var(--primary-shadow);
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class SpinnerIndyComponent {
  public mt = input<string>('0');
}
