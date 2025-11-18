//Composes smaller components to form Dashboard

import { Globe } from 'lucide-react';
import Header from './Header';
import ProgressCard from './ProgressCard';
import LessonCard from './LessonCard';
import BottomNav from './BottomNav';
import useDashboard from '../hooks/useDashboard';

const Dashboard = () => {
  const {
    userData,
    lessons,
    activeTab,
    currentLanguage,
    greetingMessage,
    handleStartLesson,
    handleTabChange,
    handleLanguageSwitch
  } = useDashboard();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex flex-col">
      {/* Header */}
      <Header 
        currentStreak={userData.currentStreak}
        userName={userData.name}
      />

      {/* Main Content - Full Width */}
      <main className="flex-1 overflow-auto px-6 py-6">
        <div className="w-full space-y-6">
          
          {/* Welcome Section */}
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
              <span style={{ fontFamily: currentLanguage.fontFamily }}>
                {greetingMessage}
              </span>
              , {userData.name}! 🙏
            </h1>
            <p className="text-white/90 text-lg drop-shadow">
              You're learning{' '}
              <strong 
                className="text-white" 
                style={{ fontFamily: currentLanguage.fontFamily }}
              >
                {currentLanguage.nativeName} ({currentLanguage.name})
              </strong>
              {' '}• Beginner Level
            </p>
          </div>

          {/* Language Switcher */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Learning:</p>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-2xl" 
                    style={{ fontFamily: currentLanguage.fontFamily }}
                  >
                    {currentLanguage.nativeName}
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    ({currentLanguage.name})
                  </span>
                </div>
              </div>
              <button
                onClick={handleLanguageSwitch}
                className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 flex items-center gap-2 transition-colors shadow-sm"
              >
                <Globe className="w-4 h-4" />
                Switch Language
              </button>
            </div>
          </div>

          {/* Today's Goal Progress */}
          <ProgressCard
            goalMinutes={userData.todayGoalMinutes}
            completedMinutes={userData.todayCompletedMinutes}
            title="आज का लक्ष्य (Today's Goal)"
          />

          {/* Lessons Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 drop-shadow-lg">
              आपके पाठ (Your Lessons)
            </h2>
            <div className="grid gap-4">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onStartLesson={handleStartLesson}
                  languageFontFamily={currentLanguage.fontFamily}
                />
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Dashboard;