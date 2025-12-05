import { Progress } from "@/components/ui/progress";

interface XPBarProps {
  quizCount: number;
}

const LEVELS = [
  { level: 1, name: "Rookie", xpNeeded: 0 },
  { level: 2, name: "Learner", xpNeeded: 5 },
  { level: 3, name: "Student", xpNeeded: 15 },
  { level: 4, name: "Scholar", xpNeeded: 30 },
  { level: 5, name: "Expert", xpNeeded: 50 },
  { level: 6, name: "Master", xpNeeded: 75 },
  { level: 7, name: "Champion", xpNeeded: 100 },
  { level: 8, name: "Legend", xpNeeded: 150 },
  { level: 9, name: "Mythic", xpNeeded: 200 },
  { level: 10, name: "SAT God", xpNeeded: 300 },
];

export const XPBar = ({ quizCount }: XPBarProps) => {
  const currentLevel = LEVELS.reduce(
    (acc, level) => (quizCount >= level.xpNeeded ? level : acc),
    LEVELS[0]
  );

  const nextLevel = LEVELS.find((l) => l.xpNeeded > quizCount) || LEVELS[LEVELS.length - 1];
  const xpIntoLevel = quizCount - currentLevel.xpNeeded;
  const xpForNextLevel = nextLevel.xpNeeded - currentLevel.xpNeeded;
  const progress = xpForNextLevel > 0 ? (xpIntoLevel / xpForNextLevel) * 100 : 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Lv.{currentLevel.level}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{currentLevel.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {quizCount} / {nextLevel.xpNeeded} XP
        </span>
      </div>
      <Progress value={progress} className="h-3 bg-muted" />
      {currentLevel.level < 10 && (
        <p className="text-xs text-muted-foreground text-right">
          {nextLevel.xpNeeded - quizCount} more quizzes to {nextLevel.name}
        </p>
      )}
    </div>
  );
};
