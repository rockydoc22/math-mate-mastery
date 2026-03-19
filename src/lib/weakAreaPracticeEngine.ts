export type Difficulty = "easy" | "medium" | "hard";

export type SkillMastery = {
  subject: string;
  domain: string;
  skill: string;
  mastery: number;
  recentAccuracy?: number;
  recentAttempts?: number;
};

export type PracticeQuestion = {
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

export type PracticeBlueprintItem = {
  subject: string;
  domain: string;
  skill: string;
  targetDifficulty: Difficulty;
  reason: string;
};

export type PracticeSetResult = {
  recommendedFocus: PracticeBlueprintItem[];
  selectedQuestions: PracticeQuestion[];
  pacingTargetSeconds: number;
  confidenceMessage: string;
};

export type GeneratePracticeSetParams = {
  mastery: SkillMastery[];
  questionBank: PracticeQuestion[];
  questionCount?: number;
  preferredSubject?: string;
};

function scoreWeakness(item: SkillMastery): number {
  const masteryGap = 100 - item.mastery;
  const accuracyPenalty = item.recentAccuracy !== undefined ? (1 - item.recentAccuracy) * 25 : 10;
  const attemptBoost = item.recentAttempts !== undefined && item.recentAttempts < 8 ? 10 : 0;
  return masteryGap + accuracyPenalty + attemptBoost;
}

function pickDifficulty(mastery: number): Difficulty {
  if (mastery < 40) return "easy";
  if (mastery < 70) return "medium";
  return "hard";
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickQuestionsForFocus(
  focusItems: PracticeBlueprintItem[],
  questionBank: PracticeQuestion[],
  questionCount: number
): PracticeQuestion[] {
  const selected: PracticeQuestion[] = [];
  const used = new Set<string>();

  for (const focus of focusItems) {
    const matches = questionBank.filter(
      (q) =>
        q.subject === focus.subject &&
        q.domain === focus.domain &&
        q.skill === focus.skill &&
        q.difficulty === focus.targetDifficulty &&
        !used.has(q.id)
    );
    for (const q of shuffle(matches)) {
      if (selected.length >= questionCount) break;
      selected.push(q);
      used.add(q.id);
      break;
    }
    if (selected.length >= questionCount) break;
  }

  if (selected.length < questionCount) {
    const fallback = shuffle(
      questionBank.filter(
        (q) =>
          focusItems.some(
            (f) => f.subject === q.subject && f.domain === q.domain && f.skill === q.skill
          ) && !used.has(q.id)
      )
    );
    for (const q of fallback) {
      if (selected.length >= questionCount) break;
      selected.push(q);
      used.add(q.id);
    }
  }

  if (selected.length < questionCount) {
    const anyLeft = shuffle(questionBank.filter((q) => !used.has(q.id)));
    for (const q of anyLeft) {
      if (selected.length >= questionCount) break;
      selected.push(q);
      used.add(q.id);
    }
  }

  return selected;
}

export function generateWeakAreaPracticeSet(
  params: GeneratePracticeSetParams
): PracticeSetResult {
  const { mastery, questionBank, questionCount = 10, preferredSubject } = params;

  const filteredMastery = preferredSubject
    ? mastery.filter((m) => m.subject === preferredSubject)
    : mastery;

  const rankedWeakAreas = [...filteredMastery]
    .sort((a, b) => scoreWeakness(b) - scoreWeakness(a))
    .slice(0, 5);

  const recommendedFocus: PracticeBlueprintItem[] = rankedWeakAreas.map((item) => ({
    subject: item.subject,
    domain: item.domain,
    skill: item.skill,
    targetDifficulty: pickDifficulty(item.mastery),
    reason:
      item.mastery < 50
        ? "Low mastery detected"
        : item.recentAccuracy !== undefined && item.recentAccuracy < 0.7
        ? "Recent accuracy needs improvement"
        : "Recommended for reinforcement",
  }));

  const selectedQuestions = pickQuestionsForFocus(recommendedFocus, questionBank, questionCount);

  const averageMastery =
    rankedWeakAreas.length > 0
      ? rankedWeakAreas.reduce((sum, item) => sum + item.mastery, 0) / rankedWeakAreas.length
      : 60;

  const pacingTargetSeconds = averageMastery < 40 ? 75 : averageMastery < 70 ? 60 : 45;

  const confidenceMessage =
    averageMastery < 40
      ? "Focus on accuracy first. You are rebuilding foundations."
      : averageMastery < 70
      ? "You are close. Steady practice should move these skills up."
      : "These are targeted stretch questions to sharpen performance.";

  return { recommendedFocus, selectedQuestions, pacingTargetSeconds, confidenceMessage };
}
