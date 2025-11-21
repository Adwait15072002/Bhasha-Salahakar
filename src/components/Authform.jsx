//Handles UI of Authform and connects to backend using useAuthForm hook
import Input from './Input';
import Button from './Buttons';
import LanguageSelect from './LanguageSelect';
import useAuthForm from '../hooks/useAuthForm';

const AuthForm = ({ onAuthSuccess }) => {
  const {
    isLogin,
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    toggleAuthMode
  } = useAuthForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(onAuthSuccess);
  };

  const isSignupMode = !isLogin;
  const formTitle = isSignupMode ? 'Start Learning Free' : 'Welcome Back';
  const submitButtonText = isSignupMode ? 'Sign Up Free' : 'Sign In';
  const toggleText = isSignupMode ? 'Already have an account?' : "Don't have an account?";
  const toggleLinkText = isSignupMode ? 'Sign In' : 'Sign Up';

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {formTitle}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 mb-6">
        {isSignupMode && (
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        )}

        {isSignupMode && (
          <>
            <LanguageSelect
              label="I speak (My language):"
              name="nativeLanguage"
              value={formData.nativeLanguage}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <LanguageSelect
              label="I want to learn:"
              name="learningLanguage"
              value={formData.learningLanguage}
              onChange={handleInputChange}
              disabled={isLoading}
              excludeLanguage={formData.nativeLanguage}
            />
          </>
        )}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          disabled={isLoading}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={isLoading}
          required
          minLength={6}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : submitButtonText}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        {toggleText}{' '}
        <span 
          onClick={toggleAuthMode}
          className="text-orange-600 font-medium cursor-pointer hover:underline"
        >
          {toggleLinkText}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;