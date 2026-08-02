import { useState, useEffect } from 'react';
import { signup, login, saveAuthData, resetPassword } from '../services/api/auth-service';

const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nativeLanguage: 'hi',
    learningLanguage: 'kn'
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
    if (name === 'email') {
      setShowSignupPrompt(false);
      setFailedLoginAttempts(0);
    }
  };

  const switchToSignup = (email = '') => {
    setIsLogin(false);
    setIsForgotPassword(false);
    setShowSignupPrompt(false);
    setFormData((prev) => ({
      ...prev,
      email: email || prev.email,
      password: '',
      confirmPassword: ''
    }));
    setError('');
  };

  const switchToLogin = (email = '') => {
    setIsLogin(true);
    setIsForgotPassword(false);
    setShowSignupPrompt(false);
    setFailedLoginAttempts(0);
    setFormData((prev) => ({
      ...prev,
      email: email || prev.email,
      password: '',
      confirmPassword: ''
    }));
    setError('');
  };

  const switchToForgotPassword = () => {
    setIsForgotPassword(true);
    setIsLogin(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (onSuccess) => {
    setError('');
    setSuccess('');
    setShowSignupPrompt(false);
    setIsLoading(true);

    try {
      if (isForgotPassword) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
        const response = await resetPassword({
          email: formData.email,
          newPassword: formData.password
        });
        if (response.success) {
          setSuccess(response.message || 'Password updated. Please sign in.');
          switchToLogin(formData.email);
        }
        return;
      }

      if (isLogin) {
        const response = await login({
          email: formData.email,
          password: formData.password
        });

        if (response.success && response.data) {
          setFailedLoginAttempts(0);
          saveAuthData(response.data);
          onSuccess?.(response.data.user);
          return response.data;
        }
      } else {
        const response = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          nativeLanguage: formData.nativeLanguage,
          learningLanguage: formData.learningLanguage
        });

        if (response.success) {
          setSuccess(response.message || 'Account created — please sign in.');
          switchToLogin(response.data?.email || formData.email);
          return;
        }
      }
    } catch (err) {
      const code = err.response?.data?.code;
      const message =
        err.response?.data?.message ||
        err.message ||
        'Authentication failed. Please try again.';

      if (code === 'USER_NOT_FOUND') {
        setError('User not registered.');
        setShowSignupPrompt(true);
      } else if (code === 'INVALID_PASSWORD') {
        const nextAttempts = failedLoginAttempts + 1;
        setFailedLoginAttempts(nextAttempts);
        setError('Incorrect credentials.');
      } else {
        setError(message);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    if (isLogin) {
      switchToSignup(formData.email);
    } else {
      switchToLogin(formData.email);
    }
    setSuccess('');
  };

  return {
    isLogin,
    isForgotPassword,
    formData,
    error,
    success,
    isLoading,
    failedLoginAttempts,
    showSignupPrompt,
    showForgotPassword: failedLoginAttempts >= 3 && isLogin && !isForgotPassword,
    handleInputChange,
    handleSubmit,
    toggleAuthMode,
    switchToSignup,
    switchToForgotPassword,
    switchToLogin
  };
};

export default useAuthForm;
