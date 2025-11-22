//Service for phrases for natural language and target language
import apiClient from '../../config/api';
export const getPhrases = async (nativeLanguage, learningLanguage) => {
  const languageCode = `${nativeLanguage}-${learningLanguage}`;
  console.log('Calling API:', `/lessons/${languageCode}/phrases`);
  
  const response = await apiClient.get(`/lessons/${languageCode}/phrases`);
  return response.data;
};