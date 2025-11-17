//Presents main UI of Landing Page
//lucide-react package used for icons

import { MessageCircle, Mic, Target, Globe } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: Mic,
      text: "Real voice practice in 10+ Indian languages"
    },
    {
      icon: Target,
      text: "AI-powered pronunciation feedback"
    },
    {
      icon: Globe,
      text: "Learn Devanagari, Tamil, Telugu scripts"
    }
  ];

  const popularLanguages = [
    { name: "हिन्दी", speakers: "600M+" },
    { name: "தமிழ்", speakers: "80M+" },
    { name: "తెలుగు", speakers: "90M+" },
    { name: "বাংলা", speakers: "270M+" }
  ];

  return (
    <div className="text-white text-center md:text-left">
      {/* Logo and Flag */}
      <div className="flex items-center gap-3 mb-4 md:justify-start justify-center">
        <MessageCircle className="w-16 h-16" />
        <div className="text-5xl">🇮🇳</div>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl font-bold mb-4">भाषा सलाहकार</h1>
      
      {/* Subheadings */}
      <p className="text-2xl opacity-90 mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        भारतीय भाषाएँ सीखें
      </p>
      <p className="text-xl opacity-80 mb-8">
        AI Voice प्रॅक्टिससह भारतीय भाषांवर प्रभुत्व मिळवा
      </p>

      {/* Features List */}
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <FeatureItem 
            key={index}
            Icon={feature.icon}
            text={feature.text}
          />
        ))}
      </div>

      {/* Popular Languages */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <p className="text-sm opacity-75 mb-3">Popular languages:</p>
        <div className="flex flex-wrap gap-2">
          {popularLanguages.map((language, index) => (
            <LanguageTag 
              key={index}
              name={language.name}
              speakers={language.speakers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Feature Item Sub-component
 * Displays individual feature with icon
 */
const FeatureItem = ({ Icon, text }) => (
  <div className="flex items-center gap-3 md:justify-start justify-center">
    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-lg">{text}</span>
  </div>
);

/**
 * Language Tag Sub-component
 * Displays language name and speaker count
 */
const LanguageTag = ({ name, speakers }) => (
  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
    {name} ({speakers})
  </div>
);

export default Hero;
