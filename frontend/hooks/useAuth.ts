import { useState, useCallback } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  role: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    // Demo mode - simulate login
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser: User = {
      uid: 'demo-user-123',
      email: email,
      displayName: 'Demo User',
    };
    
    setUser(mockUser);
    setRole('user');
    setLoading(false);
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
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
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    
    // Demo mode - simulate logout
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    setRole(null);
    setLoading(false);
  }, []);

  return { user, loading, role, error, login, signup, logout };
}
