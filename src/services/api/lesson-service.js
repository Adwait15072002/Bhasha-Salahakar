//Service for phrases for natural language and target language
import apiClient from '../../config/api';
export const getPhrases = async (languageCode) => {
  const response = await apiClient.get(`/lessons/${languageCode}/phrases`);
  return response.data;
};