import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          'auth-token': token,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      setError('Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
