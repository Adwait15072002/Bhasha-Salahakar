
import { useState, useRef, useEffect } from 'react';
import { submitAudio, getTTS } from '../services/api/practice-service';
import { getPhrases } from '../services/api/lesson-service';

const useLessonPractice = (user) => {
  // Phrases state
  const [phrases, setPhrases] = useState([]);
  const [isLoadingPhrases, setIsLoadingPhrases] = useState(true);
  
  // Practice state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showRomanization, setShowRomanization] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Audio playback state
  const [correctAudioUrl, setCorrectAudioUrl] = useState(null);
  const [isPlayingCorrect, setIsPlayingCorrect] = useState(false);
  const [error, setError] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const correctAudioRef = useRef(null);

  const nativeLanguage = user?.nativeLanguage || 'hi';
  const learningLanguage = user?.learningLanguage || 'kn';

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        setIsLoadingPhrases(true);
        console.log('📚 Fetching phrases for:', `${nativeLanguage}-${learningLanguage}`);
        
        const response = await getPhrases(nativeLanguage, learningLanguage);
        
        if (response.success && response.data.phrases) {
          setPhrases(response.data.phrases);
          console.log('Loaded', response.data.phrases.length, 'phrases');
        } else {
          setError('No phrases found for this language pair');
        }
      } catch (err) {
        console.error('Failed to fetch phrases:', err);
        setError('Failed to load phrases. Please try again.');
        
        
        setPhrases([
          {
            id: 1,
            sourceText: "नमस्ते, आप कैसे हैं?",
            targetText: "ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?",
            romanized: "Namaskāra, nīvu hēgiddīri?",
            sourceLanguage: "hi",
            targetLanguage: "kn"
          },
          {
            id: 2,
            sourceText: "मैं ठीक हूँ, धन्यवाद",
            targetText: "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು",
            romanized: "Nānu cennāgiddēne, dhan'yavādagaḷu",
            sourceLanguage: "hi",
            targetLanguage: "kn"
          }
        ]);
      } finally {
        setIsLoadingPhrases(false);
      }
    };

    fetchPhrases();
  }, [nativeLanguage, learningLanguage]);

  const currentPhrase = phrases[currentPhraseIndex];
  const totalPhrases = phrases.length;
  const progressPercentage = totalPhrases > 0 
    ? ((currentPhraseIndex + 1) / totalPhrases) * 100 
    : 0;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setHasRecorded(true);
        stream.getTracks().forEach(track => track.stop());
        processRecording(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setShowFeedback(false);
      setError(null);
      console.log('Recording started');
      
    } catch (error) {
      console.error('Microphone error:', error);
      setError('Please allow microphone access');
    }
  };

  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log('Recording stopped');
    }
  };

  
  const processRecording = async (blob) => {
    if (!currentPhrase) {
      setError('No phrase selected');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log('Submitting audio to backend...');
      console.log('Expected text:', currentPhrase.targetText);
      console.log('Target language:', learningLanguage);
      
      // Submit audio to backend (Sarvam STT + LLM Feedback + TTS)
      const response = await submitAudio(
        blob,
        currentPhrase.targetText,
        learningLanguage
      );

      console.log('Backend response:', response);

      if (response.success) {
        setFeedback(response.data.feedback);
        setCorrectAudioUrl(response.data.correctAudioUrl);
        setShowFeedback(true);
        console.log('Score:', response.data.feedback.overallScore);
      } else {
        setError('Failed to process audio');
      }

    } catch (err) {
      console.error('Error processing audio:', err);
      setError(
        err.response?.data?.message || 
        'Failed to process audio. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  
  const toggleRomanization = () => setShowRomanization(prev => !prev);

  
  const playOriginalAudio = () => {
    if (!correctAudioUrl) {
      console.warn('No correct audio URL available yet');
      setError('Please record your attempt first to hear the correct pronunciation');
      return;
    }

    try {
      // Create audio element if not exists
      if (!correctAudioRef.current) {
        correctAudioRef.current = new Audio();
        correctAudioRef.current.onended = () => setIsPlayingCorrect(false);
        correctAudioRef.current.onerror = (e) => {
          console.error('Audio playback error:', e);
          setIsPlayingCorrect(false);
          setError('Failed to play audio');
        };
      }

      // Construct full URL
      const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
      const fullUrl = correctAudioUrl.startsWith('http') 
        ? correctAudioUrl 
        : `${baseUrl}${correctAudioUrl}`;
      
      console.log('Playing correct pronunciation:', fullUrl);
      
      correctAudioRef.current.src = fullUrl;
      correctAudioRef.current.play();
      setIsPlayingCorrect(true);
      
    } catch (err) {
      console.error('Error playing audio:', err);
      setError('Failed to play audio');
    }
  };

  
  const playUserRecording = () => {
    if (audioBlob) {
      try {
        const url = URL.createObjectURL(audioBlob);
        const audio = new Audio(url);
        audio.play();
        console.log('Playing user recording');
      } catch (err) {
        console.error('Error playing recording:', err);
        setError('Failed to play recording');
      }
    }
  };

  
  const tryAgain = () => {
    setShowFeedback(false);
    setHasRecorded(false);
    setAudioBlob(null);
    setFeedback(null);
    setCorrectAudioUrl(null);
    setError(null);
    console.log('Trying again');
  };

  
  const nextPhrase = () => {
    if (currentPhraseIndex < totalPhrases - 1) {
      setCurrentPhraseIndex(prev => prev + 1);
      setShowFeedback(false);
      setHasRecorded(false);
      setAudioBlob(null);
      setFeedback(null);
      setCorrectAudioUrl(null);
      setError(null);
      console.log('Next phrase');
    } else {
      alert('Lesson Complete!');
    }
  };

  
  const previousPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(prev => prev - 1);
      setShowFeedback(false);
      setHasRecorded(false);
      setAudioBlob(null);
      setFeedback(null);
      setCorrectAudioUrl(null);
      setError(null);
      console.log('Previous phrase');
    }
  };

  
  const exitLesson = () => {
    if (window.confirm('Exit lesson? Progress will be saved.')) {
      console.log('Exiting lesson');
    }
  };

  return {
    // Phrase data
    currentPhrase,
    currentPhraseIndex,
    totalPhrases,
    progressPercentage,
    isLoadingPhrases,
    
    // Recording state
    isRecording,
    hasRecorded,
    isProcessing,
    audioBlob,
    
    // Feedback state
    showFeedback,
    feedback,
    
    // Audio playback
    correctAudioUrl,
    isPlayingCorrect,
    
    // UI state
    showRomanization,
    error,
    
    
    startRecording,
    stopRecording,
    toggleRomanization,
    playOriginalAudio,
    playUserRecording,
    tryAgain,
    nextPhrase,
    previousPhrase,
    exitLesson
  };
};

export default useLessonPractice;