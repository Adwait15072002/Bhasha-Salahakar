//Entry point of application
import Dashboard from './components/Dashboard';
import LessonPractice from './components/LessonPractice';
import LandingAuth from './components/Landingauth';
import ProgressScreen from './components/ProgressScreen';
import ArticlesScreen from './components/ArticlesScreen';
import { getAuthData, isAuthenticated, clearAuthData, getMe } from './services/api/auth-service';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dashboardKey, setDashboardKey] = useState(0);

  useEffect(() => {
    const initAuth = async () => {
      if (!isAuthenticated()) return;
      try {
        const me = await getMe();
        if (me.success) {
          setUser(me.data.user);
          setIsLoggedIn(true);
          setCurrentScreen('dashboard');
          return;
        }
      } catch {
        const authData = getAuthData();
        if (authData.user) {
          setUser(authData.user);
          setIsLoggedIn(true);
          setCurrentScreen('dashboard');
        }
      }
    };
    initAuth();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    sessionStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const handleStartLesson = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setCurrentScreen('practice');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      clearAuthData();
      setUser(null);
      setIsLoggedIn(false);
      setCurrentScreen('auth');
      setSelectedCategory(null);
    }
  };

  const renderScreen = () => {
    if (!isLoggedIn) return <LandingAuth onAuthSuccess={handleAuthSuccess} />;

    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard
            key={dashboardKey}
            user={user}
            onStartLesson={handleStartLesson}
            onProfileClick={() => setCurrentScreen('progress')}
            onLogout={handleLogout}
            onUserUpdate={handleUserUpdate}
            onOpenArticles={() => setCurrentScreen('articles')}
          />
        );
      case 'practice':
        return (
          <LessonPractice
            categorySlug={selectedCategory}
            user={user}
            onExit={() => {
              setSelectedCategory(null);
              setDashboardKey((k) => k + 1);
              setCurrentScreen('dashboard');
            }}
          />
        );
      case 'progress':
        return (
          <ProgressScreen
            user={user}
            onBack={() => setCurrentScreen('dashboard')}
            onLogout={handleLogout}
          />
        );
      case 'articles':
        return <ArticlesScreen user={user} onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <LandingAuth onAuthSuccess={handleAuthSuccess} />;
    }
  };

  return <>{renderScreen()}</>;
}

export default App;
