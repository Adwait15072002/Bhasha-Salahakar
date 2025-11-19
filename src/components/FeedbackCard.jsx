/**
 * Feedback Card Component
 * Shows AI-generated pronunciation feedback
 */

import { Check, Volume2 } from 'lucide-react';
import Button from './Buttons';

const FeedbackCard = ({ 
  feedback, 
  onPlayOriginal, 
  onPlayRecording, 
  onTryAgain, 
  onNext,
  fontFamily 
}) => {
  if (!feedback) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border-2 border-green-200 p-6 shadow-lg animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            बहुत बढ़िया! (Great job!)
          </h3>
          <p className="text-sm text-gray-600">
            You said:{' '}
            <span style={{ fontFamily }}>"{feedback.transcribedText}"</span>
          </p>
        </div>
      </div>

      {/* Word Analysis */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3">
          उच्चारण विश्लेषण (Pronunciation Analysis):
        </h4>
        <div className="space-y-2">
          {feedback.wordAnalysis.map((word, index) => (
            <WordFeedback key={index} word={word} fontFamily={fontFamily} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onPlayOriginal}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          Hear Original
        </button>
        <button
          onClick={onTryAgain}
          className="flex-1 bg-orange-100 text-orange-700 py-3 rounded-lg font-medium hover:bg-orange-200 transition"
        >
          Try Again
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Next Phrase →
        </button>
      </div>
    </div>
  );
};

/**
 * Word Feedback Sub-component
 */
const WordFeedback = ({ word, fontFamily }) => {
  const isGood = word.accuracy >= 85;
  const Icon = isGood ? Check : 'span';
  
  return (
    <div className="flex items-center gap-2">
      {isGood ? (
        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      ) : (
        <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <span className="text-yellow-600 text-xs font-bold">!</span>
        </div>
      )}
      <span className="text-gray-700">
        <strong style={{ fontFamily }}>{word.word}</strong> - {word.feedback} ({word.accuracy}%)
      </span>
    </div>
  );
};

export default FeedbackCard;