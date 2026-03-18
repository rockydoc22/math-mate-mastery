import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Zap, Clock, CheckCircle2, XCircle, Trophy, Flag } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";
import { motion, AnimatePresence } from "framer-motion";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface SpeedQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  subject: "math" | "english";
  skill: string;
}

const SPEED_QUESTIONS: SpeedQuestion[] = [
  { id: "s1", question: "Solve: 3x + 7 = 22", options: ["x = 3", "x = 5", "x = 7", "x = 4"], correct: 1, subject: "math", skill: "linear_equations" },
  { id: "s2", question: "What is 15% of 200?", options: ["25", "30", "35", "20"], correct: 1, subject: "math", skill: "percentages" },
  { id: "s3", question: "If f(x) = 2x² - 3, what is f(4)?", options: ["29", "31", "25", "27"], correct: 0, subject: "math", skill: "functions" },
  { id: "s4", question: "Simplify: (x³)(x⁵)", options: ["x⁸", "x¹⁵", "x²", "2x⁸"], correct: 0, subject: "math", skill: "exponents" },
  { id: "s5", question: "What is the slope of y = -3x + 7?", options: ["7", "-3", "3", "-7"], correct: 1, subject: "math", skill: "linear_equations" },
  { id: "s6", question: "Factor: x² - 9", options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)²", "(x+9)(x-1)"], correct: 0, subject: "math", skill: "factoring" },
  { id: "s7", question: "√144 = ?", options: ["14", "12", "11", "13"], correct: 1, subject: "math", skill: "radicals" },
  { id: "s8", question: "If a triangle has sides 3, 4, 5 — is it a right triangle?", options: ["Yes", "No", "Not enough info", "Only if isosceles"], correct: 0, subject: "math", skill: "geometry" },
  { id: "s9", question: "Choose the correct word: 'The team ___ playing well.'", options: ["is", "are", "were", "been"], correct: 0, subject: "english", skill: "subject_verb_agreement" },
  { id: "s10", question: "Which is a run-on sentence?", options: ["I ran fast, I won.", "I ran fast and won.", "Running fast, I won.", "Because I ran, I won."], correct: 0, subject: "english", skill: "punctuation" },
  { id: "s11", question: "Identify the error: 'Me and him went to the store.'", options: ["Should be 'He and I'", "Should be 'Him and me'", "No error", "Should be 'Us'"], correct: 0, subject: "english", skill: "pronouns" },
  { id: "s12", question: "'Ubiquitous' most nearly means:", options: ["Rare", "Everywhere", "Hidden", "Ancient"], correct: 1, subject: "english", skill: "vocabulary" },
  { id: "s13", question: "Solve: |x - 3| = 5", options: ["x = 8 or x = -2", "x = 8 only", "x = -2 only", "x = 2 or x = 8"], correct: 0, subject: "math", skill: "absolute_value" },
  { id: "s14", question: "What does a semicolon do?", options: ["Joins two independent clauses", "Introduces a list", "Shows possession", "Indicates a question"], correct: 0, subject: "english", skill: "punctuation" },
  { id: "s15", question: "If 2x + 5 > 11, then x > ?", options: ["3", "4", "5", "6"], correct: 0, subject: "math", skill: "inequalities" },
  { id: "s16", question: "Area of a circle with radius 5?", options: ["25π", "10π", "15π", "5π"], correct: 0, subject: "math", skill: "geometry" },
  { id: "s17", question: "Choose parallel structure: 'She likes to run, ___, and swim.'", options: ["cycling", "to cycle", "she cycles", "biked"], correct: 1, subject: "english", skill: "parallelism" },
  { id: "s18", question: "Convert 0.75 to a fraction:", options: ["3/4", "7/5", "3/5", "7/10"], correct: 0, subject: "math", skill: "fractions" },
  { id: "s19", question: "Which sentence uses a colon correctly?", options: ["She wanted one thing: success.", "She: wanted success.", "She wanted: one thing.", "Success: she wanted."], correct: 0, subject: "english", skill: "punctuation" },
  { id: "s20", question: "Mean of {2, 4, 6, 8, 10}?", options: ["6", "5", "7", "8"], correct: 0, subject: "math", skill: "statistics" },
];

const DRILL_SIZE = 5;
const TIME_PER_QUESTION = 30; // seconds

