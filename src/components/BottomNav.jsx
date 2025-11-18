//For Navigation

import { Home, BarChart, User } from 'lucide-react';

const BottomNav = ({ activeTab = 'home', onTabChange }) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'progress', label: 'Progress', icon: BarChart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="px-6 py-3">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const { icon: Icon, label, id } = item;
          const isActive = activeTab === id;
          
          const activeStyles = isActive 
            ? 'text-white' 
            : 'text-white/60 hover:text-white/80';

          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-1 transition-colors ${activeStyles}`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
