//Handles Authentication Logic independent of the AuthForm UI

//custom hook named useAuthForm manages validation logic

import { useState } from 'react';
import { signup, login, saveAuthData } from '../services/api/auth-service';
 

const useAuthForm = (initialMode = 'signup') => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

//  const [authMode, setAuthMode] = useState(initialMode); // 'signup' or 'login'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '' ,// Only used for signup
    nativeLanguage: 'hi',    //User's UI language
    learningLanguage: 'kn'   //Language they want to learn
  });

  /**
   * Handles input field changes
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  /**
   * Validates form fields
   * Returns true if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Name validation (only for signup)
    if (authMode === 'signup' && !formData.name) {
      newErrors.name = 'Name is required';
    }

    // Language validation
    if (authMode === 'signup') {
      if (!formData.nativeLanguage) {
        newErrors.nativeLanguage = 'Please select your language';
      }
      if (!formData.learningLanguage) {
        newErrors.learningLanguage = 'Please select language to learn';
      }
      if (formData.nativeLanguage === formData.learningLanguage) {
        newErrors.learningLanguage = 'Cannot be same as your language';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  /**
   * Handles form submission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    

    setIsLoading(true);
    
    try {
      
      console.log(`${authMode} attempt with:`, formData);
      
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      alert(`${authMode} successful!`);
      
    } catch (error) {
      console.error(`${authMode} error:`, error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggles between signup and login modes
   */
  const toggleAuthMode = () => {
    setAuthMode(prevMode => prevMode === 'signup' ? 'login' : 'signup');
    setFormData({ email: '', password: '', name: '',
  nativeLanguage: 'en', 
  learningLanguage: 'hi'  });
    setErrors({});
  };

  /**
   * Handles Google OAuth (placeholder)
   */
  const handleGoogleAuth = () => {
  console.log('Google OAuth clicked');
  alert('Google OAuth will be implemented in backend integration');
  };

  return {
    authMode,
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
    toggleAuthMode,
    handleGoogleAuth
  };
};

export default useAuthForm;
