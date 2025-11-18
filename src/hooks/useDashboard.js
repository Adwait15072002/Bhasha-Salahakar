import { useState } from 'react';
import { LESSON_DATA } from '../constants/appConstants';

const useDashboard = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'Priya',
    targetLanguage: 'hi', // Hindi
    currentStreak: 5,
    todayGoalMinutes: 15,
    todayCompletedMinutes: 0
  });

  // Lessons state
  const [lessons, setLessons] = useState(LESSON_DATA);

  // Navigation state
  const [activeTab, setActiveTab] = useState('home');

  /**
   * Handles lesson start
   * @param {number} lessonId - ID of the lesson to start
   */
  const handleStartLesson = (lessonId) => {
    console.log(`Starting lesson ${lessonId}`);
    // TODO: Navigate to lesson practice screen
    // TODO: API call to track lesson start
  };

  /**
   * Handles navigation tab change
   * @param {string} tabId - ID of the tab to navigate to
   */
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log(`Navigating to: ${tabId}`);
    // TODO: Implement actual navigation logic
  };

  /**
   * Handles language switch
   */
  const handleLanguageSwitch = () => {
    console.log('Language switch clicked');
    // TODO: Open language selection modal
    // TODO: Update user's target language
  };

  /**
   * Gets current language info
   */
  const getCurrentLanguageInfo = () => {
    // In real app, this would fetch from user's selected language
    return {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      fontFamily: "'Noto Sans Devanagari', sans-serif"
    };
  };

  /**
   * Gets greeting message based on time of day
   */
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      return 'सुप्रभात'; // Good morning in Hindi
    } else if (currentHour < 18) {
      return 'नमस्ते'; // Hello in Hindi
    } else {
      return 'शुभ संध्या'; // Good evening in Hindi
    }
  };

  return {
    // State
    userData,
    lessons,
    activeTab,
    
    // Computed values
    currentLanguage: getCurrentLanguageInfo(),
    greetingMessage: getGreetingMessage(),
    
    // Actions
    handleStartLesson,
    handleTabChange,
    handleLanguageSwitch
  };
};

export default useDashboard;