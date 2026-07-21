import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beaker, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { useDailyCredits, getDailyLimit, setDailyLimit } from "@/hooks/useDailyCredits";
import { useGameZoneStats, type LoggedGameId } from "@/hooks/useGameZoneStats";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const SIM_GAMES: { id: LoggedGameId; name: string; emoji: string; points: number }[] = [
  { id: "hangman", name: "Hangman", emoji: "🪢", points: 40 },
  { id: "poker", name: "Vocab Poker", emoji: "🃏", points: 30 },
  { id: "emoji", name: "Emoji Decode", emoji: "🧩", points: 25 },
  { id: "rapid", name: "Rapid Fire", emoji: "⚡", points: 50 },
  { id: "anagram", name: "Anagram Sprint", emoji: "🔤", points: 45 },
];

/**
 * Simulates spending 1 daily credit and recording a round for any game,
 * so parents/developers can verify the badge and live counters update
 * without playing full sessions. Points are treated as fake — they still
 * update the totals because that's exactly what needs to be verified.
 */
export function TestModePanel() {
  const [open, setOpen] = useState(false);
  const { credits, max, trySpend } = useDailyCredits();
  const { recordRound, stats } = useGameZoneStats();
  const { user } = useAuth();

  const simulate = (game: LoggedGameId, points: number) => {
    if (!trySpend()) {
      toast.error("No plays left — resets at midnight or raise the limit below.");
      return;
    }
    const solve = 1500 + Math.floor(Math.random() * 4000);
    recordRound(game, points, 1, true, solve);
    toast.success(`Simulated ${game}: −1 play, +${points} pts`);
  };

  const resetDaily = () => {
    try {
      localStorage.removeItem(`aoDailyCredits:${user?.id ?? "anon"}`);
      window.dispatchEvent(new CustomEvent("aoDailyCreditsChanged", { detail: { uid: user?.id ?? null } }));
      toast.success(`Reset to ${max} plays.`);
    } catch {}
  };

  const bumpLimit = (delta: number) => {
    const next = Math.max(0, Math.min(50, getDailyLimit(user?.id ?? null) + delta));
    setDailyLimit(user?.id ?? null, next);
    toast.success(`Daily limit → ${next}`);
  };

  return (
    <Card className="p-3 border-dashed">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-sm font-semibold"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Beaker className="w-4 h-4 text-primary" /> Test Mode
          <span className="text-xs font-normal text-muted-foreground">
            simulate credit spend
          </span>
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          <div className="text-xs text-muted-foreground">
            Plays left: <strong className="tabular-nums text-foreground">{credits}</strong> / {max} ·
            Points: <strong className="tabular-nums text-foreground">{stats.totalPoints}</strong> ·
            Rounds: <strong className="tabular-nums text-foreground">{stats.roundsPlayed}</strong>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SIM_GAMES.map((g) => (
              <Button
                key={g.id}
                size="sm"
                variant="outline"
                className="justify-between"
                onClick={() => simulate(g.id, g.points)}
                disabled={credits <= 0}
              >
                <span>{g.emoji} {g.name}</span>
                <span className="text-xs text-muted-foreground">−1 · +{g.points}</span>
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
            <Button size="sm" variant="ghost" onClick={resetDaily}>
              <RefreshCw className="w-3 h-3 mr-1" /> Reset today's plays
            </Button>
            <Button size="sm" variant="ghost" onClick={() => bumpLimit(-1)}>Limit −1</Button>
            <Button size="sm" variant="ghost" onClick={() => bumpLimit(1)}>Limit +1</Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Watch the header pill, the plays badge, and the game cards react live.
          </p>
        </div>
      )}
    </Card>
  );
}