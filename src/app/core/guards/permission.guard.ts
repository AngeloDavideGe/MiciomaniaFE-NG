import { CanActivateFn, Router } from '@angular/router';
import { Permessi } from '../../shared/enums/users.enum';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/users.interface';

export const mangaPermissionGuard: CanActivateFn = () =>
  permissionGuard(Permessi.leggereManga);
export const canzoniPermissionGuard: CanActivateFn = () =>
  permissionGuard(Permessi.ascoltareCanzoni);
export const giochiPermissionGuard: CanActivateFn = () =>
  permissionGuard(Permessi.accessoGiochiMiciomani);
export const classificaPermissionGuard: CanActivateFn = () =>
  permissionGuard(Permessi.visualizzaClassifica);
export const ruoliUtentePermissionGuard: CanActivateFn = () =>
  permissionGuard(Permessi.visualizzaRuoliUtente);

function permissionGuard(permesso: Permessi): boolean {
  const router = inject(Router);
  const authService = inject(AuthService);

  const user: User | null = authService.currentUser();

  if (user && user.admin.permessi[permesso]) {
    return true;
  } else {
    router.navigate(['/feature/no-permission']);
    return false;
  }
}
