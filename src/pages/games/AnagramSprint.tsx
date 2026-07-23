import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Timer, Trophy } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { DailyCreditsBadge } from "@/components/games/DailyCreditsBadge";
import { OutOfCreditsCard } from "@/components/games/OutOfCreditsCard";
import { useGameCreditGate } from "@/hooks/useGameCreditGate";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { ANAGRAM_WORDS, AnagramDifficulty, AnagramEntry, isAcceptedAnagram, scramble } from "@/data/anagramWords";
import { useGameSounds } from "@/hooks/useGameSounds";

const DIFFICULTY_CONFIG: Record<AnagramDifficulty, { seconds: number; perWord: number; label: string; emoji: string }> = {
  easy: { seconds: 60, perWord: 10, label: "Easy", emoji: "🌱" },
  medium: { seconds: 75, perWord: 20, label: "Medium", emoji: "⚡" },
  hard: { seconds: 90, perWord: 35, label: "Hard", emoji: "🔥" },
};

function pickEntry(difficulty: AnagramDifficulty, exclude?: string): AnagramEntry {
  const list = ANAGRAM_WORDS[difficulty];
  let w = list[Math.floor(Math.random() * list.length)];
  if (exclude && list.length > 1) {
    while (w.word === exclude) w = list[Math.floor(Math.random() * list.length)];
  }
  return w;
}

