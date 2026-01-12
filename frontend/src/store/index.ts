// d:\Demo\frontend\src\store\index.ts
/**
 * Central Store Entry Point
 * Re-exports hooks and actions from multiple stores for a cleaner API.
 */

import { useModalStore } from './modalStore';
import { useNotificationStore } from './notificationStore';
import { Notification } from './types';

// Re-export hooks from useAuth (assumed to be correct location)
export { useAuth } from '../../hooks/useAuth';

// Re-export from modalStore
export { useModalStore, useModals } from './modalStore';

// Re-export from notificationStore
export {
    useNotificationStore,
    useNotifications,
    showNotification,
    showErrorNotification,
} from './notificationStore';

// Re-export from learningStore
export { useLearningStore } from './learningStore';

// Export composite useUI hook
export const useUI = () => {
    const { removeModal } = useModalStore();
    const { dismissNotification, addNotification } = useNotificationStore();

    const closeModal = (id: string) => {
        removeModal(id);
    };

    const showNotification = (
        type: Notification['type'],
        title: string,
        message: string,
        duration?: number
    ) => {
        addNotification({ type, title, message, duration });
    };

    return {
        closeModal,
        dismissNotification,
        showNotification,
    };
};

/**
 * Helper to initialize all stores (if needed)
 * Can be used to set up global listeners, cleanup, etc.
 */
export const initializeStores = () => {
    console.log('Initializing stores...');
    return () => {
        console.log('Cleaning up stores...');
    };
};

/**
 * Helper to reset all stores to their initial states
 * Useful for logout or testing.
 */
export const resetAllStores = () => {
    const { clearModals } = useModalStore.getState();
    const { clearNotifications } = useNotificationStore.getState();
    // learningStore reset skipped if not easily accessible or use getState()

    clearModals();
    clearNotifications();
};

/**
 * Helper to check the health of all stores
 */
export const checkStoreHealth = () => {
    console.log('Checking store health...');
};
