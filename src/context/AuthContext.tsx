import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CUSTOMER';
  phone?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, fName: string, lName: string, phone?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sunlite_token'));
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sunlite_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const backendBase = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

  useEffect(() => {
    if (token) {
      fetch(`${backendBase}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Session expired');
          return res.json();
        })
        .then((data) => {
          setUser(data);
          localStorage.setItem('sunlite_user', JSON.stringify(data));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed.');

      setToken(data.accessToken);
      setUser(data.user);
      localStorage.setItem('sunlite_token', data.accessToken);
      localStorage.setItem('sunlite_user', JSON.stringify(data.user));
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, pass: string, fName: string, lName: string, phone?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, firstName: fName, lastName: lName, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed.');

      setToken(data.accessToken);
      setUser(data.user);
      localStorage.setItem('sunlite_token', data.accessToken);
      localStorage.setItem('sunlite_user', JSON.stringify(data.user));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sunlite_token');
    localStorage.removeItem('sunlite_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
