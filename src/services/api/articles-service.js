import apiClient from '../../config/api';

export const getArticles = async (lang, state) => {
  const params = {};
  if (state) params.state = state;
  if (lang) params.lang = lang;
  const response = await apiClient.get('/articles', { params });
  return response.data;
};

export const getArticle = async (id, lang, script = 'native', translationLang = null) => {
  const params = { lang, script };
  if (translationLang) params.translationLang = translationLang;
  const response = await apiClient.get(`/articles/${id}`, { params });
  return response.data;
};
