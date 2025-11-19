const PhraseCard = ({ 
  sourceText,     // Hindi phrase
  targetText,     // Kannada translation
  romanizedText,  // Romanization
  showRomanization, 
  onToggleRomanization,
  sourceFontFamily,
  targetFontFamily,
  uiStrings,
  learningLanguageName
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-white/50 shadow-lg">
      <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
        {uiStrings.lessonCurrent}
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {uiStrings.sayThisIn} {learningLanguageName}:
      </h2>
      
      {/* Source Phrase (Native language) */}
      <div className="bg-white rounded-xl p-6 mb-4 shadow-md">
        <p 
          className="text-3xl font-bold text-gray-800"
          style={{ fontFamily: sourceFontFamily }}
        >
          {sourceText}
        </p>
      </div>

      {/* Expected Answer (Learning language) */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">{uiStrings.expectedAnswer}</p>
          <button 
            onClick={onToggleRomanization}
            className="text-xs text-blue-600 hover:underline"
          >
            {showRomanization ? uiStrings.hideRomanization : uiStrings.showRomanization} {uiStrings.romanization}
          </button>
        </div>
        <p 
          className="text-2xl font-bold text-gray-800 mb-1"
          style={{ fontFamily: targetFontFamily }}
        >
          {targetText}
        </p>
        {showRomanization && (
          <p className="text-sm text-gray-600 italic">{romanizedText}</p>
        )}
      </div>
    </div>
  );
};

export default PhraseCard;