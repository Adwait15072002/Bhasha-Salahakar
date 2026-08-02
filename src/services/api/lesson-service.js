import apiClient from '../../config/api';

export const getCategories = async () => {
  const response = await apiClient.get('/lessons/categories');
  return response.data;
};

export const getPhrases = async (nativeLanguage, learningLanguage, categorySlug) => {
  const languageCode = `${nativeLanguage}-${learningLanguage}`;
  const response = await apiClient.get(`/lessons/${languageCode}/phrases`, {
    params: categorySlug ? { category: categorySlug } : {}
  });
  return response.data;
};
