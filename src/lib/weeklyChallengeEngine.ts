export type ChallengeMode =
  | "beat_your_best"
  | "accuracy_challenge"
  | "speed_run"
  | "survival_weekend"
  | "improvement_race";

export type UserPerformance = {
  userId: string;
  username: string;
  avatarEmoji?: string | null;
  totalScore: number;
  accuracy: number;
  avgTimeMs: number;
  improvementPercent: number;
  bestPreviousScore?: number;
};

export type RankedEntry = UserPerformance & {
  rank: number;
  displayScore: number;
  label: string;
};

export function rankChallengeMode(
  mode: ChallengeMode,
  users: UserPerformance[]
): RankedEntry[] {
  const sorted = [...users].sort((a, b) => {
    switch (mode) {
      case "beat_your_best":
        return (b.totalScore - (b.bestPreviousScore ?? 0)) - (a.totalScore - (a.bestPreviousScore ?? 0));
      case "accuracy_challenge":
        return b.accuracy - a.accuracy || b.totalScore - a.totalScore;
      case "speed_run":
        return a.avgTimeMs - b.avgTimeMs || b.totalScore - a.totalScore;
      case "survival_weekend":
        return b.totalScore - a.totalScore;
      case "improvement_race":
        return b.improvementPercent - a.improvementPercent || b.totalScore - a.totalScore;
      default:
        return b.totalScore - a.totalScore;
    }
  });

  return sorted.map((user, index) => {
    let displayScore = user.totalScore;
    let label = "pts";

    if (mode === "accuracy_challenge") { displayScore = Math.round(user.accuracy * 100); label = "% accuracy"; }
    if (mode === "speed_run") { displayScore = Math.round(user.avgTimeMs / 1000); label = "sec avg"; }
    if (mode === "improvement_race") { displayScore = Math.round(user.improvementPercent); label = "% improved"; }
    if (mode === "beat_your_best") { displayScore = user.totalScore - (user.bestPreviousScore ?? 0); label = "over best"; }

    return { ...user, rank: index + 1, displayScore, label };
  });
}
