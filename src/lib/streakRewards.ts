export type StreakProgress = {
  currentStreak: number;
  longestStreak: number;
  daysStudiedThisWeek: number;
  usedFreezeThisWeek?: boolean;
};

export type StreakReward = {
  title: string;
  description: string;
  coins: number;
  badge?: string;
};

export type StreakSummary = {
  nextMilestone: number;
  daysToNextMilestone: number;
  weeklyGoalTarget: number;
  weeklyGoalRemaining: number;
  reward?: StreakReward;
  encouragement: string;
};

const milestoneRewards: Record<number, StreakReward> = {
  3: { title: "3-Day Spark", description: "You started building momentum.", coins: 20, badge: "⚡" },
  7: { title: "7-Day Streak", description: "A full week of consistency.", coins: 50, badge: "🔥" },
  14: { title: "14-Day Run", description: "Your study habit is taking shape.", coins: 100, badge: "🏆" },
  30: { title: "30-Day Mastery Run", description: "Serious consistency unlocked.", coins: 250, badge: "👑" },
};

function getNextMilestone(currentStreak: number): number {
  const milestones = [3, 7, 14, 30];
  for (const milestone of milestones) {
    if (currentStreak < milestone) return milestone;
  }
  return currentStreak + 7;
}

export function getStreakSummary(progress: StreakProgress): StreakSummary {
  const nextMilestone = getNextMilestone(progress.currentStreak);
  const weeklyGoalTarget = 5;
  const weeklyGoalRemaining = Math.max(0, weeklyGoalTarget - progress.daysStudiedThisWeek);
  const daysToNextMilestone = Math.max(0, nextMilestone - progress.currentStreak);
  const reward = milestoneRewards[progress.currentStreak];

  let encouragement = "Keep your streak alive with even a short study session today.";
  if (progress.currentStreak >= 7) {
    encouragement = "Great rhythm. Protect your routine with one focused session each day.";
  }
  if (progress.daysStudiedThisWeek >= weeklyGoalTarget) {
    encouragement = "Weekly goal complete. Everything extra this week is bonus progress.";
  }

  return { nextMilestone, daysToNextMilestone, weeklyGoalTarget, weeklyGoalRemaining, reward, encouragement };
}
