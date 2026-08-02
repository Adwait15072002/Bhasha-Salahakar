import apiClient from '../../config/api';

export const getProgress = async () => {
  const response = await apiClient.get('/progress');
  return response.data;
};

export const completeLesson = async (categorySlug) => {
  const response = await apiClient.post('/progress/complete-lesson', { categorySlug });
  return response.data;
};

export const getAnalytics = async () => {
  const response = await apiClient.get('/progress/analytics');
  return response.data;
};
