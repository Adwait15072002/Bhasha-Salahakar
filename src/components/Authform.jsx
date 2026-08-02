//Handles UI of Authform and connects to backend using useAuthForm hook
import Input from './Input';
import Button from './Buttons';
import LanguageSelect from './LanguageSelect';
import useAuthForm from '../hooks/useAuthForm';

const AuthForm = ({ onAuthSuccess }) => {
  const {
    isLogin,
    isForgotPassword,
    formData,
    error,
    success,
    isLoading,
    showSignupPrompt,
    showForgotPassword,
    handleInputChange,
    handleSubmit,
    toggleAuthMode,
    switchToSignup,
    switchToForgotPassword,
    switchToLogin
  } = useAuthForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(onAuthSuccess);
    } catch {
      // error shown via hook state
    }
  };

  const isSignupMode = !isLogin && !isForgotPassword;
  const formTitle = isForgotPassword
    ? 'Reset Password'
    : isSignupMode
      ? 'Start Learning Free'
      : 'Welcome Back';
  const submitButtonText = isForgotPassword
    ? 'Update Password'
    : isSignupMode
      ? 'Sign Up Free'
      : 'Sign In';
  const toggleText = isSignupMode ? 'Already have an account?' : "Don't have an account?";
  const toggleLinkText = isSignupMode ? 'Sign In' : 'Sign Up';

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 w-full max-w-md border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{formTitle}</h2>

      {success && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
          {showSignupPrompt && (
            <p className="mt-2 text-foreground">
              Not registered?{' '}
              <button
                type="button"
                onClick={() => switchToSignup(formData.email)}
                className="text-primary font-medium hover:underline"
              >
                Create an account
              </button>
            </p>
          )}
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
          placeholder={isForgotPassword ? 'New Password' : 'Password'}
          value={formData.password}
          onChange={handleInputChange}
          disabled={isLoading}
          required
          minLength={6}
        />

        {isForgotPassword && (
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            minLength={6}
          />
        )}

        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? 'Loading...' : submitButtonText}
        </Button>
      </form>

      {showForgotPassword && (
        <p className="text-center text-sm text-muted-foreground mb-4">
          Having trouble signing in?{' '}
          <button
            type="button"
            onClick={switchToForgotPassword}
            className="text-primary font-medium hover:underline"
          >
            Forgot password?
          </button>
        </p>
      )}

      {isForgotPassword ? (
        <p className="text-center text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => switchToLogin(formData.email)}
            className="text-primary font-medium hover:underline"
          >
            Back to Sign In
          </button>
        </p>
      ) : (
        <p className="text-center text-sm text-muted-foreground mt-6">
          {toggleText}{' '}
          <span
            onClick={toggleAuthMode}
            className="text-primary font-medium cursor-pointer hover:underline"
          >
            {toggleLinkText}
          </span>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
