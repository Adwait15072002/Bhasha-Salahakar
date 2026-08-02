import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '../services/api/lesson-service';
import { getProgress } from '../services/api/progress-service';
import { updateLanguages } from '../services/api/auth-service';
import { getLanguageInfo } from '../constants/languages';
import { getCategoryMeta } from '../constants/categoryMeta';

const useDashboard = (user, onUserUpdate) => {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageDraft, setLanguageDraft] = useState({
    nativeLanguage: user?.nativeLanguage || 'hi',
    learningLanguage: user?.learningLanguage || 'kn'
  });

  const userData = {
    name: user?.name || 'Learner',
    nativeLanguage: user?.nativeLanguage || 'hi',
    learningLanguage: user?.learningLanguage || 'kn',
    currentStreak: progress?.currentStreak || 0,
    todayGoalMinutes: progress?.todayGoalMinutes || 15,
    todayCompletedMinutes: progress?.todayCompletedMinutes || 0,
    weeklyActivity: progress?.weeklyActivity || [],
    weeklyMinutes: progress?.weeklyMinutes || 0,
    weeklyAttempts: progress?.weeklyAttempts || 0
  };

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const [categoriesRes, progressRes] = await Promise.all([
        getCategories(),
        getProgress()
      ]);

      if (progressRes.success) setProgress(progressRes.data);

      if (categoriesRes.success) {
        const mapped = categoriesRes.data.categories.map((cat, index) => {
          const meta = getCategoryMeta(cat.slug, cat.phraseCount);
          return {
            id: cat.slug,
            slug: cat.slug,
            titleEnglish: cat.name,
            titleNative: cat.name,
            description: meta.description,
            estimatedMinutes: meta.estimatedMinutes,
            phraseCount: cat.phraseCount,
            emoji: meta.emoji,
            isLocked: index > 0 && (progressRes.data?.lessonsCompleted || 0) < index
          };
        });
        if (mapped.length > 0) mapped[0].isLocked = false;
        setLessons(mapped);
      }
    } catch (err) {
      console.error('Dashboard load failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.nativeLanguage, user?.learningLanguage]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleStartLesson = (lessonId) => {
    console.log(`Starting lesson ${lessonId}`);
  };

  const handleTabChange = (tabId) => setActiveTab(tabId);

  const handleLanguageSwitch = () => {
    setLanguageDraft({
      nativeLanguage: userData.nativeLanguage,
      learningLanguage: userData.learningLanguage
    });
    setShowLanguageModal(true);
  };

  const applyLanguageSwitch = async () => {
    const response = await updateLanguages(
      languageDraft.nativeLanguage,
      languageDraft.learningLanguage
    );
    if (response.success && onUserUpdate) {
      onUserUpdate(response.data.user);
    }
    setShowLanguageModal(false);
  };

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
    userData,
    lessons,
    activeTab,
    isLoading,
    showLanguageModal,
    languageDraft,
    setLanguageDraft,
    currentLanguage: {
      native: getLanguageInfo(userData.nativeLanguage),
      learning: getLanguageInfo(userData.learningLanguage)
    },
    greetingMessage: getGreetingMessage(),
    handleStartLesson,
    handleTabChange,
    handleLanguageSwitch,
    applyLanguageSwitch,
    closeLanguageModal: () => setShowLanguageModal(false),
    refreshDashboard: loadDashboard
  };
};

export default useDashboard;
