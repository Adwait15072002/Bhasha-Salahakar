//Composes smaller components to form Dashboard

import { Globe } from 'lucide-react';
import Header from './Header';
import ProgressCard from './ProgressCard';
import LessonCard from './LessonCard';
import BottomNav from './BottomNav';
import useDashboard from '../hooks/useDashboard';
import { getUIStrings } from '../constants/uiStrings';

const Dashboard = ({ user, onStartLesson, onProfileClick }) => {
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

  const uiStrings = getUIStrings(userData.nativeLanguage);

  const handleLessonClick = (lessonId) => {
    console.log('Dashboard: Lesson clicked:', lessonId);
    
    // Call hook's internal handler
    handleStartLesson(lessonId);
    
    // Call parent's navigation handler
    if (onStartLesson) {
      onStartLesson(lessonId);
    } else {
      console.error('onStartLesson prop not provided to Dashboard!');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex flex-col">
      {/* Header */}
      <Header 
        currentStreak={userData.currentStreak}
        userName={user?.name || userData.name}  
        uiStrings={uiStrings}
        onProfileClick={onProfileClick}  
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-6 py-6">
        <div className="w-full space-y-6">
          
          {/* Welcome Section */}
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
              <span style={{ fontFamily: currentLanguage.native.fontFamily }}>
                {greetingMessage}
              </span>
              , {user?.name || userData.name}! 🙏
            </h1>
            <p className="text-white/90 text-lg drop-shadow">
              {uiStrings.learningStatus}{' '}
              <strong 
                className="text-white" 
                style={{ fontFamily: currentLanguage.learning.fontFamily }}
              >
                {currentLanguage.learning.nativeName} ({currentLanguage.learning.name})
              </strong>
              {' '}• {uiStrings.beginner}
            </p>
          </div>

          {/* Language Switcher */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{uiStrings.learning}</p>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-2xl" 
                    style={{ fontFamily: currentLanguage.learning.fontFamily }}
                  >
                    {currentLanguage.learning.nativeName}
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    ({currentLanguage.learning.name})
                  </span>
                </div>
              </div>
              <button
                onClick={handleLanguageSwitch}
                className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 flex items-center gap-2 transition-colors shadow-sm"
              >
                <Globe className="w-4 h-4" />
                {uiStrings.switchLanguage}
              </button>
            </div>
          </div>

          {/* Today's Goal Progress */}
          <ProgressCard
            goalMinutes={userData.todayGoalMinutes}
            completedMinutes={userData.todayCompletedMinutes}
            uiStrings={uiStrings}
          />

          {/* Lessons Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 drop-shadow-lg">
              {uiStrings.yourLessons}
            </h2>
            <div className="grid gap-4">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onStartLesson={handleLessonClick}
                  languageFontFamily={currentLanguage.learning.fontFamily}
                  uiStrings={uiStrings}
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
        uiStrings={uiStrings}
      />
    </div>
  );
};

export default Dashboard;
