import { Check, Volume2 } from 'lucide-react';

const FeedbackCard = ({
  feedback,
  hasCorrectAudio,
  onPlayOriginal,
  onTryAgain,
  onNext,
  fontFamily
}) => {
  if (!feedback) return null;

  const wordAnalysis = feedback.wordAnalysis || [];
  const score = feedback.overallScore ?? 0;
  const isStrong = score >= 70;

  return (
    <div className="bg-card text-card-foreground rounded-xl border-2 border-primary/30 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isStrong ? 'bg-primary/20' : 'bg-muted'}`}>
          <Check className={`w-7 h-7 ${isStrong ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Score: {score}% {isStrong ? '— Great job!' : '— Keep practicing!'}
          </h3>
          <p className="text-sm text-muted-foreground">
            You said:{' '}
            <span style={{ fontFamily }}>"{feedback.transcribedText || '—'}"</span>
          </p>
        </div>
      </div>

      {feedback.generalFeedback && (
        <p className="text-sm text-foreground mb-4 bg-muted rounded-lg p-3">{feedback.generalFeedback}</p>
      )}

      {wordAnalysis.length > 0 && (
        <div className="bg-muted rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-foreground mb-3">Pronunciation Analysis</h4>
          <div className="space-y-2">
            {wordAnalysis.map((word, index) => (
              <WordFeedback key={index} word={word} fontFamily={fontFamily} />
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onPlayOriginal}
          disabled={!hasCorrectAudio}
          className="flex-1 min-w-[120px] bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Volume2 className="w-4 h-4" />
          Hear Original
        </button>
        <button
          onClick={onTryAgain}
          className="flex-1 min-w-[120px] bg-muted text-foreground py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Try Again
        </button>
        <button
          onClick={onNext}
          className="flex-1 min-w-[120px] bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Next Phrase →
        </button>
      </div>
    </div>
  );
};

const WordFeedback = ({ word, fontFamily }) => {
  const isGood = (word.accuracy ?? 0) >= 85;

  return (
    <div className="flex items-center gap-2">
      {isGood ? (
        <Check className="w-5 h-5 text-primary flex-shrink-0" />
      ) : (
        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <span className="text-muted-foreground text-xs font-bold">!</span>
        </div>
      )}
      <span className="text-foreground text-sm">
        <strong style={{ fontFamily }}>{word.word}</strong> — {word.feedback} ({word.accuracy}%)
      </span>
    </div>
  );
};

export default FeedbackCard;