export default function AnagramSprint() {
  const { stats, recordRound } = useGameZoneStats();
  const { playBell, playCorrect, playWrong } = useGameSounds();
  // Anagram Sprint uses the shared Daily Credits system.
  // Credits are only spent when the player actually starts a round.
  const { blocked, spendForRestart } = useGameCreditGate({ spendOnMount: false });

  const [difficulty, setDifficulty] = useState<AnagramDifficulty>("easy");
  const [phase, setPhase] = useState<"pick" | "playing" | "done">("pick");
  const [entry, setEntry] = useState<AnagramEntry>({ word: "" });
  const word = entry.word;
  const [scrambled, setScrambled] = useState<string>("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [flash, setFlash] = useState<"idle" | "ok" | "no">("idle");
  // Streak toward freeing the angel (every 5 correct in a row).
  const [streak, setStreak] = useState(0);
  // Net "morality" tally: +1 correct, -1 skip/wrong. Positive → angel, negative → demon.
  const [morality, setMorality] = useState(0);
  // Trigger a brief angel-flies-away animation.
  const [angelFlight, setAngelFlight] = useState(0);
  const startedAt = useRef<number>(0);
  // Track fastest solve within the sprint; logged once at time-up so a single
  // sprint counts as ONE round played, not one per solved word.
  const bestSolveMs = useRef<number | undefined>(undefined);

  const cfg = DIFFICULTY_CONFIG[difficulty];
  const best = stats.perGame.anagram?.high ?? 0;
  const bestTime = stats.perGame.anagram?.bestTimeMs;

  const nextWord = useCallback(() => {
    const e = pickEntry(difficulty, word);
    setEntry(e);
    setScrambled(scramble(e.word));
    setGuess("");
    startedAt.current = performance.now();
  }, [difficulty, word]);

  const beginRound = () => {
    if (!spendForRestart()) return;
    setScore(0);
    setSolved(0);
    setTimeLeft(cfg.seconds);
    setPhase("playing");
    bestSolveMs.current = undefined;
    setStreak(0);
    setMorality(0);
    setAngelFlight(0);
    const e = pickEntry(difficulty);
    setEntry(e);
    setScrambled(scramble(e.word));
    setGuess("");
    startedAt.current = performance.now();
  };

  // Countdown
  useEffect(() => {
    if (phase !== "playing") return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  // Finish when timer hits zero
  useEffect(() => {
    if (phase === "playing" && timeLeft === 0) {
      setPhase("done");
      recordRound("anagram", score, solved, solved > 0, bestSolveMs.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const submit = () => {
    if (phase !== "playing" || !guess.trim()) return;
    if (isAcceptedAnagram(entry, guess)) {
      const solveMs = performance.now() - startedAt.current;
      // Bonus for solving fast (under 5s), tapers by difficulty
      const bonus = solveMs < 5000 ? Math.round((5000 - solveMs) / 500) : 0;
      const earn = cfg.perWord + bonus;
      setScore((s) => s + earn);
      setSolved((n) => n + 1);
      setFlash("ok");
      setMorality((m) => m + 1);
      setStreak((s) => {
        const ns = s + 1;
        if (ns % 5 === 0) {
          // Freed the angel! Chime + flight animation.
          playBell();
          setAngelFlight((n) => n + 1);
        } else {
          playCorrect();
        }
        return ns;
      });
      // Remember the best (lowest) solve for the end-of-sprint recordRound.
      // We deliberately do NOT call recordRound per solve — that would inflate
      // play counts, spam the usage log, and reset the answer streak.
      const rounded = Math.round(solveMs);
      if (bestSolveMs.current === undefined || rounded < bestSolveMs.current) {
        bestSolveMs.current = rounded;
      }
      window.setTimeout(() => setFlash("idle"), 200);
      nextWord();
    } else {
      setFlash("no");
      setStreak(0);
      setMorality((m) => m - 1);
      playWrong();
      window.setTimeout(() => setFlash("idle"), 250);
    }
  };

  const skip = () => {
    setScore((s) => Math.max(0, s - 3));
    setStreak(0);
    setMorality((m) => m - 1);
    nextWord();
  };

  const shuffleLetters = () => setScrambled(scramble(entry.word));

  const timerColor = timeLeft <= 10 ? "text-destructive" : timeLeft <= 20 ? "text-amber-600" : "text-primary";

  // Morality visual: angel if positive, demon if negative, neutral otherwise.
  const moralityIcon = morality > 0 ? "😇" : morality < 0 ? "😈" : "😐";
  const moralityColor = morality > 0
    ? "from-sky-100 to-amber-100 dark:from-sky-950/40 dark:to-amber-950/40 border-amber-300"
    : morality < 0
    ? "from-red-100 to-orange-100 dark:from-red-950/40 dark:to-orange-950/40 border-red-400"
    : "from-muted to-muted border-border";
  const nextAngelIn = 5 - (streak % 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <SEO title="Angel or Demon — Timed Word Game" description="Unscramble words to free the angel and dodge the demon. Easy, Medium, and Hard tiers with speed bonuses." path="/games/anagram" />
            <GameZoneHeader />
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold">😇 Angel or Demon</h1>
          <DailyCreditsBadge className="ml-auto" />
        </div>

        {blocked ? <OutOfCreditsCard /> : phase === "pick" ? (
          <Card className="p-5 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">Unscramble words to free the angel. 5 correct in a row rings the bell 🔔 and the angel flies away. Wrong or skipped words summon the demon.</p>
              <p className="text-xs text-muted-foreground">Best score: <strong className="text-foreground">{best}</strong>
                {bestTime && <> · Fastest solve: <strong className="text-foreground">{(bestTime / 1000).toFixed(1)}s</strong></>}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Difficulty</p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(DIFFICULTY_CONFIG) as AnagramDifficulty[]).map((d) => {
                  const c = DIFFICULTY_CONFIG[d];
                  return (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`p-3 rounded-lg border text-center text-sm transition ${
                        difficulty === d ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="text-2xl">{c.emoji}</div>
                      <div className="font-semibold">{c.label}</div>
                      <div className="text-[10px] text-muted-foreground">{c.seconds}s · {c.perWord} pts/word</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <Button className="w-full" onClick={beginRound}>Start Sprint · Uses 1 play</Button>
          </Card>
        ) : phase === "playing" ? (
          <Card className={`p-6 space-y-4 text-center ${flash === "no" ? "border-destructive animate-pulse" : flash === "ok" ? "border-emerald-500" : ""}`}>
            {/* Angel/Demon morality panel */}
            <div className={`relative rounded-xl border-2 bg-gradient-to-br ${moralityColor} p-3 overflow-hidden`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">
                  {morality > 0 ? "Angel rising" : morality < 0 ? "Demon watching" : "Balanced"}
                </span>
                <span className="text-muted-foreground">
                  Streak {streak} · {nextAngelIn} to free 🔔
                </span>
              </div>
              <div key={angelFlight} className="text-5xl leading-none mt-1 animate-scale-in">
                {angelFlight > 0 ? (
                  <span className="inline-block animate-fade-out">😇✨</span>
                ) : (
                  moralityIcon
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className={`flex items-center gap-1 font-bold ${timerColor}`}>
                <Timer className="w-4 h-4" /> <span className="tabular-nums">{timeLeft}s</span>
              </span>
              <span>Score: <strong className="text-primary tabular-nums">{score}</strong></span>
              <span>Solved: <strong className="tabular-nums">{solved}</strong></span>
            </div>
            <div className="py-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Unscramble</div>
              <div className="font-mono text-4xl font-bold tracking-[0.35em] text-primary">
                {scrambled.toUpperCase()}
              </div>
              <div className="text-xs text-muted-foreground mt-2">{word.length} letters</div>
            </div>
            <Input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Type the word"
              className="text-center text-lg"
              autoFocus
            />
            <div className="flex gap-2">
              <Button className="flex-1" onClick={submit} disabled={!guess.trim()}>Submit</Button>
              <Button variant="outline" onClick={shuffleLetters} aria-label="Shuffle">🔀</Button>
              <Button variant="outline" onClick={skip}>Skip −3</Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 space-y-3 text-center">
            <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
            <div className="text-2xl font-bold">Time!</div>
            <div className="space-y-1">
              <p className="text-sm">Score: <strong className="text-primary text-xl">{score}</strong></p>
              <p className="text-xs text-muted-foreground">Solved {solved} · Difficulty {cfg.label}</p>
              {score > best && <p className="text-emerald-600 text-sm font-semibold">🎉 New personal best!</p>}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setPhase("pick")}>Play Again</Button>
              <Link to="/games/leaderboard" className="flex-1">
                <Button variant="outline" className="w-full">Leaderboard</Button>
              </Link>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}