import { UserPerformance } from "@/lib/weeklyChallengeEngine";

export const mockChallengeUsers: UserPerformance[] = [
  {
    userId: "u1",
    username: "Maya",
    avatarEmoji: "🦊",
    totalScore: 980,
    accuracy: 0.91,
    avgTimeMs: 38000,
    improvementPercent: 18,
    bestPreviousScore: 920,
  },
  {
    userId: "u2",
    username: "Leo",
    avatarEmoji: "🚀",
    totalScore: 910,
    accuracy: 0.94,
    avgTimeMs: 34000,
    improvementPercent: 24,
    bestPreviousScore: 850,
  },
];
