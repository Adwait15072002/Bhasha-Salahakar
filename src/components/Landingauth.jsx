//It composes the hero and authform components
import Hero from './Hero';
import AuthForm from './Authform';

const LandingAuth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-20 items-center">
        {/* Left Side: Hero Section */}
        <Hero />

        {/* Right Side: Authentication Form */}
        <AuthForm />
      </div>
    </div>
  );
};

export default LandingAuth;