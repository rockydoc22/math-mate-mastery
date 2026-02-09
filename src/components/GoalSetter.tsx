import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Calendar } from "lucide-react";

interface Goal {
  targetScore: number;
  currentScore: number;
  deadline: string;
  createdAt: string;
}

const GOAL_KEY = "satGoal";

export const useGoal = () => {
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(GOAL_KEY);
    if (saved) {
      setGoal(JSON.parse(saved));
    }
  }, []);

  const saveGoal = (newGoal: Goal) => {
    localStorage.setItem(GOAL_KEY, JSON.stringify(newGoal));
    setGoal(newGoal);
  };

  const updateCurrentScore = (score: number) => {
    if (goal) {
      const updated = { ...goal, currentScore: Math.max(goal.currentScore, score) };
      saveGoal(updated);
    }
  };

  const clearGoal = () => {
    localStorage.removeItem(GOAL_KEY);
    setGoal(null);
  };

  return { goal, saveGoal, updateCurrentScore, clearGoal };
};

export const GoalSetter = ({ currentEstimatedScore = 1000 }: { currentEstimatedScore?: number }) => {
  const { goal, saveGoal, clearGoal } = useGoal();
  const [isOpen, setIsOpen] = useState(false);
  const [targetScore, setTargetScore] = useState(goal?.targetScore || 1400);
  const [deadline, setDeadline] = useState(goal?.deadline || "");

  const handleSave = () => {
    saveGoal({
      targetScore,
      currentScore: currentEstimatedScore,
      deadline,
      createdAt: new Date().toISOString(),
    });
    setIsOpen(false);
  };

  const progress = goal
    ? Math.min(100, ((goal.currentScore - 400) / (goal.targetScore - 400)) * 100)
    : 0;

  const daysRemaining = goal?.deadline
    ? Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="space-y-3">
      {goal ? (
        <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold">Goal: {goal.targetScore}</span>
            </div>
            {daysRemaining !== null && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {daysRemaining} days left
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Current: {goal.currentScore}</span>
              <span className="text-primary font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit Goal
                </Button>
              </DialogTrigger>
              <GoalDialogContent
                targetScore={targetScore}
                setTargetScore={setTargetScore}
                deadline={deadline}
                setDeadline={setDeadline}
                onSave={handleSave}
              />
            </Dialog>
            <Button variant="ghost" size="sm" onClick={clearGoal}>
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Target className="w-4 h-4" />
              Set Your SAT Goal
            </Button>
          </DialogTrigger>
          <GoalDialogContent
            targetScore={targetScore}
            setTargetScore={setTargetScore}
            deadline={deadline}
            setDeadline={setDeadline}
            onSave={handleSave}
          />
        </Dialog>
      )}
    </div>
  );
};

const GoalDialogContent = ({
  targetScore,
  setTargetScore,
  deadline,
  setDeadline,
  onSave,
}: {
  targetScore: number;
  setTargetScore: (n: number) => void;
  deadline: string;
  setDeadline: (s: string) => void;
  onSave: () => void;
}) => (
  <DialogContent className="max-w-sm">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Set Your Goal
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="target">Target SAT Score</Label>
        <Input
          id="target"
          type="number"
          min={400}
          max={1600}
          step={10}
          value={targetScore}
          onChange={(e) => setTargetScore(Number(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">
          Enter a score between 400 and 1600
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Target Date (Optional)</Label>
        <Input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <Button onClick={onSave} className="w-full gap-2">
        <Target className="w-4 h-4" />
        Set Goal
      </Button>
    </div>
  </DialogContent>
);
