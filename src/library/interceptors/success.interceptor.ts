import {
  HttpContextToken,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { NotificationService } from '../dialogs/notification/notification.service';

export const SUCCESS_CONTEXT = new HttpContextToken<boolean>(() => false);

export const successInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  handlerFn: HttpHandlerFn,
) => {
  if (!req.context.get(SUCCESS_CONTEXT)) {
    return handlerFn(req);
  }

  const notificationService = inject(NotificationService);

  return handlerFn(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        notificationService.showSuccess('Operazione completata con successo.');
      }
    }),
  );
};
