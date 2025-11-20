//Service for Audio Output Feedback and Correct Pronounciation of Phase using TTS
import apiClient from '../../config/api';
export const submitAudio = async (audioBlob, expectedText, targetLanguage) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('expectedText', expectedText);
  formData.append('targetLanguage', targetLanguage);

  const response = await apiClient.post('/practice/submit-audio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};


export const getTTS = async (text, language) => {
  const response = await apiClient.get('/practice/tts', {
    params: { text, language }
  });
  return response.data;
};