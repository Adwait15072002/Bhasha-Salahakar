//Manages UI of Header of our Dashboard

import { MessageCircle, User, Flame } from 'lucide-react';

const Header = ({ currentStreak, userName = 'User' }) => {
  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  return (
    <header className="px-6 py-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="text-xl font-bold text-white drop-shadow-lg">भाषा सलाहकार</span>
      </div>

      {/* Right Side: Streak and Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30">
          <Flame className="w-5 h-5 text-orange-300" />
          <span className="font-semibold text-white">{currentStreak} day streak</span>
        </div>
        <button
          onClick={handleProfileClick}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
          aria-label={`${userName}'s profile`}
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
