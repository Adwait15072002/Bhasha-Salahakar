//Authentication Service
import apiClient from '../../config/api';

const storage = sessionStorage;

export const signup = async (userData) => {
  const response = await apiClient.post('/auth/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const updateLanguages = async (nativeLanguage, learningLanguage) => {
  const response = await apiClient.patch('/auth/languages', { nativeLanguage, learningLanguage });
  return response.data;
};

export const resetPassword = async ({ email, newPassword }) => {
  const response = await apiClient.post('/auth/reset-password', { email, newPassword });
  return response.data;
};

export const saveAuthData = (data) => {
  storage.setItem('authToken', data.token);
  storage.setItem('userData', JSON.stringify(data.user));
};

export const getAuthData = () => {
  const token = storage.getItem('authToken');
  const userData = storage.getItem('userData');
  return {
    token,
    user: userData ? JSON.parse(userData) : null
  };
};

export const clearAuthData = () => {
  storage.removeItem('authToken');
  storage.removeItem('userData');
};

export const isAuthenticated = () => {
  return !!storage.getItem('authToken');
};
