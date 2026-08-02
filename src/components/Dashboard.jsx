import { Globe, BookOpen } from 'lucide-react';
import Header from './Header';
import ProgressCard from './ProgressCard';
import WeeklyProgressCard from './WeeklyProgressCard';
import LessonCard from './LessonCard';
import BottomNav from './BottomNav';
import LanguageSelect from './LanguageSelect';
import useDashboard from '../hooks/useDashboard';
import { getUIStrings } from '../constants/uiStrings';

const Dashboard = ({ user, onStartLesson, onProfileClick, onLogout, onUserUpdate, onOpenArticles }) => {
  const {
    userData,
    lessons,
    activeTab,
    isLoading,
    showLanguageModal,
    languageDraft,
    setLanguageDraft,
    currentLanguage,
    greetingMessage,
    handleStartLesson,
    handleTabChange,
    handleLanguageSwitch,
    applyLanguageSwitch,
    closeLanguageModal
  } = useDashboard(user, onUserUpdate);

  const uiStrings = getUIStrings(userData.nativeLanguage);

  const handleLessonClick = (lessonId) => {
    handleStartLesson(lessonId);
    onStartLesson?.(lessonId);
  };

  const handleTabChangeWithNav = (tab) => {
    handleTabChange(tab);
    if (tab === 'progress') onProfileClick?.();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Header
        currentStreak={userData.currentStreak}
        userName={user?.name || userData.name}
        onProfileClick={onProfileClick}
      />

      <main className="flex-1 overflow-auto px-6 py-6">
        <div className="w-full space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">
              <span style={{ fontFamily: currentLanguage.native.fontFamily }}>{greetingMessage}</span>
              , {user?.name || userData.name}!
            </h1>
            <p className="text-muted-foreground text-lg">
              {uiStrings.learningStatus}{' '}
              <strong className="text-foreground" style={{ fontFamily: currentLanguage.learning.fontFamily }}>
                {currentLanguage.learning.nativeName} ({currentLanguage.learning.name})
              </strong>
              {' '}• {uiStrings.beginner}
            </p>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{uiStrings.learning}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl" style={{ fontFamily: currentLanguage.learning.fontFamily }}>
                    {currentLanguage.learning.nativeName}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    ({currentLanguage.learning.name})
                  </span>
                </div>
              </div>
              <button
                onClick={handleLanguageSwitch}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border flex items-center gap-2 hover:opacity-90"
              >
                <Globe className="w-4 h-4" />
                {uiStrings.switchLanguage}
              </button>
            </div>
          </div>

          <button
            onClick={onOpenArticles}
            className="w-full bg-card rounded-xl p-4 border border-border shadow-sm flex items-center justify-between hover:bg-muted transition"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">Cultural Articles</p>
                <p className="text-sm text-muted-foreground">Learn about South Indian heritage</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>

          <ProgressCard
            goalMinutes={userData.todayGoalMinutes}
            completedMinutes={userData.todayCompletedMinutes}
            uiStrings={uiStrings}
          />

          <WeeklyProgressCard
            weeklyActivity={userData.weeklyActivity}
            weeklyMinutes={userData.weeklyMinutes}
            weeklyAttempts={userData.weeklyAttempts}
            uiStrings={uiStrings}
          />

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">{uiStrings.yourLessons}</h2>
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

      <BottomNav activeTab={activeTab} onTabChange={handleTabChangeWithNav} uiStrings={uiStrings} onLogout={onLogout} />

      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card text-card-foreground rounded-xl p-6 w-full max-w-md space-y-4 border border-border">
            <h3 className="text-lg font-bold">Switch Languages</h3>
            <LanguageSelect
              label="Native Language"
              name="nativeLanguage"
              value={languageDraft.nativeLanguage}
              onChange={(e) => setLanguageDraft((d) => ({ ...d, nativeLanguage: e.target.value }))}
              excludeLanguage={languageDraft.learningLanguage}
            />
            <LanguageSelect
              label="Learning Language"
              name="learningLanguage"
              value={languageDraft.learningLanguage}
              onChange={(e) => setLanguageDraft((d) => ({ ...d, learningLanguage: e.target.value }))}
              excludeLanguage={languageDraft.nativeLanguage}
            />
            <div className="flex gap-3">
              <button onClick={closeLanguageModal} className="flex-1 py-2 border border-border rounded-lg">Cancel</button>
              <button onClick={applyLanguageSwitch} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
