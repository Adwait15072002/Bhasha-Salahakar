//Handles Authentication Logic

//calls backend apis

import { useState, useEffect } from 'react';
import { signup, login, saveAuthData } from '../services/api/auth-service';

const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    nativeLanguage: 'hi',
    learningLanguage: 'kn'
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (onSuccess) => {
    setError('');
    setIsLoading(true);
    
    try {
      let response;

      if (isLogin) {
        response = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          nativeLanguage: formData.nativeLanguage,
          learningLanguage: formData.learningLanguage
        });
      }

      if (response.success && response.data) {
        saveAuthData(response.data);
        if (onSuccess) {
          onSuccess(response.data.user);
        }
        return response.data;
      }

    } catch (err) {
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        'Authentication failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(prev => !prev);
    setFormData({
      email: '',
      password: '',
      name: '',
      nativeLanguage: 'hi',
      learningLanguage: 'kn'
    });
    setError('');
  };

  return {
    isLogin,
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    toggleAuthMode
  };
};

export default useAuthForm;