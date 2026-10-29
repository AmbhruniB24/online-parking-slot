
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('smartpark_token');

      if (token) {
        try {
          const res = await api.get('/auth/me');
          const currentUser = res.data.user || res.data.data?.user || res.data.data;

          if (!currentUser) {
            throw new Error('User data missing from response');
          }

          setUser(currentUser);
        } catch (err) {
          console.error('Session check failed:', err.message);
          localStorage.removeItem('smartpark_token');
          setUser(null);
        }
      }

      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const responseData = res.data.data || res.data;
    const token = responseData.token;
    const loggedInUser = responseData.user || responseData;

    if (!token || !loggedInUser || !loggedInUser.role) {
      throw new Error('Invalid login response from server');
    }

    localStorage.setItem('smartpark_token', token);
    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post('/auth/register', {
      name,
      email,
      password
    });

    const responseData = res.data.data || res.data;
    const token = responseData.token;
    const registeredUser = responseData.user || responseData;

    if (!token || !registeredUser || !registeredUser.role) {
      throw new Error('Invalid registration response from server');
    }

    localStorage.setItem('smartpark_token', token);
    setUser(registeredUser);

    return registeredUser;
  };

  const logout = () => {
    localStorage.removeItem('smartpark_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
