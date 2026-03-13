import { useState, useCallback, useMemo } from "react";

export type MomentumMode = "rising" | "steady" | "slipping" | "recovery";

export interface MomentumState {
  mode: MomentumMode;
  score: number;
  message: string;
  actions: string[];
}

const WEIGHTS = {
  recent_accuracy: 0.5,
  streak: 0.2,
  response_speed: 0.1,
  consistency: 0.1,
  difficulty_progression: 0.1,
};

const MESSAGES: Record<MomentumMode, string[]> = {
  rising: ["You are gaining momentum. Keep pushing.", "Strong run. Try one harder set."],
  steady: ["Good pace. One focused round can push you higher."],
  slipping: ["Momentum dipped a bit. Take a short reset and do a quick win set."],
  recovery: ["Nice comeback. Your accuracy is rebounding."],
};

const ACTIONS: Record<MomentumMode, string[]> = {
  rising: ["offer_harder_set", "offer_boss_battle"],
  steady: ["offer_targeted_practice", "offer_daily_challenge"],
  slipping: ["offer_hint_mode", "offer_5_minute_recovery_set"],
  recovery: ["offer_confidence_builder_set"],
};

const LABELS: Record<MomentumMode, string> = {
  rising: "Momentum Rising",
  steady: "Momentum Steady",
  slipping: "Momentum Slipping",
  recovery: "Momentum Rebuilding",
};

interface AnswerRecord {
  correct: boolean;
  timeMs?: number;
}

export function useMomentum() {
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [previousMode, setPreviousMode] = useState<MomentumMode | null>(null);

  const recordAnswer = useCallback((correct: boolean, timeMs?: number) => {
    setAnswers(prev => {
      const next = [...prev, { correct, timeMs }];
      // Keep last 20 for calculation
      return next.slice(-20);
    });
  }, []);

  const state: MomentumState = useMemo(() => {
    if (answers.length < 3) {
      return { mode: "steady", score: 60, message: MESSAGES.steady[0], actions: ACTIONS.steady };
    }

    const recent = answers.slice(-10);
    const recentAccuracy = recent.filter(a => a.correct).length / recent.length;

    // Streak component: consecutive correct from the end
    let streak = 0;
    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers[i].correct) streak++;
      else break;
    }
    const streakScore = Math.min(streak / 10, 1);

    // Speed component (faster = higher, capped)
    const timed = recent.filter(a => a.timeMs != null);
    const avgSpeed = timed.length > 0
      ? timed.reduce((s, a) => s + (a.timeMs || 0), 0) / timed.length
      : 30000;
    const speedScore = Math.max(0, Math.min(1, 1 - (avgSpeed - 5000) / 55000));

    // Consistency: low variance in correctness across recent windows
    const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
    const secondHalf = recent.slice(Math.floor(recent.length / 2));
    const fhAcc = firstHalf.length ? firstHalf.filter(a => a.correct).length / firstHalf.length : 0;
    const shAcc = secondHalf.length ? secondHalf.filter(a => a.correct).length / secondHalf.length : 0;
    const consistencyScore = 1 - Math.abs(fhAcc - shAcc);

    // Difficulty progression: are later answers harder? Approximate with accuracy trend
    const diffScore = shAcc >= fhAcc ? 0.8 : 0.3;

    const score = Math.round(
      (recentAccuracy * WEIGHTS.recent_accuracy +
        streakScore * WEIGHTS.streak +
        speedScore * WEIGHTS.response_speed +
        consistencyScore * WEIGHTS.consistency +
        diffScore * WEIGHTS.difficulty_progression) * 100
    );

    let mode: MomentumMode;
    if (previousMode === "slipping" && shAcc > fhAcc && recentAccuracy > 0.4) {
      mode = "recovery";
    } else if (score >= 75) {
      mode = "rising";
    } else if (score >= 55) {
      mode = "steady";
    } else {
      mode = "slipping";
    }

    // Track mode transitions for recovery detection
    if (mode !== previousMode) {
      setPreviousMode(mode);
    }

    const msgs = MESSAGES[mode];
    return {
      mode,
      score,
      message: msgs[Math.floor(Math.random() * msgs.length)],
      actions: ACTIONS[mode],
    };
  }, [answers, previousMode]);

  const reset = useCallback(() => {
    setAnswers([]);
    setPreviousMode(null);
  }, []);

  return { ...state, label: LABELS[state.mode], recordAnswer, reset, answerCount: answers.length };
}
