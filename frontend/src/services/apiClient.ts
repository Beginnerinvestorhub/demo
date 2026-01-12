import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getFirebaseAuth, isFirebaseInitialized } from '@/lib/firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401s
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login or refresh token if handled by SDK)
      console.warn('Unauthorized access - user might need to login again');
    }
    return Promise.reject(error);
  }
);
