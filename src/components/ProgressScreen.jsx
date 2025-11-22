import { Flame, BookOpen, Clock } from 'lucide-react';
import Header from './Header';
import BottomNav from './BottomNav';
import useProgress from '../hooks/useProgress';
import { getUIStrings } from '../constants/uiStrings';

const ProgressScreen = ({ user, onBack }) => {
  const nativeLanguage = 'hi';
  const uiStrings = getUIStrings(nativeLanguage);
  const { progressData } = useProgress();

  const handleTabChange = (tab) => {
    console.log('ProgressScreen tab clicked:', tab);
    
    if (tab === 'home') {
      if (onBack) {
        onBack();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex flex-col">
      <Header 
        currentStreak={progressData.currentStreak}
        userName={user?.name || "User"}
        uiStrings={uiStrings}
      />

      <main className="flex-1 overflow-auto px-6 py-6">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            {uiStrings.progress}
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard icon={Flame} value={progressData.currentStreak} label={uiStrings.dayStreak} color="bg-orange-500" />
            <StatCard icon={BookOpen} value={progressData.lessonsCompleted} label={uiStrings.lessons} color="bg-blue-500" />
            <StatCard icon={Clock} value={progressData.totalMinutes} label={uiStrings.minutes} color="bg-purple-500" />
          </div>

          {/* Weekly Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{uiStrings.weeklyActivity}</h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {progressData.weeklyActivity.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-t-lg h-full relative">
                    <div
                      className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-orange-500 to-red-500"
                      style={{ height: `${(day.minutes / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{uiStrings.skills}</h3>
            <div className="space-y-3">
                <SkillBar label={uiStrings.pronunciation} value={progressData.skills.pronunciation} />
                <SkillBar label={uiStrings.vocabulary} value={progressData.skills.vocabulary} />
                <SkillBar label={uiStrings.listening} value={progressData.skills.listening} />
            </div>
          </div>

        </div>
      </main>

      <BottomNav 
        activeTab="progress"
        onTabChange={handleTabChange}
        uiStrings={uiStrings}
      />
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center">
    <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-600">{label}</p>
  </div>
);

// Skill Bar Component
const SkillBar = ({ label, value }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-700">{label}</span>
      <span className="text-sm font-bold text-gray-800">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default ProgressScreen;