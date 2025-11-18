//Handles Authentication Logic independent of the AuthForm UI

//custom hook named useAuthForm manages validation logic

import { useState } from 'react';
import Dashboard from '../components/Dashboard'; 

const useAuthForm = (initialMode = 'signup') => {
  const [authMode, setAuthMode] = useState(initialMode); // 'signup' or 'login'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '' // Only used for signup
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // if(validateForm===true){
  //   return(
  //     <Dashboard/>
  //   );
  // }

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
    setFormData({ email: '', password: '', name: '' });
    setErrors({});
  };

  /**
   * Handles Google OAuth (placeholder)
   */
  const handleGoogleAuth = () => {
    console.log('Google OAuth clicked');
    alert('Google OAuth will be implemented in backend integration');
    return (
      <Dashboard/>
    );
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
