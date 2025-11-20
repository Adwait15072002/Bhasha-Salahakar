import { useState } from 'react';

const useProgress = () => {
  const [progressData] = useState({
    currentStreak: 5,
    lessonsCompleted: 3,
    totalMinutes: 67,
    weeklyActivity: [
      { day: 'M', minutes: 15 },
      { day: 'T', minutes: 20 },
      { day: 'W', minutes: 12 },
      { day: 'T', minutes: 0 },
      { day: 'F', minutes: 10 },
      { day: 'S', minutes: 10 },
      { day: 'S', minutes: 0 }
    ],
    skills: {
      pronunciation: 85,
      vocabulary: 72,
      listening: 68
    }
  });

  return { progressData };
};

export default useProgress;