const SpeedDrill = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [phase, setPhase] = useState<"setup" | "active" | "results">("setup");
  const [questions, setQuestions] = useState<SpeedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [totalTime, setTotalTime] = useState(0);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const startDrill = (subject: "math" | "english" | "both") => {
    let pool = SPEED_QUESTIONS;
    if (subject !== "both") pool = pool.filter(q => q.subject === subject);

    // Shuffle and pick
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, DRILL_SIZE);
    setQuestions(shuffled);
    setAnswers(new Array(shuffled.length).fill(null));
    setCurrentIndex(0);
    setTimeLeft(TIME_PER_QUESTION);
    startTimeRef.current = Date.now();
    setPhase("active");
  };

  useEffect(() => {
    if (phase !== "active") return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up — move to next or finish
          handleAnswer(null);
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentIndex]);

  const handleAnswer = useCallback((answerIndex: number | null) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = answerIndex;
    setAnswers(newAnswers);

    if (currentIndex + 1 >= questions.length) {
      setTotalTime(Math.round((Date.now() - startTimeRef.current) / 1000));
      setPhase("results");
      // Save attempts
      if (user) {
        const kidId = sessionStorage.getItem(`kid_selected_${user.id}`);
        questions.forEach((q, i) => {
          const isCorrect = newAnswers[i] === q.correct;
          supabase.from("question_attempts").insert({
            user_id: user.id,
            question_id: q.id,
            question_type: q.subject,
            domain: "speed_drill",
            skill: q.skill,
            is_correct: isCorrect,
            kid_profile_id: kidId && kidId !== 'parent' ? kidId : null,
          } as any).then(() => {});
        });
      }
    } else {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(TIME_PER_QUESTION);
    }
  }, [answers, currentIndex, questions, user]);

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Speed Drill
          </h1>
          <p className="text-xs text-muted-foreground">Quick-fire timed questions</p>
        </div>
        {phase === "active" && (
          <div className="text-right">
            <p className="text-sm font-bold text-foreground">{currentIndex + 1}/{questions.length}</p>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto p-4">
        {phase === "setup" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <Zap className="w-12 h-12 mx-auto text-primary mb-3" />
              <h2 className="text-xl font-black text-foreground mb-1">Speed Drill</h2>
              <p className="text-sm text-muted-foreground mb-1">
                {DRILL_SIZE} questions • {TIME_PER_QUESTION}s each
              </p>
              <p className="text-xs text-muted-foreground">Answer fast and accurately!</p>
            </Card>

            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground">Choose Subject:</p>
              {[
                { key: "both" as const, label: "Mixed (Math + English)", emoji: "🎯" },
                { key: "math" as const, label: "Math Only", emoji: "🔢" },
                { key: "english" as const, label: "English Only", emoji: "📝" },
              ].map(opt => (
                <Button
                  key={opt.key}
                  variant="outline"
                  className="w-full justify-start text-left h-12 text-sm"
                  onClick={() => startDrill(opt.key)}
                >
                  <span className="mr-2 text-lg">{opt.emoji}</span> {opt.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "active" && currentQ && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Timer Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Time
                </span>
                <span className={`font-bold ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
                  {timeLeft}s
                </span>
              </div>
              <Progress
                value={(timeLeft / TIME_PER_QUESTION) * 100}
                className={`h-2 ${timeLeft <= 10 ? "[&>div]:bg-destructive" : ""}`}
              />
            </div>

            {/* Question */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  currentQ.subject === "math"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                }`}>
                  {currentQ.subject}
                </span>
                <span className="text-[10px] text-muted-foreground capitalize">{currentQ.skill.replace(/_/g, " ")}</span>
              </div>

              <p className="text-base font-bold text-foreground mb-4">{currentQ.question}</p>

              <div className="space-y-2">
                {currentQ.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(oi)}
                    className="w-full text-left p-3 rounded-lg border border-border bg-background hover:bg-muted/50 hover:border-primary/50 transition-all text-sm font-medium text-foreground"
                  >
                    <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + oi)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </Card>

            {/* Flag + Skip */}
            <div className="flex justify-between">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={() => setIsFlagModalOpen(true)}>
                <Flag className="w-3 h-3" /> Flag
              </Button>
              <Button variant="ghost" className="text-xs text-muted-foreground" onClick={() => handleAnswer(null)}>
                Skip →
              </Button>
            </div>

            <FlagQuestionModal
              isOpen={isFlagModalOpen}
              onClose={() => setIsFlagModalOpen(false)}
              questionId={currentQ.id}
              questionType={currentQ.subject}
            />
        )}

        {phase === "results" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <Trophy className="w-12 h-12 mx-auto text-primary mb-3" />
              <p className="text-4xl font-black text-foreground">{score}/{questions.length}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Completed in {totalTime}s ({(totalTime / questions.length).toFixed(1)}s avg)
              </p>
              <p className="text-lg mt-2">
                {score === questions.length ? "🔥 Perfect!" : score >= questions.length * 0.8 ? "⭐ Great job!" : score >= questions.length * 0.6 ? "👍 Not bad!" : "💪 Keep practicing!"}
              </p>
            </Card>

            {/* Review */}
            <div className="space-y-2">
              {questions.map((q, i) => {
                const correct = answers[i] === q.correct;
                const skipped = answers[i] === null;
                return (
                  <Card key={i} className={`p-3 border-l-4 ${correct ? "border-l-emerald-500" : "border-l-destructive"}`}>
                    <div className="flex items-start gap-2">
                      {correct ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{q.question}</p>
                        {!correct && (
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                            Correct: {q.options[q.correct]}
                          </p>
                        )}
                        {skipped && <p className="text-[10px] text-muted-foreground">Skipped / Timed out</p>}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={() => setPhase("setup")}>
                <Zap className="w-4 h-4 mr-2" /> Play Again
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default SpeedDrill;
