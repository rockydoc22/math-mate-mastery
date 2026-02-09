// Rank system based on total questions answered
export interface Rank {
  name: string;
  tier: string;
  minQuestions: number;
  color: string;
  emoji: string;
}

export const RANKS: Rank[] = [
  { name: "Novice", tier: "", minQuestions: 0, color: "text-muted-foreground", emoji: "🌱" },
  { name: "Bronze", tier: "III", minQuestions: 25, color: "text-amber-600", emoji: "🥉" },
  { name: "Bronze", tier: "II", minQuestions: 50, color: "text-amber-600", emoji: "🥉" },
  { name: "Bronze", tier: "I", minQuestions: 100, color: "text-amber-600", emoji: "🥉" },
  { name: "Silver", tier: "III", minQuestions: 200, color: "text-slate-400", emoji: "🥈" },
  { name: "Silver", tier: "II", minQuestions: 350, color: "text-slate-400", emoji: "🥈" },
  { name: "Silver", tier: "I", minQuestions: 500, color: "text-slate-400", emoji: "🥈" },
  { name: "Gold", tier: "III", minQuestions: 750, color: "text-yellow-500", emoji: "🥇" },
  { name: "Gold", tier: "II", minQuestions: 1000, color: "text-yellow-500", emoji: "🥇" },
  { name: "Gold", tier: "I", minQuestions: 1500, color: "text-yellow-500", emoji: "🥇" },
  { name: "Platinum", tier: "III", minQuestions: 2000, color: "text-cyan-400", emoji: "💎" },
  { name: "Platinum", tier: "II", minQuestions: 3000, color: "text-cyan-400", emoji: "💎" },
  { name: "Platinum", tier: "I", minQuestions: 4000, color: "text-cyan-400", emoji: "💎" },
  { name: "Diamond", tier: "III", minQuestions: 5000, color: "text-blue-400", emoji: "💠" },
  { name: "Diamond", tier: "II", minQuestions: 7500, color: "text-blue-400", emoji: "💠" },
  { name: "Diamond", tier: "I", minQuestions: 10000, color: "text-blue-400", emoji: "💠" },
  { name: "Master", tier: "", minQuestions: 15000, color: "text-purple-500", emoji: "👑" },
  { name: "Grandmaster", tier: "", minQuestions: 25000, color: "text-red-500", emoji: "🔥" },
  { name: "SAT Legend", tier: "", minQuestions: 50000, color: "text-primary", emoji: "⭐" },
];

export function getRank(questionsAnswered: number): Rank {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (questionsAnswered >= RANKS[i].minQuestions) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function getNextRank(questionsAnswered: number): Rank | null {
  const currentRank = getRank(questionsAnswered);
  const currentIndex = RANKS.findIndex(r => r.name === currentRank.name && r.tier === currentRank.tier);
  return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
}

export function getProgressToNextRank(questionsAnswered: number): number {
  const currentRank = getRank(questionsAnswered);
  const nextRank = getNextRank(questionsAnswered);
  if (!nextRank) return 100;
  
  const progress = (questionsAnswered - currentRank.minQuestions) / (nextRank.minQuestions - currentRank.minQuestions);
  return Math.min(Math.max(progress * 100, 0), 100);
}

// Title prefixes earned through achievements
export interface TitlePrefix {
  id: string;
  prefix: string;
  description: string;
  requirement: string;
}

export const TITLE_PREFIXES: TitlePrefix[] = [
  { id: "speedster", prefix: "⚡ Speedster", description: "Answer 10 questions in under 10 seconds each", requirement: "speed" },
  { id: "perfectionist", prefix: "✨ Perfectionist", description: "Get 100% on a 20+ question quiz", requirement: "perfect" },
  { id: "streak_master", prefix: "🔥 Streak Master", description: "Maintain a 7-day streak", requirement: "streak" },
  { id: "math_menace", prefix: "🧮 Math Menace", description: "Answer 500 math questions correctly", requirement: "math" },
  { id: "word_wizard", prefix: "📚 Word Wizard", description: "Answer 500 English questions correctly", requirement: "english" },
  { id: "early_bird", prefix: "🌅 Early Bird", description: "Complete a quiz before 7 AM", requirement: "time" },
  { id: "night_owl", prefix: "🦉 Night Owl", description: "Complete a quiz after 11 PM", requirement: "time" },
  { id: "battle_champion", prefix: "⚔️ Battle Champion", description: "Win 10 battles", requirement: "battle" },
  { id: "comeback_kid", prefix: "💪 Comeback Kid", description: "Win a battle after being behind", requirement: "battle" },
  { id: "daily_warrior", prefix: "🗓️ Daily Warrior", description: "Complete 30 daily challenges", requirement: "daily" },
];
