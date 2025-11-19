const LanguageSelect = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  disabled,
  excludeLanguage = null // Exclude this language from options
}) => {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ];

  const filteredLanguages = excludeLanguage 
    ? languages.filter(lang => lang.code !== excludeLanguage)
    : languages;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none disabled:bg-gray-100"
      >
        <option value="">Select language...</option>
        {filteredLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default LanguageSelect;