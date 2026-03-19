import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  generateWeakAreaPracticeSet,
  SkillMastery,
  PracticeQuestion,
} from "@/lib/weakAreaPracticeEngine";

export type WeakAreaPracticeCardProps = {
  mastery: SkillMastery[];
  questionBank: PracticeQuestion[];
  preferredSubject?: string;
  onStartPractice?: (questionIds: string[]) => void;
};

export default function WeakAreaPracticeCard({
  mastery,
  questionBank,
  preferredSubject,
  onStartPractice,
}: WeakAreaPracticeCardProps) {
  const result = useMemo(
    () => generateWeakAreaPracticeSet({ mastery, questionBank, preferredSubject, questionCount: 10 }),
    [mastery, questionBank, preferredSubject]
  );

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Weak Area Practice</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Personalized practice based on the skills that need the most support.
          </p>
        </div>
        <Badge variant="secondary">Pace: {result.pacingTargetSeconds}s/q</Badge>
      </div>

      <div className="mt-5 rounded-lg bg-muted/50 p-4">
        <div className="text-sm font-semibold text-foreground">Focus Areas</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {result.recommendedFocus.map((item) => (
            <div key={`${item.subject}-${item.skill}`} className="rounded-lg bg-background p-4 shadow-sm border">
              <div className="text-xs text-muted-foreground">{item.subject} · {item.domain}</div>
              <div className="mt-1 font-semibold text-foreground">{item.skill}</div>
              <div className="mt-1 text-xs text-muted-foreground">{item.reason}</div>
              <Badge variant="outline" className="mt-2 text-xs">{item.targetDifficulty}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-lg border p-4">
        <div className="text-sm font-semibold text-foreground">Coach Note</div>
        <p className="mt-2 text-sm text-muted-foreground">{result.confidenceMessage}</p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{result.selectedQuestions.length} questions ready</span>
        <Button onClick={() => onStartPractice?.(result.selectedQuestions.map((q) => q.id))}>
          Start Practice
        </Button>
      </div>
    </Card>
  );
}
