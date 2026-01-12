// src/store/types.ts
export interface NotificationAction {
  label: string;
  action: () => void;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
}

export interface Modal {
  id: string;
  component: string;
  props: Record<string, unknown>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
}
