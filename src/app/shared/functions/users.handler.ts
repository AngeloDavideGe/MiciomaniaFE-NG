import { handlerFunc } from '../../../library/functions/handler.function';
import { UserParams } from '../interfaces/users.interface';
import { AuthService } from '../services/auth.service';

export function loadAllUsers(authService: AuthService): void {
  handlerFunc<UserParams[]>({
    skipCall: authService.usersCaricati,
    callHttp: () => authService.getAllUsersHttp(),
    nextCall: (data: UserParams[]) => authService.users.set(data),
    errorCall: () => (authService.usersCaricati = false),
  });

  authService.usersCaricati = true;
}
