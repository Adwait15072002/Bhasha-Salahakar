import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, Pause, Play } from 'lucide-react';
import { getArticles, getArticle } from '../services/api/articles-service';
import { getTTS } from '../services/api/practice-service';
import { getLanguageInfo } from '../constants/languages';
import { getUIStrings } from '../constants/uiStrings';
import { playAudioUrl } from '../utils/media';

const ArticlesScreen = ({ user, onBack }) => {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showNative, setShowNative] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [readAlongIndex, setReadAlongIndex] = useState(-1);
  const [isReadAlongPlaying, setIsReadAlongPlaying] = useState(false);
  const [readAlongError, setReadAlongError] = useState(null);
  const audioRef = useRef(null);

  const learningLang = user?.learningLanguage || 'kn';
  const nativeLang = user?.nativeLanguage || 'hi';
  const uiStrings = getUIStrings(nativeLang);
  const learningFont = getLanguageInfo(learningLang).fontFamily;
  const nativeFont = getLanguageInfo(nativeLang).fontFamily;

  useEffect(() => {
    getArticles(learningLang)
      .then((res) => res.success && setArticles(res.data.articles))
      .finally(() => setIsLoading(false));
  }, [learningLang]);

  const loadArticle = useCallback(
    async (id) => {
      setIsLoading(true);
      setReadAlongIndex(-1);
      setIsReadAlongPlaying(false);
      try {
        const res = await getArticle(
          id,
          learningLang,
          'native',
          showNative ? nativeLang : null
        );
        if (res.success) setSelected(res.data);
      } finally {
        setIsLoading(false);
      }
    },
    [learningLang, nativeLang, showNative]
  );

  const openArticle = async (id) => {
    setShowNative(false);
    setReadAlongIndex(-1);
    setIsReadAlongPlaying(false);
    setIsLoading(true);
    try {
      const res = await getArticle(id, learningLang, 'native', null);
      if (res.success) setSelected(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNative = async () => {
    const next = !showNative;
    setShowNative(next);
    if (!selected) return;
    setIsLoading(true);
    try {
      const res = await getArticle(
        selected.id,
        learningLang,
        'native',
        next ? nativeLang : null
      );
      if (res.success) setSelected(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  const stopReadAlong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsReadAlongPlaying(false);
    setReadAlongIndex(-1);
  };

  const playParagraph = async (index) => {
    if (!selected?.paragraphs?.[index]) return;
    setReadAlongError(null);
    stopReadAlong();
    setReadAlongIndex(index);
    setIsReadAlongPlaying(true);

    try {
      const text = selected.paragraphs[index];
      const res = await getTTS(text.slice(0, 500), learningLang);
      if (!res.success || !res.data?.audioUrl) {
        setReadAlongError('Could not load audio for this section');
        setIsReadAlongPlaying(false);
        return;
      }
      const audio = playAudioUrl(res.data.audioUrl, (msg) => setReadAlongError(msg));
      if (!audio) {
        setIsReadAlongPlaying(false);
        return;
      }
      audioRef.current = audio;
      audio.onended = () => {
        setIsReadAlongPlaying(false);
        if (index < selected.paragraphs.length - 1) {
          playParagraph(index + 1);
        } else {
          setReadAlongIndex(-1);
        }
      };
      audio.onerror = () => {
        setReadAlongError('Playback failed');
        setIsReadAlongPlaying(false);
      };
    } catch {
      setReadAlongError('Read-along failed');
      setIsReadAlongPlaying(false);
    }
  };

  const toggleReadAlong = () => {
    if (isReadAlongPlaying) {
      stopReadAlong();
    } else if (selected?.paragraphs?.length) {
      playParagraph(0);
    }
  };

  if (selected) {
    const displayParagraphs = showNative && selected.nativeTranslation?.paragraphs
      ? null
      : selected.paragraphs || selected.body.split(/\n\n+/);

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="px-6 py-4 flex flex-wrap items-center justify-between gap-2 border-b border-border">
          <button
            onClick={() => {
              stopReadAlong();
              setSelected(null);
            }}
            className="font-medium text-foreground"
          >
            ← Back
          </button>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={toggleNative}
              className="text-sm bg-muted text-foreground px-3 py-1 rounded-lg border border-border"
            >
              {showNative ? 'Learning language only' : `Show in ${getLanguageInfo(nativeLang).name}`}
            </button>
            <button
              onClick={toggleReadAlong}
              className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-lg flex items-center gap-1"
            >
              {isReadAlongPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isReadAlongPlaying ? 'Stop read-along' : 'Read along'}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-6 pb-8">
          {readAlongError && (
            <p className="text-destructive text-sm mt-4">{readAlongError}</p>
          )}
          <article className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl mx-auto mt-4">
            <p className="text-sm text-primary mb-1">{selected.state} • {selected.topic}</p>
            <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: learningFont }}>
              {selected.title}
            </h1>
            {showNative && selected.nativeTranslation && (
              <h2 className="text-lg text-muted-foreground mb-4" style={{ fontFamily: nativeFont }}>
                {selected.nativeTranslation.title}
              </h2>
            )}

            <div className="space-y-4">
              {(displayParagraphs || selected.paragraphs || []).map((para, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-3 ${
                    readAlongIndex === index ? 'bg-primary/10 border border-primary/30' : ''
                  }`}
                >
                  <p
                    className="text-foreground leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: learningFont }}
                  >
                    {para}
                  </p>
                  {showNative && selected.nativeTranslation?.paragraphs?.[index] && (
                    <p
                      className="text-muted-foreground text-sm mt-2 leading-relaxed"
                      style={{ fontFamily: nativeFont }}
                    >
                      {selected.nativeTranslation.paragraphs[index]}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => playParagraph(index)}
                    className="mt-2 text-xs text-primary flex items-center gap-1 hover:underline"
                  >
                    <Volume2 className="w-3 h-3" />
                    Listen to this section
                  </button>
                </div>
              ))}
            </div>

            {selected.sources?.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground mb-2">Original web sources</p>
                <ul className="space-y-2 text-sm">
                  {selected.sources.map((s) => (
                    <li key={s.url} className="border border-border rounded-lg p-3 bg-muted/50">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary font-medium hover:underline"
                      >
                        {s.source_name}
                      </a>
                      {s.focus && (
                        <p className="text-muted-foreground mt-1 text-xs">{s.focus}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-4 border-b border-border">
        <button onClick={onBack} className="font-medium text-foreground">← {uiStrings.home}</button>
        <h1 className="text-2xl font-bold text-foreground mt-2">Cultural Articles</h1>
        <p className="text-sm text-muted-foreground mt-1">
          In {getLanguageInfo(learningLang).nativeName} — your learning language
        </p>
      </header>
      <main className="flex-1 overflow-auto px-6 pb-8 space-y-3 mt-4">
        {isLoading && <p className="text-muted-foreground">Loading...</p>}
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() => openArticle(article.id)}
            className="w-full text-left bg-card border border-border rounded-xl p-4 shadow-sm hover:bg-muted transition"
          >
            <p className="text-xs text-primary">{article.state}</p>
            <p className="font-semibold text-foreground" style={{ fontFamily: learningFont }}>
              {article.title}
            </p>
          </button>
        ))}
      </main>
    </div>
  );
};

export default ArticlesScreen;
