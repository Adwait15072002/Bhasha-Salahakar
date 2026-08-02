export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English', fontFamily: 'sans-serif' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', fontFamily: "'Noto Sans Devanagari', sans-serif" },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', fontFamily: "'Noto Sans Tamil', sans-serif" },
  te: { name: 'Telugu', nativeName: 'తెలుగు', fontFamily: "'Noto Sans Telugu', sans-serif" },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', fontFamily: "'Noto Sans Kannada', sans-serif" },
  mr: { name: 'Marathi', nativeName: 'मराठी', fontFamily: "'Noto Sans Devanagari', sans-serif" }
};

export const getLanguageInfo = (code) => LANGUAGES[code] || LANGUAGES.en;
