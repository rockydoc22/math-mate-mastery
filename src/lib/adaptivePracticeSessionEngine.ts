export type Difficulty = "easy" | "medium" | "hard";

export type AdaptiveQuestion = {
  id: string;
  subject: string;
  domain: string;
  skill: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type AdaptiveSessionState = {
  currentDifficulty: Difficulty;
  streak: number;
  correctCount: number;
  wrongCount: number;
  askedQuestionIds: string[];
  skillFocus: string[];
};

export type AdaptiveSessionConfig = {
  targetQuestionCount?: number;
  minQuestionsBeforeRamp?: number;
  lockToSkillFocus?: boolean;
};

export type AdaptiveSelectionResult = {
  nextQuestion: AdaptiveQuestion | null;
  updatedState: AdaptiveSessionState;
  sessionComplete: boolean;
  coachMessage: string;
};

export function createInitialAdaptiveSessionState(skillFocus: string[]): AdaptiveSessionState {
  return {
    currentDifficulty: "easy",
    streak: 0,
    correctCount: 0,
    wrongCount: 0,
    askedQuestionIds: [],
    skillFocus,
  };
}

function nextDifficultyOnCorrect(difficulty: Difficulty, streak: number): Difficulty {
  if (streak < 2) return difficulty;
  if (difficulty === "easy") return "medium";
  if (difficulty === "medium") return "hard";
  return "hard";
}

function nextDifficultyOnWrong(difficulty: Difficulty): Difficulty {
  if (difficulty === "hard") return "medium";
  if (difficulty === "medium") return "easy";
  return "easy";
}

function difficultyRank(difficulty: Difficulty): number {
  if (difficulty === "easy") return 0;
  if (difficulty === "medium") return 1;
  return 2;
}

function sortByDifficultyProximity(
  questions: AdaptiveQuestion[],
  targetDifficulty: Difficulty
): AdaptiveQuestion[] {
  const targetRank = difficultyRank(targetDifficulty);
  return [...questions].sort((a, b) => {
    const deltaA = Math.abs(difficultyRank(a.difficulty) - targetRank);
    const deltaB = Math.abs(difficultyRank(b.difficulty) - targetRank);
    return deltaA - deltaB;
  });
}

export function recordAdaptiveAnswer(
  state: AdaptiveSessionState,
  wasCorrect: boolean
): AdaptiveSessionState {
  if (wasCorrect) {
    const nextStreak = state.streak + 1;
    return {
      ...state,
      correctCount: state.correctCount + 1,
      streak: nextStreak,
      currentDifficulty: nextDifficultyOnCorrect(state.currentDifficulty, nextStreak),
    };
  }

  return {
    ...state,
    wrongCount: state.wrongCount + 1,
    streak: 0,
    currentDifficulty: nextDifficultyOnWrong(state.currentDifficulty),
  };
}

export function selectNextAdaptiveQuestion(params: {
  questionBank: AdaptiveQuestion[];
  state: AdaptiveSessionState;
  config?: AdaptiveSessionConfig;
}): AdaptiveSelectionResult {
  const { questionBank, state, config } = params;
  const targetQuestionCount = config?.targetQuestionCount ?? 10;
  const lockToSkillFocus = config?.lockToSkillFocus ?? true;

  if (state.askedQuestionIds.length >= targetQuestionCount) {
    return {
      nextQuestion: null,
      updatedState: state,
      sessionComplete: true,
      coachMessage: "Session complete. Nice work finishing the set.",
    };
  }

  const unasked = questionBank.filter((q) => !state.askedQuestionIds.includes(q.id));
  const filtered = lockToSkillFocus && state.skillFocus.length > 0
    ? unasked.filter((q) => state.skillFocus.includes(q.skill))
    : unasked;

  const pool = filtered.length > 0 ? filtered : unasked;
  const ranked = sortByDifficultyProximity(pool, state.currentDifficulty);
  const nextQuestion = ranked[0] ?? null;

  let coachMessage = "Steady pace. Focus on accuracy.";
  if (state.streak >= 2) coachMessage = "You are heating up. Ready for a tougher one.";
  if (state.wrongCount > state.correctCount) coachMessage = "Take your time. Rebuild the foundation first.";

  if (!nextQuestion) {
    return { nextQuestion: null, updatedState: state, sessionComplete: true, coachMessage: "No more matching questions available." };
  }

  return {
    nextQuestion,
    updatedState: { ...state, askedQuestionIds: [...state.askedQuestionIds, nextQuestion.id] },
    sessionComplete: false,
    coachMessage,
  };
}

export function getAdaptiveSessionSummary(state: AdaptiveSessionState) {
  const totalAnswered = state.correctCount + state.wrongCount;
  const accuracy = totalAnswered === 0 ? 0 : state.correctCount / totalAnswered;

  return {
    totalAnswered,
    accuracy,
    suggestedNextStep:
      accuracy >= 0.8
        ? "Move into mixed-difficulty review or a timed mini-set."
        : accuracy >= 0.6
        ? "Repeat weak skills with medium support."
        : "Return to guided practice with easier questions and explanations.",
  };
}
