import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Trophy, Timer, RotateCcw, ChevronDown, ChevronUp, XCircle, Globe } from "lucide-react";
import { loadFrenchQuestions } from "@/data/frenchCompetitionQuestions";
import { Question } from "@/data/questions";

type FrenchCategory = "all" | "grammar" | "culture" | "listening" | "dictee" | "phrases";

const CHALLENGE_DURATION = 60;
const HIGH_SCORE_KEY = "french_lightning_high";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const categoryConfig: Record<Exclude<FrenchCategory, "all">, { label: string; color: string }> = {
  grammar: { label: "Grammaire", color: "text-blue-500" },
  culture: { label: "Culture", color: "text-purple-500" },
  listening: { label: "Écoute", color: "text-emerald-500" },
  dictee: { label: "Dictée", color: "text-amber-500" },
  phrases: { label: "Phrases", color: "text-rose-500" },
};

type AnsweredQuestion = { question: Question; userAnswer: string; correct: boolean };

const FrenchLightning = () => {
  const [category, setCategory] = useState<FrenchCategory>("all");
  const [phase, setPhase] = useState<"menu" | "playing" | "results">("menu");
  const [queue, setQueue] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [showMissed, setShowMissed] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    loadFrenchQuestions().then(byCategory => {
      const all = Object.values(byCategory).flat();
      setAllQuestions(all);
    });
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HIGH_SCORE_KEY);
      if (stored) setHighScore(JSON.parse(stored)[category] || 0);
    } catch {}
  }, [category]);

  const startGame = useCallback(() => {
    let filtered = allQuestions;
    if (category !== "all") {
      const catMap: Record<string, string> = { grammar: "Grammar", culture: "Culture", listening: "Listening", dictee: "Dictée", phrases: "Phrases" };
      filtered = allQuestions.filter(q => q.skill === catMap[category]);
    }
    const shuffled = shuffleArray(filtered);
    setQueue(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(CHALLENGE_DURATION);
    setAnswered([]);
    setSelectedAnswer(null);
    setPhase("playing");
  }, [allQuestions, category]);

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setPhase("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || phase !== "playing") return;
    const current = queue[currentIndex];
    const correct = answer === current.correctAnswer;
    setSelectedAnswer(answer);
    if (correct) setScore(prev => prev + 1);
    setAnswered(prev => [...prev, { question: current, userAnswer: answer, correct }]);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentIndex + 1 < queue.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        clearInterval(timerRef.current);
        setPhase("results");
      }
    }, 400);
  };

  // Save high score
  useEffect(() => {
    if (phase === "results" && score > highScore) {
      setHighScore(score);
      try {
        const stored = JSON.parse(localStorage.getItem(HIGH_SCORE_KEY) || "{}");
        stored[category] = score;
        localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(stored));
      } catch {}
    }
  }, [phase, score, highScore, category]);

  const current = queue[currentIndex];
  const missed = answered.filter(a => !a.correct);

  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/french-competition">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> French Lightning Round
              </h1>
              <p className="text-sm text-muted-foreground">60 seconds. How many can you get?</p>
            </div>
          </div>

          <Card className="p-4 mb-4 bg-gradient-to-r from-blue-500/10 to-red-500/10 border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">🇫🇷 Best Score</p>
                <p className="text-3xl font-bold text-primary">{highScore}</p>
              </div>
              <Globe className="w-10 h-10 text-blue-500 opacity-30" />
            </div>
          </Card>

          <div className="flex gap-2 mb-4 flex-wrap">
            <Button variant={category === "all" ? "default" : "outline"} size="sm" onClick={() => setCategory("all")}>All</Button>
            {Object.entries(categoryConfig).map(([key, cfg]) => (
              <Button key={key} variant={category === key ? "default" : "outline"} size="sm" onClick={() => setCategory(key as FrenchCategory)}>
                {cfg.label}
              </Button>
            ))}
          </div>

          <Button onClick={startGame} className="w-full h-14 gap-3 text-lg bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white" disabled={allQuestions.length === 0}>
            <Zap className="w-6 h-6" />
            {allQuestions.length === 0 ? "Loading..." : "Start Lightning Round"}
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "playing" && current) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="gap-1">
              <Timer className="w-3 h-3" /> {timeLeft}s
            </Badge>
            <span className="text-sm font-bold text-primary">Score: {score}</span>
          </div>

          <Progress value={(timeLeft / CHALLENGE_DURATION) * 100} className={`mb-4 h-2 ${timeLeft <= 10 ? '[&>div]:bg-destructive' : ''}`} />

          <Card className="p-5 mb-4">
            <p className="text-sm font-medium mb-4">{current.question}</p>
            <div className="space-y-2">
              {current.options.map((opt) => {
                let cls = "border-border hover:bg-muted/50";
                if (selectedAnswer) {
                  if (opt.letter === current.correctAnswer) cls = "border-emerald-500 bg-emerald-500/20";
                  else if (opt.letter === selectedAnswer) cls = "border-destructive bg-destructive/20";
                  else cls = "opacity-40";
                }
                return (
                  <Button
                    key={opt.letter}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-2.5 px-3 text-sm ${cls}`}
                    onClick={() => handleAnswer(opt.letter)}
                    disabled={!!selectedAnswer}
                  >
                    <span className="font-bold mr-2">{opt.letter}.</span> {opt.text}
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Results
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto">
        <Card className="p-6 text-center mb-4">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-amber-500" />
          <h2 className="text-2xl font-bold">⚡ Lightning Complete!</h2>
          <p className="text-5xl font-bold text-primary my-4">{score}</p>
          <p className="text-sm text-muted-foreground">{answered.length} answered · {missed.length} missed</p>
          {score > highScore && score > 0 && (
            <Badge className="mt-2 bg-amber-500">🎉 New High Score!</Badge>
          )}
        </Card>

        {missed.length > 0 && (
          <Card className="p-4 mb-4">
            <button onClick={() => setShowMissed(!showMissed)} className="flex items-center justify-between w-full">
              <span className="text-sm font-medium flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" /> Missed ({missed.length})
              </span>
              {showMissed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showMissed && (
              <div className="mt-3 space-y-3">
                {missed.map((m, i) => (
                  <div key={i} className="p-3 rounded bg-destructive/10 text-sm">
                    <p className="font-medium mb-1">{m.question.question}</p>
                    <p className="text-xs text-destructive">Your answer: {m.question.options.find(o => o.letter === m.userAnswer)?.text}</p>
                    <p className="text-xs text-emerald-600">Correct: {m.question.options.find(o => o.letter === m.question.correctAnswer)?.text}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        <div className="flex gap-3">
          <Link to="/french-competition" className="flex-1">
            <Button variant="outline" className="w-full">Back</Button>
          </Link>
          <Button className="flex-1" onClick={startGame}>
            <RotateCcw className="w-4 h-4 mr-1" /> Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FrenchLightning;
