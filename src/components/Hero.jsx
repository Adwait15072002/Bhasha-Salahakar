import { MessageCircle, Mic, Target, Globe } from 'lucide-react';

const Hero = () => {
  const features = [
    { icon: Mic, text: 'Real voice practice in 4+ Indian languages' },
    { icon: Target, text: 'AI-powered pronunciation feedback' },
    { icon: Globe, text: 'Learn Hindi, Tamil, Telugu, Kannada, Marathi' }
  ];

  const popularLanguages = [
    { name: 'हिन्दी', speakers: '500M+' },
    { name: 'मराठी', speakers: '83M+' },
    { name: 'తెలుగు', speakers: '81M+' },
    { name: 'தமிழ்', speakers: '69M+' },
    { name: 'ಕನ್ನಡ', speakers: '43M+' }
  ];

  return (
    <div className="text-foreground text-center md:text-left">
      <div className="flex items-center gap-3 mb-4 md:justify-start justify-center">
        <MessageCircle className="w-16 h-16 text-primary" />
        <div className="text-5xl">🇮🇳</div>
      </div>

      <h1 className="text-5xl font-bold mb-4 text-primary">भाषा सलाहकार</h1>
      <p className="text-2xl mb-2" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        भारतीय भाषाएँ सीखें
      </p>
      <p className="text-xl text-muted-foreground mb-8">
        AI voice practice for daily life in a new city
      </p>

      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 md:justify-start justify-center">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg">{feature.text}</span>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-muted-foreground mb-3">Popular languages:</p>
        <div className="flex flex-wrap gap-2">
          {popularLanguages.map((language, index) => (
            <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
              {language.name} ({language.speakers})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
