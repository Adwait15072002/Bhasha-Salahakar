import { MessageCircle, User, Flame } from 'lucide-react';

const Header = ({ currentStreak, userName = 'User', onProfileClick }) => {
  return (
    <header className="px-6 py-4 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-3">
        <MessageCircle className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold text-foreground">Bhasha Salahakar</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg border border-border">
          <Flame className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground text-sm">{currentStreak} day streak</span>
        </div>
        <button
          onClick={onProfileClick}
          className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors border border-border"
          aria-label={`${userName}'s profile`}
        >
          <User className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
