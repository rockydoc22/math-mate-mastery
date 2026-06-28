import { useState, useEffect, useCallback } from 'react';

// SAT Timing: 134 minutes for 98 questions = ~82 seconds per question
const SECONDS_PER_QUESTION = 82;

export interface QuizTimerOptions {
  questionCount: number;
  enabled?: boolean;
  onTimeUp?: () => void;
  /** If provided (>0), the timer resumes from this many seconds instead of the full budget. */
  initialTimeRemaining?: number;
}

export const useQuizTimer = ({ questionCount, enabled = true, onTimeUp, initialTimeRemaining }: QuizTimerOptions) => {
  const totalSeconds = questionCount * SECONDS_PER_QUESTION;
  const startSeconds =
    typeof initialTimeRemaining === "number" && initialTimeRemaining > 0
      ? Math.min(initialTimeRemaining, totalSeconds || initialTimeRemaining)
      : totalSeconds;
  const [timeRemaining, setTimeRemaining] = useState(startSeconds);
  const [isRunning, setIsRunning] = useState(enabled);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [deadlineMs, setDeadlineMs] = useState<number | null>(enabled && startSeconds > 0 ? Date.now() + startSeconds * 1000 : null);

  // Re-initialize timer when questionCount changes (questions load async)
  useEffect(() => {
    if (totalSeconds > 0) {
      const seed =
        typeof initialTimeRemaining === "number" && initialTimeRemaining > 0
          ? Math.min(initialTimeRemaining, totalSeconds)
          : totalSeconds;
      setTimeRemaining(seed);
      setIsRunning(enabled);
      setIsTimeUp(false);
      setDeadlineMs(enabled ? Date.now() + seed * 1000 : null);
    }
  }, [totalSeconds, enabled, initialTimeRemaining]);

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Calculate progress percentage
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeRemaining) / totalSeconds) * 100 : 0;

  // Timer tick (timestamp-based for accuracy across mobile tab throttling/backgrounding)
  useEffect(() => {
    if (!isRunning || !deadlineMs || timeRemaining <= 0) return;

    const tick = () => {
      const next = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));

      if (next <= 0) {
        setTimeRemaining(0);
        setIsTimeUp(true);
        setIsRunning(false);
        setDeadlineMs(null);
        onTimeUp?.();
        return;
      }

      setTimeRemaining(next);
    };

    tick();
    const interval = setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [isRunning, deadlineMs, timeRemaining, onTimeUp]);

  // Pause/resume
  const pause = useCallback(() => {
    setIsRunning(false);
    setDeadlineMs(null);
  }, []);

  const resume = useCallback(() => {
    if (timeRemaining <= 0) return;
    setIsRunning(true);
    setDeadlineMs(Date.now() + timeRemaining * 1000);
  }, [timeRemaining]);

  const toggle = useCallback(() => {
    setIsRunning(prev => {
      const next = !prev;
      setDeadlineMs(next ? Date.now() + timeRemaining * 1000 : null);
      return next;
    });
  }, [timeRemaining]);

  // Reset timer
  const reset = useCallback(() => {
    setTimeRemaining(totalSeconds);
    setIsTimeUp(false);
    setIsRunning(enabled);
    setDeadlineMs(enabled ? Date.now() + totalSeconds * 1000 : null);
  }, [totalSeconds, enabled]);

  // Get time status for styling
  const getTimeStatus = useCallback(() => {
    if (totalSeconds <= 0) return 'normal';
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
