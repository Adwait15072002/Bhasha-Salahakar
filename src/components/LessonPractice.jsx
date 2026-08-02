/**
 * Lesson Practice Component
 */

import PracticeHeader from './PracticeHeader';
import PhraseCard from './PhraseCard';
import RecordingButton from './RecordingButton';
import FeedbackCard from './FeedbackCard';
import useLessonPractice from '../hooks/useLessonPractice';
import { getUIStrings } from '../constants/uiStrings';
import { getLanguageInfo } from '../constants/languages';

const LessonPractice = ({ user, categorySlug, onExit }) => {
  const nativeLanguage = user?.nativeLanguage || 'hi';
  const learningLanguage = user?.learningLanguage || 'kn';
  const uiStrings = getUIStrings(nativeLanguage);
  const languageInfo = {
    [nativeLanguage]: getLanguageInfo(nativeLanguage),
    [learningLanguage]: getLanguageInfo(learningLanguage)
  };

  const {
    currentPhrase,
    currentPhraseIndex,
    totalPhrases,
    progressPercentage,
    isRecording,
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
    playPhrasePreview,
    tryAgain,
    nextPhrase,
    lessonComplete,
    hasCorrectAudio,
    isLoadingPreview
  } = useLessonPractice(user, categorySlug);

  if (isLoadingPhrases) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-4" />
          <p className="text-xl font-semibold">Loading phrases...</p>
        </div>
      </div>
    );
  }

  if (error && !currentPhrase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
          <p className="text-destructive text-lg mb-4">{error}</p>
          <button onClick={onExit} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentPhrase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
          <p className="text-foreground text-lg mb-4">No phrases available</p>
          <button onClick={onExit} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
          {error && (
            <div className="bg-destructive/10 text-destructive border border-destructive/30 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <PhraseCard
            sourceText={currentPhrase.sourceText}
            targetText={currentPhrase.targetText}
            romanizedText={currentPhrase.romanized}
            showRomanization={showRomanization}
            onToggleRomanization={toggleRomanization}
            onListen={playPhrasePreview}
            isLoadingPreview={isLoadingPreview}
            sourceFontFamily={languageInfo[nativeLanguage]?.fontFamily || 'sans-serif'}
            targetFontFamily={languageInfo[learningLanguage]?.fontFamily || 'sans-serif'}
            uiStrings={uiStrings}
            learningLanguageName={languageInfo[learningLanguage]?.nativeName || learningLanguage}
          />

          {!showFeedback && !lessonComplete && (
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
              <p className="text-muted-foreground mt-4 font-medium">{uiStrings.analyzing || 'Analyzing...'}</p>
            </div>
          )}

          {lessonComplete && (
            <div className="bg-card border border-border rounded-xl p-6 text-center shadow-sm">
              <p className="text-xl font-bold text-foreground mb-4">{uiStrings.lessonComplete}</p>
              <button onClick={onExit} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                Back to Dashboard
              </button>
            </div>
          )}

          {showFeedback && !isProcessing && feedback && !lessonComplete && (
            <FeedbackCard
              feedback={feedback}
              hasCorrectAudio={hasCorrectAudio}
              onPlayOriginal={playOriginalAudio}
              onTryAgain={tryAgain}
              onNext={nextPhrase}
              fontFamily={languageInfo[learningLanguage]?.fontFamily || 'sans-serif'}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonPractice;
