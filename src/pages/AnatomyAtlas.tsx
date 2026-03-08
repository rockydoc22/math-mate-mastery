import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Bone, RotateCcw, Eye, EyeOff, Trophy, Zap, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnatomySVG } from "@/components/anatomy/AnatomySVG";
import { ANATOMY_DIAGRAMS, checkAnatomyAnswer, type AnatomyStructure, type AnatomyDiagram } from "@/data/anatomy_atlas_data";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type GamePhase = "select" | "playing" | "results";

export default function AnatomyAtlas() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<GamePhase>("select");
  const [selectedDiagram, setSelectedDiagram] = useState<AnatomyDiagram | null>(null);
  const [currentStructureIndex, setCurrentStructureIndex] = useState(0);
  const [correctIds, setCorrectIds] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [userAnswer, setUserAnswer] = useState("");
  const [showLabels, setShowLabels] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [shuffledStructures, setShuffledStructures] = useState<AnatomyStructure[]>([]);

  // Drag and drop state (mobile)
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);

  const startQuiz = (diagram: AnatomyDiagram) => {
    setSelectedDiagram(diagram);
    const shuffled = [...diagram.structures].sort(() => Math.random() - 0.5);
    setShuffledStructures(shuffled);
    setCurrentStructureIndex(0);
    setCorrectIds(new Set());
    setWrongIds(new Set());
    setAnsweredIds(new Set());
    setScore(0);
    setFeedback(null);
    setUserAnswer("");
    setPhase("playing");

    // For mobile drag-and-drop, prepare label bank
    if (isMobile) {
      setAvailableLabels(shuffled.map((s) => s.name).sort(() => Math.random() - 0.5));
    }
  };

  const currentStructure = shuffledStructures[currentStructureIndex] || null;

  const handleSubmitAnswer = useCallback(() => {
    if (!currentStructure || !userAnswer.trim()) return;

    const result = checkAnatomyAnswer(userAnswer, currentStructure);
    const newAnswered = new Set(answeredIds);
    newAnswered.add(currentStructure.id);
    setAnsweredIds(newAnswered);

    if (result.correct) {
      const newCorrect = new Set(correctIds);
      newCorrect.add(currentStructure.id);
      setCorrectIds(newCorrect);
      setScore((s) => s + 1);
      setFeedback({
        correct: true,
        message: result.closestMatch
          ? `Correct! (You typed "${userAnswer}", we accepted it as "${result.closestMatch}")`
          : `Correct! ${currentStructure.function || ""}`,
      });
    } else {
      const newWrong = new Set(wrongIds);
      newWrong.add(currentStructure.id);
      setWrongIds(newWrong);
      setFeedback({
        correct: false,
        message: `The answer is ${currentStructure.name}. ${currentStructure.function || ""}`,
      });
    }

    setUserAnswer("");
  }, [currentStructure, userAnswer, answeredIds, correctIds, wrongIds]);

  const handleNext = () => {
    setFeedback(null);
    if (currentStructureIndex + 1 >= shuffledStructures.length) {
      setPhase("results");
    } else {
      setCurrentStructureIndex((i) => i + 1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Mobile: handle label tap for drag-drop
  const handleLabelDrop = (labelName: string) => {
    if (!currentStructure) return;

    const structure = shuffledStructures.find((s) => s.name === labelName);
    if (!structure) return;

    // Check if this label matches the currently highlighted structure
    if (labelName === currentStructure.name) {
      const newCorrect = new Set(correctIds);
      newCorrect.add(currentStructure.id);
      setCorrectIds(newCorrect);
      setScore((s) => s + 1);
      setAvailableLabels((prev) => prev.filter((l) => l !== labelName));
      toast.success(`${currentStructure.name} — ${currentStructure.function || "Correct!"}`);

      const newAnswered = new Set(answeredIds);
      newAnswered.add(currentStructure.id);
      setAnsweredIds(newAnswered);

      // Auto advance
      setTimeout(() => {
        if (currentStructureIndex + 1 >= shuffledStructures.length) {
          setPhase("results");
        } else {
          setCurrentStructureIndex((i) => i + 1);
        }
      }, 600);
    } else {
      const newWrong = new Set(wrongIds);
      newWrong.add(currentStructure.id);
      setWrongIds(newWrong);
      toast.error(`Not quite — that's not the ${currentStructure.name}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (feedback) handleNext();
      else handleSubmitAnswer();
    }
  };

  const progress = shuffledStructures.length > 0
    ? ((answeredIds.size) / shuffledStructures.length) * 100
    : 0;

  // SELECT PHASE
  if (phase === "select") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">🫀 Anatomy Atlas</h1>
              <p className="text-sm text-muted-foreground">Interactive body identification — Operation style</p>
            </div>
          </div>

          {isMobile && (
            <Card className="p-3 mb-4 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2 text-sm">
                <Monitor className="h-4 w-4 text-primary" />
                <span>Tap labels to match structures. Free-text mode available on desktop.</span>
              </div>
            </Card>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {ANATOMY_DIAGRAMS.map((diagram) => (
              <Card
                key={diagram.id}
                className="p-5 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg group"
                onClick={() => startQuiz(diagram)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {diagram.system === "muscular" ? (
                      <Brain className="h-5 w-5 text-primary" />
                    ) : (
                      <Bone className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{diagram.title}</h3>
                    <p className="text-xs text-muted-foreground">{diagram.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{diagram.structures.length} structures</Badge>
                  <Badge variant="outline" className="capitalize">{diagram.view} view</Badge>
                  <Badge variant="outline" className="capitalize">{diagram.system}</Badge>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-6 p-4 bg-muted/30">
            <h3 className="font-semibold mb-2">🎮 How It Works</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Structures are highlighted one at a time on the body diagram</li>
              <li>• <strong>Desktop:</strong> Type the name of the structure (spelling help included)</li>
              <li>• <strong>Mobile:</strong> Tap the correct label from the bank below</li>
              <li>• Earn points for correct answers — like the game Operation!</li>
            </ul>
          </Card>
        </div>
      </div>
    );
  }

  // RESULTS PHASE
  if (phase === "results" && selectedDiagram) {
    const percentage = Math.round((score / shuffledStructures.length) * 100);
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-4 sm:p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-lg text-muted-foreground mb-4">{selectedDiagram.title}</p>

              <div className="text-5xl font-black mb-2" style={{ color: percentage >= 70 ? "hsl(var(--chart-2))" : "hsl(var(--destructive))" }}>
                {percentage}%
              </div>
              <p className="text-muted-foreground mb-6">
                {score} / {shuffledStructures.length} correct
              </p>

              <div className="space-y-2 mb-6 text-left max-h-60 overflow-y-auto">
                {shuffledStructures.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 text-sm py-1 border-b border-border/50">
                    <span>{correctIds.has(s.id) ? "✅" : "❌"}</span>
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground ml-auto text-xs">{s.region}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setPhase("select")}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <Button onClick={() => startQuiz(selectedDiagram)}>
                  <RotateCcw className="h-4 w-4 mr-1" /> Retry
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // PLAYING PHASE
  if (!selectedDiagram || !currentStructure) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-3 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setPhase("select")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-lg font-bold">{selectedDiagram.title}</h2>
              <p className="text-xs text-muted-foreground">
                {currentStructureIndex + 1} / {shuffledStructures.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLabels(!showLabels)}
            >
              {showLabels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="hidden sm:inline ml-1">{showLabels ? "Hide" : "Show"} Labels</span>
            </Button>
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" /> {score}
            </Badge>
          </div>
        </div>

        <Progress value={progress} className="mb-3 h-2" />

        {/* Main layout */}
        <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-[1fr_300px]"}`}>
          {/* SVG Diagram */}
          <Card className="p-3 sm:p-4 flex items-center justify-center bg-card/50">
            <AnatomySVG
              system={selectedDiagram.system}
              structures={selectedDiagram.structures}
              highlightedId={currentStructure.id}
              answeredIds={answeredIds}
              correctIds={correctIds}
              wrongIds={wrongIds}
              showLabels={showLabels}
            />
          </Card>

          {/* Answer panel */}
          <div className="space-y-3">
            {/* Hint card */}
            <Card className="p-3 bg-primary/5 border-primary/20">
              <p className="text-sm font-medium mb-1">Identify this structure:</p>
              <p className="text-xs text-muted-foreground">
                Region: <strong className="capitalize">{currentStructure.region}</strong> •
                Type: <strong className="capitalize">{currentStructure.category}</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{currentStructure.description}</p>
            </Card>

            {/* Desktop: Free text input */}
            {!isMobile && (
              <div className="space-y-2">
                <AnimatePresence mode="wait">
                  {feedback ? (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card className={`p-3 ${feedback.correct ? "bg-green-500/10 border-green-500/30" : "bg-destructive/10 border-destructive/30"}`}>
                        <p className="text-sm font-medium">
                          {feedback.correct ? "✅ " : "❌ "}
                          {feedback.message}
                        </p>
                      </Card>
                      <Button className="w-full mt-2" onClick={handleNext}>
                        {currentStructureIndex + 1 >= shuffledStructures.length ? "See Results" : "Next →"}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Input
                        ref={inputRef}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type the structure name..."
                        autoFocus
                        className="text-base"
                      />
                      <Button className="w-full mt-2" onClick={handleSubmitAnswer} disabled={!userAnswer.trim()}>
                        Submit
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile: Label bank (tap to match) */}
            {isMobile && (
              <div className="space-y-2">
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card className={`p-3 ${feedback.correct ? "bg-green-500/10 border-green-500/30" : "bg-destructive/10 border-destructive/30"}`}>
                        <p className="text-sm font-medium">
                          {feedback.correct ? "✅ " : "❌ "}
                          {feedback.message}
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-xs text-muted-foreground font-medium">Tap the correct label:</p>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                  {availableLabels.map((label) => (
                    <motion.button
                      key={label}
                      layout
                      className="px-3 py-1.5 text-sm rounded-full border border-border bg-card hover:bg-primary/10 hover:border-primary/40 transition-colors active:scale-95"
                      onClick={() => handleLabelDrop(label)}
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty indicator */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Difficulty:</span>
              {["easy", "medium", "hard"].map((d) => (
                <span
                  key={d}
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${
                    currentStructure.difficulty === d
                      ? d === "easy"
                        ? "bg-green-500/20 text-green-600"
                        : d === "medium"
                        ? "bg-yellow-500/20 text-yellow-600"
                        : "bg-red-500/20 text-red-600"
                      : "opacity-30"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
