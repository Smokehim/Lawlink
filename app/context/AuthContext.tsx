"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  userId: number;
  email: string;
  fullName: string;
  serialCode: string;
  serialCodeExpiresAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUserData: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    const storedUser = localStorage.getItem('userData');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('userToken', newToken);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  };

  const setUserData = (userData: User) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
