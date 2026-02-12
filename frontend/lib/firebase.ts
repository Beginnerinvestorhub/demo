// Firebase library removed - demo mode only
// This file is kept for compatibility but no longer contains Firebase functionality

export const ensureFirebaseInitialized = async (): Promise<void> => {
  // Demo mode - no Firebase initialization needed
  console.log('Firebase initialization skipped in DEMO mode.');
};

export const getFirebaseAuth = (): never => {
  throw new Error(
    'Firebase Auth is not available in DEMO mode. Use mock auth from useAuth hook.'
  );
};

export const isFirebaseInitialized = (): boolean => {
  return false; // Firebase is not initialized in demo mode
};
