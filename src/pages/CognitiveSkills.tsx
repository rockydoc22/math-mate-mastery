import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Clock, ChevronRight, Eye, Timer } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";

// ── Cognitive test: memory, processing speed, attention ──

interface CognitiveChallenge {
  id: string;
  type: "memory_recall" | "processing_speed" | "attention" | "working_memory";
  domain: string;
  difficulty: "easy" | "medium" | "hard";
  // For memory: words to memorize
  memoryWords?: string[];
  // The actual question
  prompt: string;
  options: string[];
  answer: string;
}

// Generate memory recall challenges
function generateMemoryChallenges(difficulty: "easy" | "medium" | "hard"): CognitiveChallenge[] {
  const wordSets: { words: string[]; questions: { prompt: string; options: string[]; answer: string }[] }[] = [
    {
      words: ["bridge", "copper", "lantern", "velvet", "river"],
      questions: [
        { prompt: "What was the second word?", options: ["copper", "lantern", "bridge", "velvet"], answer: "copper" },
        { prompt: "What was the fourth word?", options: ["river", "velvet", "copper", "lantern"], answer: "velvet" },
        { prompt: "Which word came right before 'river'?", options: ["velvet", "lantern", "copper", "bridge"], answer: "velvet" },
      ],
    },
    {
      words: ["marble", "thunder", "basket", "ocean", "pencil"],
      questions: [
        { prompt: "What was the third word?", options: ["basket", "ocean", "marble", "thunder"], answer: "basket" },
        { prompt: "What was the first word?", options: ["thunder", "marble", "pencil", "basket"], answer: "marble" },
        { prompt: "Which word came right after 'thunder'?", options: ["basket", "marble", "ocean", "pencil"], answer: "basket" },
      ],
    },
    {
      words: ["garden", "whistle", "diamond", "sunset", "anchor"],
      questions: [
        { prompt: "What was the last word?", options: ["sunset", "anchor", "diamond", "whistle"], answer: "anchor" },
        { prompt: "What was the second word?", options: ["diamond", "whistle", "garden", "sunset"], answer: "whistle" },
        { prompt: "Which word came right before 'diamond'?", options: ["whistle", "garden", "sunset", "anchor"], answer: "whistle" },
      ],
    },
    {
      words: ["crystal", "shadow", "trumpet", "feather", "volcano"],
      questions: [
        { prompt: "What was the third word?", options: ["trumpet", "shadow", "feather", "crystal"], answer: "trumpet" },
        { prompt: "What was the first word?", options: ["shadow", "crystal", "trumpet", "volcano"], answer: "crystal" },
        { prompt: "Which word was NOT in the list?", options: ["mountain", "shadow", "feather", "crystal"], answer: "mountain" },
      ],
    },
    {
      words: ["compass", "mirror", "silence", "crimson", "harvest"],
      questions: [
        { prompt: "What was the fourth word?", options: ["crimson", "silence", "harvest", "mirror"], answer: "crimson" },
        { prompt: "What was the second word?", options: ["mirror", "compass", "silence", "harvest"], answer: "mirror" },
        { prompt: "Which word came right after 'silence'?", options: ["crimson", "harvest", "mirror", "compass"], answer: "crimson" },
      ],
    },
  ];

  const challenges: CognitiveChallenge[] = [];
  wordSets.forEach((set, si) => {
    set.questions.forEach((q, qi) => {
      challenges.push({
        id: `mem_${si}_${qi}`,
        type: "memory_recall",
        domain: "Working Memory",
        difficulty,
        memoryWords: set.words,
        prompt: q.prompt,
        options: q.options,
        answer: q.answer,
      });
    });
  });
  return challenges;
}

