//Displays individual lesson information
import { Clock, Volume2, ChevronRight } from 'lucide-react';

const LessonCard = ({
  lesson,
  onStartLesson,
  languageFontFamily,
  uiStrings
}) => {
  const { 
    id,
    titleEnglish, 
    titleNative, 
    description, 
    estimatedMinutes, 
    phraseCount, 
    emoji,
    isLocked 
  } = lesson;

  const handleClick = () => {
    console.log('LessonCard: Card clicked, lesson ID:', id, 'isLocked:', isLocked);
    
    if (!isLocked) {
      if (onStartLesson) {
        console.log('LessonCard: Calling onStartLesson with ID:', id);
        onStartLesson(id);
      } else {
        console.error('LessonCard: onStartLesson prop is missing!');
      }
    } else {
      console.log('LessonCard: Lesson is locked, not starting');
    }
  };

  return isLocked ? (
    <LockedLessonCard 
      lesson={lesson} 
      languageFontFamily={languageFontFamily}
      uiStrings={uiStrings}
    />
  ) : (
    <UnlockedLessonCard 
      lesson={lesson} 
      onStartLesson={handleClick}
      languageFontFamily={languageFontFamily}
      uiStrings={uiStrings}
    />
  );
};

const UnlockedLessonCard = ({ lesson, onStartLesson, languageFontFamily, uiStrings }) => {
  const { titleEnglish, titleNative, description, estimatedMinutes, phraseCount, emoji } = lesson;

  return (
    <div
      className="bg-primary text-primary-foreground rounded-xl shadow-lg overflow-hidden cursor-pointer hover:opacity-95 transition"
      onClick={onStartLesson}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="inline-block bg-primary-foreground/20 text-xs px-3 py-1 rounded-full mb-2">
              {uiStrings.lessonCurrent}
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: languageFontFamily }}>
              {titleNative}
            </h3>
            <h4 className="text-xl mb-2 opacity-90">{titleEnglish}</h4>
            <p className="text-sm mb-3 opacity-90">{description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{estimatedMinutes} {uiStrings.minutes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4" />
                <span>{phraseCount} {uiStrings.phrases}</span>
              </div>
            </div>
          </div>
          <div className="text-5xl">{emoji}</div>
        </div>
        <button className="w-full bg-primary-foreground text-primary py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
          {uiStrings.startPractice}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const LockedLessonCard = ({ lesson, languageFontFamily, uiStrings }) => {
  const { titleEnglish, titleNative, description, estimatedMinutes, phraseCount } = lesson;

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden opacity-80 border border-border">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="inline-block bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full mb-2">
              {uiStrings.locked}
            </div>
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: languageFontFamily }}>
              {titleNative}
            </h3>
            <h4 className="text-lg mb-2">{titleEnglish}</h4>
            <p className="text-muted-foreground text-sm mb-3">{description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{estimatedMinutes} {uiStrings.minutes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4" />
                <span>{phraseCount} {uiStrings.phrases}</span>
              </div>
            </div>
          </div>

          {/* Lock Icon */}
          <div className="text-4xl opacity-50">🔒</div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
