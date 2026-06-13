import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Skull, Trophy, Lock, Swords } from "lucide-react";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { useAuth } from "@/hooks/useAuth";
import { QuizCard } from "@/components/QuizCard";
import { ReflectionJournalCard } from "@/components/ReflectionJournalCard";
import { getProExam } from "@/utils/proExamConfig";
import { loadProExamQuestions } from "@/data/proExamQuestions";
import type { Question } from "@/data/questions";

const BOSS_KEY = "boss_battle_daily";

interface BossState {
  date: string;
  answered: boolean;
  correct: boolean;
  questionId: string;
}

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const BossBattle = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const examId = searchParams.get("exam") || "";
  const proExam = examId ? getProExam(examId) : undefined;
  const today = getTodayStr();

  const stateKey = proExam ? `${BOSS_KEY}_${proExam.id}` : BOSS_KEY;

  const [bossState, setBossState] = useState<BossState | null>(() => {
    const stored = localStorage.getItem(stateKey);
    if (stored) {
      const parsed = JSON.parse(stored) as BossState;
      if (parsed.date === today) return parsed;
    }
    return null;
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [wins, setWins] = useState(() => {
    const stored = localStorage.getItem(proExam ? `boss_battle_wins_${proExam.id}` : "boss_battle_wins");
    return stored ? parseInt(stored, 10) : 0;
  });

  const [proPool, setProPool] = useState<Question[] | null>(null);

  useEffect(() => {
    if (!proExam) return;
    let cancelled = false;
    loadProExamQuestions(proExam.jsonFiles).then(qs => {
      if (!cancelled) setProPool(qs);
    });
    return () => { cancelled = true; };
  }, [proExam]);

  // Pick today's boss question deterministically - hardest questions only
  const bossQuestion = useMemo(() => {
    if (proExam) {
      if (!proPool || proPool.length === 0) return null;
      const hard = proPool.filter(q => q.difficulty === "Hard");
      const pool = hard.length > 0 ? hard : proPool;
      const seed = seededRandom(`${proExam.id}:${today}`);
      const q = pool[seed % pool.length];
      return {
        ...q,
        diffNum: 10,
        type: "math" as const, // label only
      };
    }
    const allHard = [
      ...questions.filter(q => (q.difficultyRating || 0) >= 9).map(q => ({ ...q, diffNum: q.difficultyRating || 9, type: "math" as const })),
      ...englishQuestions.filter(q => (q.difficultyRating || 0) >= 9).map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        diffNum: q.difficultyRating || 9,
        type: "english" as const,
      })),
    ];

    if (allHard.length === 0) return null;

    const seed = seededRandom(today);
    const idx = seed % allHard.length;
    return allHard[idx];
  }, [today, proExam, proPool]);

  // If already answered today, use stored state
  const alreadyAnswered = bossState?.date === today && bossState.answered;

  const handleAnswer = (answer: string) => {
    if (alreadyAnswered || showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const correct = answer === bossQuestion?.correctAnswer;
    const state: BossState = {
      date: today,
      answered: true,
      correct,
      questionId: bossQuestion?.id || "",
    };
    setBossState(state);
    localStorage.setItem(stateKey, JSON.stringify(state));

    if (correct) {
      const newWins = wins + 1;
      setWins(newWins);
      localStorage.setItem(proExam ? `boss_battle_wins_${proExam.id}` : "boss_battle_wins", String(newWins));
    }
  };

  if (!bossQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No boss questions available yet.</p>
          <Link to="/"><Button className="mt-4">Home</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-accent/10 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Skull className="w-6 h-6 text-destructive" /> {proExam ? `${proExam.shortName} Boss` : "Daily Boss Battle"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {proExam ? `One hard ${proExam.shortName} question per day. Make it count.` : "One ultra-hard question. One chance. Come back tomorrow."}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center">
          <Card className="px-4 py-2 text-center">
            <p className="text-2xl font-bold text-primary">{wins}</p>
            <p className="text-xs text-muted-foreground">Bosses Slain</p>
          </Card>
          <Card className="px-4 py-2 text-center">
            <Skull className="w-6 h-6 text-destructive mx-auto" />
            <p className="text-xs text-muted-foreground">Difficulty 9-10</p>
          </Card>
        </div>

        {/* Already answered today */}
        {alreadyAnswered && !showResult ? (
          <Card className="p-8 text-center space-y-4">
            {bossState?.correct ? (
              <>
                <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
                <h2 className="text-2xl font-bold">Boss Defeated! 🎉</h2>
                <p className="text-muted-foreground">You conquered today's boss. Come back tomorrow for a new challenge!</p>
              </>
            ) : (
              <>
                <Skull className="w-16 h-16 text-destructive mx-auto" />
                <h2 className="text-2xl font-bold">Defeated... 💀</h2>
                <p className="text-muted-foreground">The boss won today. Train harder and try again tomorrow!</p>
              </>
            )}
            <Lock className="w-8 h-8 text-muted-foreground mx-auto" />
            <p className="text-xs text-muted-foreground">Next boss unlocks at midnight</p>
            <Link to="/"><Button variant="outline">Back to Home</Button></Link>
          </Card>
        ) : (
          <>
            {/* Boss intro */}
            {!showResult && (
              <Card className="p-4 text-center bg-destructive/5 border-destructive/20">
                <Swords className="w-8 h-8 text-destructive mx-auto mb-2" />
                <p className="text-sm font-medium">⚔️ Today's Boss: {proExam ? `${proExam.shortName} · ${(bossQuestion as any).domain || "Mixed"}` : `Level ${bossQuestion.diffNum} ${bossQuestion.type === "math" ? "Math" : "English"}`}</p>
                <p className="text-xs text-muted-foreground">You only get ONE shot!</p>
              </Card>
            )}

            {/* Question */}
            <Card className="p-6">
              <p className="text-lg font-semibold mb-6 whitespace-pre-wrap">{bossQuestion.question}</p>
              <div className="grid gap-3">
                {bossQuestion.options.map((opt) => {
                  const optValue = typeof opt === "string" ? opt : opt.text;
                  const optLetter = typeof opt === "string" ? "" : opt.letter;
                  const isSelected = selectedAnswer === (optLetter || optValue);
                  const isCorrect = (optLetter || optValue) === bossQuestion.correctAnswer;

                  let btnClass = "hover:bg-primary/10";
                  let variant: "outline" | "default" | "destructive" = "outline";

                  if (showResult) {
                    if (isCorrect) {
                      variant = "default";
                      btnClass = "bg-emerald-500 hover:bg-emerald-500 text-white border-emerald-500";
                    } else if (isSelected) {
                      variant = "destructive";
                      btnClass = "";
                    } else {
                      btnClass = "opacity-50";
                    }
                  }

                  return (
                    <Button
                      key={optLetter || optValue}
                      variant={variant}
                      className={`h-auto py-3 px-4 text-left justify-start text-sm font-medium ${btnClass}`}
                      onClick={() => handleAnswer(optLetter || optValue)}
                      disabled={showResult || alreadyAnswered}
                    >
                      {optLetter && <span className="mr-2 font-bold text-muted-foreground">{optLetter}.</span>}
                      {optValue}
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Result */}
            {showResult && (
              <Card className="p-6 text-center space-y-3">
                {bossState?.correct ? (
                  <>
                    <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
                    <h2 className="text-xl font-bold">Boss Defeated! ⚔️</h2>
                  </>
                ) : (
                  <>
                    <Skull className="w-12 h-12 text-destructive mx-auto" />
                    <h2 className="text-xl font-bold">The Boss Wins... 💀</h2>
                  </>
                )}
                {bossQuestion.explanation && (
                  <p className="text-sm text-muted-foreground text-left">{bossQuestion.explanation}</p>
                )}
                <Link to="/"><Button className="mt-2">Back to Home</Button></Link>
              </Card>
            )}

            {showResult && (
              <ReflectionJournalCard
                subject={bossQuestion.type === "math" ? "Math" : "Reading"}
                sessionKey={`boss_${today}`}
                context={`Daily Boss Battle · ${today} · ${bossState?.correct ? "won" : "lost"}`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BossBattle;
