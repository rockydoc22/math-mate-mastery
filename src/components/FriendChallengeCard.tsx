import { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type FriendChallengeEntry = {
  id: string;
  username: string;
  avatarEmoji?: string | null;
  score: number;
  accuracy: number;
};

export type FriendChallengeCardProps = {
  title?: string;
  entries: FriendChallengeEntry[];
  currentUserId?: string;
};

export default function FriendChallengeCard({ title = 'Friends Challenge', entries, currentUserId }: FriendChallengeCardProps) {
  const ranked = useMemo(() => [...entries].sort((a, b) => b.score - a.score || b.accuracy - a.accuracy), [entries]);

  return (
    <Card className="p-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Lightweight social competition with a clear, encouraging leaderboard.</p>
      </div>

      <div className="mt-5 space-y-3">
        {ranked.map((entry, index) => {
          const isCurrentUser = entry.id === currentUserId;
          return (
            <div key={entry.id} className={`flex items-center justify-between rounded-lg border p-4 ${isCurrentUser ? 'border-primary/50 bg-primary/5' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold">#{index + 1}</div>
                <div className="text-2xl">{entry.avatarEmoji ?? '🎯'}</div>
                <div>
                  <div className="font-semibold text-foreground">{entry.username} {isCurrentUser ? '(You)' : ''}</div>
                  <div className="text-xs text-muted-foreground">Accuracy {Math.round(entry.accuracy * 100)}%</div>
                </div>
              </div>
              <Badge variant="secondary">{entry.score} pts</Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
