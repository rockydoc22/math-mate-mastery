import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Zap, Check, X, RotateCcw, ChevronRight, Clock, Flame
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface ReviewQuestion {
  id: string;
  question_id: string;
  domain: string;
  skill: string;
  created_at: string;
  miss_reason: string | null;
}

// Simple placeholder questions matched to skills
function generateReviewContent(skill: string): { question: string; options: string[]; correctIndex: number } {
  const bank: Record<string, { question: string; options: string[]; correctIndex: number }[]> = {
    default: [
      { question: `Which concept is key to understanding ${skill.replace(/_/g, ' ')}?`, options: ["Practice fundamentals", "Skip ahead", "Guess randomly", "Ignore errors"], correctIndex: 0 },
    ],
    linear_equations: [
      { question: "Solve: 3x + 7 = 22", options: ["x = 5", "x = 3", "x = 7", "x = 15"], correctIndex: 0 },
      { question: "What is the slope of y = -2x + 5?", options: ["-2", "5", "2", "-5"], correctIndex: 0 },
    ],
    quadratic: [
      { question: "Factor: x² - 9", options: ["(x+3)(x-3)", "(x+9)(x-1)", "(x-3)²", "(x+3)²"], correctIndex: 0 },
    ],
    punctuation: [
      { question: "Which correctly uses a semicolon?", options: ["I ran; she walked.", "I ran, she walked.", "I ran: she walked.", "I ran... she walked."], correctIndex: 0 },
    ],
    subject_verb: [
      { question: "Choose correct: 'The group of students ___ studying.'", options: ["is", "are", "were", "been"], correctIndex: 0 },
    ],
    inference: [
      { question: "An inference is best described as:", options: ["A conclusion based on evidence", "A direct quote", "The main idea", "Author's biography"], correctIndex: 0 },
    ],
  };

  // Find matching bank by checking if skill contains any key
  for (const [key, questions] of Object.entries(bank)) {
    if (key !== 'default' && skill.toLowerCase().includes(key)) {
      return questions[Math.floor(Math.random() * questions.length)];
    }
  }
  return bank.default[0];
}

const QuickReview = () => {
  const { user } = useAuth();
  const [missedQuestions, setMissedQuestions] = useState<ReviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, correct: 0 });
  const [loading, setLoading] = useState(true);
  const [sessionDone, setSessionDone] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadMissed();
  }, [user]);

  const loadMissed = async () => {
    if (!user) return;

    // Get recent mistakes (last 2 weeks, not yet reviewed much)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const { data } = await supabase
      .from('question_attempts')
      .select('id, question_id, domain, skill, created_at, miss_reason')
      .eq('user_id', user.id)
      .eq('is_correct', false)
      .gte('created_at', twoWeeksAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(20);

    // Deduplicate by skill (one per skill)
    const seen = new Set<string>();
    const unique = (data || []).filter(q => {
      if (seen.has(q.skill)) return false;
      seen.add(q.skill);
      return true;
    }).slice(0, 10);

    setMissedQuestions(unique);
    setLoading(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
    setShowResult(true);

    const content = generateReviewContent(missedQuestions[currentIndex].skill);
    const isCorrect = optionIndex === content.correctIndex;

    setStats(prev => ({
      reviewed: prev.reviewed + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= missedQuestions.length) {
      setSessionDone(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setStats({ reviewed: 0, correct: 0 });
    setSessionDone(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (missedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto p-4">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-2xl font-bold">Quick Review</h1>
          </div>
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">No Recent Mistakes!</h2>
            <p className="text-muted-foreground mb-6">You're doing great. Keep practicing to stay sharp.</p>
            <Link to="/quiz"><Button>Practice More</Button></Link>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (sessionDone) {
    const accuracy = stats.reviewed > 0 ? Math.round((stats.correct / stats.reviewed) * 100) : 0;
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <div className="text-5xl mb-4">{accuracy >= 80 ? '🏆' : accuracy >= 50 ? '💪' : '📚'}</div>
            <h2 className="text-2xl font-bold mb-2">Review Complete!</h2>
            <p className="text-muted-foreground mb-6">{stats.correct}/{stats.reviewed} correct ({accuracy}%)</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={restart}>
                <RotateCcw className="w-4 h-4 mr-2" /> Again
              </Button>
              <Link to="/"><Button>Home</Button></Link>
            </div>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const current = missedQuestions[currentIndex];
  const content = generateReviewContent(current.skill);
  const progress = ((currentIndex + 1) / missedQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-sm text-muted-foreground">{currentIndex + 1}/{missedQuestions.length}</span>
        </div>

        {/* Skill context */}
        <Card className="p-3 mb-4 bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-muted-foreground">You missed:</span>
            <span className="font-medium">{current.skill.replace(/_/g, ' ')}</span>
          </div>
          {current.miss_reason && (
            <p className="text-xs text-muted-foreground mt-1 italic ml-6">"{current.miss_reason}"</p>
          )}
        </Card>

        {/* Question */}
        <Card className="p-6 mb-4">
          <p className="font-semibold text-base mb-6">{content.question}</p>

          <div className="space-y-2">
            {content.options.map((opt, idx) => {
              const isCorrect = idx === content.correctIndex;
              const isSelected = selectedAnswer === idx;
              let btnClass = "w-full text-left justify-start h-auto py-3 px-4";

              if (showResult) {
                if (isCorrect) btnClass += " border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                else if (isSelected && !isCorrect) btnClass += " border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
              }

              return (
                <Button
                  key={idx}
                  variant="outline"
                  className={btnClass}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                >
                  <span className="w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs font-bold flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                  {showResult && isCorrect && <Check className="w-4 h-4 ml-auto text-green-500" />}
                  {showResult && isSelected && !isCorrect && <X className="w-4 h-4 ml-auto text-red-500" />}
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Next button */}
        {showResult && (
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Button className="w-full" onClick={nextQuestion}>
              {currentIndex + 1 >= missedQuestions.length ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        )}

        {/* Stats */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> {stats.correct}</span>
          <span className="flex items-center gap-1"><X className="w-3 h-3 text-red-500" /> {stats.reviewed - stats.correct}</span>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default QuickReview;
