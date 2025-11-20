//Authentication Service
import apiClient from '../../config/api';
export const signup = async (userData) => {
  const response = await apiClient.post('/auth/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const saveAuthData = (data) => {
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('userData', JSON.stringify(data.user));
};

export const getAuthData = () => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  return {
    token,
    user: userData ? JSON.parse(userData) : null
  };
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};