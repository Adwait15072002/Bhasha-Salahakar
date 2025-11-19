
import { useState, useRef } from 'react';

const useLessonPractice = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showRomanization, setShowRomanization] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Mock phrases
  const phrases = [
    {
      id: 1,
      english: "Hello, how are you?",
      native: "नमस्ते, आप कैसे हैं?",
      romanized: "Namaste, aap kaise hain?"
    },
    {
      id: 2,
      english: "I am fine, thank you",
      native: "मैं ठीक हूँ, धन्यवाद",
      romanized: "Main theek hoon, dhanyavaad"
    },
    {
      id: 3,
      english: "What is your name?",
      native: "आपका नाम क्या है?",
      romanized: "Aapka naam kya hai?"
    }
  ];

  const currentPhrase = phrases[currentPhraseIndex];
  const totalPhrases = phrases.length;
  const progressPercentage = ((currentPhraseIndex + 1) / totalPhrases) * 100;

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
    } catch (error) {
      console.error('Microphone error:', error);
      alert('Please allow microphone access');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processRecording = async (blob) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockFeedback = {
      transcribedText: currentPhrase.native,
      overallScore: Math.floor(Math.random() * 20) + 80,
      wordAnalysis: [
        { word: "नमस्ते", accuracy: 100, feedback: "Perfect!" },
        { word: "आप", accuracy: 95, feedback: "Excellent!" },
        { word: "कैसे", accuracy: 88, feedback: "Good! Try emphasizing more." },
        { word: "हैं", accuracy: 92, feedback: "Great!" }
      ]
    };

    setFeedback(mockFeedback);
    setShowFeedback(true);
    setIsProcessing(false);
  };

  const toggleRomanization = () => setShowRomanization(prev => !prev);

  const playOriginalAudio = () => {
    console.log('Playing TTS audio');
    alert('TTS integration coming soon!');
  };

  const playUserRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      audio.play();
    }
  };

  const tryAgain = () => {
    setShowFeedback(false);
    setHasRecorded(false);
    setAudioBlob(null);
    setFeedback(null);
  };

  const nextPhrase = () => {
    if (currentPhraseIndex < totalPhrases - 1) {
      setCurrentPhraseIndex(prev => prev + 1);
      setShowFeedback(false);
      setHasRecorded(false);
      setAudioBlob(null);
      setFeedback(null);
    } else {
      alert('Lesson Complete! 🎉');
    }
  };

  const previousPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(prev => prev - 1);
      setShowFeedback(false);
      setHasRecorded(false);
      setAudioBlob(null);
      setFeedback(null);
    }
  };

  const exitLesson = () => {
    if (window.confirm('Exit lesson? Progress will be saved.')) {
      console.log('Exiting');
    }
  };

  return {
    currentPhrase,
    currentPhraseIndex,
    totalPhrases,
    progressPercentage,
    isRecording,
    hasRecorded,
    isProcessing,
    showFeedback,
    feedback,
    showRomanization,
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