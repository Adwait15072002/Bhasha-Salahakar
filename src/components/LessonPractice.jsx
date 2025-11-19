/**
 * Lesson Practice Component
 * Main screen for voice-based lesson practice
 */

import PracticeHeader from './PracticeHeader';
import PhraseCard from './PhraseCard';
import RecordingButton from './RecordingButton';
import useLessonPractice from '../hooks/useLessonPractice';

import FeedbackCard from './FeedbackCard';

const LessonPractice = () => {
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

  const fontFamily = "'Noto Sans Devanagari', sans-serif";

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 flex flex-col">
      {/* Header */}
      <PracticeHeader
        lessonTitle="पाठ 1: नमस्ते और परिचय"
        currentIndex={currentPhraseIndex}
        total={totalPhrases}
        progressPercentage={progressPercentage}
        onExit={exitLesson}
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="max-w-2xl w-full space-y-8">
          
          {/* Phrase Card */}
          <PhraseCard
            englishText={currentPhrase.english}
            nativeText={currentPhrase.native}
            romanizedText={currentPhrase.romanized}
            showRomanization={showRomanization}
            onToggleRomanization={toggleRomanization}
            fontFamily={fontFamily}
          />

          {/* Recording Button */}
          {!showFeedback && (
            <RecordingButton
              isRecording={isRecording}
              onStart={startRecording}
              onStop={stopRecording}
            />
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              <p className="text-white mt-4 font-medium">Analyzing your pronunciation...</p>
            </div>
          )}

          {/* Feedback Card */}
          {showFeedback && !isProcessing && (
            <FeedbackCard
              feedback={feedback}
              onPlayOriginal={playOriginalAudio}
              onPlayRecording={playUserRecording}
              onTryAgain={tryAgain}
              onNext={nextPhrase}
              fontFamily={fontFamily}
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default LessonPractice;