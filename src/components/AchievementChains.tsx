import { Card } from "@/components/ui/card";
import { CheckCircle, Lock } from "lucide-react";
import { useEffect, useState } from "react";

const CHAIN_PROGRESS_KEY = "sat_achievement_chains";

export interface ChainStep {
  target: number;
  icon: string;
  label: string;
}

export interface Chain {
  id: string;
  name: string;
  category: string;
  steps: ChainStep[];
}

const CHAINS: Chain[] = [
  {
    id: "questions_answered",
    name: "Question Warrior",
    category: "Practice",
    steps: [
      { target: 5, icon: "🌱", label: "Seedling" },
      { target: 25, icon: "🌿", label: "Sprout" },
      { target: 100, icon: "🌳", label: "Sapling" },
      { target: 500, icon: "🏔️", label: "Mountain" },
      { target: 1000, icon: "🌋", label: "Volcano" },
    ],
  },
  {
    id: "perfect_quizzes",
    name: "Perfectionist",
    category: "Accuracy",
    steps: [
      { target: 1, icon: "⭐", label: "First Perfect" },
      { target: 5, icon: "🌟", label: "Star" },
      { target: 10, icon: "💫", label: "Supernova" },
      { target: 25, icon: "👑", label: "Crown" },
    ],
  },
  {
    id: "math_correct",
    name: "Math Master",
    category: "Math",
    steps: [
      { target: 10, icon: "📐", label: "Learner" },
      { target: 50, icon: "📊", label: "Analyst" },
      { target: 200, icon: "🧮", label: "Calculator" },
      { target: 500, icon: "🔬", label: "Scientist" },
    ],
  },
  {
    id: "english_correct",
    name: "English Master",
    category: "English",
    steps: [
      { target: 10, icon: "📖", label: "10 Correct" },
      { target: 50, icon: "✏️", label: "50 Correct" },
      { target: 200, icon: "📚", label: "200 Correct" },
      { target: 500, icon: "🎓", label: "500 Correct" },
    ],
  },
  {
    id: "daily_streak",
    name: "Consistency King",
    category: "Streak",
    steps: [
      { target: 3, icon: "🔥", label: "Warming Up" },
      { target: 7, icon: "💪", label: "One Week" },
      { target: 30, icon: "🏆", label: "Monthly" },
      { target: 100, icon: "💎", label: "Diamond" },
    ],
  },
];

interface ChainProgress {
  [chainId: string]: number;
}

export function getChainProgress(): ChainProgress {
  try {
    const stored = localStorage.getItem(CHAIN_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function updateChainProgress(chainId: string, value: number) {
  const progress = getChainProgress();
  progress[chainId] = Math.max(progress[chainId] || 0, value);
  localStorage.setItem(CHAIN_PROGRESS_KEY, JSON.stringify(progress));
}

interface AchievementChainsProps {
  questionsAnswered?: number;
  perfectQuizzes?: number;
  mathCorrect?: number;
  englishCorrect?: number;
  dailyStreak?: number;
  compact?: boolean;
}

export const AchievementChains = ({
  questionsAnswered = 0,
  perfectQuizzes = 0,
  mathCorrect = 0,
  englishCorrect = 0,
  dailyStreak = 0,
  compact = false,
}: AchievementChainsProps) => {
  const [progress, setProgress] = useState<ChainProgress>({});

  useEffect(() => {
    // Update chain progress from props
    const updates: ChainProgress = {
      questions_answered: questionsAnswered,
      perfect_quizzes: perfectQuizzes,
      math_correct: mathCorrect,
      english_correct: englishCorrect,
      daily_streak: dailyStreak,
    };
    
    Object.entries(updates).forEach(([key, val]) => {
      if (val > 0) updateChainProgress(key, val);
    });
    
    setProgress(getChainProgress());
  }, [questionsAnswered, perfectQuizzes, mathCorrect, englishCorrect, dailyStreak]);

  const getChainValue = (chainId: string) => progress[chainId] || 0;

  if (compact) {
    // Show only chains with progress
    const activeChains = CHAINS.filter(c => getChainValue(c.id) > 0);
    if (activeChains.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {activeChains.map(chain => {
          const value = getChainValue(chain.id);
          const currentStep = chain.steps.filter(s => value >= s.target).length;
          const nextStep = chain.steps[currentStep];
          return (
            <span
              key={chain.id}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
            >
              {chain.steps[Math.max(0, currentStep - 1)]?.icon || "🔒"} {chain.name} {currentStep}/{chain.steps.length}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <Card className="p-4 border-2 border-border">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
        🏅 Achievement Chains
      </h3>
      <div className="space-y-4">
        {CHAINS.map(chain => {
          const value = getChainValue(chain.id);
          const completedSteps = chain.steps.filter(s => value >= s.target).length;

          return (
            <div key={chain.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">{chain.name}</span>
                <span className="text-[10px] text-muted-foreground">{chain.category}</span>
              </div>
              <div className="flex items-center gap-1">
                {chain.steps.map((step, i) => {
                  const unlocked = value >= step.target;
                  const isCurrent = i === completedSteps;
                  return (
                    <div key={step.target} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
                          unlocked
                            ? "bg-primary/20 border border-primary/30"
                            : isCurrent
                            ? "bg-muted border border-dashed border-primary/50 animate-pulse"
                            : "bg-muted/50 border border-border opacity-40"
                        }`}
                        title={`${step.label}: ${step.target} (${unlocked ? "✓" : `${value}/${step.target}`})`}
                      >
                        {unlocked ? step.icon : <Lock className="w-3 h-3" />}
                      </div>
                      {i < chain.steps.length - 1 && (
                        <div className={`w-3 h-0.5 ${unlocked ? "bg-primary/30" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
                <span className="text-[10px] text-muted-foreground ml-2">
                  {value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
