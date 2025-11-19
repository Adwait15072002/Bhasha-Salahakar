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

const LessonPractice = () => {
  const nativeLanguage = 'hi';  // Hindi
  const learningLanguage = 'kn'; // Kannada
  
  const uiStrings = getUIStrings(nativeLanguage);
  
  const languageInfo = {
    hi: { name: 'Hindi', nativeName: 'हिन्दी', fontFamily: "'Noto Sans Devanagari', sans-serif" },
    kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', fontFamily: "'Noto Sans Kannada', sans-serif" }
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
    startRecording,
    stopRecording,
    toggleRomanization,
    playOriginalAudio,
    playUserRecording,
    tryAgain,
    nextPhrase,
    previousPhrase,
    exitLesson
  } = useLessonPractice();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex flex-col">
      <PracticeHeader
        lessonTitle={uiStrings.lessonTitle}
        currentIndex={currentPhraseIndex}
        total={totalPhrases}
        progressPercentage={progressPercentage}
        onExit={exitLesson}
        uiStrings={uiStrings}
      />

      <main className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="max-w-2xl w-full space-y-8">
          
          <PhraseCard
            sourceText={currentPhrase.sourceText}
            targetText={currentPhrase.targetText}
            romanizedText={currentPhrase.romanized}
            showRomanization={showRomanization}
            onToggleRomanization={toggleRomanization}
            sourceFontFamily={languageInfo[nativeLanguage].fontFamily}
            targetFontFamily={languageInfo[learningLanguage].fontFamily}
            uiStrings={uiStrings}
            learningLanguageName={languageInfo[learningLanguage].nativeName}
          />

          {!showFeedback && (
            <RecordingButton
              isRecording={isRecording}
              onStart={startRecording}
              onStop={stopRecording}
              uiStrings={uiStrings}
            />
          )}

          {isProcessing && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              <p className="text-white mt-4 font-medium">{uiStrings.analyzing}</p>
            </div>
          )}

          {showFeedback && !isProcessing && (
            <FeedbackCard
              feedback={feedback}
              onPlayOriginal={playOriginalAudio}
              onPlayRecording={playUserRecording}
              onTryAgain={tryAgain}
              onNext={nextPhrase}
              fontFamily={languageInfo[learningLanguage].fontFamily}
              uiStrings={uiStrings}
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default LessonPractice;