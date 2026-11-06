'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  ready: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('adminToken');
    if (saved) setToken(saved);
    setReady(true);
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{
      token, login, logout, isAuthenticated: !!token, ready
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};
