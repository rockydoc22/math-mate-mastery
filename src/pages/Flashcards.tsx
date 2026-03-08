import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, RotateCcw, Check, X, ChevronRight, Layers, Brain,
  Flame, Clock, Sparkles, Shuffle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

// SM-2 Algorithm helpers
function sm2(quality: number, repetitions: number, easeFactor: number, interval: number) {
  // quality: 0-5 (0-2 = fail, 3-5 = pass)
  let newEF = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  let newInterval: number;
  let newReps: number;

  if (quality < 3) {
    newReps = 0;
    newInterval = 1;
  } else {
    newReps = repetitions + 1;
    if (newReps === 1) newInterval = 1;
    else if (newReps === 2) newInterval = 6;
    else newInterval = Math.round(interval * newEF);
  }

  return { easeFactor: newEF, interval: newInterval, repetitions: newReps };
}

interface FlashcardData {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReview: Date;
}

// Built-in flashcard decks
const MATH_CARDS: Omit<FlashcardData, 'repetitions' | 'easeFactor' | 'interval' | 'nextReview'>[] = [
  { id: "m1", front: "What is the slope-intercept form?", back: "y = mx + b, where m is slope and b is y-intercept", category: "Algebra", difficulty: "easy" },
  { id: "m2", front: "Quadratic formula?", back: "x = (-b ± √(b²-4ac)) / 2a", category: "Algebra", difficulty: "medium" },
  { id: "m3", front: "What does the discriminant tell you?", back: "b²-4ac: positive = 2 real roots, zero = 1 root, negative = no real roots", category: "Algebra", difficulty: "medium" },
  { id: "m4", front: "Area of a circle?", back: "A = πr²", category: "Geometry", difficulty: "easy" },
  { id: "m5", front: "Pythagorean theorem?", back: "a² + b² = c² (right triangles only)", category: "Geometry", difficulty: "easy" },
  { id: "m6", front: "SOH CAH TOA — what does each stand for?", back: "Sin = Opp/Hyp, Cos = Adj/Hyp, Tan = Opp/Adj", category: "Geometry", difficulty: "medium" },
  { id: "m7", front: "How do you find the vertex of a parabola?", back: "x = -b/(2a), then plug back in for y", category: "Algebra", difficulty: "medium" },
  { id: "m8", front: "What is the standard deviation?", back: "Measure of spread — how far data points are from the mean on average", category: "Statistics", difficulty: "hard" },
  { id: "m9", front: "Compound interest formula?", back: "A = P(1 + r/n)^(nt)", category: "Algebra", difficulty: "hard" },
  { id: "m10", front: "Arc length formula?", back: "s = rθ (radians) or s = (θ/360)×2πr (degrees)", category: "Geometry", difficulty: "hard" },
  { id: "m11", front: "What is the remainder theorem?", back: "When polynomial f(x) is divided by (x-a), the remainder is f(a)", category: "Algebra", difficulty: "hard" },
  { id: "m12", front: "Volume of a cylinder?", back: "V = πr²h", category: "Geometry", difficulty: "easy" },
];

const ENGLISH_CARDS: Omit<FlashcardData, 'repetitions' | 'easeFactor' | 'interval' | 'nextReview'>[] = [
  { id: "e1", front: "Semicolon rule?", back: "Joins two independent clauses without a conjunction", category: "Punctuation", difficulty: "easy" },
  { id: "e2", front: "When to use a colon?", back: "After a complete sentence to introduce a list, explanation, or elaboration", category: "Punctuation", difficulty: "medium" },
  { id: "e3", front: "Dangling modifier?", back: "A modifier that doesn't clearly refer to the word it's supposed to modify", category: "Grammar", difficulty: "medium" },
  { id: "e4", front: "Subject-verb agreement with 'neither...nor'?", back: "The verb agrees with the subject closest to it", category: "Grammar", difficulty: "hard" },
  { id: "e5", front: "What is parallel structure?", back: "Using the same grammatical form for items in a series or comparison", category: "Grammar", difficulty: "medium" },
  { id: "e6", front: "Who vs. Whom?", back: "Who = subject (he/she), Whom = object (him/her)", category: "Grammar", difficulty: "medium" },
  { id: "e7", front: "What is an appositive?", back: "A noun phrase that renames or describes another noun, usually set off by commas", category: "Grammar", difficulty: "hard" },
  { id: "e8", front: "'However' punctuation rule?", back: "Use semicolon before and comma after when joining two independent clauses", category: "Punctuation", difficulty: "medium" },
  { id: "e9", front: "What does 'moreover' signal?", back: "Addition — it adds information supporting the previous point", category: "Transitions", difficulty: "easy" },
  { id: "e10", front: "What does 'nevertheless' signal?", back: "Contrast — it introduces an opposing point despite what was said", category: "Transitions", difficulty: "easy" },
  { id: "e11", front: "Affect vs. Effect?", back: "Affect = verb (to influence), Effect = noun (result). Exception: 'effect change' = verb", category: "Vocabulary", difficulty: "medium" },
  { id: "e12", front: "Its vs. It's?", back: "Its = possessive (the dog wagged its tail), It's = it is / it has", category: "Grammar", difficulty: "easy" },
];

