export type QuestDifficulty = "easy" | "medium" | "hard";

export type UserProfile = {
  age: number;
  grade: number;
  recentActivityDomains: string[];
};

export type QuestTemplate = {
  id: string;
  name: string;
  goal: string;
  reward_coins: number;
  difficulty: QuestDifficulty;
  domains?: string[];
  minAge?: number;
  maxAge?: number;
  minGrade?: number;
  maxGrade?: number;
};

export type DailyQuest = {
  id: string;
  name: string;
  goal: string;
  reward_coins: number;
  difficulty: QuestDifficulty;
};

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function createSeededRng(seed: string): () => number {
  let state = hashString(seed) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function normalizeDomain(value: string): string {
  return value.trim().toLowerCase();
}

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function clampQuestCount(count: number): number {
  if (count < 2) return 2;
  if (count > 3) return 3;
  return count;
}

function isQuestEligible(profile: UserProfile, quest: QuestTemplate): boolean {
  if (quest.minAge !== undefined && profile.age < quest.minAge) return false;
  if (quest.maxAge !== undefined && profile.age > quest.maxAge) return false;
  if (quest.minGrade !== undefined && profile.grade < quest.minGrade) return false;
  if (quest.maxGrade !== undefined && profile.grade > quest.maxGrade) return false;
  return true;
}

function scoreQuest(profile: UserProfile, quest: QuestTemplate): number {
  let score = 0;
  const recentDomains = new Set(profile.recentActivityDomains.map(normalizeDomain));
  const questDomains = (quest.domains ?? []).map(normalizeDomain);
  const overlapCount = questDomains.filter((d) => recentDomains.has(d)).length;
  score += overlapCount * 3;
  if (quest.difficulty === "easy") {
    if (profile.grade <= 5) score += 2;
  } else if (quest.difficulty === "medium") {
    score += 2;
  } else if (quest.difficulty === "hard") {
    if (profile.grade >= 8) score += 2;
  }
  return score;
}

function shuffleWithSeed<T>(items: T[], seed: string): T[] {
  const rng = createSeededRng(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickQuestCount(profile: UserProfile, date: Date): number {
  const rng = createSeededRng(`quest-count:${dateKey(date)}:${profile.age}:${profile.grade}`);
  return clampQuestCount(rng() < 0.55 ? 2 : 3);
}

function toDailyQuest(quest: QuestTemplate): DailyQuest {
  return {
    id: quest.id,
    name: quest.name,
    goal: quest.goal,
    reward_coins: quest.reward_coins,
    difficulty: quest.difficulty,
  };
}

/**
 * Selects 2-3 quests for today based on user profile and date,
 * avoiding yesterday's quest IDs when possible.
 */
export function selectDailyQuests(params: {
  profile: UserProfile;
  today: Date;
  templates: QuestTemplate[];
  yesterdayQuestIds?: string[];
}): DailyQuest[] {
  const { profile, today, templates, yesterdayQuestIds = [] } = params;
  const yesterdaySet = new Set(yesterdayQuestIds);
  const eligible = templates.filter((quest) => isQuestEligible(profile, quest));
  const preferred = eligible.filter((quest) => !yesterdaySet.has(quest.id));
  const fallback = eligible.filter((quest) => yesterdaySet.has(quest.id));

  const sortAndShuffle = (list: QuestTemplate[], seedPrefix: string) => {
    const scored = list.map((quest) => ({ quest, score: scoreQuest(profile, quest) }));
    scored.sort((a, b) => b.score - a.score);
    const groupedByScore = new Map<number, QuestTemplate[]>();
    for (const item of scored) {
      const current = groupedByScore.get(item.score) ?? [];
      current.push(item.quest);
      groupedByScore.set(item.score, current);
    }
    const final: QuestTemplate[] = [];
    const sortedScores = [...groupedByScore.keys()].sort((a, b) => b - a);
    for (const score of sortedScores) {
      const group = groupedByScore.get(score)!;
      final.push(...shuffleWithSeed(group, `${seedPrefix}:${dateKey(today)}:${score}:${profile.age}:${profile.grade}`));
    }
    return final;
  };

  const preferredRanked = sortAndShuffle(preferred, "preferred");
  const fallbackRanked = sortAndShuffle(fallback, "fallback");
  const desiredCount = pickQuestCount(profile, today);
  const selected: QuestTemplate[] = [];

  for (const quest of preferredRanked) {
    if (selected.length >= desiredCount) break;
    selected.push(quest);
  }
  for (const quest of fallbackRanked) {
    if (selected.length >= desiredCount) break;
    if (!selected.some((q) => q.id === quest.id)) {
      selected.push(quest);
    }
  }

  return selected.map(toDailyQuest);
}
