
import { useState, useRef, useEffect } from 'react';
import { submitAudio, getTTS } from '../services/api/practice-service';
import { getPhrases } from '../services/api/lesson-service';
import { completeLesson } from '../services/api/progress-service';
import { playAudioUrl } from '../utils/media';

const useLessonPractice = (user, categorySlug) => {
  const [phrases, setPhrases] = useState([]);
  const [isLoadingPhrases, setIsLoadingPhrases] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showRomanization, setShowRomanization] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [correctAudioUrl, setCorrectAudioUrl] = useState(null);
  const [hasCorrectAudio, setHasCorrectAudio] = useState(false);
  const [isPlayingCorrect, setIsPlayingCorrect] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [error, setError] = useState(null);
  const [lessonComplete, setLessonComplete] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const correctAudioRef = useRef(null);

  const nativeLanguage = user?.nativeLanguage || 'hi';
  const learningLanguage = user?.learningLanguage || 'kn';

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        setIsLoadingPhrases(true);
        const response = await getPhrases(nativeLanguage, learningLanguage, categorySlug);
        if (response.success && response.data.phrases?.length) {
          setPhrases(response.data.phrases);
        } else {
          setError('No phrases found for this category');
        }
      } catch (err) {
        console.error('Failed to fetch phrases:', err);
        setError(err.response?.data?.message || 'Failed to load phrases');
      } finally {
        setIsLoadingPhrases(false);
      }
    };

    if (categorySlug) fetchPhrases();
  }, [nativeLanguage, learningLanguage, categorySlug]);

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
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setHasRecorded(true);
        stream.getTracks().forEach((track) => track.stop());
        processRecording(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setShowFeedback(false);
      setError(null);
    } catch {
      setError('Please allow microphone access');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processRecording = async (blob) => {
    if (!currentPhrase) return;
    setIsProcessing(true);
    setError(null);

    try {
      const response = await submitAudio(blob, currentPhrase.targetText, learningLanguage);
      if (response.success && response.data?.feedback) {
        setFeedback(response.data.feedback);
        setCorrectAudioUrl(response.data.correctAudioUrl || null);
        setHasCorrectAudio(Boolean(response.data.hasCorrectAudio ?? response.data.correctAudioUrl));
        setShowFeedback(true);
      } else {
        setError('Failed to process audio');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process audio');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleRomanization = () => setShowRomanization((prev) => !prev);

  const playOriginalAudio = () => {
    if (!correctAudioUrl) {
      setError('Correct pronunciation audio is not available yet');
      return;
    }

    if (!correctAudioRef.current) {
      correctAudioRef.current = new Audio();
      correctAudioRef.current.onended = () => setIsPlayingCorrect(false);
      correctAudioRef.current.onerror = () => {
        setIsPlayingCorrect(false);
        setError('Failed to play audio');
      };
    }

    const resolved = playAudioUrl(correctAudioUrl, (msg) => setError(msg));
    if (resolved) {
      correctAudioRef.current = resolved;
      correctAudioRef.current.onended = () => setIsPlayingCorrect(false);
      setIsPlayingCorrect(true);
    }
  };

  const playPhrasePreview = async () => {
    if (!currentPhrase) return;
    setIsLoadingPreview(true);
    setError(null);
    try {
      const response = await getTTS(currentPhrase.targetText, learningLanguage);
      if (response.success && response.data?.audioUrl) {
        playAudioUrl(response.data.audioUrl, (msg) => setError(msg));
      } else {
        setError('Could not load pronunciation preview');
      }
    } catch {
      setError('Could not load pronunciation preview');
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const playUserRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      new Audio(url).play();
    }
  };

  const tryAgain = () => {
    setShowFeedback(false);
    setHasRecorded(false);
    setAudioBlob(null);
    setFeedback(null);
    setCorrectAudioUrl(null);
    setHasCorrectAudio(false);
    setError(null);
  };

  const finishLesson = async () => {
    try {
      await completeLesson(categorySlug);
    } catch (err) {
      console.error('Failed to record lesson completion:', err);
    }
    setLessonComplete(true);
  };

  const nextPhrase = () => {
    if (currentPhraseIndex < totalPhrases - 1) {
      setCurrentPhraseIndex((prev) => prev + 1);
      tryAgain();
    } else {
      finishLesson();
    }
  };

  const previousPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex((prev) => prev - 1);
      tryAgain();
    }
  };

  return {
    currentPhrase,
    currentPhraseIndex,
    totalPhrases,
    progressPercentage,
    isLoadingPhrases,
    isRecording,
    hasRecorded,
    isProcessing,
    audioBlob,
    showFeedback,
    feedback,
    correctAudioUrl,
    hasCorrectAudio,
    isPlayingCorrect,
    isLoadingPreview,
    showRomanization,
    error,
    lessonComplete,
    startRecording,
    stopRecording,
    toggleRomanization,
    playOriginalAudio,
    playPhrasePreview,
    playUserRecording,
    tryAgain,
    nextPhrase,
    previousPhrase
  };
};

export default useLessonPractice;
