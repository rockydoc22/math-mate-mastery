import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, ChevronRight, Check, Lightbulb } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

interface StrategyItem {
  id: string;
  type: string;
  exam: string;
  section: string;
  difficulty: string;
  prompt: string;
  recommended_strategy: string;
  success_condition: string;
  explanation: string;
}

type Mode = "select" | "playing" | "review" | "results";

const STRATEGY_TYPES = [
  { type: "eliminate_two_wrong_choices", label: "Process of Elimination", emoji: "❌" },
  { type: "choose_skip_or_solve", label: "Skip or Solve", emoji: "⏭️" },
  { type: "estimate_before_solving", label: "Estimate First", emoji: "🎯" },
  { type: "reread_key_sentence", label: "Re-read Strategy", emoji: "📖" },
  { type: "time_check_midway", label: "Time Management", emoji: "⏱️" },
  { type: "plug_in_answers", label: "Plug-in Strategy", emoji: "🔌" },
];

const StrategyPractice = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("select");
  const [allItems, setAllItems] = useState<StrategyItem[]>([]);
  const [items, setItems] = useState<StrategyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStrategy, setShowStrategy] = useState(false);
  const [understood, setUnderstood] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const mod = await import("@/data/test_strategy_mega_bank_1000.json");
      setAllItems((mod.default || mod) as StrategyItem[]);
      setLoaded(true);
    };
    load();
  }, []);

  const startPractice = (type?: string) => {
    let filtered = allItems;
    if (type) filtered = allItems.filter((i) => i.type === type);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
    setItems(shuffled);
    setCurrentIndex(0);
    setUnderstood(0);
    setShowStrategy(false);
    setMode("playing");
  };

  const handleReveal = () => setShowStrategy(true);

  const handleNext = (gotIt: boolean) => {
    if (gotIt) setUnderstood((u) => u + 1);
    setShowStrategy(false);
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setMode("results");
    }
  };

  const currentItem = items[currentIndex];
  const progress = items.length > 0 ? Math.round(((currentIndex + 1) / items.length) * 100) : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Sign in to practice strategies</p>
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
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Strategy Practice
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {mode === "select" && (
          <div className="space-y-4">
            <Card
              className="p-5 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => startPractice()}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎲</span>
                <div className="flex-1">
                  <h3 className="font-bold">Mixed Strategy Drill</h3>
                  <p className="text-xs text-muted-foreground">
                    {loaded ? `${allItems.length} scenarios` : "Loading..."} • Random mix of all types
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <h3 className="text-sm font-bold text-muted-foreground pt-2">By Strategy Type</h3>
            {STRATEGY_TYPES.map((st) => {
              const count = allItems.filter((i) => i.type === st.type).length;
              return (
                <Card
                  key={st.type}
                  className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => startPractice(st.type)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{st.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{st.label}</h4>
                      <p className="text-xs text-muted-foreground">{count} scenarios</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-muted">{currentItem.exam}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted">{currentItem.section}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted">{currentItem.difficulty}</span>
                  </div>

                  <p className="text-lg font-medium leading-relaxed">{currentItem.prompt}</p>

                  {!showStrategy ? (
                    <Button onClick={handleReveal} className="w-full gap-2">
                      <Lightbulb className="w-4 h-4" /> Reveal Strategy
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-primary" /> Recommended Strategy
                        </h4>
                        <p className="text-sm">{currentItem.recommended_strategy}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted">
                        <p className="text-xs text-muted-foreground">{currentItem.explanation}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => handleNext(false)}>
                          Need Practice
                        </Button>
                        <Button onClick={() => handleNext(true)} className="gap-1">
                          <Check className="w-4 h-4" /> Got It
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {mode === "results" && (
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-2xl font-bold">{understood}/{items.length}</h2>
              <p className="text-sm text-muted-foreground">strategies mastered this session</p>
            </Card>
            <Button className="w-full" onClick={() => setMode("select")}>
              Practice More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyPractice;
