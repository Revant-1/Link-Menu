import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import jwtDecode from 'jwt-decode'; // Correct import

interface DecodedToken {
  exp?: number; // Expiration time in seconds
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp && decodedToken.exp > currentTime) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token'); // Remove expired token
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token'); // Remove invalid token
        }
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string) => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
      } else {
        throw new Error('Token is expired or invalid');
      }
    } catch (error) {
      console.error('Failed to log in:', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
