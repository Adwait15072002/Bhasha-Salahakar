//Displays individual lesson information
import { Clock, Volume2, ChevronRight } from 'lucide-react';

const LessonCard = ({
  lesson,
  onStartLesson,
  languageFontFamily = "'Noto Sans Devanagari', sans-serif"
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
    <LockedLessonCard lesson={lesson} languageFontFamily={languageFontFamily} />
  ) : (
    <UnlockedLessonCard 
      lesson={lesson} 
      onStartLesson={handleClick}
      languageFontFamily={languageFontFamily}
    />
  );
};


const UnlockedLessonCard = ({ lesson, onStartLesson, languageFontFamily }) => {
  const { titleEnglish, titleNative, description, estimatedMinutes, phraseCount, emoji } = lesson;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Badge */}
            <LessonBadge text="LESSON 1 • CURRENT" />

            {/* Titles */}
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
            <LessonMetadata 
              estimatedMinutes={estimatedMinutes}
              phraseCount={phraseCount}
            />
          </div>

          {/* Emoji */}
          <div className="text-5xl">{emoji}</div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartLesson}
          className="w-full bg-white text-orange-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          अभ्यास शुरू करें (Start Practice)
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


const LockedLessonCard = ({ lesson, languageFontFamily }) => {
  const { titleEnglish, titleNative, description, estimatedMinutes, phraseCount } = lesson;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden opacity-90">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Badge */}
            <LessonBadge text="LOCKED" variant="locked" />

            {/* Titles */}
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
            <LessonMetadata 
              estimatedMinutes={estimatedMinutes}
              phraseCount={phraseCount}
              variant="locked"
            />
          </div>

          {/* Lock Icon */}
          <div className="text-4xl opacity-50">🔒</div>
        </div>
      </div>
    </div>
  );
};


const LessonBadge = ({ text, variant = "active" }) => {
  const variantStyles = {
    active: "bg-white/20 text-white",
    locked: "bg-gray-200 text-gray-600"
  };

  return (
    <div className={`inline-block ${variantStyles[variant]} text-xs px-3 py-1 rounded-full mb-2`}>
      {text}
    </div>
  );
};


const LessonMetadata = ({ estimatedMinutes, phraseCount, variant = "active" }) => {
  const textColor = variant === "active" ? "text-white" : "text-gray-500";

  return (
    <div className={`flex items-center gap-4 text-sm ${textColor}`}>
      <MetadataItem icon={Clock} value={`${estimatedMinutes} min`} />
      <MetadataItem icon={Volume2} value={`${phraseCount} phrases`} />
    </div>
  );
};


 
const MetadataItem = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-1">
    <Icon className="w-4 h-4" />
    <span>{value}</span>
  </div>
);

export default LessonCard;
