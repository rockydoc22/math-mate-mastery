import { useState, useEffect, useCallback } from 'react';

export type TimedMode = 'per_question' | 'section' | 'sprint';

interface PerQuestionTimerOptions {
  mode: 'per_question';
  secondsPerQuestion: number;
  onTimeUp?: () => void;
}

interface SectionTimerOptions {
  mode: 'section';
  totalSeconds: number;
  onTimeUp?: () => void;
}

interface SprintTimerOptions {
  mode: 'sprint';
  rounds: number;
  secondsPerRound: number;
  onTimeUp?: () => void;
  onRoundEnd?: (round: number) => void;
}

export type TimedModeOptions = PerQuestionTimerOptions | SectionTimerOptions | SprintTimerOptions;

export interface TimedModeState {
  timeRemaining: number;
  formattedTime: string;
  isRunning: boolean;
  isTimeUp: boolean;
  currentRound: number;
  totalRounds: number;
  pacing: 'ahead' | 'on_track' | 'behind';
  questionsAnswered: number;
  pause: () => void;
  resume: () => void;
  toggle: () => void;
  reset: () => void;
  nextQuestion: () => void;
  nextRound: () => void;
  recordAnswer: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const useTimedMode = (options: TimedModeOptions): TimedModeState => {
  const getInitialTime = () => {
    if (options.mode === 'per_question') return options.secondsPerQuestion;
    if (options.mode === 'section') return options.totalSeconds;
    return options.secondsPerRound;
  };

  const [timeRemaining, setTimeRemaining] = useState(getInitialTime());
  const [deadlineMs, setDeadlineMs] = useState<number | null>(Date.now() + getInitialTime() * 1000);
  const [isRunning, setIsRunning] = useState(true);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const totalRounds = options.mode === 'sprint' ? options.rounds : 1;

  // Tick
  useEffect(() => {
    if (!isRunning || !deadlineMs || timeRemaining <= 0) return;

    const tick = () => {
      const next = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
      if (next <= 0) {
        setTimeRemaining(0);
        setIsTimeUp(true);
        setIsRunning(false);
        setDeadlineMs(null);
        options.onTimeUp?.();
        if (options.mode === 'sprint') {
          (options as SprintTimerOptions).onRoundEnd?.(currentRound);
        }
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
  }, [isRunning, deadlineMs, timeRemaining, currentRound]);

  // Pacing calculation
  const pacing = (() => {
    if (options.mode === 'per_question') return 'on_track' as const;
    if (options.mode === 'section') {
      const elapsed = options.totalSeconds - timeRemaining;
      const expectedRate = options.totalSeconds / 10; // ~10 questions expected
      if (questionsAnswered === 0) return 'on_track' as const;
      const secPerQ = elapsed / questionsAnswered;
      if (secPerQ < expectedRate * 0.8) return 'ahead' as const;
      if (secPerQ > expectedRate * 1.2) return 'behind' as const;
      return 'on_track' as const;
    }
    return 'on_track' as const;
  })();

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

  const reset = useCallback(() => {
    const t = getInitialTime();
    setTimeRemaining(t);
    setIsTimeUp(false);
    setIsRunning(true);
    setDeadlineMs(Date.now() + t * 1000);
    setCurrentRound(1);
    setQuestionsAnswered(0);
  }, []);

  const nextQuestion = useCallback(() => {
    if (options.mode === 'per_question') {
      const t = options.secondsPerQuestion;
      setTimeRemaining(t);
      setIsTimeUp(false);
      setIsRunning(true);
      setDeadlineMs(Date.now() + t * 1000);
    }
    setQuestionStartTime(Date.now());
  }, [options]);

  const nextRound = useCallback(() => {
    if (options.mode !== 'sprint') return;
    if (currentRound >= options.rounds) {
      setIsTimeUp(true);
      setIsRunning(false);
      return;
    }
    setCurrentRound(r => r + 1);
    const t = options.secondsPerRound;
    setTimeRemaining(t);
    setIsTimeUp(false);
    setIsRunning(true);
    setDeadlineMs(Date.now() + t * 1000);
    setQuestionsAnswered(0);
  }, [currentRound, options]);

  const recordAnswer = useCallback(() => {
    setQuestionsAnswered(q => q + 1);
  }, []);

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isRunning,
    isTimeUp,
    currentRound,
    totalRounds,
    pacing,
    questionsAnswered,
    pause,
    resume,
    toggle,
    reset,
    nextQuestion,
    nextRound,
    recordAnswer,
  };
};
