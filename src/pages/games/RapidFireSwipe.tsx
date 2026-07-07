import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, X, Flame } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { rapidFireFacts } from "@/data/satFactsRapidFire";
import { buildFunRapidPrompt } from "@/data/funContentPool";
import { useGameSounds } from "@/hooks/useGameSounds";

const ROUND_SECONDS = 30;

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
  // 70/30 mix: fun content vs SAT rapid-fire facts.
  if (Math.random() < 0.7) {
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

export default function RapidFireSwipe() {
  const { stats, recordRound } = useGameZoneStats();
  const { playCorrect, playWrong, playVictory } = useGameSounds();
  const [started, setStarted] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>(() => buildPrompt());
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const [finished, setFinished] = useState<null | { points: number }>(null);
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
          return ns;
        });
        playCorrect();
      } else {
        setWrong((n) => n + 1);
        setStreak(0);
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
      setPrompt(buildPrompt());
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
    finishedRef.current = false;
    setStarted(true);
    setPrompt(buildPrompt());
    setTimeLeft(ROUND_SECONDS);
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setBestStreak(0);
    setReviews([]);
    setFinished(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <GameZoneHeader />
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold">⚡ Rapid Fire</h1>
        </div>

        {finished ? (
          <div className="space-y-3">
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
              <p>• At the end, we'll show what you missed</p>
            </div>
            <Button size="lg" className="w-full" onClick={() => setStarted(true)}>Start</Button>
          </Card>
        ) : (
          <>
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