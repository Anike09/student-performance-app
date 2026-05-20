import React, { createContext, useContext, useEffect, useState } from 'react';
import { createStudent } from '../services/api';
import { User } from '../types';

interface AuthContextProps {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  register: (name: string, email: string, matricNo: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('student-dashboard-user');
    return stored ? JSON.parse(stored) as User : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('student-dashboard-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('student-dashboard-user');
    }
  }, [user]);

  const login = (email: string, name: string) => {
    const currentUser: User = { id: 0, name, email };
    setUser(currentUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, matricNo: string) => {
    await createStudent({ name, email, matricNo });
    setUser({ id: 0, name, email });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
