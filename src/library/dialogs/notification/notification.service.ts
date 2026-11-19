import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  OnDestroy,
  createComponent,
  inject,
  signal,
} from '@angular/core';
import { NotificationComponent } from './notification.component';
import {
  INotificationOptions,
  INotificationItem,
  INotificationType,
} from '../../interfaces/error.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private readonly appRef = inject(ApplicationRef);
  private readonly document = inject(DOCUMENT);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly notificationList = signal<INotificationItem[]>([]);
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();
  private componentRef: ComponentRef<NotificationComponent> | null = null;
  private nextId = 0;

  public readonly notifications = this.notificationList.asReadonly();

  public show(options: INotificationOptions): number {
    const type = options.type ?? 'info';
    const id = ++this.nextId;

    this.notificationList.update((notifications) => [
      ...notifications,
      {
        id,
        type,
        title: options.title ?? DEFAULT_TITLES[type],
        message: options.message,
      },
    ]);

    this.mountComponent();

    const duration = options.duration ?? 5000;
    if (duration > 0) {
      this.timers.set(
        id,
        setTimeout(() => this.dismiss(id), duration),
      );
    }

    return id;
  }

  public clear(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }

    this.timers.clear();
    this.notificationList.set([]);
    this.destroyComponent();
  }

  public ngOnDestroy(): void {
    this.clear();
  }

  private mountComponent(): void {
    if (this.componentRef) {
      return;
    }

    this.componentRef = createComponent(NotificationComponent, {
      environmentInjector: this.environmentInjector,
    });
    this.appRef.attachView(this.componentRef.hostView);
    this.document.body.appendChild(this.componentRef.location.nativeElement);
  }

  public dismiss(id: number): void {
    if (this.timers.has(id)) {
      clearTimeout(this.timers.get(id));
      this.timers.delete(id);
    }

    const remainingNotifications = this.notificationList().filter(
      (notification) => notification.id !== id,
    );
    this.notificationList.set(remainingNotifications);

    if (remainingNotifications.length === 0) {
      this.destroyComponent();
    }
  }

  private destroyComponent(): void {
    if (!this.componentRef) {
      return;
    }

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = null;
  }
}

const DEFAULT_TITLES: Record<INotificationType, string> = {
  success: 'Successo',
  error: 'Errore',
  warning: 'Attenzione',
  info: 'Informazione',
};
