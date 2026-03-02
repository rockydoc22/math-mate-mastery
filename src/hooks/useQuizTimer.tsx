import { useState, useEffect, useCallback } from 'react';

// SAT Timing: 134 minutes for 98 questions = ~82 seconds per question
const SECONDS_PER_QUESTION = 82;

export interface QuizTimerOptions {
  questionCount: number;
  enabled?: boolean;
  onTimeUp?: () => void;
}

export const useQuizTimer = ({ questionCount, enabled = true, onTimeUp }: QuizTimerOptions) => {
  const totalSeconds = questionCount * SECONDS_PER_QUESTION;
  const [timeRemaining, setTimeRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(enabled);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Re-initialize timer when questionCount changes (questions load async)
  useEffect(() => {
    if (totalSeconds > 0) {
      setTimeRemaining(totalSeconds);
      setIsRunning(enabled);
      setIsTimeUp(false);
    }
  }, [totalSeconds, enabled]);

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Calculate progress percentage
  const progressPercent = ((totalSeconds - timeRemaining) / totalSeconds) * 100;

  // Timer tick
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          setIsRunning(false);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, onTimeUp]);

  // Pause/resume
  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);
  const toggle = useCallback(() => setIsRunning(prev => !prev), []);

  // Reset timer
  const reset = useCallback(() => {
    setTimeRemaining(totalSeconds);
    setIsTimeUp(false);
    setIsRunning(enabled);
  }, [totalSeconds, enabled]);

  // Get time status for styling
  const getTimeStatus = useCallback(() => {
    const percentRemaining = (timeRemaining / totalSeconds) * 100;
    if (percentRemaining <= 10) return 'critical'; // Red
    if (percentRemaining <= 25) return 'warning';  // Orange
    return 'normal'; // Green
  }, [timeRemaining, totalSeconds]);

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isRunning,
    isTimeUp,
    progressPercent,
    timeStatus: getTimeStatus(),
    pause,
    resume,
    toggle,
    reset,
    totalSeconds,
  };
};

// Helper to get expected time for question count
export const getExpectedTime = (questionCount: number) => {
  const totalSeconds = questionCount * SECONDS_PER_QUESTION;
  const mins = Math.floor(totalSeconds / 60);
  return `${mins} min`;
};
