import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (cpf, password) => {
    try {
      const response = await authService.login(cpf, password);
      const { access_token, user: userData } = response;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(access_token);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erro ao fazer login' 
      };
    }
  };

  const logout = async () => {
    try {
      // Chamar endpoint de logout no backend
      if (token) {
        await authService.logout();
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      // Limpar dados locais independente do resultado
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const getCurrentUser = async () => {
    try {
      if (!token) return null;
      
      const userData = await authService.getCurrentUser();
      setUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
      
      return userData.user;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      // Se houver erro de autenticação, fazer logout
      if (error.response?.status === 401) {
        logout();
      }
      return null;
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

