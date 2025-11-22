/**
 * Lesson Practice Component
 * Main screen for voice-based lesson practice
 */

import PracticeHeader from './PracticeHeader';
import PhraseCard from './PhraseCard';
import RecordingButton from './RecordingButton';
import FeedbackCard from './FeedbackCard';
import useLessonPractice from '../hooks/useLessonPractice';
import { getUIStrings } from '../constants/uiStrings';

const LessonPractice = ({ user, onExit }) => {
  const nativeLanguage = user?.nativeLanguage || 'hi';
  const learningLanguage = user?.learningLanguage || 'kn';
  
  const uiStrings = getUIStrings(nativeLanguage);
  
  const languageInfo = {
    hi: { name: 'Hindi', nativeName: 'हिन्दी', fontFamily: "'Noto Sans Devanagari', sans-serif" },
    kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', fontFamily: "'Noto Sans Kannada', sans-serif" },
    ta: { name: 'Tamil', nativeName: 'தமிழ்', fontFamily: "'Noto Sans Tamil', sans-serif" },
    te: { name: 'Telugu', nativeName: 'తెలుగు', fontFamily: "'Noto Sans Telugu', sans-serif" },
    mr: { name: 'Marathi', nativeName: 'मराठी', fontFamily: "'Noto Sans Devanagari', sans-serif" },
    en: { name: 'English', nativeName: 'English', fontFamily: "'Inter', sans-serif" }
  };

  const {
    currentPhrase,
    currentPhraseIndex,
    totalPhrases,
    progressPercentage,
    isRecording,
    hasRecorded,
    isProcessing,
    showFeedback,
    feedback,
    showRomanization,
    isLoadingPhrases,
    error,
    startRecording,
    stopRecording,
    toggleRomanization,
    playOriginalAudio,
    playUserRecording,
    tryAgain,
    nextPhrase,
    previousPhrase,
    exitLesson
  } = useLessonPractice(user);

  // ✅ SHOW LOADING STATE
  if (isLoadingPhrases) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
          <p className="text-xl font-semibold">Loading phrases...</p>
        </div>
      </div>
    );
  }

  // ✅ SHOW ERROR STATE
  if (error && !currentPhrase) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-600 text-lg mb-4">❌ {error}</p>
          <button
            onClick={onExit}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ✅ CHECK IF CURRENT PHRASE EXISTS
  if (!currentPhrase) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <p className="text-gray-800 text-lg mb-4">No phrases available</p>
          <button
            onClick={onExit}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex flex-col">
      <PracticeHeader
        lessonTitle={uiStrings.lessonTitle}
        currentIndex={currentPhraseIndex}
        total={totalPhrases}
        progressPercentage={progressPercentage}
        onExit={onExit}
        uiStrings={uiStrings}
      />

      <main className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="max-w-2xl w-full space-y-8">
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-500 text-white px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <PhraseCard
            sourceText={currentPhrase.sourceText}
            targetText={currentPhrase.targetText}
            romanizedText={currentPhrase.romanized}
            showRomanization={showRomanization}
            onToggleRomanization={toggleRomanization}
            sourceFontFamily={languageInfo[nativeLanguage]?.fontFamily || 'sans-serif'}
            targetFontFamily={languageInfo[learningLanguage]?.fontFamily || 'sans-serif'}
            uiStrings={uiStrings}
            learningLanguageName={languageInfo[learningLanguage]?.nativeName || learningLanguage}
          />

          {!showFeedback && (
            <RecordingButton
              isRecording={isRecording}
              onStart={startRecording}
              onStop={stopRecording}
              isDisabled={isProcessing}
              uiStrings={uiStrings}
            />
          )}

          {isProcessing && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              <p className="text-white mt-4 font-medium">{uiStrings.analyzing || 'Analyzing...'}</p>
            </div>
          )}

          {showFeedback && !isProcessing && feedback && (
            <FeedbackCard
              feedback={feedback}
              onPlayOriginal={playOriginalAudio}
              onPlayRecording={playUserRecording}
              onTryAgain={tryAgain}
              onNext={nextPhrase}
              fontFamily={languageInfo[learningLanguage]?.fontFamily || 'sans-serif'}
              uiStrings={uiStrings}
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default LessonPractice;
