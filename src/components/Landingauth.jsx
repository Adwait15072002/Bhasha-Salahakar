//Composes Hero and AuthForm Component

import Hero from './Hero';
import AuthForm from './Authform';

const LandingAuth = ({ onAuthSuccess }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-20 items-center">
        <Hero />
        <AuthForm onAuthSuccess={onAuthSuccess} />
      </div>
    </div>
  );
};

export default LandingAuth;