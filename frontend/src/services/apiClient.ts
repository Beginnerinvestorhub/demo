import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getFirebaseAuth, isFirebaseInitialized } from '@/lib/firebase';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Firebase ID token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Ensure Firebase is initialized
      if (isFirebaseInitialized()) {
        const auth = getFirebaseAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error attaching auth token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    // Extract a user-friendly error message
    let errorMessage = 'An unexpected error occurred';

    if (error.response?.data && typeof error.response.data === 'object') {
      const data = error.response.data as { error?: string; message?: string };
      errorMessage = data.error || data.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Handle specific status codes
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - user might need to login again');
    }

    // Attach the normalized message to the error object for downstream consumption
    (error as any).normalizedMessage = errorMessage;

    return Promise.reject(error);
  }
);
