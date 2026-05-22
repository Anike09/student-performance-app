import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  AuthStudent,
  getCurrentStudent,
  getStoredToken,
  loginStudent,
  setAuthToken,
  signupStudent,
} from '../services/api';

interface AuthContextProps {
  user: AuthStudent | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthStudent | null>(null);
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(token);
        const student = await getCurrentStudent();
        setUser(student);
      } catch (_error) {
        setAuthToken(null);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await loginStudent({ email, password });
    setAuthToken(response.token);
    setToken(response.token);
    setUser(response.student);
  };

  const register = async (email: string, username: string, password: string) => {
    const response = await signupStudent({ email, username, password });
    setAuthToken(response.token);
    setToken(response.token);
    setUser(response.student);
  };

  const logout = () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
