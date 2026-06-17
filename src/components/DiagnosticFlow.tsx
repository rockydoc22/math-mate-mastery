import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questions as mathBank } from "@/data/questions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Clock, ChevronRight } from "lucide-react";
import { shuffleQuestionOptions } from "@/utils/optionShuffler";

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

const TOTAL_SECONDS = 300; // 5 min
const Q_COUNT = 5;
const CHECKPOINT_KEY = "ao_diagnostic_checkpoint_v1";

interface Checkpoint {
  ids: string[];
  idx: number;
  correct: number;
  secondsLeft: number;
  started: boolean;
  done: boolean;
}

export function DiagnosticFlow({ onComplete, onSkip }: Props) {
  const { user } = useAuth();
  // Read any saved checkpoint (crash recovery)
  const saved: Checkpoint | null = (() => {
    try {
      const raw = localStorage.getItem(CHECKPOINT_KEY);
      return raw ? JSON.parse(raw) as Checkpoint : null;
    } catch { return null; }
  })();

  const [started, setStarted] = useState(saved?.started ?? false);
  const [idx, setIdx] = useState(saved?.idx ?? 0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(saved?.correct ?? 0);
  const [secondsLeft, setSecondsLeft] = useState(saved?.secondsLeft ?? TOTAL_SECONDS);
  const [done, setDone] = useState(saved?.done ?? false);

  const items = useMemo(() => {
    // If resuming, rehydrate the exact same items by id so the student doesn't
    // get a fresh question set after a crash.
    if (saved?.ids?.length === Q_COUNT) {
      const byId = new Map(mathBank.map(q => [q.id, q]));
      const restored = saved.ids.map(id => byId.get(id)).filter(Boolean) as typeof mathBank;
      if (restored.length === Q_COUNT) return restored.map(shuffleQuestionOptions);
    }
    // Fresh set: spread difficulty across 5 buckets
    const buckets = [3, 5, 6, 7, 9];
    const out: typeof mathBank = [];
    for (const b of buckets) {
      const pool = mathBank.filter(q => Math.round(q.difficultyRating || 5) === b);
      if (pool.length) out.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    while (out.length < Q_COUNT) out.push(mathBank[Math.floor(Math.random() * mathBank.length)]);
    // Deterministically shuffle option positions so A/B/C/D stays balanced
    return out.slice(0, Q_COUNT).map(shuffleQuestionOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist progress on every state change so a crash auto-resumes
  useEffect(() => {
    if (!started || done) return;
    try {
      const cp: Checkpoint = {
        ids: items.map(q => q.id).filter(Boolean) as string[],
        idx, correct, secondsLeft, started, done,
      };
      localStorage.setItem(CHECKPOINT_KEY, JSON.stringify(cp));
    } catch {}
  }, [started, done, idx, correct, secondsLeft, items]);

  useEffect(() => {
    if (!started || done) return;
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [started, done]);

  useEffect(() => {
    if (secondsLeft <= 0 && started && !done) finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const finalize = async () => {
    setDone(true);
    try { localStorage.removeItem(CHECKPOINT_KEY); } catch {}
    const accuracy = correct / Q_COUNT;
    // Map accuracy to a rough Elo baseline (900–1500)
    const baseline = Math.round(900 + accuracy * 600);
    if (user) {
      try {
        await supabase.from("profiles").update({
          diagnostic_completed_at: new Date().toISOString(),
        }).eq("id", user.id);
        await supabase.from("skill_ratings").upsert({
          user_id: user.id,
          overall_rating: baseline,
          math_rating: baseline,
          english_rating: baseline,
        }, { onConflict: "user_id" });
        supabase.from("onboarding_events").insert({
          user_id: user.id,
          event: "diagnostic_completed",
          meta: { correct, total: Q_COUNT, baseline },
        }).then(() => {}, () => {});
      } catch (e) { console.error(e); }
    }
  };

  const submit = () => {
    if (!picked) return;
    const isRight = picked === items[idx].correctAnswer;
    if (isRight) setCorrect(c => c + 1);
    setPicked(null);
    if (idx + 1 >= Q_COUNT) {
      finalize();
    } else {
      setIdx(i => i + 1);
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-6 space-y-5 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold">5-minute baseline</h2>
          <p className="text-sm text-muted-foreground">
            Answer 5 quick questions so we can calibrate your level and personalize what you see next. No score. No penalty.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" /> ~5 minutes · {Q_COUNT} questions
          </div>
          <div className="space-y-2">
            <Button className="w-full h-12" onClick={() => setStarted(true)}>Start diagnostic</Button>
            <Button variant="ghost" size="sm" className="w-full" onClick={onSkip}>Skip for now</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-6 space-y-4 text-center">
          <h2 className="text-2xl font-bold">Baseline saved 🎯</h2>
          <p className="text-sm text-muted-foreground">
            You got {correct} of {Q_COUNT}. We'll start you at the right level.
          </p>
          <Button className="w-full h-12" onClick={onComplete}>Go to my dashboard <ChevronRight className="w-4 h-4 ml-1" /></Button>
        </Card>
      </div>
    );
  }

  const q = items[idx];
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {idx + 1} of {Q_COUNT}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{mins}:{secs.toString().padStart(2, "0")}</span>
        </div>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <p className="text-base font-medium leading-relaxed">{q.question}</p>
        <div className="space-y-2">
          {q.options.map(opt => (
            <button
              key={opt.letter}
              onClick={() => setPicked(opt.letter)}
              className={`w-full text-left p-3 rounded-lg border-2 text-sm transition-all ${
                picked === opt.letter ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <span className="font-bold mr-2">{opt.letter}.</span>{opt.text}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onSkip}>Skip diagnostic</Button>
          <Button className="ml-auto" disabled={!picked} onClick={submit}>
            {idx + 1 >= Q_COUNT ? "Finish" : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}