import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw, Coffee, Brain, Flame, CheckCircle2, Timer } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

type TimerPhase = "focus" | "break" | "long_break";
type TimerState = "idle" | "running" | "paused";

const PRESETS = [
  { label: "Classic", focus: 25, break: 5, longBreak: 15, rounds: 4 },
  { label: "Short Burst", focus: 15, break: 3, longBreak: 10, rounds: 4 },
  { label: "Deep Focus", focus: 50, break: 10, longBreak: 20, rounds: 3 },
  { label: "Quick Review", focus: 10, break: 2, longBreak: 5, rounds: 6 },
];

const StudyTimer = () => {
  const [preset, setPreset] = useState(0);
  const [phase, setPhase] = useState<TimerPhase>("focus");
  const [state, setState] = useState<TimerState>("idle");
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].focus * 60);
  const [round, setRound] = useState(1);
  const [totalFocusSeconds, setTotalFocusSeconds] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPreset = PRESETS[preset];

  const getPhaseSeconds = useCallback((p: TimerPhase) => {
    switch (p) {
      case "focus": return currentPreset.focus * 60;
      case "break": return currentPreset.break * 60;
      case "long_break": return currentPreset.longBreak * 60;
    }
  }, [currentPreset]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    if (state === "running") {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handlePhaseComplete();
            return 0;
          }
          if (phase === "focus") setTotalFocusSeconds(t => t + 1);
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state, phase]);

  const handlePhaseComplete = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState("idle");

    if (phase === "focus") {
      setSessionsCompleted(s => s + 1);
      const isLongBreak = round % currentPreset.rounds === 0;
      const nextPhase: TimerPhase = isLongBreak ? "long_break" : "break";
      setPhase(nextPhase);
      setTimeLeft(getPhaseSeconds(nextPhase));
      toast({ title: isLongBreak ? "Long break time! ☕" : "Short break! 🎉", description: `Focus session ${round} complete.` });
    } else {
      setPhase("focus");
      setRound(r => r + 1);
      setTimeLeft(getPhaseSeconds("focus"));
      toast({ title: "Back to focus! 🧠", description: `Round ${round + 1} starting.` });
    }
  };

  const start = () => setState("running");
  const pause = () => setState("paused");
  const reset = () => {
    setState("idle");
    setPhase("focus");
    setRound(1);
    setTimeLeft(currentPreset.focus * 60);
    setTotalFocusSeconds(0);
    setSessionsCompleted(0);
  };

  const selectPreset = (idx: number) => {
    setPreset(idx);
    setState("idle");
    setPhase("focus");
    setRound(1);
    setTimeLeft(PRESETS[idx].focus * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalPhaseSeconds = getPhaseSeconds(phase);
  const progressPct = totalPhaseSeconds > 0 ? ((totalPhaseSeconds - timeLeft) / totalPhaseSeconds) * 100 : 0;
  const totalFocusMin = Math.floor(totalFocusSeconds / 60);

  const phaseColors: Record<TimerPhase, string> = {
    focus: "text-primary",
    break: "text-green-500",
    long_break: "text-amber-500",
  };

  const phaseBg: Record<TimerPhase, string> = {
    focus: "from-primary/10 to-primary/5",
    break: "from-green-500/10 to-green-500/5",
    long_break: "from-amber-500/10 to-amber-500/5",
  };

  const phaseIcons: Record<TimerPhase, any> = {
    focus: Brain,
    break: Coffee,
    long_break: Coffee,
  };

  const PhaseIcon = phaseIcons[phase];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 pt-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold text-foreground">Study Timer</h1>
        </div>

        {/* Preset Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {PRESETS.map((p, idx) => (
            <Button key={p.label} size="sm" variant={preset === idx ? "default" : "outline"} onClick={() => selectPreset(idx)} className="shrink-0" disabled={state === "running"}>
              {p.label}
            </Button>
          ))}
        </div>

        {/* Timer Display */}
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
          <Card className={`p-8 mb-6 bg-gradient-to-br ${phaseBg[phase]} text-center`}>
            <PhaseIcon className={`w-8 h-8 mx-auto mb-2 ${phaseColors[phase]}`} />
            <p className={`text-sm font-medium uppercase tracking-wider mb-1 ${phaseColors[phase]}`}>
              {phase === "focus" ? "Focus Time" : phase === "break" ? "Short Break" : "Long Break"}
            </p>
            <p className="text-6xl font-mono font-bold text-foreground mb-4">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
            <Progress value={progressPct} className="h-2 mb-4" />
            <p className="text-xs text-muted-foreground">Round {round} of {currentPreset.rounds}</p>
          </Card>
        </motion.div>

        {/* Controls */}
        <div className="flex gap-3 justify-center mb-6">
          {state === "idle" || state === "paused" ? (
            <Button size="lg" className="gap-2 px-8" onClick={start}>
              <Play className="w-5 h-5" />
              {state === "paused" ? "Resume" : "Start"}
            </Button>
          ) : (
            <Button size="lg" variant="secondary" className="gap-2 px-8" onClick={pause}>
              <Pause className="w-5 h-5" />
              Pause
            </Button>
          )}
          <Button size="lg" variant="outline" className="gap-2" onClick={reset}>
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>

        {/* Session Stats */}
        <Card className="p-4 mb-4">
          <p className="font-semibold mb-3 text-foreground">This Session</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{totalFocusMin}</p>
              <p className="text-xs text-muted-foreground">Minutes Focused</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{sessionsCompleted}</p>
              <p className="text-xs text-muted-foreground">Rounds Done</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-500">{round}</p>
              <p className="text-xs text-muted-foreground">Current Round</p>
            </div>
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-4">
          <p className="font-semibold mb-2 text-foreground flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> Focus Tips</p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Put your phone on silent or Do Not Disturb</p>
            <p>• Close all unrelated browser tabs</p>
            <p>• Have water nearby before starting</p>
            <p>• During breaks, stretch or look away from the screen</p>
            <p>• After 4 rounds, take the long break — you've earned it!</p>
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default StudyTimer;
