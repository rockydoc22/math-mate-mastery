import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Rocket, Zap, Star, Trophy, ChevronRight, Shield, Swords, BookOpen, Brain, CheckCircle2, XCircle, RotateCcw, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { supabase } from "@/integrations/supabase/client";
import { questions as mathQuestions, Question } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";
import { motion, AnimatePresence } from "framer-motion";

interface StoryMission {
  mission_id: string;
  setting: string;
  subject: string;
  difficulty: string;
  title: string;
  objective: string;
  chapters: { chapter: number; beats: string[] }[];
  rewards: string[];
}

interface HintTemplate {
  skill_id: string;
  subject: string;
  difficulty: string;
  hint_sequence: string[];
}

interface ReflectionPrompt {
  id: string;
  subject: string;
  prompt: string;
  followups: string[];
}

type MissionPhase = "select" | "briefing" | "question" | "checkpoint" | "boss" | "summary";

const difficultyColors: Record<string, string> = {
  easy: "text-emerald-600 bg-emerald-500/10",
  medium: "text-amber-600 bg-amber-500/10",
  hard: "text-destructive bg-destructive/10",
};

const subjectIcons: Record<string, string> = {
  Math: "🧮", Reading: "📖", Writing: "✍️", Science: "🔬", "Social Studies": "🌍",
};

function extractQuestionCount(objective: string): number {
  const m = objective.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 6;
}

function getQuestionsForSubject(subject: string, difficulty: string, count: number): Question[] {
  let pool: Question[] = [];
  const subjectLower = subject.toLowerCase();

  if (subjectLower === "math") {
    pool = [...mathQuestions];
  } else if (["reading", "writing", "english"].includes(subjectLower)) {
    pool = [...englishQuestions];
  } else {
    pool = [...mathQuestions, ...englishQuestions];
  }

  if (difficulty === "easy") {
    pool = pool.filter(q => ["Easy", "easy", "Medium", "medium"].includes(q.difficulty));
  } else if (difficulty === "hard") {
    pool = pool.filter(q => ["Hard", "hard", "Very Hard", "Expert"].includes(q.difficulty));
  }

  if (pool.length < count) pool = [...mathQuestions, ...englishQuestions];

  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}

function getHintsForQuestion(hints: HintTemplate[], subject: string, difficulty: string): string[] {
  // Try exact match first, then subject match, then generic
  const subjectHints = hints.filter(h => h.subject.toLowerCase() === subject.toLowerCase());
  const exact = subjectHints.find(h => h.difficulty === difficulty);
  if (exact) return exact.hint_sequence;
  if (subjectHints.length > 0) return subjectHints[0].hint_sequence;
  // Fallback generic hints
  return [
    "Read the question carefully. What is it really asking?",
    "Identify the key information given.",
    "Try eliminating obviously wrong answers first.",
    "Break the problem into smaller steps."
  ];
}

