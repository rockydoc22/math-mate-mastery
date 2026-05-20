import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Sparkles, Target, Loader2, BookOpenCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { loadWeakAreas, sampleQuestionsForWeakAreas, type WeakArea } from "@/lib/weaknessAnalyzer";
import { questions as mathQuestions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { QuizCard } from "@/components/QuizCard";
import { SEO } from "@/components/SEO";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Phase = "loading" | "diagnosis" | "quiz" | "summary";

const MIN_ATTEMPTS_FOR_BOOSTER = 8;

const BoosterTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("loading");
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [recentAccuracy, setRecentAccuracy] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [deepExplanation, setDeepExplanation] = useState<string>("");
  const [deepLoading, setDeepLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const r = await loadWeakAreas(user.id, 5);
      setWeakAreas(r.weakAreas);
      setTotalAttempts(r.totalAttempts);
      setRecentAccuracy(r.recentAccuracy);
      setPhase("diagnosis");
    })();
  }, [user]);

  const combinedBank = useMemo(
    () => [
      ...mathQuestions.map((q) => ({ ...q, _type: "math" as const })),
      ...englishQuestions.map((q: any) => ({ ...q, _type: "english" as const })),
    ],
    []
  );

  const startBooster = () => {
    const picked = sampleQuestionsForWeakAreas(combinedBank, weakAreas, 15);
    if (picked.length === 0) {
      toast.error("Not enough question data yet — try a regular quiz first.");
      return;
    }
    setItems(picked);
    setIdx(0);
    setSelected(null);
    setShowResult(false);
    setCorrectCount(0);
    setDeepExplanation("");
    setPhase("quiz");
  };

  const current = items[idx];
  const isCorrect = current && selected === current.correctAnswer;

  const handleSubmit = async () => {
    setShowResult(true);
    if (isCorrect) setCorrectCount((c) => c + 1);
    if (user && current) {
      try {
        await supabase.from("question_attempts").insert({
          user_id: user.id,
          question_id: String(current.id),
          question_type: current._type || "math",
          domain: current.domain || "General",
          skill: current.skill || "Unknown",
          is_correct: !!isCorrect,
        });
      } catch {}
    }
  };

  const fetchDeep = async () => {
    if (!current) return;
    setDeepLoading(true);
    setDeepExplanation("");
    try {
      const { data, error } = await supabase.functions.invoke("elaborate-explanation", {
        body: {
          question: current.question,
          options: current.options,
          correctAnswer: current.correctAnswer,
          studentAnswer: selected,
          skill: current.skill,
          domain: current.domain,
        },
      });
      if (error) throw error;
      setDeepExplanation(data?.explanation || "No explanation returned.");
    } catch (e: any) {
      toast.error("Could not load deep explanation.");
    } finally {
      setDeepLoading(false);
    }
  };

  const next = () => {
    setSelected(null);
    setShowResult(false);
    setDeepExplanation("");
    if (idx + 1 >= items.length) setPhase("summary");
    else setIdx(idx + 1);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-6 max-w-md text-center">
          <p className="mb-4">Sign in to access your personalized Booster Test.</p>
          <Link to="/auth"><Button>Sign in</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Booster Test — Personalized Weakness Quiz" description="Targeted retest built only from your weakest skills, with elaborate explanations on every miss." path="/booster" />
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        {phase === "loading" && (
          <Card className="p-8 text-center">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
            <p className="mt-3 text-muted-foreground">Analyzing your last 1,000 attempts…</p>
          </Card>
        )}

        {phase === "diagnosis" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Your Booster Test</h1>
            </div>
            {totalAttempts < MIN_ATTEMPTS_FOR_BOOSTER || weakAreas.length === 0 ? (
              <Card className="p-6">
                <p className="text-muted-foreground">
                  We need a bit more data first. Answer at least {MIN_ATTEMPTS_FOR_BOOSTER} questions across a few skills, then come back. So far: <b>{totalAttempts}</b> attempts.
                </p>
                <Link to="/quiz"><Button className="mt-4">Take a quick quiz</Button></Link>
              </Card>
            ) : (
              <>
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold">Weak areas detected</h2>
                    <Badge variant="secondary">Recent accuracy: {Math.round(recentAccuracy * 100)}%</Badge>
                  </div>
                  <div className="space-y-3">
                    {weakAreas.map((w) => (
                      <div key={`${w.questionType}-${w.skill}`} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{w.skill}</div>
                            <div className="text-xs text-muted-foreground">{w.domain} · {w.questionType}</div>
                          </div>
                          <Badge variant={w.weaknessScore > 60 ? "destructive" : "outline"}>
                            {w.weaknessScore}/100
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <Progress value={Math.round(w.accuracy * 100)} />
                          <div className="text-xs text-muted-foreground mt-1">
                            {w.correct}/{w.attempts} correct · {Math.round(w.accuracy * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-5 bg-primary/5 border-primary/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Your booster will:</div>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-5">
                        <li>Run 15 questions — 70% targeted at your weakest skills, 30% mixed review</li>
                        <li>Offer an <b>elaborate AI breakdown</b> on every wrong answer</li>
                        <li>Log results so your weakness map updates immediately</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button onClick={startBooster}>Start 15-question booster</Button>
                    <Link to="/study-guide">
                      <Button variant="outline"><BookOpenCheck className="w-4 h-4 mr-1" /> See my study guide</Button>
                    </Link>
                  </div>
                </Card>
              </>
            )}
          </div>
        )}

        {phase === "quiz" && current && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Question {idx + 1} of {items.length}</span>
              <Badge variant="secondary">{current.skill}</Badge>
            </div>
            <Progress value={((idx + 1) / items.length) * 100} />
            <QuizCard
              question={current}
              selectedAnswer={selected}
              onSelectAnswer={setSelected}
              showResult={showResult}
              questionType={current._type}
            />
            <div className="flex gap-2">
              {!showResult ? (
                <Button disabled={!selected} onClick={handleSubmit} className="flex-1">Submit</Button>
              ) : (
                <Button onClick={next} className="flex-1">
                  {idx + 1 >= items.length ? "Finish booster" : "Next question"}
                </Button>
              )}
            </div>

            {showResult && !isCorrect && (
              <Card className="p-4 border-primary/30 bg-primary/5">
                {!deepExplanation && !deepLoading && (
                  <Button variant="secondary" onClick={fetchDeep} className="gap-2">
                    <Sparkles className="w-4 h-4" /> Get elaborate explanation
                  </Button>
                )}
                {deepLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" /> Crafting a detailed breakdown…
                  </div>
                )}
                {deepExplanation && (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{deepExplanation}</ReactMarkdown>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}

        {phase === "summary" && (
          <Card className="p-6 text-center">
            <h2 className="text-2xl font-bold">Booster complete 🎯</h2>
            <p className="mt-2 text-muted-foreground">
              You got <b>{correctCount}</b> of <b>{items.length}</b> correct ({Math.round((correctCount / items.length) * 100)}%).
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-5">
              <Button onClick={() => { setPhase("loading"); loadWeakAreas(user.id, 5).then((r) => { setWeakAreas(r.weakAreas); setTotalAttempts(r.totalAttempts); setRecentAccuracy(r.recentAccuracy); setPhase("diagnosis"); }); }}>
                Run another booster
              </Button>
              <Link to="/study-guide"><Button variant="outline">See updated study guide</Button></Link>
              <Link to="/"><Button variant="ghost">Home</Button></Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BoosterTest;