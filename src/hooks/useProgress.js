import { useState, useEffect } from 'react';
import { getProgress } from '../services/api/progress-service';

const useProgress = () => {
  const [progressData, setProgressData] = useState({
    currentStreak: 0,
    lessonsCompleted: 0,
    totalMinutes: 0,
    weeklyActivity: [],
    weeklyMinutes: 0,
    weeklyAttempts: 0,
    skills: { pronunciation: 0, vocabulary: 0, listening: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgress();
        if (response.success) {
          setProgressData(response.data);
        }
      } catch (err) {
        console.error('Failed to load progress:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, []);

  return { progressData, isLoading };
};

export default useProgress;