const StoryMissions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [missions, setMissions] = useState<StoryMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState<StoryMission | null>(null);
  const [phase, setPhase] = useState<MissionPhase>("select");
  const [missionQuestions, setMissionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  // Hint system state
  const [hintTemplates, setHintTemplates] = useState<HintTemplate[]>([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const [showHints, setShowHints] = useState(false);

  // Reflection state
  const [reflectionPrompts, setReflectionPrompts] = useState<ReflectionPrompt[]>([]);
  const [showReflection, setShowReflection] = useState(false);
  const [selectedFollowup, setSelectedFollowup] = useState<string | null>(null);

  useEffect(() => {
    import("@/lib/protectedAsset").then(({ fetchProtectedJson }) => Promise.all([
      fetchProtectedJson<any>("ai/story_missions.json"),
      fetchProtectedJson<any>("ai/tutor_and_hint_system.json").catch(() => ({ hint_templates: [] })),
      fetchProtectedJson<any>("ai/reflection_journal_prompts.json").catch(() => ({ reflection_prompts: [] })),
    ])).then(([mData, hData, rData]: any[]) => {
      setMissions(mData.story_missions || []);
      setHintTemplates(hData.hint_templates || []);
      setReflectionPrompts(rData.reflection_prompts || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const subjects = useMemo(() => [...new Set(missions.map(m => m.subject))], [missions]);
  const difficulties = ["easy", "medium", "hard"];

  const filteredMissions = useMemo(() => {
    return missions.filter(m => {
      if (subjectFilter && m.subject !== subjectFilter) return false;
      if (difficultyFilter && m.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [missions, subjectFilter, difficultyFilter]);

  const currentHints = useMemo(() => {
    if (!selectedMission) return [];
    return getHintsForQuestion(hintTemplates, selectedMission.subject, selectedMission.difficulty);
  }, [selectedMission, hintTemplates]);

  const currentReflection = useMemo(() => {
    if (!selectedMission) return null;
    const subjectPrompts = reflectionPrompts.filter(
      p => p.subject.toLowerCase() === selectedMission.subject.toLowerCase()
    );
    if (subjectPrompts.length === 0) {
      // fallback to any prompt
      return reflectionPrompts.length > 0 ? reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)] : null;
    }
    return subjectPrompts[Math.floor(Math.random() * subjectPrompts.length)];
  }, [selectedMission, reflectionPrompts]);

  const startMission = useCallback((mission: StoryMission) => {
    const count = extractQuestionCount(mission.objective);
    const qs = getQuestionsForSubject(mission.subject, mission.difficulty, count);
    setSelectedMission(mission);
    setMissionQuestions(shuffleAllQuestionOptions(qs as any) as typeof qs);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentHintIndex(-1);
    setShowHints(false);
    setShowReflection(false);
    setSelectedFollowup(null);
    setPhase("briefing");
  }, []);

  const handleAnswer = useCallback((letter: string) => {
    if (showResult) return;
    setSelectedAnswer(letter);
    setShowResult(true);
    const q = missionQuestions[currentIndex];
    const correct = letter === q.correctAnswer;
    if (correct) setScore(s => s + 1);

    if (user) {
      supabase.from("question_attempts").insert({
        user_id: user.id,
        question_id: q.id,
        question_type: "story_mission",
        domain: q.domain || selectedMission?.subject || "General",
        skill: q.skill || "general",
        is_correct: correct,
      }).then(() => {});
    }
  }, [showResult, missionQuestions, currentIndex, user, selectedMission]);

  const revealNextHint = useCallback(() => {
    if (currentHintIndex < currentHints.length - 1) {
      setCurrentHintIndex(i => i + 1);
      setShowHints(true);
    }
  }, [currentHintIndex, currentHints]);

  const handleNext = useCallback(() => {
    const nextIdx = currentIndex + 1;
    const total = missionQuestions.length;
    const isBossIndex = total - 1;

    setCurrentHintIndex(-1);
    setShowHints(false);

    if (nextIdx >= total) {
      setPhase("summary");
    } else if (nextIdx === Math.floor(total / 2)) {
      setPhase("checkpoint");
    } else if (nextIdx === isBossIndex) {
      setPhase("boss");
    } else {
      setCurrentIndex(nextIdx);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentIndex, missionQuestions]);

  const continueFromCheckpoint = () => {
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setPhase("question");
  };

  const startBoss = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setPhase("question");
  };

  const resetToSelect = () => {
    setPhase("select");
    setSelectedMission(null);
    setMissionQuestions([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── MISSION SELECT ──
  if (phase === "select") {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2"><Rocket className="w-5 h-5 text-primary" /> Story Missions</h1>
              <p className="text-xs text-muted-foreground">Complete missions to earn XP, badges & avatar items</p>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={subjectFilter === null ? "default" : "outline"} onClick={() => setSubjectFilter(null)}>All</Button>
            {subjects.map(s => (
              <Button key={s} size="sm" variant={subjectFilter === s ? "default" : "outline"} onClick={() => setSubjectFilter(s)}>
                {subjectIcons[s] || "📚"} {s}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {difficulties.map(d => (
              <Button key={d} size="sm" variant={difficultyFilter === d ? "default" : "outline"} onClick={() => setDifficultyFilter(difficultyFilter === d ? null : d)} className="capitalize">
                {d}
              </Button>
            ))}
          </div>

          {filteredMissions.length === 0 && <p className="text-muted-foreground text-center py-8">No missions match your filters.</p>}

          {filteredMissions.map(mission => (
            <Card key={mission.mission_id} className="p-4 hover:shadow-md transition-all hover:border-primary/40 cursor-pointer" onClick={() => startMission(mission)}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                  {subjectIcons[mission.subject] || "🚀"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm">{mission.title}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold capitalize ${difficultyColors[mission.difficulty] || ""}`}>
                      {mission.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{mission.objective}</p>
                  <div className="flex gap-2 mt-2">
                    {mission.rewards.map(r => (
                      <span key={r} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">{r.replace("_", " ")}</span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </Card>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  }

  // ── BRIEFING ──
  if (phase === "briefing" && selectedMission) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card className="p-8 text-center space-y-6 border-primary/30">
            <div className="text-5xl">{subjectIcons[selectedMission.subject] || "🚀"}</div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Mission Briefing</p>
              <h2 className="text-2xl font-bold">{selectedMission.title}</h2>
            </div>
            <p className="text-muted-foreground">{selectedMission.objective}</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className={`px-2 py-1 rounded-full capitalize ${difficultyColors[selectedMission.difficulty]}`}>{selectedMission.difficulty}</span>
              <span className="text-muted-foreground">{missionQuestions.length} questions</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-left">
              <p className="text-xs font-semibold text-muted-foreground mb-1">💡 Hints available during questions</p>
              <p className="text-xs text-muted-foreground">Tap the lightbulb icon for progressive hints — no penalty!</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={resetToSelect}>Back</Button>
              <Button onClick={() => setPhase("question")} className="gap-2"><Rocket className="w-4 h-4" /> Launch Mission</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── CHECKPOINT ──
  if (phase === "checkpoint" && selectedMission) {
    const halfway = Math.floor(missionQuestions.length / 2);
    const pct = Math.round((score / halfway) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <Card className="p-8 text-center space-y-6 border-amber-500/30">
            <div className="text-5xl">🛡️</div>
            <h2 className="text-2xl font-bold">Checkpoint Reached</h2>
            <p className="text-muted-foreground">Halfway through! You've answered {score}/{halfway} correctly ({pct}%).</p>
            <Progress value={pct} className="h-3" />
            <p className="text-sm text-muted-foreground">{pct >= 70 ? "Great pace! Keep going." : "Hang in there — the boss awaits."}</p>
            <Button onClick={continueFromCheckpoint} className="gap-2"><Shield className="w-4 h-4" /> Continue Mission</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── BOSS INTRO ──
  if (phase === "boss" && selectedMission) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card className="p-8 text-center space-y-6 border-destructive/30">
            <div className="text-5xl">💀</div>
            <h2 className="text-2xl font-bold text-destructive">Boss Problem</h2>
            <p className="text-muted-foreground">Final challenge! Get this right for bonus XP.</p>
            <Button onClick={startBoss} className="gap-2 bg-destructive hover:bg-destructive/90"><Swords className="w-4 h-4" /> Face the Boss</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── SUMMARY WITH REFLECTION ──
  if (phase === "summary" && selectedMission) {
    const total = missionQuestions.length;
    const pct = Math.round((score / total) * 100);
    const xpEarned = score * 15 + (pct >= 80 ? 50 : 0);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <Card className="p-8 text-center space-y-6">
            <div className="text-5xl">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "🔄"}</div>
            <h2 className="text-2xl font-bold">Mission {pct >= 60 ? "Complete" : "Failed"}!</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-2xl font-bold text-primary">{score}/{total}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-2xl font-bold text-primary">{pct}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-2xl font-bold text-primary">+{xpEarned}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedMission.rewards.map(r => (
                <span key={r} className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 font-bold capitalize">{r.replace("_", " ")} ✓</span>
              ))}
            </div>

            {/* Reflection Journal */}
            {currentReflection && (
              <div className="text-left space-y-3">
                <button
                  onClick={() => setShowReflection(!showReflection)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary w-full"
                >
                  <BookOpen className="w-4 h-4" />
                  Reflection Journal
                  {showReflection ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
                </button>
                {showReflection && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
                    <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg">
                      "{currentReflection.prompt}"
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentReflection.followups.map((f, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedFollowup(selectedFollowup === f ? null : f)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                            selectedFollowup === f
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    {selectedFollowup && (
                      <p className="text-xs text-muted-foreground p-2 bg-primary/5 rounded-lg">
                        💭 Think about: <strong>{selectedFollowup}</strong> — jot your thoughts in a notebook for best results.
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={resetToSelect}>All Missions</Button>
              <Button onClick={() => startMission(selectedMission)} className="gap-2"><RotateCcw className="w-4 h-4" /> Retry</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // ── QUESTION PHASE WITH HINTS ──
  const q = missionQuestions[currentIndex];
  if (!q || !selectedMission) return null;

  const isBoss = currentIndex === missionQuestions.length - 1;
  const hintsAvailable = currentHints.length > 0;
  const hintsRevealed = currentHintIndex + 1;
  const allHintsShown = hintsRevealed >= currentHints.length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={resetToSelect}><ArrowLeft className="w-5 h-5" /></Button>
          <div className="flex items-center gap-2">
            {isBoss && <span className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive font-bold">💀 BOSS</span>}
            <span className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1}/{missionQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {hintsAvailable && !showResult && (
              <Button
                variant="ghost"
                size="sm"
                onClick={revealNextHint}
                disabled={allHintsShown}
                className="gap-1 text-amber-600"
              >
                <Lightbulb className="w-4 h-4" />
                {allHintsShown ? `${hintsRevealed}/${currentHints.length}` : "Hint"}
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsFlagOpen(true)}>🚩</Button>
          </div>
        </div>

        <Progress value={((currentIndex + 1) / missionQuestions.length) * 100} className={`h-2 ${isBoss ? "[&>div]:bg-destructive" : ""}`} />

        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 text-primary" />
          <span className="font-medium text-primary">{score * 15} XP</span>
          <span className="text-muted-foreground">• {selectedMission.title}</span>
        </div>

        {/* Hints Panel */}
        {showHints && hintsRevealed > 0 && !showResult && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-3 border-amber-500/30 bg-amber-50/50 dark:bg-amber-900/10 space-y-2">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Hints ({hintsRevealed}/{currentHints.length})
              </p>
              {currentHints.slice(0, hintsRevealed).map((hint, i) => (
                <p key={i} className="text-xs text-amber-800 dark:text-amber-300">
                  {i + 1}. {hint}
                </p>
              ))}
              {!allHintsShown && (
                <button onClick={revealNextHint} className="text-xs text-amber-600 underline">
                  Show next hint →
                </button>
              )}
            </Card>
          </motion.div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Card className={`p-6 ${isBoss ? "border-destructive/30" : ""}`}>
              <p className="text-sm text-muted-foreground mb-1">{q.domain} • {q.skill}</p>
              <h3 className="text-lg font-semibold mb-4">{q.question}</h3>
              <div className="space-y-3">
                {q.options.map(opt => {
                  const isSelected = selectedAnswer === opt.letter;
                  const isCorrect = opt.letter === q.correctAnswer;
                  let cls = "w-full text-left p-3 rounded-lg border transition-all ";
                  if (showResult && isSelected && isCorrect) cls += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
                  else if (showResult && isSelected && !isCorrect) cls += "border-destructive bg-destructive/10";
                  else if (showResult && isCorrect) cls += "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10";
                  else cls += "border-border hover:border-primary/50 hover:bg-muted/50";

                  return (
                    <button key={opt.letter} className={cls} onClick={() => handleAnswer(opt.letter)} disabled={showResult}>
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-sm font-bold mr-3">{opt.letter}</span>
                      {opt.text}
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 inline ml-2" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive inline ml-2" />}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-lg bg-muted/50">
                  <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {showResult && (
          <Button className="w-full" onClick={handleNext}>
            {currentIndex + 1 >= missionQuestions.length ? "See Results" : "Next Question"}
          </Button>
        )}
      </div>

      <FlagQuestionModal
        isOpen={isFlagOpen}
        onClose={() => setIsFlagOpen(false)}
        questionId={q.id}
        questionType="story_mission"
      />
    </div>
  );
};

export default StoryMissions;
