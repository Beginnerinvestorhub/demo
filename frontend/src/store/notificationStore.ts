// d:\Demo\frontend\src\store\notificationStore.ts
import { create } from 'zustand';
import { Notification } from './types';

interface NotificationState {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: string) => void;
    clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
    notifications: [],

    addNotification: (notification) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            notifications: [...state.notifications, { ...notification, id }],
        }));

        if (notification.duration !== 0) {
            setTimeout(() => {
                set((state) => ({
                    notifications: state.notifications.filter((n) => n.id !== id),
                }));
            }, notification.duration || 5000);
        }
    },

    dismissNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),

    clearNotifications: () => set({ notifications: [] }),
}));

// Export hooks and helper functions
export const useNotifications = () => useNotificationStore((state) => state.notifications);

export const showNotification = (
    type: Notification['type'],
    title: string,
    message: string,
    duration?: number
) => {
    useNotificationStore.getState().addNotification({ type, title, message, duration });
};

export const showErrorNotification = (
    title: string,
    message: string,
    actions?: Notification['actions']
) => {
    useNotificationStore.getState().addNotification({
        type: 'error',
        title,
        message,
        duration: 0, // Errors usually stay until dismissed
        actions,
    });
};
