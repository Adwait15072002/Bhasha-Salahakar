import { X } from 'lucide-react';

const PracticeHeader = ({ lessonTitle, currentIndex, total, progressPercentage, onExit, uiStrings }) => (
  <header className="px-6 py-4 flex items-center justify-between border-b border-border bg-card">
    <button onClick={onExit} className="text-foreground hover:opacity-80 font-medium flex items-center gap-2">
      <X className="w-5 h-5" />
      {uiStrings.exit}
    </button>

    <div className="flex-1 max-w-md mx-4">
      <div className="text-center mb-2">
        <span className="text-sm font-medium text-foreground">{lessonTitle}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>

    <span className="text-sm font-medium text-muted-foreground">
      {currentIndex + 1} / {total}
    </span>
  </header>
);

export default PracticeHeader;
