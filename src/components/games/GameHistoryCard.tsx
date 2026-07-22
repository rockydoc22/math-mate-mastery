import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, History } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/** One persisted round from `game_zone_rounds`. Kept forever until the
 *  student explicitly clears their history from this card. */
interface Round {
  id: string;
  game: string;
  points: number;
  correct_count: number;
  created_at: string;
}

const GAME_LABEL: Record<string, string> = {
  hangman: "Word Hangman",
  poker: "Vocab Poker",
  emoji: "Emoji Decode",
  rapid: "Rapid Fire",
  anagram: "Anagram Sprint",
};

function dayKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function GameHistoryCard() {
  const { user } = useAuth();
  const [rounds, setRounds] = useState<Round[] | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setRounds([]);
      return;
    }
    const { data } = await supabase
      .from("game_zone_rounds")
      .select("id, game, points, correct_count, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setRounds((data as Round[]) ?? []);
  }, [user]);

  useEffect(() => {
    load();
    // Refresh when a new round finishes anywhere in the app.
    const onChanged = () => load();
    window.addEventListener("aoGameStatsChanged", onChanged);
    return () => window.removeEventListener("aoGameStatsChanged", onChanged);
  }, [load]);

  const clearHistory = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("game_zone_rounds")
      .delete()
      .eq("user_id", user.id);
    if (error) {
      toast({ title: "Couldn't clear history", description: error.message, variant: "destructive" });
      return;
    }
    setRounds([]);
    setConfirmClear(false);
    toast({ title: "History cleared" });
  };

  if (!user) {
    return (
      <Card className="p-4">
        <h2 className="font-semibold mb-1 text-sm flex items-center gap-2">
          <History className="w-4 h-4" /> Your Game History
        </h2>
        <p className="text-xs text-muted-foreground">
          Sign in to keep a permanent record of every round you play. History stays until you clear it.
        </p>
      </Card>
    );
  }

  if (rounds === null) {
    return (
      <Card className="p-4">
        <p className="text-xs text-muted-foreground">Loading history…</p>
      </Card>
    );
  }

  // Build a 7-day "rounds per day" bar chart from the last 7 days.
  const today = new Date();
  const days: { key: string; label: string; count: number; points: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ key, label: d.toLocaleDateString(undefined, { weekday: "short" }), count: 0, points: 0 });
  }
  const byDay: Record<string, { count: number; points: number }> = {};
  for (const r of rounds) {
    const k = dayKey(r.created_at);
    (byDay[k] ||= { count: 0, points: 0 });
    byDay[k].count += 1;
    byDay[k].points += r.points ?? 0;
  }
  days.forEach(d => {
    if (byDay[d.key]) { d.count = byDay[d.key].count; d.points = byDay[d.key].points; }
  });
  const maxCount = Math.max(1, ...days.map(d => d.count));
  const weekRounds = days.reduce((s, d) => s + d.count, 0);
  const weekPoints = days.reduce((s, d) => s + d.points, 0);

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <History className="w-4 h-4" /> Your Game History
        </h2>
        <span className="text-[10px] text-muted-foreground">Kept until you clear</span>
      </div>

      <div className="text-xs text-muted-foreground">
        Last 7 days · <span className="font-semibold text-foreground">{weekRounds}</span> rounds ·{" "}
        <span className="font-semibold text-foreground">{weekPoints}</span> pts
      </div>

      <div className="flex items-end gap-1.5 h-16">
        {days.map(d => (
          <div key={d.key} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-primary/70 min-h-[2px]"
              style={{ height: `${(d.count / maxCount) * 100}%` }}
              title={`${d.count} rounds · ${d.points} pts`}
            />
            <span className="text-[9px] text-muted-foreground">{d.label[0]}</span>
          </div>
        ))}
      </div>

      {rounds.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-2">
          No rounds yet — pick a game above to start your history.
        </p>
      ) : (
        <ul className="divide-y divide-border/60 -mx-1 max-h-56 overflow-y-auto">
          {rounds.slice(0, 20).map(r => (
            <li key={r.id} className="flex items-center justify-between px-1 py-1.5 text-xs">
              <div className="min-w-0">
                <span className="font-medium">{GAME_LABEL[r.game] ?? r.game}</span>
                <span className="text-muted-foreground ml-2">
                  {new Date(r.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}{" "}
                  {new Date(r.created_at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                </span>
              </div>
              <span className="font-semibold text-primary shrink-0">+{r.points}</span>
            </li>
          ))}
        </ul>
      )}

      {rounds.length > 0 && (
        <div className="pt-1">
          {confirmClear ? (
            <div className="flex items-center gap-2">
              <p className="text-[11px] text-muted-foreground flex-1">
                Clear all game history? This can't be undone.
              </p>
              <Button size="sm" variant="destructive" onClick={clearHistory}>Yes, clear</Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirmClear(false)}>Cancel</Button>
            </div>
          ) : (
            <Button size="sm" variant="ghost" className="text-muted-foreground gap-1" onClick={() => setConfirmClear(true)}>
              <Trash2 className="w-3 h-3" /> Clear history
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}