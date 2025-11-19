const PhraseCard = ({ 
  englishText, 
  nativeText, 
  romanizedText, 
  showRomanization, 
  onToggleRomanization,
  fontFamily 
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-white/50 shadow-lg">
      <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
        बोलने का अभ्यास (Practice Speaking)
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Say this in Hindi:
      </h2>
      
      {/* English Phrase */}
      <div className="bg-white rounded-xl p-6 mb-4 shadow-md">
        <p className="text-3xl font-bold text-gray-800">{englishText}</p>
      </div>

      {/* Expected Answer */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">Expected answer:</p>
          <button 
            onClick={onToggleRomanization}
            className="text-xs text-blue-600 hover:underline"
          >
            {showRomanization ? 'Hide' : 'Show'} Romanization
          </button>
        </div>
        <p 
          className="text-2xl font-bold text-gray-800 mb-1"
          style={{ fontFamily }}
        >
          {nativeText}
        </p>
        {showRomanization && (
          <p className="text-sm text-gray-600 italic">{romanizedText}</p>
        )}
      </div>
    </div>
  );
};

export default PhraseCard;