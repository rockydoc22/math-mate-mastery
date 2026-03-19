import { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DailyQuest, QuestTemplate, UserProfile, selectDailyQuests } from '@/lib/dailyQuestEngine';

export type DailyQuestCardProps = {
  userProfile: UserProfile;
  today: Date;
  templates: QuestTemplate[];
  yesterdayQuestIds?: string[];
  onStartQuest?: (quest: DailyQuest) => void;
};

function difficultyVariant(difficulty: DailyQuest['difficulty']): string {
  switch (difficulty) {
    case 'easy': return 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300';
    case 'medium': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300';
    case 'hard': return 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300';
    default: return '';
  }
}

export default function DailyQuestCard({ userProfile, today, templates, yesterdayQuestIds = [], onStartQuest }: DailyQuestCardProps) {
  const quests = useMemo(
    () => selectDailyQuests({ profile: userProfile, today, templates, yesterdayQuestIds }),
    [userProfile, today, templates, yesterdayQuestIds],
  );

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Daily Quests</h2>
          <p className="mt-1 text-sm text-muted-foreground">Short goals that make progress feel fun and focused.</p>
        </div>
        <Badge variant="secondary">{quests.length} today</Badge>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {quests.map((quest) => (
          <div key={quest.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-foreground">{quest.name}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${difficultyVariant(quest.difficulty)}`}>
                {quest.difficulty}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{quest.goal}</p>
            <div className="mt-4 flex items-center justify-between">
              <Badge variant="outline" className="text-amber-700 dark:text-amber-300">+{quest.reward_coins} coins</Badge>
              <Button size="sm" onClick={() => onStartQuest?.(quest)}>Start</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