// Generate processing speed challenges (odd one out, quick pattern matching)
function generateSpeedChallenges(): CognitiveChallenge[] {
  return [
    { id: "sp_1", type: "processing_speed", domain: "Processing Speed", difficulty: "easy", prompt: "Which does NOT belong: thesis, essay, argument, pineapple?", options: ["thesis", "essay", "pineapple", "argument"], answer: "pineapple" },
    { id: "sp_2", type: "processing_speed", domain: "Processing Speed", difficulty: "easy", prompt: "Which does NOT belong: red, blue, green, table?", options: ["red", "blue", "table", "green"], answer: "table" },
    { id: "sp_3", type: "processing_speed", domain: "Processing Speed", difficulty: "medium", prompt: "Which number breaks the pattern: 2, 4, 6, 9, 10?", options: ["2", "6", "9", "10"], answer: "9" },
    { id: "sp_4", type: "processing_speed", domain: "Processing Speed", difficulty: "medium", prompt: "Rearrange to spell a word: R-A-B-I-N", options: ["BRAIN", "BAIRN", "BRAWN", "BARON"], answer: "BRAIN" },
    { id: "sp_5", type: "processing_speed", domain: "Processing Speed", difficulty: "hard", prompt: "If APPLE = 50, BANANA = 42, what is GRAPE?", options: ["52", "45", "40", "55"], answer: "45" },
    { id: "sp_6", type: "processing_speed", domain: "Processing Speed", difficulty: "easy", prompt: "Which is the mirror image of 'b'?", options: ["d", "p", "q", "b"], answer: "d" },
    { id: "sp_7", type: "processing_speed", domain: "Processing Speed", difficulty: "medium", prompt: "Count the vowels in: EXTRAORDINARY", options: ["5", "6", "4", "7"], answer: "6" },
    { id: "sp_8", type: "processing_speed", domain: "Processing Speed", difficulty: "hard", prompt: "Which does NOT belong: piano, violin, drum, flute?", options: ["piano", "violin", "drum", "flute"], answer: "drum" },
  ];
}

// Generate attention challenges
function generateAttentionChallenges(): CognitiveChallenge[] {
  return [
    { id: "att_1", type: "attention", domain: "Attention", difficulty: "easy", prompt: "How many times does 'the' appear: 'The cat sat on the mat and the dog followed the cat.'?", options: ["4", "3", "5", "2"], answer: "4" },
    { id: "att_2", type: "attention", domain: "Attention", difficulty: "medium", prompt: "What is missing from this sequence: M T W T _ S S?", options: ["F", "R", "H", "A"], answer: "F" },
    { id: "att_3", type: "attention", domain: "Attention", difficulty: "medium", prompt: "If you count from 1 to 50, how many times does the digit '3' appear?", options: ["15", "14", "5", "6"], answer: "15" },
    { id: "att_4", type: "attention", domain: "Attention", difficulty: "hard", prompt: "Read carefully: 'I have two coins that total 30 cents. One is not a nickel.' What are they?", options: ["Quarter and nickel", "Two dimes and a dime", "Three dimes", "Penny and quarter"], answer: "Quarter and nickel" },
    { id: "att_5", type: "attention", domain: "Attention", difficulty: "easy", prompt: "Which letter comes 3 letters after 'M' in the alphabet?", options: ["P", "O", "Q", "N"], answer: "P" },
    { id: "att_6", type: "attention", domain: "Attention", difficulty: "medium", prompt: "If January 1st is a Monday, what day is January 31st?", options: ["Wednesday", "Thursday", "Tuesday", "Friday"], answer: "Wednesday" },
    { id: "att_7", type: "attention", domain: "Attention", difficulty: "hard", prompt: "A farmer has 17 sheep. All but 9 run away. How many are left?", options: ["9", "8", "17", "0"], answer: "9" },
  ];
}

const QUESTION_COUNT = 20;
const TIME_LIMIT_SECONDS = 600; // 10 minutes

type Mode = "intro" | "memorize" | "playing" | "results";

interface UserAnswer {
  id: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  domain: string;
  difficulty: string;
}

