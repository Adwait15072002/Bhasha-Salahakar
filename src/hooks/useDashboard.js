import { useState } from 'react';
import { LESSON_DATA } from '../constants/appConstants';

const useDashboard = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'Priya',
    nativeLanguage: 'hi', // Hindi
    learningLanguage: 'kn', // Kannada
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
        const languageMap = {
        en: { name: 'English', nativeName: 'English', fontFamily: 'sans-serif' },
        hi: { name: 'Hindi', nativeName: 'हिन्दी', fontFamily: "'Noto Sans Devanagari', sans-serif" },
        ta: { name: 'Tamil', nativeName: 'தமிழ்', fontFamily: "'Noto Sans Tamil', sans-serif" },
        te: { name: 'Telugu', nativeName: 'తెలుగు', fontFamily: "'Noto Sans Telugu', sans-serif" },
        kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', fontFamily: "'Noto Sans Kannada', sans-serif" },
        mr: { name: 'Marathi', nativeName: 'मराठी', fontFamily: "'Noto Sans Devanagari', sans-serif" }
      };
      return {
        native: languageMap[userData.nativeLanguage],
        learning: languageMap[userData.learningLanguage]
      };
  };

  /**
   * Gets greeting message based on time of day
   */
  const getGreetingMessage = () => {
      const greetings = {
      en: 'Hello',
      hi: 'नमस्ते',
      ta: 'வணக்கம்',
      te: 'నమస్కారం',
      kn: 'ನಮಸ್ಕಾರ',
      mr: 'नमस्कार'
    };
    
    return greetings[userData.nativeLanguage] || greetings.en;
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