type DeckType = 'math' | 'english' | 'mixed';

const Flashcards = () => {
  const { user } = useAuth();
  const [deck, setDeck] = useState<DeckType | null>(null);
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0, incorrect: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);

  const initDeck = useCallback((type: DeckType) => {
    const rawCards = type === 'math' ? MATH_CARDS
      : type === 'english' ? ENGLISH_CARDS
      : [...MATH_CARDS, ...ENGLISH_CARDS];

    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem(`flashcards_${type}_${user?.id || 'anon'}`);
    const progress: Record<string, { r: number; ef: number; int: number; next: string }> = savedProgress ? JSON.parse(savedProgress) : {};

    const now = new Date();
    const allCards: FlashcardData[] = rawCards.map(c => {
      const saved = progress[c.id];
      return {
        ...c,
        repetitions: saved?.r ?? 0,
        easeFactor: saved?.ef ?? 2.5,
        interval: saved?.int ?? 0,
        nextReview: saved?.next ? new Date(saved.next) : now,
      };
    });

    // Sort: due cards first, then by ease factor (harder first)
    const dueCards = allCards
      .filter(c => c.nextReview <= now)
      .sort((a, b) => a.easeFactor - b.easeFactor);

    const notDue = allCards
      .filter(c => c.nextReview > now)
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime());

    // Show due cards first, then upcoming if few due
    const ordered = dueCards.length >= 5 ? dueCards : [...dueCards, ...notDue.slice(0, 10 - dueCards.length)];

    setCards(ordered);
    setDeck(type);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ reviewed: 0, correct: 0, incorrect: 0 });
    setSessionComplete(false);
  }, [user]);

  const saveProgress = useCallback((updatedCards: FlashcardData[]) => {
    if (!deck) return;
    const key = `flashcards_${deck}_${user?.id || 'anon'}`;
    const existing = localStorage.getItem(key);
    const progress: Record<string, any> = existing ? JSON.parse(existing) : {};

    updatedCards.forEach(c => {
      progress[c.id] = { r: c.repetitions, ef: c.easeFactor, int: c.interval, next: c.nextReview.toISOString() };
    });

    localStorage.setItem(key, JSON.stringify(progress));
  }, [deck, user]);

  const handleResponse = (quality: number) => {
    const card = cards[currentIndex];
    const result = sm2(quality, card.repetitions, card.easeFactor, card.interval);

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + result.interval);

    const updatedCard: FlashcardData = {
      ...card,
      repetitions: result.repetitions,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview,
    };

    const updatedCards = [...cards];
    updatedCards[currentIndex] = updatedCard;
    setCards(updatedCards);
    saveProgress([updatedCard]);

    const isCorrect = quality >= 3;
    setSessionStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));

    setIsFlipped(false);
    if (currentIndex + 1 >= cards.length) {
      setSessionComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Deck selector
  if (!deck) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto p-4">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-2xl font-bold">Flashcards</h1>
            <Layers className="w-6 h-6 text-primary ml-auto" />
          </div>

          <p className="text-muted-foreground mb-6">Spaced repetition — the most scientifically proven way to memorize formulas, rules, and concepts.</p>

          <div className="space-y-3">
            {([
              { type: 'math' as DeckType, label: 'Math Deck', desc: '12 essential formulas & concepts', icon: '📐', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800' },
              { type: 'english' as DeckType, label: 'English Deck', desc: '12 grammar & writing rules', icon: '📝', color: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800' },
              { type: 'mixed' as DeckType, label: 'Mixed Deck', desc: 'All 24 cards shuffled', icon: '🎯', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800' },
            ]).map(d => (
              <Card
                key={d.type}
                className={`p-4 cursor-pointer hover:scale-[1.02] transition-transform border ${d.color}`}
                onClick={() => initDeck(d.type)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{d.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{d.label}</h3>
                    <p className="text-sm text-muted-foreground">{d.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm">How it works</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Cards you get wrong come back sooner</li>
              <li>• Cards you know well space out over days/weeks</li>
              <li>• The SM-2 algorithm optimizes your review schedule</li>
              <li>• Progress is saved automatically</li>
            </ul>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Session complete
  if (sessionComplete) {
    const accuracy = sessionStats.reviewed > 0 ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) : 0;
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto p-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">{accuracy >= 80 ? '🏆' : accuracy >= 50 ? '💪' : '📚'}</div>
            <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
            <p className="text-muted-foreground mb-6">You reviewed {sessionStats.reviewed} cards</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card className="p-4 text-center">
                <Check className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </Card>
              <Card className="p-4 text-center">
                <X className="w-6 h-6 text-red-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
                <div className="text-xs text-muted-foreground">Missed</div>
              </Card>
              <Card className="p-4 text-center">
                <Sparkles className="w-6 h-6 text-primary mx-auto mb-1" />
                <div className="text-2xl font-bold text-primary">{accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => initDeck(deck)}>
                <RotateCcw className="w-4 h-4 mr-2" /> Again
              </Button>
              <Button className="flex-1" onClick={() => setDeck(null)}>
                <Layers className="w-4 h-4 mr-2" /> Decks
              </Button>
            </div>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const card = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setDeck(null)}><ArrowLeft className="w-5 h-5" /></Button>
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{currentIndex + 1}/{cards.length}</span>
        </div>

        {/* Card */}
        <div className="perspective-1000 mb-6" style={{ perspective: '1000px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${card.id}-${isFlipped}`}
              initial={{ rotateY: isFlipped ? -90 : 0, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 0 : 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => !isFlipped && setIsFlipped(true)}
              className="cursor-pointer"
            >
              <Card className={`min-h-[280px] p-6 flex flex-col items-center justify-center text-center border-2 ${
                isFlipped
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-border hover:border-primary/20'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    card.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : card.difficulty === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>{card.difficulty}</span>
                  <span className="text-xs text-muted-foreground">{card.category}</span>
                </div>

                {!isFlipped ? (
                  <>
                    <p className="text-lg font-semibold text-foreground mb-4">{card.front}</p>
                    <p className="text-xs text-muted-foreground">Tap to reveal answer</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Answer</p>
                    <p className="text-base text-foreground leading-relaxed">{card.back}</p>
                  </>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Response buttons (only show after flip) */}
        {isFlipped && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-3"
          >
            <p className="text-center text-sm text-muted-foreground mb-2">How well did you know this?</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex-col h-auto py-3 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => handleResponse(1)}
              >
                <X className="w-5 h-5 text-red-500 mb-1" />
                <span className="text-xs font-medium">Missed</span>
                <span className="text-[10px] text-muted-foreground">See again soon</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-auto py-3 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                onClick={() => handleResponse(3)}
              >
                <Clock className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-xs font-medium">Struggled</span>
                <span className="text-[10px] text-muted-foreground">Review tomorrow</span>
              </Button>
              <Button
                variant="outline"
                className="flex-col h-auto py-3 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={() => handleResponse(5)}
              >
                <Check className="w-5 h-5 text-green-500 mb-1" />
                <span className="text-xs font-medium">Knew it!</span>
                <span className="text-[10px] text-muted-foreground">Space it out</span>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Session stats */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> {sessionStats.correct}</span>
          <span className="flex items-center gap-1"><X className="w-3 h-3 text-red-500" /> {sessionStats.incorrect}</span>
          <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {sessionStats.reviewed} reviewed</span>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Flashcards;
