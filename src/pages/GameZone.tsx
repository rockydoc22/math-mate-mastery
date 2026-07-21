import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { useGameZoneStats, BADGE_TIERS } from "@/hooks/useGameZoneStats";
import { useDailyCredits, DAILY_CREDIT_MAX } from "@/hooks/useDailyCredits";
import { DailyCreditsBadge } from "@/components/games/DailyCreditsBadge";
import { AchievementsPanel } from "@/components/games/AchievementsPanel";
import { TestModePanel } from "@/components/games/TestModePanel";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { X, Trophy, Users } from "lucide-react";

const games = [
  { id: "hangman", to: "/games/hangman", emoji: "🪢", name: "Word Hangman", hook: "Guess the SAT word letter by letter", color: "bg-blue-500/10" },
  { id: "poker", to: "/games/poker", emoji: "🃏", name: "Vocab Poker", hook: "Play the right card. Fold the bluffs.", color: "bg-emerald-500/10" },
  { id: "emoji", to: "/games/emoji", emoji: "🧩", name: "Emoji Decode", hook: "Crack the emoji-clue vocab word", color: "bg-purple-500/10" },
  { id: "rapid", to: "/games/rapid", emoji: "⚡", name: "Rapid Fire", hook: "60 seconds. True or false. Go.", color: "bg-orange-500/10" },
  { id: "anagram", to: "/games/anagram", emoji: "🔤", name: "Anagram Sprint", hook: "Unscramble words against the clock", color: "bg-pink-500/10" },
] as const;

export default function GameZone() {
  const { stats, earnedBadges } = useGameZoneStats();
  const { credits, isEmpty, resetsInLabel } = useDailyCredits();
  const { user } = useAuth();
  const [showSignupBanner, setShowSignupBanner] = useState(false);

  useEffect(() => {
    if (user) return;
    if (stats.roundsPlayed >= 3 && !localStorage.getItem("aoGameSignupDismissed")) {
      setShowSignupBanner(true);
    }
  }, [user, stats.roundsPlayed]);

  const dismissBanner = () => {
    localStorage.setItem("aoGameSignupDismissed", "1");
    setShowSignupBanner(false);
  };

  return (
    <>
      <SEO title="Game Zone — Fun SAT Vocab Games" description="Play SAT vocab hangman, vocab poker, emoji decode, and rapid-fire quizzes. No sign-up required." path="/games" />
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <GameZoneHeader />
        <main className="max-w-2xl mx-auto p-4 space-y-6">
          <div className="text-center pt-2">
            <h1 className="text-3xl sm:text-4xl font-bold">🎮 Game Zone</h1>
            <p className="text-sm text-muted-foreground mt-1">Learn SAT words the fun way. {DAILY_CREDIT_MAX} free plays every day.</p>
            <div className="mt-3 flex justify-center">
              <DailyCreditsBadge />
            </div>
            {isEmpty && (
              <p className="text-xs text-destructive mt-2">
                You're out of plays for today — resets in {resetsInLabel()}.
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Link to="/games/leaderboard">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                  <Trophy className="w-3 h-3 mr-1" /> Leaderboard
                </Badge>
              </Link>
              <Link to="/parent-controls">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                  <Users className="w-3 h-3 mr-1" /> Parent Controls
                </Badge>
              </Link>
            </div>
          </div>

          {showSignupBanner && (
            <Card className="p-3 bg-primary/10 border-primary/30 flex items-start gap-3">
              <div className="flex-1 text-sm">
                <strong>Nice streak!</strong> Create a free account to save your points across devices.
              </div>
              <Link to="/auth" className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">
                Sign up
              </Link>
              <button onClick={dismissBanner} aria-label="Dismiss" className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </Card>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {games.map((g) => {
              const gameStats = stats.perGame[g.id] ?? { high: 0, played: 0 };
              const disabled = isEmpty;
              const content = (
                <Card className={`p-5 ${g.color} ${disabled ? "opacity-60" : "hover:scale-[1.02] cursor-pointer"} transition-transform border border-border/50 h-full`}>
                  <div className="flex items-start gap-3">
                    <span className="text-4xl">{g.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground">{g.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{g.hook}</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        High: <span className="font-semibold text-foreground tabular-nums">{gameStats.high}</span> · Played {gameStats.played}
                      </div>
                      {disabled && (
                        <div className="text-[11px] text-destructive font-semibold mt-1">
                          Out of daily plays
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
              return (
                disabled ? (
                  <div key={g.id} aria-disabled="true">{content}</div>
                ) : (
                  <Link key={g.id} to={g.to}>{content}</Link>
                )
              );
            })}
          </div>

          <AchievementsPanel />

          <TestModePanel />

          <Card className="p-4">
            <h2 className="font-semibold mb-3 text-sm">🏆 Badges</h2>
            <div className="flex flex-wrap gap-2">
              {BADGE_TIERS.map((b) => {
                const earned = earnedBadges.some((e) => e.name === b.name);
                return (
                  <Badge key={b.name} variant={earned ? "default" : "outline"} className={earned ? "" : "opacity-50"}>
                    {b.emoji} {b.name} · {b.threshold}
                  </Badge>
                );
              })}
            </div>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Prefer to study? <Link to="/home" className="text-primary hover:underline">Go to Study Dashboard →</Link>
          </p>
        </main>
      </div>
    </>
  );
}