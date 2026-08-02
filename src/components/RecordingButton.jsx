import { Mic } from 'lucide-react';

const RecordingButton = ({ isRecording, onStart, onStop, isDisabled, uiStrings }) => {
  const handleClick = () => {
    if (isDisabled) return;
    isRecording ? onStop() : onStart();
  };

  return (
    <div className="text-center">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all shadow-lg disabled:opacity-50 ${
          isRecording
            ? 'bg-destructive animate-pulse scale-110'
            : 'bg-primary hover:scale-105'
        }`}
      >
        <Mic className="w-16 h-16 text-primary-foreground" />
      </button>

      <div className="mt-6">
        {isRecording ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[0, 150, 300, 450].map((delay) => (
                <div
                  key={delay}
                  className="w-1 h-8 bg-destructive rounded animate-pulse"
                  style={{ animationDelay: `${delay}ms`, height: `${24 + (delay % 200)}px` }}
                />
              ))}
            </div>
            <p className="text-destructive font-medium">{uiStrings.listening}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">{uiStrings.clickAndSpeak}</p>
        )}
      </div>
    </div>
  );
};

export default RecordingButton;
