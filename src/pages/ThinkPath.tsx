import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, RotateCcw, ChevronRight, Trophy, Sparkles, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import scenarioData from "@/data/strategy_problem_solving_pack_01.json";

interface Choice {
  option: string;
  description: string;
  quality: "best" | "good" | "workable" | "weak";
  feedback: string;
  next_path?: string;
}

interface PathStep {
  step_prompt: string;
  choices: Choice[];
}

interface Scenario {
  scenario_id: string;
  category: string;
  title: string;
  problem: string;
  learning_goal: string;
  step_1_prompt: string;
  step_1_choices: Choice[];
  best_opening_option: string;
  paths: Record<string, PathStep>;
}

const QUALITY_SCORES: Record<string, number> = {
  best: 10,
  good: 7,
  workable: 4,
  weak: 1,
};

const QUALITY_COLORS: Record<string, string> = {
  best: "bg-green-500/20 text-green-400 border-green-500/30",
  good: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  workable: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  weak: "bg-red-500/20 text-red-400 border-red-500/30",
};

const QUALITY_LABELS: Record<string, string> = {
  best: "🌟 Optimal",
  good: "✅ Good",
  workable: "⚠️ Workable",
  weak: "❌ Weak",
};

const ThinkPath = () => {
  const navigate = useNavigate();
  const scenarios = scenarioData.scenarios as Scenario[];

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState<"step1" | "step2" | "summary">("step1");
  const [step1Choice, setStep1Choice] = useState<Choice | null>(null);
  const [step2Choice, setStep2Choice] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [scenariosCompleted, setScenariosCompleted] = useState(0);
  const [sessionScores, setSessionScores] = useState<number[]>([]);

  const scenario = scenarios[scenarioIndex];
  const maxPossibleScore = 20; // best + best

  const currentChoices = useMemo(() => {
    if (step === "step1") return scenario.step_1_choices;
    if (step === "step2" && step1Choice?.next_path) {
      const path = scenario.paths[step1Choice.next_path];
      return path?.choices || [];
    }
    return [];
  }, [step, scenario, step1Choice]);

  const currentPrompt = useMemo(() => {
    if (step === "step1") return scenario.step_1_prompt;
    if (step === "step2" && step1Choice?.next_path) {
      const path = scenario.paths[step1Choice.next_path];
      return path?.step_prompt || "What should you do next?";
    }
    return "";
  }, [step, scenario, step1Choice]);

  const handleChoose = (choice: Choice) => {
    if (step === "step1") {
      setStep1Choice(choice);
      setShowFeedback(true);
    } else if (step === "step2") {
      setStep2Choice(choice);
      setShowFeedback(true);
    }
  };

  const advanceStep = () => {
    setShowFeedback(false);
    if (step === "step1" && step1Choice?.next_path && scenario.paths[step1Choice.next_path]) {
      setStep("step2");
    } else {
      // Go to summary
      const s1 = QUALITY_SCORES[step1Choice?.quality || "weak"];
      const s2 = QUALITY_SCORES[step2Choice?.quality || "weak"];
      const roundScore = s1 + (step2Choice ? s2 : 0);
      setTotalScore((prev) => prev + roundScore);
      setScenariosCompleted((prev) => prev + 1);
      setSessionScores((prev) => [...prev, roundScore]);
      setStep("summary");
    }
  };

  const nextScenario = () => {
    const next = (scenarioIndex + 1) % scenarios.length;
    setScenarioIndex(next);
    setStep("step1");
    setStep1Choice(null);
    setStep2Choice(null);
    setShowFeedback(false);
  };

  const efficiencyPct = scenariosCompleted > 0
    ? Math.round((totalScore / (scenariosCompleted * maxPossibleScore)) * 100)
    : 0;

  const currentRoundScore = (step1Choice ? QUALITY_SCORES[step1Choice.quality] : 0)
    + (step2Choice ? QUALITY_SCORES[step2Choice.quality] : 0);

  return (
    <div className="min-h-screen bg-background p-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            ThinkPath
          </h1>
          <p className="text-xs text-muted-foreground">Strategic problem-solving training</p>
        </div>
        {scenariosCompleted > 0 && (
          <Badge variant="outline" className="gap-1">
            <Zap className="w-3 h-3" />
            {efficiencyPct}% efficiency
          </Badge>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
        <span>Scenario {scenarioIndex + 1}/{scenarios.length}</span>
        <Progress value={((scenarioIndex + 1) / scenarios.length) * 100} className="flex-1 h-2" />
        <span>{scenariosCompleted} done</span>
      </div>

      <AnimatePresence mode="wait">
        {step !== "summary" ? (
          <motion.div
            key={`${scenario.scenario_id}-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Problem Card */}
            <Card className="mb-4 border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">{scenario.category.replace("_", " ")}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Step {step === "step1" ? 1 : 2}
                  </span>
                </div>
                <CardTitle className="text-base mt-2">{scenario.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-3 mb-3 text-sm font-medium">
                  {scenario.problem}
                </div>
                <p className="text-sm font-medium text-foreground">{currentPrompt}</p>
              </CardContent>
            </Card>

            {/* Choices */}
            <div className="space-y-2">
              {currentChoices.map((choice) => {
                const isSelected =
                  (step === "step1" && step1Choice?.option === choice.option) ||
                  (step === "step2" && step2Choice?.option === choice.option);

                return (
                  <motion.div key={choice.option} layout>
                    <Card
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-primary border-primary"
                          : showFeedback
                          ? "opacity-60"
                          : "hover:border-primary/40"
                      }`}
                      onClick={() => !showFeedback && handleChoose(choice)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                            {choice.option}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm">{choice.description}</p>
                            {showFeedback && isSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-2 space-y-2"
                              >
                                <Badge className={`${QUALITY_COLORS[choice.quality]} text-xs`}>
                                  {QUALITY_LABELS[choice.quality]} (+{QUALITY_SCORES[choice.quality]} pts)
                                </Badge>
                                <p className="text-xs text-muted-foreground">{choice.feedback}</p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Continue button */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Button onClick={advanceStep} className="w-full gap-2">
                  <ChevronRight className="w-4 h-4" />
                  {step === "step1" && step1Choice?.next_path && scenario.paths[step1Choice.next_path]
                    ? "Next Step"
                    : "See Results"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Summary */
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Scenario Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Score */}
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-primary">
                    {currentRoundScore}/{maxPossibleScore}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">points this round</p>
                </div>

                {/* Choices recap */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Your path:</p>
                  {step1Choice && (
                    <div className="flex items-center gap-2 text-sm">
                      <Badge className={`${QUALITY_COLORS[step1Choice.quality]} text-xs`}>
                        Step 1: {step1Choice.option}
                      </Badge>
                      <span className="text-muted-foreground">{step1Choice.description}</span>
                    </div>
                  )}
                  {step2Choice && (
                    <div className="flex items-center gap-2 text-sm">
                      <Badge className={`${QUALITY_COLORS[step2Choice.quality]} text-xs`}>
                        Step 2: {step2Choice.option}
                      </Badge>
                      <span className="text-muted-foreground">{step2Choice.description}</span>
                    </div>
                  )}
                </div>

                {/* Best path */}
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                  <p className="text-sm font-medium flex items-center gap-2 text-green-400">
                    <Target className="w-4 h-4" />
                    Best path: Option {scenario.best_opening_option}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{scenario.learning_goal}</p>
                </div>

                {/* Session stats */}
                {scenariosCompleted > 1 && (
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-lg font-bold">{scenariosCompleted}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-lg font-bold">{totalScore}</p>
                      <p className="text-xs text-muted-foreground">Total pts</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-lg font-bold">{efficiencyPct}%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button onClick={nextScenario} className="flex-1 gap-2">
                    <Sparkles className="w-4 h-4" />
                    Next Scenario
                  </Button>
                  <Button variant="outline" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThinkPath;
