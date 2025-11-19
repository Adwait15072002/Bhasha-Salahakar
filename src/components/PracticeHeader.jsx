//Lesson Progress and Exit Button
import { X } from 'lucide-react';

const PracticeHeader = ({ 
  lessonTitle, 
  currentIndex, 
  total, 
  progressPercentage, 
  onExit 
}) => {
  return (
    <header className="px-6 py-4 flex items-center justify-between border-b border-white/20">
      <button 
        onClick={onExit}
        className="text-white hover:text-white/80 font-medium flex items-center gap-2"
      >
        <X className="w-5 h-5" />
        Exit
      </button>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="text-center mb-2">
          <span className="text-sm font-medium text-white drop-shadow">
            {lessonTitle}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <span className="text-sm font-medium text-white">
        {currentIndex + 1} / {total}
      </span>
    </header>
  );
};

export default PracticeHeader;
