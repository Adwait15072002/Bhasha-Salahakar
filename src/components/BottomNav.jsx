import { Home, BarChart, LogOut } from 'lucide-react';

const BottomNav = ({ activeTab = 'home', onTabChange, uiStrings, onLogout }) => {
  const navigationItems = [
    { id: 'home', label: uiStrings.home, icon: Home },
    { id: 'progress', label: uiStrings.progress, icon: BarChart },
    { id: 'logout', label: uiStrings.logout || 'Logout', icon: LogOut }
  ];

  return (
    <nav className="px-6 py-3 border-t border-border bg-card">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const { icon: Icon, label, id } = item;
          const isActive = activeTab === id;
          const activeStyles = isActive
            ? 'text-primary'
            : id === 'logout'
              ? 'text-destructive hover:opacity-80'
              : 'text-muted-foreground hover:text-foreground';

          return (
            <button
              key={id}
              onClick={() => (id === 'logout' ? onLogout?.() : onTabChange(id))}
              className={`flex flex-col items-center gap-1 transition-colors ${activeStyles}`}
              aria-label={label}
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
