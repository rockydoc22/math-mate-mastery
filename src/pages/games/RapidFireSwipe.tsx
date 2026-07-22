import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, X, Flame } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { useGameCreditGate } from "@/hooks/useGameCreditGate";
import { OutOfCreditsCard } from "@/components/games/OutOfCreditsCard";
import { DailyCreditsBadge } from "@/components/games/DailyCreditsBadge";
import { rapidFireFacts } from "@/data/satFactsRapidFire";
import { buildFunRapidPrompt } from "@/data/funContentPool";
import { useGameSounds } from "@/hooks/useGameSounds";

const ROUND_SECONDS = 30;

// Building emoji unlocked as the player's streak climbs.
// Every correct answer adds one to the skyline; higher streaks earn taller buildings.
function nextBuilding(streak: number): string {
  const pool =
    streak >= 10
      ? ["🏰", "🏯", "🕌", "🗼", "🏛️"]
      : streak >= 6
      ? ["🏬", "🏢", "🏨", "🏛️", "⛲"]
      : streak >= 3
      ? ["🏢", "🏫", "🏪", "🌳", "🚦"]
      : ["🏠", "🏡", "🌳", "🌲", "🚗"];
  return pool[Math.floor(Math.random() * pool.length)];
}

interface Prompt {
  id: string;
  text: string;
  isTrue: boolean;
  answer: string;
}

interface Review {
  text: string;
  isTrue: boolean;
  answer: string;
  userSaid: boolean;
  correct: boolean;
}

function buildPrompt(): Prompt {
  // 40/60 mix: test-relevant fun trivia vs SAT rapid-fire facts.
  // (Music/movie/slang items were removed from Rapid Fire — they aged out.)
  if (Math.random() < 0.4) {
    const fun = buildFunRapidPrompt();
    if (fun) return fun;
  }
  const fact = rapidFireFacts[Math.floor(Math.random() * rapidFireFacts.length)];
  const isTrue = Math.random() < 0.5;
  const displayed = isTrue
    ? fact.correctAnswer
    : fact.wrongAnswers[Math.floor(Math.random() * fact.wrongAnswers.length)];
  return {
    id: `${fact.id}-${Date.now()}-${Math.random()}`,
    text: `${fact.question}  →  ${displayed}`,
    isTrue,
    answer: fact.correctAnswer,
  };
}

/** Pull a prompt whose stem hasn't been shown yet this session. */
function nextUniquePrompt(seenStems: Set<string>): Prompt {
  for (let i = 0; i < 20; i++) {
    const p = buildPrompt();
    // Dedupe by the underlying fact/prompt stem (strip the "→ answer" suffix
    // and the random id so the same fact can't repeat with a different
    // displayed answer).
    const stem = p.text.split("→")[0].trim().toLowerCase();
    if (!seenStems.has(stem)) {
      seenStems.add(stem);
      return p;
    }
  }
  // Ran out of unseen prompts — allow repeats rather than stalling.
  return buildPrompt();
}

