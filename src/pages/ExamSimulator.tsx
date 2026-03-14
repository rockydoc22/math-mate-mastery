import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Play, Pause, SkipForward, CheckCircle2, BarChart3, Rocket, Shield, Heart, MessageCircle, Zap, Target, TrendingUp, TrendingDown } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { useMomentum } from "@/hooks/useMomentum";
import { MomentumMeter } from "@/components/MomentumMeter";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

// --- Types ---
interface ExamSection {
  name: string;
  questionCount: number;
  timeMinutes: number;
  subject: "math" | "english" | "verbal" | "quantitative" | "reading" | "science";
}

interface ExamBlueprint {
  id: string;
  name: string;
  icon: string;
  totalTime: number;
  sections: ExamSection[];
  breakAfterSection?: number[];
  breakMinutes: number;
  category?: "standardized" | "k12" | "equivalency";
}

type SessionType = "full_simulation" | "half_length" | "skill_targeted_sim" | "rapid_fire_checkpoint";
type CreativeMode = "none" | "mission_control" | "vault_run" | "survival_mode" | "coach_mode";
type Phase = "select" | "config" | "countdown" | "testing" | "break" | "results";

interface SimQuestion {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  domain: string;
  skill: string;
  difficultyRating?: number;
}

// --- Blueprints (existing + new K12/equivalency) ---
const EXAM_BLUEPRINTS: ExamBlueprint[] = [
  // Existing standardized
  {
    id: "sat-full", name: "SAT Full-Length", icon: "📝", totalTime: 134, category: "standardized",
    sections: [
      { name: "Reading & Writing Module 1", questionCount: 27, timeMinutes: 32, subject: "english" },
      { name: "Reading & Writing Module 2", questionCount: 27, timeMinutes: 32, subject: "english" },
      { name: "Math Module 1", questionCount: 22, timeMinutes: 35, subject: "math" },
      { name: "Math Module 2", questionCount: 22, timeMinutes: 35, subject: "math" },
    ],
    breakAfterSection: [1], breakMinutes: 10,
  },
  {
    id: "act-full", name: "ACT Full-Length", icon: "🅰️", totalTime: 175, category: "standardized",
    sections: [
      { name: "English", questionCount: 75, timeMinutes: 45, subject: "english" },
      { name: "Mathematics", questionCount: 60, timeMinutes: 60, subject: "math" },
      { name: "Reading", questionCount: 40, timeMinutes: 35, subject: "reading" },
      { name: "Science", questionCount: 40, timeMinutes: 35, subject: "science" },
    ],
    breakAfterSection: [1], breakMinutes: 10,
  },
  {
    id: "gre-full", name: "GRE General", icon: "🎓", totalTime: 114, category: "standardized",
    sections: [
      { name: "Verbal Section 1", questionCount: 12, timeMinutes: 18, subject: "verbal" },
      { name: "Verbal Section 2", questionCount: 15, timeMinutes: 23, subject: "verbal" },
      { name: "Quantitative Section 1", questionCount: 12, timeMinutes: 21, subject: "quantitative" },
      { name: "Quantitative Section 2", questionCount: 15, timeMinutes: 26, subject: "quantitative" },
    ],
    breakAfterSection: [1], breakMinutes: 1,
  },
  {
    id: "lsat-full", name: "LSAT", icon: "⚖️", totalTime: 105, category: "standardized",
    sections: [
      { name: "Logical Reasoning", questionCount: 26, timeMinutes: 35, subject: "reading" },
      { name: "Analytical Reasoning", questionCount: 23, timeMinutes: 35, subject: "reading" },
      { name: "Reading Comprehension", questionCount: 27, timeMinutes: 35, subject: "reading" },
    ],
    breakAfterSection: [1], breakMinutes: 15,
  },
  // New K12 / equivalency exams from Pack 05
  {
    id: "ged", name: "GED Practice", icon: "📚", totalTime: 90, category: "equivalency",
    sections: [
      { name: "Math Reasoning", questionCount: 23, timeMinutes: 45, subject: "math" },
      { name: "Language Arts", questionCount: 22, timeMinutes: 45, subject: "english" },
    ],
    breakAfterSection: [0], breakMinutes: 5,
  },
  {
    id: "hiset", name: "HiSET Practice", icon: "🏫", totalTime: 75, category: "equivalency",
    sections: [
      { name: "Math", questionCount: 25, timeMinutes: 40, subject: "math" },
      { name: "Reading", questionCount: 20, timeMinutes: 35, subject: "english" },
    ],
    breakMinutes: 3,
  },
  {
    id: "map-growth", name: "MAP Growth Sim", icon: "📊", totalTime: 45, category: "k12",
    sections: [
      { name: "Math Adaptive", questionCount: 20, timeMinutes: 22, subject: "math" },
      { name: "Reading Adaptive", questionCount: 20, timeMinutes: 23, subject: "english" },
    ],
    breakMinutes: 2,
  },
  {
    id: "terranova", name: "TerraNova Sim", icon: "🌍", totalTime: 50, category: "k12",
    sections: [
      { name: "Reading/Language", questionCount: 20, timeMinutes: 25, subject: "english" },
      { name: "Math", questionCount: 20, timeMinutes: 25, subject: "math" },
    ],
    breakMinutes: 3,
  },
];

