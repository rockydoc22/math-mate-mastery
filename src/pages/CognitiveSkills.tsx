import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Clock, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { IQQuestionCard } from "@/components/cognitive/IQQuestionCard";
import { IQResultsView } from "@/components/cognitive/IQResultsView";

export interface IQItem {
  id: string;
  age_range: string;
  domain: string;
  prompt: string;
  options: string[];
  answer: string;
  difficulty: string;
}

const AGE_RANGES = [
  { id: "6-8", label: "Ages 6–8", emoji: "🧒", file: "iq_items_age_6_8.json" },
  { id: "9-12", label: "Ages 9–12", emoji: "👦", file: "iq_items_age_9_12.json" },
  { id: "13-17", label: "Ages 13–17", emoji: "🧑", file: "iq_items_age_13_17.json" },
  { id: "18+", label: "Ages 18+", emoji: "🧑‍🎓", file: "iq_items_age_18_plus.json" },
];

const FILE_IMPORTERS: Record<string, () => Promise<any>> = {
  "iq_items_age_6_8.json": () => import("@/data/iq_items_age_6_8.json"),
  "iq_items_age_9_12.json": () => import("@/data/iq_items_age_9_12.json"),
  "iq_items_age_13_17.json": () => import("@/data/iq_items_age_13_17.json"),
  "iq_items_age_18_plus.json": () => import("@/data/iq_items_age_18_plus.json"),
};

const QUESTION_COUNT = 25;

type Mode = "select" | "playing" | "results";

export interface UserAnswer {
  questionId: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  difficulty: string;
  domain: string;
}

const CognitiveSkills = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("select");
  const [items, setItems] = useState<IQItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedAge, setSelectedAge] = useState("");

  const loadItems = async (file: string, ageId: string) => {
    const importer = FILE_IMPORTERS[file];
    if (!importer) return;
    const mod = await importer();
    const data = (mod.default || mod) as IQItem[];
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, QUESTION_COUNT);
    setItems(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setStartTime(Date.now());
    setSelectedAge(ageId);
    setMode("playing");
  };

  const handleNext = () => {
    if (!selectedAnswer) return;
    const item = items[currentIndex];
    const isCorrect = selectedAnswer === item.answer;

    setAnswers((prev) => [
      ...prev,
      {
        questionId: item.id,
        selected: selectedAnswer,
        correct: item.answer,
        isCorrect,
        difficulty: item.difficulty,
        domain: item.domain,
      },
    ]);

    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setTotalTime(Math.round((Date.now() - startTime) / 1000));
      setMode("results");
    }
  };

  const currentItem = items[currentIndex];
  const progress = items.length > 0 ? Math.round(((currentIndex + 1) / items.length) * 100) : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold text-foreground">Sign in to take the IQ test</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Brain className="w-5 h-5 text-primary" /> IQ Assessment
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {mode === "select" && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Brain className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-lg font-bold text-foreground">Cognitive IQ Assessment</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {QUESTION_COUNT} multiple-choice questions across pattern recognition, 
                spatial reasoning, verbal & numerical ability, logic, and memory.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Results shown only at the end. Choose your age group to begin.
              </p>
            </div>
            {AGE_RANGES.map((range) => (
              <Card
                key={range.id}
                className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => loadItems(range.file, range.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{range.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{range.label}</h3>
                    <p className="text-xs text-muted-foreground">
                      {QUESTION_COUNT} questions · ~15 min · IQ estimate
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {mode === "playing" && currentItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-xs font-mono text-muted-foreground">
                {currentIndex + 1}/{items.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
                <IQQuestionCard
                  item={currentItem}
                  selectedAnswer={selectedAnswer}
                  onSelect={setSelectedAnswer}
                />
              </motion.div>
            </AnimatePresence>

            <Button
              className="w-full"
              size="lg"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentIndex < items.length - 1 ? "Next Question" : "Finish Test"}
            </Button>
          </div>
        )}

        {mode === "results" && (
          <IQResultsView
            answers={answers}
            totalQuestions={items.length}
            totalTime={totalTime}
            ageRange={selectedAge}
            items={items}
            onRetry={() => setMode("select")}
          />
        )}
      </div>
    </div>
  );
};

export default CognitiveSkills;
