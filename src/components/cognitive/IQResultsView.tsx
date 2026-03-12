import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Clock, Check, X, TrendingUp } from "lucide-react";
import type { IQItem, UserAnswer } from "@/pages/CognitiveSkills";

interface Props {
  answers: UserAnswer[];
  totalQuestions: number;
  totalTime: number;
  ageRange: string;
  items: IQItem[];
  onRetry: () => void;
}

/**
 * Estimates an IQ-style score from raw performance.
 * This is a non-clinical, educational estimate based on:
 * - Percentage correct (base)
 * - Difficulty weighting (hard = 3pts, medium = 2pts, easy = 1pt)
 * - Speed bonus/penalty
 * 
 * Mean IQ = 100, SD = 15. We map weighted % to a bell curve position.
 */
function estimateIQ(answers: UserAnswer[], totalTimeSec: number): number {
  if (answers.length === 0) return 100;

  const difficultyWeights: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
  let weightedCorrect = 0;
  let totalWeight = 0;

  for (const a of answers) {
    const w = difficultyWeights[a.difficulty] || 1;
    totalWeight += w;
    if (a.isCorrect) weightedCorrect += w;
  }

  const weightedPct = weightedCorrect / totalWeight; // 0-1

  // Map to IQ scale: 0% → ~70, 50% → 100, 100% → 145
  // Using a sigmoid-like mapping centered at 100
  const baseIQ = 70 + weightedPct * 75;

  // Speed adjustment: avg ~35s/question is baseline
  const avgTimePerQ = totalTimeSec / answers.length;
  const speedFactor = avgTimePerQ < 20 ? 3 : avgTimePerQ < 30 ? 1.5 : avgTimePerQ > 60 ? -2 : 0;

  const estimated = Math.round(Math.min(160, Math.max(70, baseIQ + speedFactor)));
  return estimated;
}

function getIQBand(iq: number): { label: string; color: string; description: string } {
  if (iq >= 140) return { label: "Exceptional", color: "text-purple-600", description: "Exceptional cognitive ability across domains" };
  if (iq >= 130) return { label: "Superior", color: "text-blue-600", description: "Very strong reasoning and problem-solving skills" };
  if (iq >= 120) return { label: "Above Average", color: "text-emerald-600", description: "Strong analytical and reasoning abilities" };
  if (iq >= 110) return { label: "High Average", color: "text-green-600", description: "Good cognitive skills with room to grow" };
  if (iq >= 90) return { label: "Average", color: "text-foreground", description: "Solid foundational cognitive abilities" };
  if (iq >= 80) return { label: "Low Average", color: "text-orange-600", description: "Developing skills — practice will help strengthen them" };
  return { label: "Emerging", color: "text-amber-600", description: "Building cognitive foundations — keep practicing!" };
}

function getDomainBreakdown(answers: UserAnswer[]) {
  const domains: Record<string, { correct: number; total: number }> = {};
  for (const a of answers) {
    const d = a.domain.replace(/_/g, " ");
    if (!domains[d]) domains[d] = { correct: 0, total: 0 };
    domains[d].total++;
    if (a.isCorrect) domains[d].correct++;
  }
  return Object.entries(domains)
    .map(([name, stats]) => ({
      name,
      correct: stats.correct,
      total: stats.total,
      pct: Math.round((stats.correct / stats.total) * 100),
    }))
    .sort((a, b) => b.pct - a.pct);
}

export const IQResultsView = ({ answers, totalQuestions, totalTime, ageRange, items, onRetry }: Props) => {
  const score = answers.filter((a) => a.isCorrect).length;
  const iq = estimateIQ(answers, totalTime);
  const band = getIQBand(iq);
  const domains = getDomainBreakdown(answers);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <div className="space-y-5">
      {/* IQ Score Card */}
      <Card className="p-6 text-center">
        <Brain className="w-14 h-14 text-primary mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-1">Estimated IQ Score</p>
        <h2 className={`text-5xl font-black ${band.color}`}>{iq}</h2>
        <p className={`text-lg font-bold mt-1 ${band.color}`}>{band.label}</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">{band.description}</p>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-500" /> {score}/{totalQuestions} correct
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {minutes}m {seconds}s
          </span>
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center px-4">
        ⚠️ This is a non-clinical educational estimate. It is not a replacement for a 
        professionally administered IQ test. Use it as a fun benchmark for cognitive practice.
      </p>

      {/* Domain Breakdown */}
      <Card className="p-5">
        <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" /> Domain Breakdown
        </h3>
        <div className="space-y-3">
          {domains.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize text-foreground">{d.name}</span>
                  <span className="text-muted-foreground">
                    {d.correct}/{d.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${d.pct}%`,
                      backgroundColor: d.pct >= 80 ? "hsl(var(--primary))" : d.pct >= 50 ? "hsl(142 76% 36%)" : "hsl(var(--destructive))",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Question Review */}
      <Card className="p-5">
        <h3 className="font-bold text-foreground mb-4">Question Review</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {answers.map((a, i) => {
            const item = items.find((q) => q.id === a.questionId);
            return (
              <div
                key={a.questionId}
                className={`p-3 rounded-lg border text-sm ${
                  a.isCorrect
                    ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/20"
                    : "border-destructive/30 bg-destructive/5"
                }`}
              >
                <div className="flex items-start gap-2">
                  {a.isCorrect ? (
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-foreground font-medium">Q{i + 1}: {item?.prompt}</p>
                    {!a.isCorrect && (
                      <p className="text-xs mt-1 text-muted-foreground">
                        Your answer: <span className="text-destructive font-medium">{a.selected}</span>
                        {" · "}
                        Correct: <span className="text-emerald-600 font-medium">{a.correct}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Button className="w-full" size="lg" onClick={onRetry}>
        Try Another Level
      </Button>
    </div>
  );
};
