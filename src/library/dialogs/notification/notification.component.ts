import { Component, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  template: `
    <section class="notifications" aria-label="Notifiche">
      @for (notification of notificationService.notifications(); track notification.id) {
        <article
          class="notification"
          [class.notification--success]="notification.type === 'success'"
          [class.notification--error]="notification.type === 'error'"
          [class.notification--warning]="notification.type === 'warning'"
          [class.notification--info]="notification.type === 'info'"
          [attr.role]="notification.type === 'error' ? 'alert' : 'status'"
        >
          <div class="notification__content">
            <strong class="notification__title">{{ notification.title }}</strong>
            <p class="notification__message">{{ notification.message }}</p>
          </div>
          <button
            class="notification__close"
            type="button"
            aria-label="Chiudi notifica"
            (click)="notificationService.dismiss(notification.id)"
          >
            &times;
          </button>
        </article>
      }
    </section>
  `,
  styles: `
    :host {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 2000;
      width: min(24rem, calc(100vw - 2rem));
      pointer-events: none;
    }

    .notifications {
      display: grid;
      gap: 0.75rem;
    }

    .notification {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid transparent;
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1.25rem rgb(0 0 0 / 15%);
      pointer-events: auto;
      animation: notification-in 160ms ease-out;
    }

    .notification--success {
      color: #0f5132;
      background: #d1e7dd;
      border-color: #a3cfbb;
    }

    .notification--error {
      color: #842029;
      background: #f8d7da;
      border-color: #f1aeb5;
    }

    .notification--warning {
      color: #664d03;
      background: #fff3cd;
      border-color: #ffecb5;
    }

    .notification--info {
      color: #055160;
      background: #cff4fc;
      border-color: #9eeaf9;
    }

    .notification__content {
      min-width: 0;
    }

    .notification__title {
      display: block;
      margin-bottom: 0.25rem;
      font-weight: 600;
    }

    .notification__message {
      margin: 0;
      overflow-wrap: anywhere;
    }

    .notification__close {
      padding: 0;
      border: 0;
      background: transparent;
      color: currentColor;
      font-size: 1.4rem;
      line-height: 1;
      cursor: pointer;
      opacity: 0.65;
    }

    .notification__close:hover {
      opacity: 1;
    }

    @keyframes notification-in {
      from {
        opacity: 0;
        transform: translateY(-0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .notification {
        animation: none;
      }
    }
  `,
})
export class NotificationComponent {
  protected readonly notificationService = inject(NotificationService);
}
