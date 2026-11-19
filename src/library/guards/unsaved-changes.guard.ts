import { CanDeactivateFn } from '@angular/router';

export interface UnsavedChangesComponent {
  hasUnsavedChanges(): boolean;
}

export function unsavedChangesGuard(
  confirmation: (message: string) => boolean = (message) =>
    typeof window !== 'undefined' ? window.confirm(message) : false,
  message: string = 'Ci sono modifiche non salvate. Vuoi abbandonare la pagina?',
): CanDeactivateFn<UnsavedChangesComponent> {
  return (component) =>
    !component.hasUnsavedChanges() || confirmation(message);
}
