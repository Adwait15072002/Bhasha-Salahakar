const PhraseCard = ({
  sourceText,
  targetText,
  romanizedText,
  showRomanization,
  onToggleRomanization,
  onListen,
  isLoadingPreview,
  sourceFontFamily,
  targetFontFamily,
  uiStrings,
  learningLanguageName
}) => {
  return (
    <div className="bg-card text-card-foreground rounded-2xl p-8 text-center border border-border shadow-lg">
      <div className="inline-block bg-muted text-muted-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
        {uiStrings.lessonCurrent}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-6">
        {uiStrings.sayThisIn} {learningLanguageName}:
      </h2>

      <div className="bg-background rounded-xl p-6 mb-4 border border-border">
        <p className="text-3xl font-bold text-foreground" style={{ fontFamily: sourceFontFamily }}>
          {sourceText}
        </p>
      </div>

      <div className="bg-muted border border-border rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">{uiStrings.expectedAnswer}</p>
          <button onClick={onToggleRomanization} className="text-xs text-primary hover:underline">
            {showRomanization ? uiStrings.hideRomanization : uiStrings.showRomanization} {uiStrings.romanization}
          </button>
        </div>
        <p className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: targetFontFamily }}>
          {targetText}
        </p>
        {showRomanization && romanizedText && (
          <p className="text-sm text-muted-foreground italic">{romanizedText}</p>
        )}
      </div>

      {onListen && (
        <button
          onClick={onListen}
          disabled={isLoadingPreview}
          className="text-sm text-primary font-medium hover:underline disabled:opacity-50"
        >
          {isLoadingPreview ? 'Loading...' : 'Listen to correct pronunciation'}
        </button>
      )}
    </div>
  );
};

export default PhraseCard;