const SESSION_TYPES: { id: SessionType; label: string; desc: string; icon: typeof Target }[] = [
  { id: "full_simulation", label: "Full Simulation", desc: "Complete exam with real timing", icon: Target },
  { id: "half_length", label: "Half-Length", desc: "50% of questions, same pace", icon: Zap },
  { id: "skill_targeted_sim", label: "Skill-Targeted", desc: "Focus on your weak areas", icon: TrendingUp },
  { id: "rapid_fire_checkpoint", label: "Rapid Checkpoint", desc: "Quick 10-question pulse check", icon: Zap },
];

const CREATIVE_MODES: { id: CreativeMode; label: string; desc: string; icon: typeof Rocket }[] = [
  { id: "none", label: "Standard", desc: "Classic exam simulation", icon: Target },
  { id: "mission_control", label: "Mission Control", desc: "Complete sections to save a space mission", icon: Rocket },
  { id: "vault_run", label: "Vault Run", desc: "Unlock vault layers with each section", icon: Shield },
  { id: "survival_mode", label: "Survival Mode", desc: "Protect your 3 lives through question waves", icon: Heart },
  { id: "coach_mode", label: "Coach Mode", desc: "Pacing nudges for test anxiety", icon: MessageCircle },
];

const MISSION_STAGES = ["🚀 Launch", "🛸 Orbit", "🔧 Repair", "🌍 Return"];
const VAULT_STAGES = ["🔑 Gate 1", "🔑 Gate 2", "🔐 Cipher", "💎 Vault Core"];

// --- Pacing nudges ---
function getPacingNudge(timeLeft: number, totalTime: number, mode: CreativeMode): string | null {
  const pct = timeLeft / totalTime;
  if (mode === "coach_mode") {
    if (pct < 0.10) return "Final stretch. Prioritize questions you can finish quickly.";
    if (pct < 0.25) return "Keep moving. Flag anything that is slowing you down.";
    return null;
  }
  if (pct < 0.10) return "⚡ Final stretch — prioritize quick wins!";
  if (pct < 0.25) return "⏳ 25% time remaining — keep your pace steady.";
  return null;
}

// --- Question assembly from real bank ---
function assembleQuestions(
  subject: ExamSection["subject"],
  count: number,
  _sessionType: SessionType,
): SimQuestion[] {
  const pool: SimQuestion[] = [];

  const mathSubjects = ["math", "quantitative", "science"];
  const engSubjects = ["english", "verbal", "reading"];

  if (mathSubjects.includes(subject)) {
    pool.push(
      ...questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        domain: q.domain,
        skill: q.skill,
        difficultyRating: q.difficultyRating,
      }))
    );
  }
  if (engSubjects.includes(subject)) {
    pool.push(
      ...englishQuestions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        domain: q.domain,
        skill: q.skill,
        difficultyRating: q.difficultyRating,
      }))
    );
  }

  // Shuffle and pick
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// --- Adaptive difficulty band ---
function getAdaptiveBand(correct: number, total: number): { min: number; max: number; label: string } {
  if (total < 3) return { min: 4, max: 7, label: "Medium" };
  const acc = correct / total;
  if (acc >= 0.8) return { min: 7, max: 10, label: "Hard" };
  if (acc >= 0.5) return { min: 4, max: 7, label: "Medium" };
  return { min: 1, max: 4, label: "Easy" };
}

