import { Flame, BookOpen, Clock } from 'lucide-react';
import Header from './Header';
import BottomNav from './BottomNav';
import useProgress from '../hooks/useProgress';
import { getUIStrings } from '../constants/uiStrings';

const ProgressScreen = ({ user, onBack, onLogout }) => {
  const nativeLanguage = user?.nativeLanguage || 'hi';
  const uiStrings = getUIStrings(nativeLanguage);
  const { progressData, isLoading } = useProgress();

  const handleTabChange = (tab) => {
    if (tab === 'home') onBack?.();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading progress...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        currentStreak={progressData.currentStreak}
        userName={user?.name || 'User'}
        onProfileClick={() => {}}
      />

      <main className="flex-1 overflow-auto px-6 py-6">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{uiStrings.progress}</h1>
            <p className="text-sm text-muted-foreground mt-1">Practice daily to keep your streak.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Flame} value={progressData.currentStreak} label={uiStrings.dayStreak} />
            <StatCard icon={BookOpen} value={progressData.lessonsCompleted} label={uiStrings.lessons} />
            <StatCard icon={Clock} value={progressData.weeklyMinutes ?? progressData.totalMinutes} label={`${uiStrings.minutes} (week)`} />
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">{uiStrings.weeklyActivity}</h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {progressData.weeklyActivity.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-lg h-full relative">
                    <div
                      className="absolute bottom-0 w-full rounded-t-lg bg-primary"
                      style={{ height: `${(day.minutes / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">{uiStrings.skills}</h3>
            <div className="space-y-3">
              <SkillBar label={uiStrings.pronunciation} value={progressData.skills.pronunciation} />
              <SkillBar label={uiStrings.vocabulary} value={progressData.skills.vocabulary} />
              <SkillBar label={uiStrings.listening} value={progressData.skills.listening} />
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="progress" onTabChange={handleTabChange} uiStrings={uiStrings} onLogout={onLogout} />
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-card border border-border rounded-xl p-4 shadow-sm text-center">
    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center mx-auto mb-2">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

const SkillBar = ({ label, value }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}%</span>
    </div>
    <div className="w-full bg-muted rounded-full h-2">
      <div className="h-2 rounded-full bg-primary" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default ProgressScreen;
