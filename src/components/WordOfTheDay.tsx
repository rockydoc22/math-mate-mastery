import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Check, X } from "lucide-react";
import { satFacts } from "@/data/satFacts";
import { Link } from "react-router-dom";

// Deterministic daily word based on date
function getDailyWord() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const vocabFacts = satFacts.filter(f => f.category === "vocab");
  const index = seed % vocabFacts.length;
  return vocabFacts[index];
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const WOTD_KEY = "wotd_last_answered";

export const WordOfTheDay = () => {
  const word = useMemo(() => getDailyWord(), []);
  const todayStr = new Date().toISOString().split("T")[0];
  
  const [answered, setAnswered] = useState(() => {
    return localStorage.getItem(WOTD_KEY) === todayStr;
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const choices = useMemo(() => {
    const seed = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();
    return shuffleWithSeed([word.correctAnswer, ...word.wrongAnswers], seed);
  }, [word]);

  // Extract the word from the question (e.g., "'Ambiguous' means:" -> "Ambiguous")
  const wordName = word.question.match(/'([^']+)'/)?.[1] || word.question;

  const handleAnswer = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    localStorage.setItem(WOTD_KEY, todayStr);
    setAnswered(true);
  };

  const isCorrect = selected === word.correctAnswer;

  if (answered && !selected) {
    // Already answered today, show compact
    return (
      <Card className="p-3 border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium">Word of the Day: <span className="font-bold text-emerald-600 dark:text-emerald-400">{wordName}</span></span>
          </div>
          <div className="flex items-center gap-1 text-emerald-500">
            <Check className="w-4 h-4" />
            <span className="text-xs">Done</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1 ml-6">{word.correctAnswer}</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-semibold">Word of the Day</span>
        </div>
        <Link to="/rapid-facts">
          <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
            Rapid Facts <ChevronRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>

      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1">{wordName}</p>

      {!showQuiz && !selected ? (
        <Button
          variant="outline"
          size="sm"
          className="mt-2 border-emerald-500/30 hover:bg-emerald-500/10"
          onClick={() => setShowQuiz(true)}
        >
          Test yourself
        </Button>
      ) : (
        <div className="space-y-2 mt-3">
          <p className="text-xs text-muted-foreground">{word.question}</p>
          {choices.map((choice, i) => {
            let cls = "border-border hover:bg-emerald-500/10";
            if (selected) {
              if (choice === word.correctAnswer) cls = "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300";
              else if (choice === selected) cls = "border-destructive bg-destructive/20 text-destructive";
              else cls = "opacity-50";
            }
            return (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className={`w-full justify-start text-left text-xs h-auto py-2 ${cls}`}
                onClick={() => handleAnswer(choice)}
                disabled={!!selected}
              >
                {choice}
              </Button>
            );
          })}
          {selected && (
            <p className={`text-xs font-medium ${isCorrect ? "text-emerald-600" : "text-destructive"}`}>
              {isCorrect ? "✓ Correct!" : `✗ The answer is: ${word.correctAnswer}`}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};
