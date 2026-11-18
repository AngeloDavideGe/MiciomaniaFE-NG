export interface ErrorParams {
  title: string;
  message: string;
  status?: number;
  debugMessage?: string;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  extensions?: Record<string, any>;
}

export type INotificationType = 'success' | 'error' | 'warning' | 'info';

export interface INotificationItem {
  id: number;
  type: INotificationType;
  title: string;
  message: string;
}

export interface INotificationOptions {
  message: string;
  type?: INotificationType;
  title?: string;
  duration?: number;
}
