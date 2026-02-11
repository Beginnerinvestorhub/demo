import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  role: null,
  error: null,
  login: async () => { },
  signup: async () => { },
  logout: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore auth state from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('demo_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setRole(parsed.role);
      }
    } catch {
      // sessionStorage not available or corrupted — ignore
    }
    setLoading(false);
  }, []);

  // Persist auth state to sessionStorage
  const persistAuth = useCallback((userData: User | null, userRole: string | null) => {
    try {
      if (userData) {
        sessionStorage.setItem('demo_auth_user', JSON.stringify({ user: userData, role: userRole }));
      } else {
        sessionStorage.removeItem('demo_auth_user');
      }
    } catch {
      // sessionStorage not available — ignore
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    // Check for Luke's specific credentials
    if (email === 'Luke' && password === 'demo123abc') {
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockUser: User = {
        uid: 'luke-user-123',
        email: email,
        displayName: 'Luke',
      };
      setUser(mockUser);
      setRole('user');
      persistAuth(mockUser, 'user');
      setLoading(false);
      return;
    }

    // Demo mode for other credentials
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      uid: 'demo-user-123',
      email: email,
      displayName: 'Demo User',
    };
    setUser(mockUser);
    setRole('user');
    persistAuth(mockUser, 'user');
    setLoading(false);
  }, [persistAuth]);

  const signup = useCallback(async (email: string, _: string) => {
    setLoading(true);
    setError(null);

    // Demo mode - simulate signup
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      uid: 'demo-user-123',
      email: email,
      displayName: 'Demo User',
    };
    setUser(mockUser);
    setRole('user');
    persistAuth(mockUser, 'user');
    setLoading(false);
  }, [persistAuth]);

  const logout = useCallback(async () => {
    setLoading(true);

    // Demo mode - simulate logout
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setRole(null);
    persistAuth(null, null);
    setLoading(false);
  }, [persistAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, role, error, login, signup, logout }
    }>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
