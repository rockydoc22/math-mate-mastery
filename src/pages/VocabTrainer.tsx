import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, RotateCcw, Check, X, ChevronRight, Flame, Brain, Volume2, Eye, EyeOff, Sparkles } from "lucide-react";
import { SAT_VOCAB_WORDS, VocabWord, generateVocabQuiz, getNextReviewTime } from "@/data/satVocab";
import { useExamType } from "@/hooks/useExamType";

const MASTERY_KEY = "vocab_mastery";

interface WordMastery {
  wordId: string;
  correctStreak: number;
  lastReviewed: number; // timestamp
  nextReview: number; // timestamp
  totalAttempts: number;
  totalCorrect: number;
}

type Phase = "menu" | "learn" | "quiz" | "review" | "results";
type Category = "all" | "common" | "advanced" | "elite";

function loadMastery(): Record<string, WordMastery> {
  try {
    const stored = localStorage.getItem(MASTERY_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch { return {}; }
}

function saveMastery(mastery: Record<string, WordMastery>) {
  localStorage.setItem(MASTERY_KEY, JSON.stringify(mastery));
}

const VocabTrainer = () => {
  const { examType } = useExamType();
  const [phase, setPhase] = useState<Phase>("menu");
  const [category, setCategory] = useState<Category>("all");
  const [mastery, setMastery] = useState<Record<string, WordMastery>>(loadMastery);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [sessionResults, setSessionResults] = useState<{ word: VocabWord; correct: boolean }[]>([]);

  const filteredWords = useMemo(() => {
    if (category === "all") return SAT_VOCAB_WORDS;
    return SAT_VOCAB_WORDS.filter(w => w.category === category);
  }, [category]);

  // Stats
  const masteredCount = Object.values(mastery).filter(m => m.correctStreak >= 3).length;
  const learningCount = Object.values(mastery).filter(m => m.correctStreak > 0 && m.correctStreak < 3).length;
  const newCount = filteredWords.length - Object.keys(mastery).filter(id => filteredWords.some(w => w.id === id)).length;
  const dueForReview = Object.values(mastery).filter(m => m.nextReview <= Date.now()).length;

  const startLearn = () => {
    const unlearnedWords = filteredWords.filter(w => !mastery[w.id]);
    const words = unlearnedWords.slice(0, 10);
    if (words.length === 0) {
      // All learned, show review-worthy ones
      const reviewWords = filteredWords
        .filter(w => mastery[w.id] && mastery[w.id].nextReview <= Date.now())
        .slice(0, 10);
      setSessionWords(reviewWords.length > 0 ? reviewWords : filteredWords.slice(0, 10));
    } else {
      setSessionWords(words);
    }
    setCurrentIndex(0);
    setShowDefinition(false);
    setPhase("learn");
  };

  const startQuiz = () => {
    const words = [...filteredWords].sort(() => Math.random() - 0.5).slice(0, 10);
    setSessionWords(words);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSessionResults([]);
    setPhase("quiz");
  };

  const startReview = () => {
    const dueWords = filteredWords
      .filter(w => mastery[w.id] && mastery[w.id].nextReview <= Date.now())
      .sort((a, b) => (mastery[a.id]?.nextReview || 0) - (mastery[b.id]?.nextReview || 0))
      .slice(0, 10);
    if (dueWords.length === 0) {
      const words = filteredWords.filter(w => mastery[w.id]).sort(() => Math.random() - 0.5).slice(0, 10);
      setSessionWords(words);
    } else {
      setSessionWords(dueWords);
    }
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSessionResults([]);
    setPhase("review");
  };

  const currentWord = sessionWords[currentIndex];
  const quizData = useMemo(() => {
    if (!currentWord || (phase !== "quiz" && phase !== "review")) return null;
    return generateVocabQuiz(currentWord, SAT_VOCAB_WORDS);
  }, [currentWord, phase, currentIndex]);

  const handleQuizAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const correct = answer === quizData?.correctAnswer;
    
    setSessionResults(prev => [...prev, { word: currentWord, correct }]);
    
    // Update mastery
    const newMastery = { ...mastery };
    const existing = newMastery[currentWord.id] || { wordId: currentWord.id, correctStreak: 0, lastReviewed: 0, nextReview: 0, totalAttempts: 0, totalCorrect: 0 };
    existing.totalAttempts++;
    if (correct) {
      existing.correctStreak++;
      existing.totalCorrect++;
    } else {
      existing.correctStreak = 0;
    }
    existing.lastReviewed = Date.now();
    existing.nextReview = Date.now() + getNextReviewTime(existing.correctStreak);
    newMastery[currentWord.id] = existing;
    setMastery(newMastery);
    saveMastery(newMastery);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= sessionWords.length) {
      setPhase("results");
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowDefinition(false);
    }
  };

  const getMasteryLevel = (wordId: string): string => {
    const m = mastery[wordId];
    if (!m) return "New";
    if (m.correctStreak >= 5) return "Mastered";
    if (m.correctStreak >= 3) return "Strong";
    if (m.correctStreak >= 1) return "Learning";
    return "Weak";
  };

  const getMasteryColor = (level: string): string => {
    switch (level) {
      case "Mastered": return "bg-emerald-500";
      case "Strong": return "bg-blue-500";
      case "Learning": return "bg-amber-500";
      case "Weak": return "bg-red-500";
      default: return "bg-muted";
    }
  };

  // Menu
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">SAT Vocabulary Trainer</h1>
              <p className="text-sm text-muted-foreground">Master {SAT_VOCAB_WORDS.length} high-frequency words</p>
            </div>
          </div>

          {/* Stats Overview */}
          <Card className="p-4 mb-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-emerald-500">{masteredCount}</p>
                <p className="text-[10px] text-muted-foreground">Mastered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-500">{learningCount}</p>
                <p className="text-[10px] text-muted-foreground">Learning</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-muted-foreground">{newCount}</p>
                <p className="text-[10px] text-muted-foreground">New</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-500">{dueForReview}</p>
                <p className="text-[10px] text-muted-foreground">Due Review</p>
              </div>
            </div>
            <Progress value={(masteredCount / SAT_VOCAB_WORDS.length) * 100} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-center">{Math.round((masteredCount / SAT_VOCAB_WORDS.length) * 100)}% mastered</p>
          </Card>

          {/* Category Filter */}
          <div className="flex gap-2 mb-4">
            {(['all', 'common', 'advanced', 'elite'] as const).map(c => (
              <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => setCategory(c)} className="capitalize">
                {c} {c !== 'all' && `(${SAT_VOCAB_WORDS.filter(w => w.category === c).length})`}
              </Button>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={startLearn} className="w-full h-14 gap-3 text-lg" variant="default">
              <BookOpen className="w-6 h-6" />
              Learn New Words
            </Button>
            <Button onClick={startQuiz} className="w-full h-14 gap-3 text-lg" variant="outline">
              <Brain className="w-6 h-6" />
              Quiz Yourself
            </Button>
            {dueForReview > 0 && (
              <Button onClick={startReview} className="w-full h-14 gap-3 text-lg border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20" variant="outline">
                <RotateCcw className="w-6 h-6 text-amber-500" />
                Review Due ({dueForReview})
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Learn Mode - Flashcards
  if (phase === "learn" && currentWord) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => setPhase("menu")}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <span className="text-sm text-muted-foreground">{currentIndex + 1} / {sessionWords.length}</span>
          </div>

          <Progress value={((currentIndex + 1) / sessionWords.length) * 100} className="mb-4 h-2" />

          <Card className="p-6 text-center min-h-[300px] flex flex-col justify-center" onClick={() => setShowDefinition(!showDefinition)}>
            <Badge className={`mx-auto mb-3 ${getMasteryColor(getMasteryLevel(currentWord.id))}`}>
              {getMasteryLevel(currentWord.id)} · Difficulty {currentWord.difficulty}/5
            </Badge>
            <h2 className="text-3xl font-bold mb-2">{currentWord.word}</h2>
            <p className="text-sm text-muted-foreground mb-4">({currentWord.partOfSpeech})</p>
            
            {showDefinition ? (
              <div className="space-y-3 animate-in fade-in duration-300">
                <p className="text-lg">{currentWord.definition}</p>
                <p className="text-sm text-muted-foreground italic">"{currentWord.example}"</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {currentWord.synonyms.map(s => (
                    <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span className="text-sm">Tap to reveal definition</span>
              </div>
            )}
          </Card>

          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={nextQuestion} disabled={currentIndex + 1 >= sessionWords.length && !showDefinition}>
              {currentIndex + 1 >= sessionWords.length ? "Done" : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          {currentIndex + 1 >= sessionWords.length && (
            <Button className="w-full mt-2" onClick={() => { setPhase("menu"); }}>
              Back to Menu
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Quiz / Review Mode
  if ((phase === "quiz" || phase === "review") && currentWord && quizData) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => setPhase("menu")}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <span className="text-sm text-muted-foreground">{currentIndex + 1} / {sessionWords.length}</span>
          </div>

          <Progress value={((currentIndex + 1) / sessionWords.length) * 100} className="mb-4 h-2" />

          <Card className="p-5 mb-4">
            <Badge className="mb-3" variant="outline">{currentWord.partOfSpeech} · Difficulty {currentWord.difficulty}</Badge>
            <h2 className="text-2xl font-bold mb-1">{quizData.question}</h2>
            <p className="text-xs text-muted-foreground italic mb-4">"{currentWord.example}"</p>

            <div className="space-y-2">
              {quizData.options.map((option, i) => {
                let cls = "border-border hover:bg-muted/50";
                if (selectedAnswer) {
                  if (option === quizData.correctAnswer) cls = "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300";
                  else if (option === selectedAnswer) cls = "border-destructive bg-destructive/20 text-destructive";
                  else cls = "opacity-40";
                }
                return (
                  <Button
                    key={i}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-3 px-4 text-sm ${cls}`}
                    onClick={() => handleQuizAnswer(option)}
                    disabled={!!selectedAnswer}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>

            {selectedAnswer && (
              <div className="mt-4 space-y-2">
                <p className={`text-sm font-medium ${selectedAnswer === quizData.correctAnswer ? "text-emerald-600" : "text-destructive"}`}>
                  {selectedAnswer === quizData.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">Synonyms:</span>
                  {currentWord.synonyms.map(s => (
                    <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
                <Button className="w-full mt-2" onClick={nextQuestion}>
                  {currentIndex + 1 >= sessionWords.length ? "See Results" : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // Results
  if (phase === "results") {
    const correct = sessionResults.filter(r => r.correct).length;
    const total = sessionResults.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-lg mx-auto">
          <Card className="p-6 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h2 className="text-2xl font-bold mb-1">Session Complete!</h2>
            <p className="text-4xl font-bold text-primary my-4">{correct}/{total}</p>
            <p className="text-sm text-muted-foreground mb-4">{pct}% accuracy</p>

            {sessionResults.length > 0 && (
              <div className="space-y-2 mb-4 text-left">
                {sessionResults.filter(r => !r.correct).map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-destructive/10">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm">{r.word.word}</span>
                      <p className="text-xs text-muted-foreground">{r.word.definition}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setPhase("menu")}>Menu</Button>
              <Button className="flex-1" onClick={startQuiz}>Quiz Again</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Button onClick={() => setPhase("menu")}>Back to Menu</Button>
    </div>
  );
};

export default VocabTrainer;
