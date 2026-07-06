import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, X } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { rapidFireFacts } from "@/data/satFactsRapidFire";

const ROUND_SECONDS = 60;

interface Prompt {
  id: string;
  text: string;
  isTrue: boolean;
  answer: string;
}

function buildPrompt(): Prompt {
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
  const [started, setStarted] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>(() => buildPrompt());
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
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
    const points = correct * 10;
    recordRound("rapid", points, correct, correct > wrong);
    setFinished({ points });
  }, [started, finished, timeLeft, correct, wrong, recordRound]);

  const answer = useCallback(
    (userSaysTrue: boolean) => {
      if (!started || finished) return;
      const isCorrect = userSaysTrue === prompt.isTrue;
      if (isCorrect) setCorrect((n) => n + 1);
      else setWrong((n) => n + 1);
      setFlash(isCorrect ? "ok" : "no");
      setTimeout(() => setFlash(null), 150);
      setPrompt(buildPrompt());
    },
    [started, finished, prompt]
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
          <GameResults
            title="Time's up!"
            pointsEarned={finished.points}
            totalPoints={stats.totalPoints}
            detail={`${correct} correct · ${wrong} wrong`}
            onPlayAgain={restart}
          />
        ) : !started ? (
          <Card className="p-6 text-center space-y-3">
            <p className="text-lg font-semibold">60 seconds. Tap TRUE or FALSE. Go as fast as you can.</p>
            <p className="text-sm text-muted-foreground">+10 pts per correct. Wrong answers don't cost you points.</p>
            <Button size="lg" className="w-full" onClick={() => setStarted(true)}>Start</Button>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span>⏱️ <strong className="tabular-nums">{timeLeft}s</strong></span>
              <span>✅ {correct} · ❌ {wrong}</span>
            </div>
            <Card className={`p-8 min-h-[180px] flex items-center justify-center text-center text-xl font-semibold transition-colors ${flash === "ok" ? "bg-emerald-500/20" : flash === "no" ? "bg-destructive/20" : ""}`}>
              {prompt.text}
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