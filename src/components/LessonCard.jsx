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
    if (!isLocked) {
      onStartLesson(id);
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
    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-2">
              {uiStrings.lessonCurrent}
            </div>

            {/* Titles - Learning language */}
            <h3 
              className="text-2xl font-bold mb-1" 
              style={{ fontFamily: languageFontFamily }}
            >
              {titleNative}
            </h3>
            <h4 className="text-xl mb-2 opacity-90">{titleEnglish}</h4>

            {/* Description */}
            <p className="text-white/90 text-sm mb-3">{description}</p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-white">
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

          {/* Emoji */}
          <div className="text-5xl">{emoji}</div>
        </div>

        {/* Start Button - Native language */}
        <button
          onClick={onStartLesson}
          className="w-full bg-white text-orange-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
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
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden opacity-90">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full mb-2">
              {uiStrings.locked}
            </div>

            {/* Titles - Learning language */}
            <h3 
              className="text-xl font-bold text-gray-800 mb-1"
              style={{ fontFamily: languageFontFamily }}
            >
              {titleNative}
            </h3>
            <h4 className="text-lg mb-2">{titleEnglish}</h4>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3">{description}</p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
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