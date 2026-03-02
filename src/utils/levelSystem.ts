// Level System: 50 levels based on total questions answered
// Exponential curve so early levels are easy, later ones are hard

export interface PlayerLevel {
  level: number;
  title: string;
  questionsRequired: number;
  questionsForNext: number | null; // null at max level
  progress: number; // 0-100% toward next level
  titleEmoji: string;
}

export interface LevelTier {
  minLevel: number;
  maxLevel: number;
  title: string;
  emoji: string;
}

export const LEVEL_TIERS: LevelTier[] = [
  { minLevel: 1, maxLevel: 5, title: 'Novice', emoji: '🌱' },
  { minLevel: 6, maxLevel: 10, title: 'Apprentice', emoji: '📚' },
  { minLevel: 11, maxLevel: 15, title: 'Scholar', emoji: '🎓' },
  { minLevel: 16, maxLevel: 20, title: 'Strategist', emoji: '🧠' },
  { minLevel: 21, maxLevel: 25, title: 'Expert', emoji: '⚡' },
  { minLevel: 26, maxLevel: 30, title: 'Master', emoji: '🏅' },
  { minLevel: 31, maxLevel: 35, title: 'Grandmaster', emoji: '👑' },
  { minLevel: 36, maxLevel: 40, title: 'Champion', emoji: '🏆' },
  { minLevel: 41, maxLevel: 45, title: 'Legend', emoji: '🔥' },
  { minLevel: 46, maxLevel: 50, title: 'SAT God', emoji: '💎' },
];

// Questions required for each level (exponential curve)
// Level 1: 0, Level 2: 5, Level 3: 12, ... Level 50: ~10,000
function getQuestionsForLevel(level: number): number {
  if (level <= 1) return 0;
  // Smooth curve: q = floor(2.5 * (level-1)^1.8)
  return Math.floor(2.5 * Math.pow(level - 1, 1.8));
}

export function calculatePlayerLevel(totalQuestions: number): PlayerLevel {
  let currentLevel = 1;
  
  for (let l = 50; l >= 1; l--) {
    if (totalQuestions >= getQuestionsForLevel(l)) {
      currentLevel = l;
      break;
    }
  }

  const currentReq = getQuestionsForLevel(currentLevel);
  const nextReq = currentLevel < 50 ? getQuestionsForLevel(currentLevel + 1) : null;
  
  const progress = nextReq !== null
    ? Math.min(100, Math.round(((totalQuestions - currentReq) / (nextReq - currentReq)) * 100))
    : 100;

  const tier = LEVEL_TIERS.find(t => currentLevel >= t.minLevel && currentLevel <= t.maxLevel) || LEVEL_TIERS[0];

  return {
    level: currentLevel,
    title: tier.title,
    questionsRequired: currentReq,
    questionsForNext: nextReq,
    progress,
    titleEmoji: tier.emoji,
  };
}

// Unlockable content definitions
export interface Unlockable {
  id: string;
  name: string;
  emoji: string;
  requiredLevel: number;
  type: 'game' | 'feature' | 'avatar';
  description: string;
}

export const UNLOCKABLES: Unlockable[] = [
  { id: 'hangman', name: 'Hangman', emoji: '🪢', requiredLevel: 3, type: 'game', description: 'Guess the answer letter by letter' },
  { id: 'zalaga', name: 'Zalaga', emoji: '🚀', requiredLevel: 5, type: 'game', description: 'Shoot correct answers in space' },
  { id: 'chess', name: 'Chess', emoji: '♟️', requiredLevel: 8, type: 'game', description: 'Answer questions to earn chess moves' },
  { id: 'elite_1400', name: 'Elite: 1400', emoji: '⚡', requiredLevel: 10, type: 'feature', description: 'Breakthrough practice tier' },
  { id: 'elite_1500', name: 'Elite: 1500', emoji: '🎯', requiredLevel: 15, type: 'feature', description: 'Advanced practice tier' },
  { id: 'elite_1600', name: 'Elite: 1600', emoji: '👑', requiredLevel: 20, type: 'feature', description: 'Master practice tier' },
];

export function isUnlocked(unlockableId: string, playerLevel: number): boolean {
  const item = UNLOCKABLES.find(u => u.id === unlockableId);
  if (!item) return true; // not gated
  return playerLevel >= item.requiredLevel;
}

export function getNextUnlock(playerLevel: number): Unlockable | null {
  return UNLOCKABLES
    .filter(u => u.requiredLevel > playerLevel)
    .sort((a, b) => a.requiredLevel - b.requiredLevel)[0] || null;
}