// --- Component ---
const ExamSimulator = () => {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>("select");
  const [blueprint, setBlueprint] = useState<ExamBlueprint | null>(null);
  const [sessionType, setSessionType] = useState<SessionType>("full_simulation");
  const [creativeMode, setCreativeMode] = useState<CreativeMode>("none");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sectionTotalTime, setSectionTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sectionQuestions, setSectionQuestions] = useState<SimQuestion[]>([]);
  const [sectionResults, setSectionResults] = useState<{ name: string; correct: number; total: number; timeUsed: number }[]>([]);
  const [sectionStartTime, setSectionStartTime] = useState(0);
  const [countdownVal, setCountdownVal] = useState(3);
  const [pacingNudge, setPacingNudge] = useState<string | null>(null);
  const [survivalLives, setSurvivalLives] = useState(3);
  const [correctInSection, setCorrectInSection] = useState(0);
  const [totalInSection, setTotalInSection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const momentum = useMomentum();

  const currentSection = blueprint?.sections[sectionIndex];
  const currentQ = sectionQuestions[questionIndex] ?? null;

  // Effective question count based on session type
  const effectiveCount = useCallback((baseCount: number) => {
    if (sessionType === "half_length") return Math.ceil(baseCount / 2);
    if (sessionType === "rapid_fire_checkpoint") return Math.min(10, baseCount);
    return baseCount;
  }, [sessionType]);

  // Countdown
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdownVal <= 0) {
      // Assemble questions for section
      if (currentSection) {
        const count = effectiveCount(currentSection.questionCount);
        const qs = assembleQuestions(currentSection.subject, count, sessionType);
        setSectionQuestions(qs);
        const timeSec = sessionType === "rapid_fire_checkpoint"
          ? 5 * 60
          : sessionType === "half_length"
            ? Math.ceil(currentSection.timeMinutes / 2) * 60
            : currentSection.timeMinutes * 60;
        setTimeLeft(timeSec);
        setSectionTotalTime(timeSec);
      }
      setPhase("testing");
      setSectionStartTime(Date.now());
      setCorrectInSection(0);
      setTotalInSection(0);
      return;
    }
    const t = setTimeout(() => setCountdownVal(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdownVal, currentSection, effectiveCount, sessionType]);

  // Timer + pacing nudges
  useEffect(() => {
    if (phase !== "testing" || isPaused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { finishSection(); return 0; }
        // Pacing nudge check
        const nudge = getPacingNudge(prev - 1, sectionTotalTime, creativeMode);
        if (nudge && !pacingNudge) setPacingNudge(nudge);
        else if (!nudge && pacingNudge) setPacingNudge(null);
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, isPaused, sectionIndex, sectionTotalTime, creativeMode, pacingNudge]);

  const finishSection = useCallback(() => {
    if (!currentSection || !blueprint) return;
    const timeUsed = Math.round((Date.now() - sectionStartTime) / 1000);
    let correct = 0;
    const qCount = sectionQuestions.length;
    for (let i = 0; i < qCount; i++) {
      const q = sectionQuestions[i];
      if (q && answers[`${sectionIndex}-${i}`] === q.correctAnswer) correct++;
    }
    setSectionResults(prev => [...prev, { name: currentSection.name, correct, total: qCount, timeUsed }]);

    const nextIdx = sectionIndex + 1;
    if (nextIdx >= blueprint.sections.length) {
      setPhase("results");
    } else if (blueprint.breakAfterSection?.includes(sectionIndex)) {
      setPhase("break");
      setTimeLeft(blueprint.breakMinutes * 60);
    } else {
      setSectionIndex(nextIdx);
      setQuestionIndex(0);
      setCountdownVal(3);
      setPhase("countdown");
    }
  }, [currentSection, blueprint, sectionIndex, answers, sectionStartTime, sectionQuestions]);

  // Break timer
  useEffect(() => {
    if (phase !== "break") return;
    const t = setInterval(() => {
      setTimeLeft(prev => { if (prev <= 1) { clearInterval(t); return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const selectBlueprint = (bp: ExamBlueprint) => {
    setBlueprint(bp);
    setPhase("config");
  };

  const startExam = () => {
    setSectionIndex(0);
    setQuestionIndex(0);
    setAnswers({});
    setSectionResults([]);
    setSurvivalLives(3);
    setCountdownVal(3);
    momentum.reset();
    setPhase("countdown");
  };

  const selectAnswer = (letter: string) => {
    const key = `${sectionIndex}-${questionIndex}`;
    if (answers[key]) return; // Already answered
    setAnswers(prev => ({ ...prev, [key]: letter }));

    const isCorrect = letter === currentQ?.correctAnswer;
    momentum.recordAnswer(isCorrect);
    setTotalInSection(prev => prev + 1);
    if (isCorrect) {
      setCorrectInSection(prev => prev + 1);
    } else if (creativeMode === "survival_mode") {
      setSurvivalLives(prev => {
        const next = prev - 1;
        if (next <= 0) {
          toast.error("💀 No lives remaining! Exam ended.");
          setTimeout(() => finishSection(), 500);
        }
        return next;
      });
    }
  };

  const nextQuestion = () => {
    if (!sectionQuestions.length) return;
    if (questionIndex + 1 >= sectionQuestions.length) {
      finishSection();
    } else {
      setQuestionIndex(qi => qi + 1);
      setPacingNudge(null);
    }
  };

  const skipBreak = () => {
    setSectionIndex(prev => prev + 1);
    setQuestionIndex(0);
    setCountdownVal(3);
    setPhase("countdown");
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const totalCorrect = sectionResults.reduce((a, r) => a + r.correct, 0);
  const totalQ = sectionResults.reduce((a, r) => a + r.total, 0);
  const overallPct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

  // Adaptive band for display
  const currentBand = getAdaptiveBand(correctInSection, totalInSection);

  // Creative mode stage label
  const stageLabel = useMemo(() => {
    if (!blueprint) return "";
    if (creativeMode === "mission_control") return MISSION_STAGES[sectionIndex] || "🌌 Deep Space";
    if (creativeMode === "vault_run") return VAULT_STAGES[sectionIndex] || "💎 Bonus Vault";
    return "";
  }, [creativeMode, sectionIndex, blueprint]);

  // Readiness band for results
  const readinessBand = overallPct >= 80 ? "Ready" : overallPct >= 60 ? "Approaching" : overallPct >= 40 ? "Developing" : "Needs Focus";
  const readinessColor = overallPct >= 80 ? "text-emerald-500" : overallPct >= 60 ? "text-blue-500" : overallPct >= 40 ? "text-amber-500" : "text-destructive";

  // Category grouping for selection
  const groupedBlueprints = useMemo(() => {
    const groups: Record<string, ExamBlueprint[]> = { standardized: [], k12: [], equivalency: [] };
    EXAM_BLUEPRINTS.forEach(bp => groups[bp.category || "standardized"].push(bp));
    return groups;
  }, []);

  const answered = answers[`${sectionIndex}-${questionIndex}`] !== undefined;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">🎯 Exam Simulator</h1>
        </div>

        {/* ===== PHASE: SELECT ===== */}
        {phase === "select" && (
          <div className="space-y-6">
            <p className="text-muted-foreground">Choose a timed exam to simulate real test-day conditions with adaptive difficulty.</p>

            {Object.entries(groupedBlueprints).map(([cat, bps]) => bps.length > 0 && (
              <div key={cat}>
                <h2 className="text-sm font-bold uppercase text-muted-foreground mb-2">
                  {cat === "standardized" ? "📋 Standardized Tests" : cat === "k12" ? "🏫 K-12 Assessments" : "📚 Equivalency Exams"}
                </h2>
                <div className="space-y-2">
                  {bps.map(bp => (
                    <Card key={bp.id} className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => selectBlueprint(bp)}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{bp.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{bp.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {bp.sections.length} sections · {bp.totalTime} min · {bp.sections.reduce((a, s) => a + s.questionCount, 0)} questions
                          </p>
                        </div>
                        <Play className="w-5 h-5 text-primary" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== PHASE: CONFIG ===== */}
        {phase === "config" && blueprint && (
          <div className="space-y-6">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{blueprint.icon}</span>
                <div>
                  <h2 className="font-bold text-xl">{blueprint.name}</h2>
                  <p className="text-sm text-muted-foreground">{blueprint.sections.length} sections · {blueprint.totalTime} min</p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-2">Session Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {SESSION_TYPES.map(st => (
                  <button
                    key={st.id}
                    onClick={() => setSessionType(st.id)}
                    className={`text-left p-3 rounded-xl border-2 transition-all ${sessionType === st.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                  >
                    <st.icon className="w-4 h-4 text-primary mb-1" />
                    <p className="font-semibold text-xs">{st.label}</p>
                    <p className="text-[10px] text-muted-foreground">{st.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-2">Creative Mode (Optional)</h3>
              <div className="grid grid-cols-2 gap-2">
                {CREATIVE_MODES.map(cm => (
                  <button
                    key={cm.id}
                    onClick={() => setCreativeMode(cm.id)}
                    className={`text-left p-3 rounded-xl border-2 transition-all ${creativeMode === cm.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                  >
                    <cm.icon className="w-4 h-4 text-primary mb-1" />
                    <p className="font-semibold text-xs">{cm.label}</p>
                    <p className="text-[10px] text-muted-foreground">{cm.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPhase("select")} className="flex-1">Back</Button>
              <Button onClick={startExam} className="flex-1">Start Exam</Button>
            </div>
          </div>
        )}

        {/* ===== PHASE: COUNTDOWN ===== */}
        {phase === "countdown" && (
          <div className="flex flex-col items-center justify-center py-20">
            {stageLabel && <p className="text-lg font-bold text-primary mb-2">{stageLabel}</p>}
            <p className="text-muted-foreground mb-2">{currentSection?.name}</p>
            <motion.div key={countdownVal} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-7xl font-black text-primary">
              {countdownVal > 0 ? countdownVal : "GO!"}
            </motion.div>
          </div>
        )}

        {/* ===== PHASE: TESTING ===== */}
        {phase === "testing" && currentSection && currentQ && (
          <div className="space-y-3">
            {/* Header bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{currentSection.name}</Badge>
                {stageLabel && <Badge className="bg-primary/10 text-primary text-xs">{stageLabel}</Badge>}
              </div>
              <div className="flex items-center gap-2">
                {creativeMode === "survival_mode" && (
                  <span className="text-sm">{"❤️".repeat(survivalLives)}{"🖤".repeat(3 - survivalLives)}</span>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Badge className={`font-mono ${timeLeft < 60 ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
                  <Clock className="w-3 h-3 mr-1" /> {fmt(timeLeft)}
                </Badge>
              </div>
            </div>

            <Progress value={((questionIndex + 1) / sectionQuestions.length) * 100} className="h-2" />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Q {questionIndex + 1} / {sectionQuestions.length}</p>
              <Badge variant="outline" className="text-[10px]">Band: {currentBand.label}</Badge>
            </div>

            {/* Momentum meter */}
            {momentum.answerCount >= 3 && (
              <MomentumMeter mode={momentum.mode} score={momentum.score} label={momentum.label} message={momentum.message} />
            )}

            {/* Pacing nudge */}
            <AnimatePresence>
              {pacingNudge && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs p-2 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20"
                >
                  💡 {pacingNudge}
                </motion.div>
              )}
            </AnimatePresence>

            {isPaused ? (
              <Card className="p-8 text-center">
                <Pause className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold">Exam Paused</p>
                <p className="text-sm text-muted-foreground">Timer is stopped. Click play to resume.</p>
              </Card>
            ) : (
              <Card className="p-5 space-y-4">
                <p className="font-medium leading-relaxed">{currentQ.question}</p>
                <div className="space-y-2">
                  {currentQ.options.map(opt => {
                    const selected = answers[`${sectionIndex}-${questionIndex}`] === opt.letter;
                    return (
                      <button
                        key={opt.letter}
                        onClick={() => selectAnswer(opt.letter)}
                        disabled={answered}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selected
                            ? answered && opt.letter === currentQ.correctAnswer
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                              : answered && opt.letter !== currentQ.correctAnswer
                                ? "border-destructive bg-destructive/10 text-destructive"
                                : "border-primary bg-primary/10 text-primary font-medium"
                            : answered && opt.letter === currentQ.correctAnswer
                              ? "border-emerald-500/50 bg-emerald-500/5"
                              : "border-border hover:border-primary/50"
                        } ${answered ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <span className="font-mono mr-2">{opt.letter}.</span> {opt.text}
                      </button>
                    );
                  })}
                </div>

                {/* Show explanation after answer */}
                {answered && currentQ.explanation && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {currentQ.explanation}
                  </motion.p>
                )}

                <div className="flex justify-end gap-2">
                  <Button onClick={nextQuestion} disabled={!answered}>
                    {questionIndex + 1 >= sectionQuestions.length ? "Finish Section" : "Next"} <SkipForward className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ===== PHASE: BREAK ===== */}
        {phase === "break" && (
          <Card className="p-8 text-center space-y-4">
            <div className="text-5xl">☕</div>
            <h2 className="text-2xl font-bold">Break Time</h2>
            <p className="text-muted-foreground">Take a moment to stretch and rest your eyes.</p>
            <p className="text-3xl font-mono font-bold text-primary">{fmt(timeLeft)}</p>
            <Button onClick={skipBreak}>Skip Break & Continue <SkipForward className="w-4 h-4 ml-1" /></Button>
          </Card>
        )}

        {/* ===== PHASE: RESULTS ===== */}
        {phase === "results" && blueprint && (
          <div className="space-y-4">
            {/* Score snapshot */}
            <Card className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold">Exam Complete!</h2>
              <p className="text-4xl font-black text-primary">{totalCorrect}/{totalQ}</p>
              <p className="text-muted-foreground">{overallPct}% overall accuracy</p>
            </Card>

            {/* Projected readiness */}
            <Card className="p-4 space-y-2">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Projected Readiness
              </h3>
              <p className={`text-2xl font-black ${readinessColor}`}>{readinessBand}</p>
              <p className="text-xs text-muted-foreground">
                {readinessBand === "Ready" ? "Strong performance. You're on track." :
                  readinessBand === "Approaching" ? "Close to ready. Focus on weak areas for a boost." :
                    readinessBand === "Developing" ? "Building skills. More targeted practice recommended." :
                      "Significant gaps found. Start with a skill-targeted session."}
              </p>
            </Card>

            {/* Section breakdown */}
            <h3 className="font-bold text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Section Breakdown</h3>
            {sectionResults.map((r, i) => {
              const pct = Math.round((r.correct / r.total) * 100);
              return (
                <Card key={i} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{r.name}</span>
                    <Badge variant={pct >= 70 ? "default" : "destructive"}>{pct}%</Badge>
                  </div>
                  <Progress value={pct} className="h-2 mb-1" />
                  <p className="text-xs text-muted-foreground">{r.correct}/{r.total} correct · {fmt(r.timeUsed)} used</p>
                </Card>
              );
            })}

            {/* Strengths & Growth */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3">
                <h4 className="text-xs font-bold text-emerald-500 flex items-center gap-1 mb-1"><TrendingUp className="w-3 h-3" /> Strengths</h4>
                {sectionResults.filter(r => (r.correct / r.total) >= 0.7).slice(0, 3).map((r, i) => (
                  <p key={i} className="text-xs text-muted-foreground truncate">{r.name}</p>
                ))}
                {sectionResults.filter(r => (r.correct / r.total) >= 0.7).length === 0 && (
                  <p className="text-xs text-muted-foreground">Keep practicing!</p>
                )}
              </Card>
              <Card className="p-3">
                <h4 className="text-xs font-bold text-amber-500 flex items-center gap-1 mb-1"><TrendingDown className="w-3 h-3" /> Growth Areas</h4>
                {sectionResults.filter(r => (r.correct / r.total) < 0.7).slice(0, 3).map((r, i) => (
                  <p key={i} className="text-xs text-muted-foreground truncate">{r.name}</p>
                ))}
                {sectionResults.filter(r => (r.correct / r.total) < 0.7).length === 0 && (
                  <p className="text-xs text-muted-foreground">All strong!</p>
                )}
              </Card>
            </div>

            {/* Next actions */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <h4 className="text-sm font-bold mb-2">🎯 Recommended Next Step</h4>
              <p className="text-xs text-muted-foreground">
                {overallPct >= 80
                  ? "Try a full-length simulation or challenge yourself with a harder exam."
                  : overallPct >= 60
                    ? "Focus on your weakest sections with a skill-targeted session."
                    : "Start with a rapid checkpoint on your weakest area, then build up."}
              </p>
            </Card>

            <Button className="w-full" onClick={() => { setPhase("select"); setBlueprint(null); }}>Try Another Exam</Button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ExamSimulator;