export default function RapidFireSwipe() {
  const { stats, recordRound } = useGameZoneStats();
  const { playCorrect, playWrong, playVictory } = useGameSounds();
  // Rapid Fire has an explicit Start button, so we don't spend on mount —
  // we spend when the player actually starts the timer.
  const { blocked, spendForRestart } = useGameCreditGate({ spendOnMount: false });
  const [started, setStarted] = useState(false);
  const seenStems = useRef<Set<string>>(new Set());
  const [prompt, setPrompt] = useState<Prompt>(() => nextUniquePrompt(seenStems.current));
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const [finished, setFinished] = useState<null | { points: number }>(null);
  // Growing skyline built up as the player answers.
  const [city, setCity] = useState<string[]>([]);
  const [clouds, setClouds] = useState<number>(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!started || finished) return;
    const interval = setInterval(() => {
      setTimeLeft((n) => Math.max(0, n - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [started, finished]);

  useEffect(() => {
    if (!started || finished || timeLeft > 0) return;
    if (finishedRef.current) return;
    finishedRef.current = true;
    // Bonus points for streaks so speed + accuracy is rewarded.
    const points = correct * 10 + bestStreak * 5;
    recordRound("rapid", points, correct, correct > wrong);
    playVictory();
    setFinished({ points });
  }, [started, finished, timeLeft, correct, wrong, bestStreak, recordRound, playVictory]);

  const answer = useCallback(
    (userSaysTrue: boolean) => {
      if (!started || finished) return;
      const isCorrect = userSaysTrue === prompt.isTrue;
      if (isCorrect) {
        setCorrect((n) => n + 1);
        setStreak((s) => {
          const ns = s + 1;
          setBestStreak((b) => Math.max(b, ns));
          setCity((c) => [...c, nextBuilding(ns)]);
          return ns;
        });
        playCorrect();
      } else {
        setWrong((n) => n + 1);
        setStreak(0);
        setClouds((c) => Math.min(c + 1, 6));
        playWrong();
      }
      // Only log incorrect prompts in the review (limit to 8 to keep card tidy).
      if (!isCorrect) {
        setReviews((r) => [
          ...r,
          { text: prompt.text, isTrue: prompt.isTrue, answer: prompt.answer, userSaid: userSaysTrue, correct: false },
        ].slice(-8));
      }
      setFlash(isCorrect ? "ok" : "no");
      setTimeout(() => setFlash(null), 200);
      setPrompt(nextUniquePrompt(seenStems.current));
    },
    [started, finished, prompt, playCorrect, playWrong]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") answer(true);
      if (e.key === "ArrowLeft") answer(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [answer]);

  const restart = () => {
    if (!spendForRestart()) return;
    finishedRef.current = false;
    setStarted(true);
    seenStems.current = new Set();
    setPrompt(nextUniquePrompt(seenStems.current));
    setTimeLeft(ROUND_SECONDS);
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setBestStreak(0);
    setReviews([]);
    setFinished(null);
    setCity([]);
    setClouds(0);
  };

  const beginFirstRound = () => {
    if (!spendForRestart()) return;
    setStarted(true);
  };

  // Small reusable skyline strip. Grows left-to-right, wraps to a new row.
  const Skyline = ({ scale = "sm" }: { scale?: "sm" | "lg" }) => {
    const buildingSize = scale === "lg" ? "text-4xl sm:text-5xl" : "text-2xl";
    const groundHeight = scale === "lg" ? "h-24 sm:h-28" : "h-16";
    const cloudSize = scale === "lg" ? "text-2xl" : "text-lg";
    return (
      <div className="relative rounded-xl overflow-hidden border-2 border-sky-200/60 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 dark:from-sky-950 dark:via-sky-900 dark:to-emerald-950/40">
        {/* Sun */}
        <div className="absolute top-1.5 right-2 w-6 h-6 rounded-full bg-yellow-300 shadow-[0_0_18px_6px_rgba(253,224,71,0.55)]" />
        {/* Clouds — one per wrong answer, capped */}
        <div className={`absolute top-1 left-2 flex gap-1 ${cloudSize} opacity-80`}>
          {Array.from({ length: clouds }).map((_, i) => (
            <span key={i} className="animate-fade-in">☁️</span>
          ))}
        </div>
        {/* Buildings sitting on the ground */}
        <div className={`flex items-end flex-wrap gap-0.5 px-2 pt-8 pb-1 ${groundHeight}`}>
          {city.length === 0 ? (
            <span className="text-xs text-muted-foreground/70 italic pb-2">
              Answer correctly to build your city…
            </span>
          ) : (
            city.map((b, i) => (
              <span key={i} className={`${buildingSize} leading-none animate-scale-in`} style={{ animationDelay: `${Math.min(i * 20, 200)}ms` }}>
                {b}
              </span>
            ))
          )}
        </div>
        {/* Grass strip */}
        <div className="h-1.5 bg-emerald-500/70" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <SEO title="Rapid Fire — True or False Vocab" description="30 seconds. True or false. Build your city with every correct answer." path="/games/rapid" />
            <GameZoneHeader />
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold">⚡ Rapid Fire</h1>
          <DailyCreditsBadge className="ml-auto" />
        </div>

        {blocked ? (
          <OutOfCreditsCard />
        ) : finished ? (
          <div className="space-y-3">
            <Card className="p-3 space-y-2">
              <p className="text-sm font-semibold text-center">Your city 🏙️</p>
              <Skyline scale="lg" />
              <p className="text-xs text-center text-muted-foreground">
                {city.length} building{city.length === 1 ? "" : "s"} built · {clouds} storm cloud
                {clouds === 1 ? "" : "s"} rolled in
              </p>
            </Card>
            <GameResults
              title="Time's up!"
              pointsEarned={finished.points}
              totalPoints={stats.totalPoints}
              detail={`${correct} correct · ${wrong} wrong · best streak ${bestStreak} 🔥`}
              onPlayAgain={restart}
            />
            {reviews.length > 0 && (
              <Card className="p-4 space-y-3">
                <p className="text-sm font-semibold">Ones you missed</p>
                <ul className="space-y-2 text-xs">
                  {reviews.map((r, i) => (
                    <li key={i} className="rounded-md border p-2 space-y-0.5">
                      <div className="text-foreground">{r.text}</div>
                      <div className="text-muted-foreground">
                        You said <strong>{r.userSaid ? "TRUE" : "FALSE"}</strong> · correct answer was{" "}
                        <strong className="text-emerald-600 dark:text-emerald-400">{r.isTrue ? "TRUE" : "FALSE"}</strong>
                      </div>
                      <div className="text-muted-foreground">Right answer: <em>{r.answer}</em></div>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        ) : !started ? (
          <Card className="p-6 text-center space-y-3">
            <div className="text-5xl">⚡</div>
            <p className="text-lg font-semibold">30 seconds. TRUE or FALSE. Go.</p>
            <div className="text-sm text-muted-foreground space-y-1 text-left mx-auto max-w-xs">
              <p>• <strong>+10 pts</strong> per correct answer</p>
              <p>• <strong>+5 bonus</strong> per point of your best streak 🔥</p>
              <p>• Wrong answers don't cost points, but break your streak</p>
              <p>• Every right answer adds a building to your skyline 🏙️</p>
              <p>• At the end, we'll show what you missed</p>
            </div>
            <Button size="lg" className="w-full" onClick={beginFirstRound}>Start</Button>
          </Card>
        ) : (
          <>
            <Skyline />
            <div className="flex items-center justify-between text-sm">
              <span className={`tabular-nums ${timeLeft <= 5 ? "text-destructive font-bold animate-pulse" : ""}`}>
                ⏱️ <strong>{timeLeft}s</strong>
              </span>
              <span className="flex items-center gap-1">
                {streak >= 3 && <Flame className="w-4 h-4 text-orange-500" />}
                <span className={streak >= 3 ? "text-orange-500 font-bold" : ""}>Streak {streak}</span>
              </span>
              <span>✅ {correct} · ❌ {wrong}</span>
            </div>
            <Card
              key={prompt.id}
              className={`p-8 min-h-[180px] flex items-center justify-center text-center text-xl font-semibold transition-all animate-fade-in ${
                flash === "ok" ? "bg-emerald-500/25 scale-105" : flash === "no" ? "bg-destructive/25 -translate-x-1" : ""
              }`}
            >
              {flash === "ok" ? (
                <span className="text-4xl">✅</span>
              ) : flash === "no" ? (
                <span className="text-4xl">❌</span>
              ) : (
                prompt.text
              )}
            </Card>
            <div className="grid grid-cols-2 gap-3">
              <Button size="lg" variant="outline" className="h-16 text-lg" onClick={() => answer(false)}>
                <X className="w-5 h-5 mr-2" /> False
              </Button>
              <Button size="lg" className="h-16 text-lg" onClick={() => answer(true)}>
                <Check className="w-5 h-5 mr-2" /> True
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">Tip: use ← / → arrow keys</p>
          </>
        )}
      </main>
    </div>
  );
}