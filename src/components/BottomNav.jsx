//For Navigation

import { Home, BarChart, LogOut } from 'lucide-react';

const BottomNav = ({ activeTab = 'home', onTabChange, uiStrings, onLogout }) => {
  const handleLogoutClick = () => {
    console.log('BottomNav: Logout clicked');
    if (onLogout) {
      onLogout();
    }
  };

  const navigationItems = [
    { id: 'home', label: uiStrings.home, icon: Home },
    { id: 'progress', label: uiStrings.progress, icon: BarChart },
    { id: 'logout', label: uiStrings.logout || 'Logout', icon: LogOut, onLogout: true }
  ];

  return (
    <nav className="px-6 py-3">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const { icon: Icon, label, id } = item;
          const isActive = activeTab === id;
          
          const activeStyles = isActive 
            ? 'text-white' 
            : id === 'logout'
              ? 'text-red-300 hover:text-red-100'
              : 'text-white/60 hover:text-white/80';

          return (
            <button
              key={id}
              onClick={() => {
                if (id === 'logout') {
                  handleLogoutClick();
                } else {
                  onTabChange(id);
                }
              }}
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