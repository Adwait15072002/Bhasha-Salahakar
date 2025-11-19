import { Mic } from 'lucide-react';

const RecordingButton = ({ 
  isRecording, 
  onStart, 
  onStop,
  uiStrings
}) => {
  const handleClick = () => {
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleClick}
        className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all shadow-2xl ${
          isRecording
            ? 'bg-red-500 animate-pulse scale-110'
            : 'bg-gradient-to-br from-orange-500 to-red-500 hover:scale-105'
        }`}
      >
        <Mic className="w-16 h-16 text-white" />
      </button>

      <div className="mt-6">
        {isRecording ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-red-500 rounded animate-pulse" style={{animationDelay: '0ms'}}></div>
              <div className="w-1 h-12 bg-red-500 rounded animate-pulse" style={{animationDelay: '150ms'}}></div>
              <div className="w-1 h-6 bg-red-500 rounded animate-pulse" style={{animationDelay: '300ms'}}></div>
              <div className="w-1 h-10 bg-red-500 rounded animate-pulse" style={{animationDelay: '450ms'}}></div>
            </div>
            <p className="text-red-600 font-medium">{uiStrings.listening}</p>
          </div>
        ) : (
          <p className="text-gray-600">{uiStrings.clickAndSpeak}</p>
        )}
      </div>
    </div>
  );
};

export default RecordingButton;