const CognitiveSkills = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("intro");
  const [challenges, setChallenges] = useState<CognitiveChallenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const [memorizeCountdown, setMemorizeCountdown] = useState(0);
  const [currentMemoryWords, setCurrentMemoryWords] = useState<string[]>([]);

  // Timer countdown during the test
  useEffect(() => {
    if (mode !== "playing" && mode !== "memorize") return;
    if (mode === "memorize") return; // Don't count memorize time
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Time's up
          setTotalTime(TIME_LIMIT_SECONDS);
          setMode("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const loadChallenges = () => {
    const memory = generateMemoryChallenges("medium");
    const speed = generateSpeedChallenges();
    const attention = generateAttentionChallenges();

    // Pick from each category proportionally
    const all = [...memory, ...speed, ...attention].sort(() => Math.random() - 0.5);
    const selected = all.slice(0, QUESTION_COUNT);
    setChallenges(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setStartTime(Date.now());
    setTimeLeft(TIME_LIMIT_SECONDS);

    // Check if first question is memory type
    if (selected[0]?.type === "memory_recall") {
      setCurrentMemoryWords(selected[0].memoryWords || []);
      setMemorizeCountdown(8);
      setMode("memorize");
    } else {
      setMode("playing");
    }
  };

  // Memorize countdown timer
  useEffect(() => {
    if (mode !== "memorize") return;
    if (memorizeCountdown <= 0) {
      setMode("playing");
      return;
    }
    const t = setTimeout(() => setMemorizeCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [memorizeCountdown, mode]);

  const handleNext = () => {
    if (!selectedAnswer) return;
    const challenge = challenges[currentIndex];
    const isCorrect = selectedAnswer === challenge.answer;

    setAnswers(prev => [...prev, {
      id: challenge.id,
      selected: selectedAnswer,
      correct: challenge.answer,
      isCorrect,
      domain: challenge.domain,
      difficulty: challenge.difficulty,
    }]);

    if (currentIndex < challenges.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextChallenge = challenges[nextIndex];

      // If next is a memory question with different words, show memorize screen
      if (nextChallenge.type === "memory_recall") {
        const currentWords = challenge.memoryWords?.join(",");
        const nextWords = nextChallenge.memoryWords?.join(",");
        if (currentWords !== nextWords) {
          setCurrentIndex(nextIndex);
          setSelectedAnswer(null);
          setCurrentMemoryWords(nextChallenge.memoryWords || []);
          setMemorizeCountdown(8);
          setMode("memorize");
          return;
        }
      }
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
    } else {
      setTotalTime(Math.round((Date.now() - startTime) / 1000));
      setMode("results");
    }
  };

  const saveResults = useCallback(async (score: number, total: number, domainBreakdown: any) => {
    if (!user) return;
    try {
      await supabase.from("personality_results").insert([{
        user_id: user.id,
        assessment_type: "cognitive",
        raw_scores: domainBreakdown as any,
        result_type: `${Math.round((score / total) * 100)}%`,
        result_data: { answers, totalTime, score, total } as any,
      }]);
    } catch {}
  }, [user, answers, totalTime]);

  const currentChallenge = challenges[currentIndex];
  const progress = challenges.length > 0 ? Math.round(((currentIndex + 1) / challenges.length) * 100) : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold text-foreground">Sign in to take the Cognitive Skills Test</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/iq-personality"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <Brain className="w-5 h-5 text-primary" /> Cognitive Skills Test
          </h1>
          {mode === "playing" && (
            <span className={`ml-auto text-sm font-mono flex items-center gap-1 ${timeLeft < 60 ? "text-destructive" : "text-muted-foreground"}`}>
              <Timer className="w-3.5 h-3.5" /> {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {mode === "intro" && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Brain className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-lg font-bold text-foreground">Cognitive Skills Assessment</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tests your <strong>working memory</strong>, <strong>processing speed</strong>, and <strong>attention</strong>.
              </p>
            </div>

            <Card className="p-4 border-primary/20 bg-primary/5">
              <h3 className="font-bold text-sm text-foreground mb-2">📋 How It Works</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                <li><strong>{QUESTION_COUNT} questions</strong> across 3 cognitive domains</li>
                <li><strong>Time limit: {Math.floor(TIME_LIMIT_SECONDS / 60)} minutes</strong> — speed affects your score</li>
                <li><strong>Memory challenges:</strong> Words appear for 8 seconds, then disappear. You answer from memory.</li>
                <li>Results shown only at the end — no per-question feedback</li>
              </ul>
            </Card>

            <Card className="p-4 border-amber-500/30 bg-amber-500/5">
              <p className="text-xs text-muted-foreground">
                <strong>⚠️ Note:</strong> This is a cognitive skills test, not an IQ test. It measures memory, speed, and attention.
                For an IQ-style reasoning test, visit the IQ Assessment instead.
              </p>
            </Card>

            <Button className="w-full" size="lg" onClick={loadChallenges}>
              Start Cognitive Test
            </Button>
          </div>
        )}

        {mode === "memorize" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-xs font-mono text-muted-foreground">{currentIndex + 1}/{challenges.length}</span>
            </div>

            <Card className="p-8 text-center space-y-6">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Eye className="w-6 h-6" />
                <h3 className="text-lg font-bold">Memorize These Words</h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {currentMemoryWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.3 }}
                    className="text-xl font-bold text-foreground px-4 py-2 rounded-lg bg-primary/10 border border-primary/20"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Words will disappear in...</p>
                <span className="text-4xl font-black text-primary">{memorizeCountdown}</span>
                <Progress value={(memorizeCountdown / 8) * 100} className="h-2" />
              </div>
            </Card>
          </div>
        )}

        {mode === "playing" && currentChallenge && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-xs font-mono text-muted-foreground">{currentIndex + 1}/{challenges.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentChallenge.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 space-y-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-muted capitalize">{currentChallenge.domain}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted capitalize">{currentChallenge.difficulty}</span>
                  </div>

                  <p className="text-lg font-medium leading-relaxed text-foreground">
                    {currentChallenge.prompt}
                  </p>

                  <div className="space-y-2">
                    {currentChallenge.options.map((option, i) => (
                      <Button
                        key={i}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => setSelectedAnswer(option)}
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-3 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <Button className="w-full" size="lg" onClick={handleNext} disabled={!selectedAnswer}>
              {currentIndex < challenges.length - 1 ? "Next Question" : "Finish Test"}
            </Button>
          </div>
        )}

        {mode === "results" && <CognitiveResults answers={answers} totalTime={Math.round((Date.now() - startTime) / 1000)} totalQuestions={challenges.length} onRetry={() => setMode("intro")} onSave={saveResults} />}
      </div>
      <BottomNav />
    </div>
  );
};

// Results component
function CognitiveResults({ answers, totalTime, totalQuestions, onRetry, onSave }: {
  answers: UserAnswer[];
  totalTime: number;
  totalQuestions: number;
  onRetry: () => void;
  onSave: (score: number, total: number, breakdown: any) => void;
}) {
  const score = answers.filter(a => a.isCorrect).length;
  const pct = Math.round((score / totalQuestions) * 100);
  const minutes = Math.floor(totalTime / 60);
  const secs = totalTime % 60;

  // Domain breakdown
  const domains: Record<string, { correct: number; total: number }> = {};
  answers.forEach(a => {
    if (!domains[a.domain]) domains[a.domain] = { correct: 0, total: 0 };
    domains[a.domain].total++;
    if (a.isCorrect) domains[a.domain].correct++;
  });

  const domainEntries = Object.entries(domains).map(([name, stats]) => ({
    name,
    correct: stats.correct,
    total: stats.total,
    pct: Math.round((stats.correct / stats.total) * 100),
  })).sort((a, b) => b.pct - a.pct);

  const getBand = (p: number) => {
    if (p >= 90) return { label: "Advanced", color: "text-primary" };
    if (p >= 70) return { label: "Strong", color: "text-emerald-600" };
    if (p >= 50) return { label: "Developing", color: "text-amber-600" };
    return { label: "Emerging", color: "text-muted-foreground" };
  };

  const band = getBand(pct);

  useEffect(() => {
    onSave(score, totalQuestions, domains);
  }, []);

  return (
    <div className="space-y-5">
      <Card className="p-6 text-center">
        <Brain className="w-14 h-14 text-primary mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-1">Cognitive Performance</p>
        <h2 className={`text-5xl font-black ${band.color}`}>{pct}%</h2>
        <p className={`text-lg font-bold mt-1 ${band.color}`}>{band.label}</p>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <span>{score}/{totalQuestions} correct</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {minutes}m {secs}s</span>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        ⚠️ This measures cognitive skills (memory, speed, attention) — not IQ. Use it to track improvement over time.
      </p>

      <Card className="p-5">
        <h3 className="font-bold text-foreground mb-4">Domain Breakdown</h3>
        <div className="space-y-3">
          {domainEntries.map(d => (
            <div key={d.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">{d.name}</span>
                <span className="text-muted-foreground">{d.correct}/{d.total}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Button className="w-full" size="lg" onClick={onRetry}>Try Again</Button>
    </div>
  );
}

export default CognitiveSkills;
