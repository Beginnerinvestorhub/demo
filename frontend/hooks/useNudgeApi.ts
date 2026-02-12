import { useState, useCallback } from 'react';

// Geolocation API types
interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

interface NudgeResponse {
  nudge: string;
  confidence?: number;
  suggestedActions?: Array<{
    text: string;
    type: 'link' | 'button' | 'suggestion';
    url?: string;
  }>;
}

interface UseNudgeApiReturn {
  loading: boolean;
  error: string | null;
  sendNudge: (
    message: string,
    context?: Record<string, string | number | boolean | object>
  ) => Promise<NudgeResponse>;
}

import { apiClient } from '@/services/apiClient';

// ... imports

export function useNudgeApi(): UseNudgeApiReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendNudge = useCallback(
    async (
      message: string,
      context: Record<string, string | number | boolean | object> = {}
    ): Promise<NudgeResponse> => {
      // apiClient handles auth token injection via interceptor if user is logged in via Firebase
      // However, this hook uses useSession (NextAuth).
      // If we are migrating to Firebase Auth fully, we should use useAuth hook here instead.
      // Assuming we are sticking to the plan of using apiClient which uses Firebase Auth.

      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.post('/nudges', {
          message,
          context: {
            ...context,
            deviceInfo: getDeviceInfo(),
            location: await getLocationInfo(),
            // userId will be extracted from token in backend
          },
        });

        return response.data;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        if (err && typeof err === 'object' && 'response' in err) {
          const axiosError = err as {
            response?: { data?: { error?: string } };
          };
          setError(axiosError.response?.data?.error || errorMessage);
        } else {
          setError(errorMessage);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [] // Removed session dependency as apiClient handles auth
  );

  return { loading, error, sendNudge };
}

// Helper functions
function getDeviceInfo() {
  if (typeof window === 'undefined') return {};

  const userAgent = navigator.userAgent;
  return {
    type: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent)
      ? 'mobile'
      : 'desktop',
    os: getOS(),
    browser: getBrowser(),
  };
}

function getOS() {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = navigator.userAgent;
  if (/Windows/.test(userAgent)) return 'Windows';
  if (/Mac OS X/.test(userAgent)) return 'macOS';
  if (/Linux/.test(userAgent)) return 'Linux';
  if (/Android/.test(userAgent)) return 'Android';
  if (/iOS|iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
  return 'unknown';
}

function getBrowser() {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
  if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1)
    return 'Safari';
  if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
  if (userAgent.indexOf('Edge') > -1) return 'Edge';
  if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1)
    return 'Internet Explorer';
  return 'unknown';
}

// Local cache for geolocation to avoid repeated browser prompts
let cachedLocation: any = null;

async function getLocationInfo() {
  if (cachedLocation) return cachedLocation;

  try {
    // Using the browser's built-in geolocation API
    if (typeof window !== 'undefined' && navigator.geolocation) {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 600000, // Cache for 10 minutes at browser level
          });
        }
      );

      cachedLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };

      return cachedLocation;
    }
  } catch (error) {
    console.warn('Could not get geolocation:', error);
  }

  // Fallback to timezone detection
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    cachedLocation = { timezone };
    return cachedLocation;
  } catch (error) {
    console.warn('Could not detect timezone:', error);
    return {};
  }
}
