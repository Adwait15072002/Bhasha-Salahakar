//Entry point of application
import Dashboard from './components/Dashboard';
import LessonPractice from './components/LessonPractice';
import LandingAuth from './components/Landingauth';
import ProgressScreen from './components/ProgressScreen';
import { getAuthData, isAuthenticated, clearAuthData} from './services/api/auth-service';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Navigation state
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [selectedLesson, setSelectedLesson] = useState(null);

   useEffect(() => {
    if (isAuthenticated()) {
      const authData = getAuthData();
      setUser(authData.user);
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleStartLesson = (lessonId) => {
    setSelectedLesson(lessonId);
    setCurrentScreen('practice');
  };

  const handleProfileClick = () => {
    setCurrentScreen('progress');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedLesson(null);
  };

  const handleLogout = () => {
    console.log('App.jsx: Logging out...');
    if (window.confirm('Are you sure you want to logout?')) {
      clearAuthData();
      setUser(null);
      setIsLoggedIn(false);
      setCurrentScreen('auth');
      setSelectedLesson(null);
      
      console.log('Logged out successfully');
    }
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LandingAuth onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            onStartLesson={handleStartLesson}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout} 
          />
        );
      
      case 'practice':
        return (
          <LessonPractice 
            lessonId={selectedLesson}
            user={user}
            onExit={handleBackToDashboard}
          />
        );
      
      case 'progress':
        return (
          <ProgressScreen 
            user={user}
            onBack={handleBackToDashboard}
          />
        );
      
      default:
        return <LandingAuth onAuthSuccess={handleAuthSuccess} />;
    }
  };

  return <>{renderScreen()}</>;
}

export default App;