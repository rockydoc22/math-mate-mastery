import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, RotateCcw, Mic, CheckCircle2, Volume2, ChevronRight, Star, Eye, EyeOff, Trophy } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

// Mastery levels from spec
const MASTERY_LEVELS = [
  { id: "M0", label: "New", color: "bg-muted text-muted-foreground" },
  { id: "M1", label: "Seen", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { id: "M2", label: "Practiced", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" },
  { id: "M3", label: "Strong", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
  { id: "M4", label: "Mastered", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
];

type AudioState = "not_started" | "playing" | "paused" | "completed" | "replayed" | "shadowed";
type DisplayMode = "both" | "target_only" | "native_only";
type View = "home" | "session" | "review" | "summary";

interface ConversationLine {
  id: string;
  speaker: string;
  targetText: string;
  nativeText: string;
  difficultyTag: string;
  audioState: AudioState;
  playCount: number;
  shadowAttempted: boolean;
  shadowCompleted: boolean;
  mastery: number; // 0-4
  comprehensionCorrect?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  language: string;
  level: string;
  tags: string[];
  lines: ConversationLine[];
}

// Sample conversations
const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_001",
    title: "Ordering at a Café",
    language: "French",
    level: "A1",
    tags: ["daily_use", "travel"],
    lines: [
      { id: "l1", speaker: "Server", targetText: "Bonjour ! Qu'est-ce que vous désirez ?", nativeText: "Hello! What would you like?", difficultyTag: "starter_phrase", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l2", speaker: "You", targetText: "Je voudrais un café, s'il vous plaît.", nativeText: "I would like a coffee, please.", difficultyTag: "daily_use", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l3", speaker: "Server", targetText: "Un grand ou un petit ?", nativeText: "A large or a small?", difficultyTag: "daily_use", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l4", speaker: "You", targetText: "Un grand, s'il vous plaît. Et un croissant.", nativeText: "A large, please. And a croissant.", difficultyTag: "daily_use", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l5", speaker: "Server", targetText: "Très bien. Ça fait quatre euros cinquante.", nativeText: "Very well. That will be four euros fifty.", difficultyTag: "daily_use", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l6", speaker: "You", targetText: "Voilà. Merci beaucoup !", nativeText: "Here you go. Thank you very much!", difficultyTag: "starter_phrase", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
    ],
  },
  {
    id: "conv_002",
    title: "At the Doctor's Office",
    language: "French",
    level: "A2",
    tags: ["medical"],
    lines: [
      { id: "l1", speaker: "Doctor", targetText: "Bonjour, qu'est-ce qui ne va pas ?", nativeText: "Hello, what's wrong?", difficultyTag: "medical", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l2", speaker: "You", targetText: "J'ai mal à la tête depuis deux jours.", nativeText: "I've had a headache for two days.", difficultyTag: "medical", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l3", speaker: "Doctor", targetText: "Avez-vous de la fièvre ?", nativeText: "Do you have a fever?", difficultyTag: "medical", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l4", speaker: "You", targetText: "Oui, un peu. Et je suis très fatigué.", nativeText: "Yes, a little. And I'm very tired.", difficultyTag: "medical", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l5", speaker: "Doctor", targetText: "Je vais vous prescrire du repos et des médicaments.", nativeText: "I'm going to prescribe you rest and medication.", difficultyTag: "advanced_expression", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
    ],
  },
  {
    id: "conv_003",
    title: "Meeting a New Friend",
    language: "Spanish",
    level: "A1",
    tags: ["social", "starter_phrase"],
    lines: [
      { id: "l1", speaker: "Friend", targetText: "¡Hola! ¿Cómo te llamas?", nativeText: "Hi! What's your name?", difficultyTag: "starter_phrase", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l2", speaker: "You", targetText: "Me llamo Alex. ¿Y tú?", nativeText: "My name is Alex. And you?", difficultyTag: "starter_phrase", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l3", speaker: "Friend", targetText: "Soy María. ¿De dónde eres?", nativeText: "I'm María. Where are you from?", difficultyTag: "daily_use", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l4", speaker: "You", targetText: "Soy de Estados Unidos. ¿Tú vives aquí?", nativeText: "I'm from the United States. Do you live here?", difficultyTag: "daily_use", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
      { id: "l5", speaker: "Friend", targetText: "Sí, vivo aquí desde hace tres años. ¡Me encanta!", nativeText: "Yes, I've lived here for three years. I love it!", difficultyTag: "social", audioState: "not_started", playCount: 0, shadowAttempted: false, shadowCompleted: false, mastery: 0 },
    ],
  },
];

const ConversationPractice = () => {
  const [view, setView] = useState<View>("home");
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [lines, setLines] = useState<ConversationLine[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("both");
  const [sessionScore, setSessionScore] = useState(0);
  const [reviewQueue, setReviewQueue] = useState<ConversationLine[]>([]);

  const startConversation = (conv: Conversation) => {
    setSelectedConv(conv);
    setLines(conv.lines.map(l => ({ ...l })));
    setCurrentLineIdx(0);
    setSessionScore(0);
    setReviewQueue([]);
    setView("session");
  };

  const updateLine = useCallback((lineId: string, updates: Partial<ConversationLine>) => {
    setLines(prev => prev.map(l => l.id === lineId ? { ...l, ...updates } : l));
  }, []);

  const handlePlay = (line: ConversationLine) => {
    const newCount = line.playCount + 1;
    const newState: AudioState = newCount > 1 ? "replayed" : "completed";
    updateLine(line.id, { audioState: newState, playCount: newCount });
    // +1 point for listen
    setSessionScore(s => s + 1);
    // If replayed 3+ times, add to review queue
    if (newCount >= 3) {
      setReviewQueue(prev => prev.some(r => r.id === line.id) ? prev : [...prev, line]);
    }
  };

  const handleShadow = (line: ConversationLine) => {
    updateLine(line.id, { shadowAttempted: true, shadowCompleted: true, audioState: "shadowed" });
    setSessionScore(s => s + 3);
  };

  const handleCompleteLine = (line: ConversationLine) => {
    const newMastery = Math.min(line.mastery + 1, 4);
    updateLine(line.id, { mastery: newMastery });
    setSessionScore(s => s + 2);
    if (currentLineIdx < lines.length - 1) {
      setCurrentLineIdx(i => i + 1);
    }
  };

  const finishSession = () => {
    // Bonus for perfect (no review items)
    const bonus = reviewQueue.length === 0 ? 10 : 0;
    const noTranslationBonus = displayMode === "target_only" ? 8 : 0;
    setSessionScore(s => s + bonus + noTranslationBonus);
    setView("summary");
    toast({ title: "Session Complete! 🎉", description: `You scored ${sessionScore + bonus + noTranslationBonus} points` });
  };

  // HOME VIEW
  if (view === "home") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-xl font-bold text-foreground">Conversation Practice</h1>
          </div>

          {/* Display Mode Selector */}
          <Card className="p-4 mb-4">
            <p className="text-sm font-medium mb-2 text-foreground">Language Display</p>
            <div className="flex gap-2">
              {([["both", "Both"], ["target_only", "Target Only"], ["native_only", "Native Only"]] as [DisplayMode, string][]).map(([mode, label]) => (
                <Button key={mode} size="sm" variant={displayMode === mode ? "default" : "outline"} onClick={() => setDisplayMode(mode)}>{label}</Button>
              ))}
            </div>
          </Card>

          {/* Conversation List */}
          <div className="space-y-3">
            {SAMPLE_CONVERSATIONS.map(conv => (
              <motion.div key={conv.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => startConversation(conv)}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{conv.title}</h3>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{conv.language}</Badge>
                    <Badge variant="outline" className="text-xs">{conv.level}</Badge>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {conv.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag.replace(/_/g, ' ')}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{conv.lines.length} lines</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // SESSION VIEW
  if (view === "session" && selectedConv) {
    const currentLine = lines[currentLineIdx];
    const progress = ((currentLineIdx + 1) / lines.length) * 100;
    const mastery = MASTERY_LEVELS[currentLine.mastery];

    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto px-4 pt-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={() => setView("home")}><ArrowLeft className="w-5 h-5" /></Button>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{selectedConv.title}</p>
              <p className="text-xs text-muted-foreground">Line {currentLineIdx + 1} / {lines.length}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-foreground">{sessionScore}</span>
            </div>
          </div>

          <Progress value={progress} className="h-2 mb-6" />

          {/* Current Line Card */}
          <AnimatePresence mode="wait">
            <motion.div key={currentLine.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className="p-6 mb-4">
                {/* Speaker + Mastery */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{currentLine.speaker === "You" ? "🗣️" : "👤"}</span>
                    <span className="font-semibold text-foreground">{currentLine.speaker}</span>
                  </div>
                  <Badge className={mastery.color}>{mastery.label}</Badge>
                </div>

                {/* Target Language */}
                {displayMode !== "native_only" && (
                  <p className="text-lg font-medium mb-2 text-foreground">{currentLine.targetText}</p>
                )}

                {/* Native Language */}
                {displayMode !== "target_only" && (
                  <p className="text-sm text-muted-foreground mb-4">{currentLine.nativeText}</p>
                )}

                {/* Difficulty Tag */}
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {currentLine.difficultyTag.replace(/_/g, ' ')}
                </span>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Audio Controls */}
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" variant={currentLine.audioState === "completed" || currentLine.audioState === "replayed" ? "secondary" : "default"} onClick={() => handlePlay(currentLine)}>
                    {currentLine.audioState === "not_started" ? <Play className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                    {currentLine.audioState === "not_started" ? "Listen" : `Replay (${currentLine.playCount})`}
                  </Button>
                  <Button className="flex-1 gap-2" variant={currentLine.shadowCompleted ? "secondary" : "outline"} onClick={() => handleShadow(currentLine)} disabled={currentLine.audioState === "not_started"}>
                    <Mic className="w-4 h-4" />
                    {currentLine.shadowCompleted ? "Shadowed ✓" : "Shadow"}
                  </Button>
                </div>

                {/* Complete / Next */}
                <Button className="w-full gap-2" onClick={() => {
                  handleCompleteLine(currentLine);
                  if (currentLineIdx >= lines.length - 1) finishSession();
                }}>
                  <CheckCircle2 className="w-4 h-4" />
                  {currentLineIdx < lines.length - 1 ? "Complete & Next" : "Finish Conversation"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* All Lines Preview */}
          <div className="mt-6 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">All Lines</p>
            {lines.map((line, idx) => (
              <div key={line.id} onClick={() => setCurrentLineIdx(idx)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm transition-colors ${idx === currentLineIdx ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'}`}>
                <span className="w-5 text-center text-xs text-muted-foreground">{idx + 1}</span>
                {line.mastery > 0 ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Volume2 className="w-4 h-4 text-muted-foreground shrink-0" />}
                <span className="truncate text-foreground">{line.targetText}</span>
                <Badge variant="outline" className="text-[10px] ml-auto shrink-0">{MASTERY_LEVELS[line.mastery].label}</Badge>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // SUMMARY VIEW
  if (view === "summary" && selectedConv) {
    const masteredLines = lines.filter(l => l.mastery >= 3).length;
    const shadowedLines = lines.filter(l => l.shadowCompleted).length;
    const listenedLines = lines.filter(l => l.playCount > 0).length;

    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto px-4 pt-4">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎉</div>
            <h1 className="text-2xl font-bold text-foreground">Session Complete!</h1>
            <p className="text-muted-foreground">{selectedConv.title}</p>
          </div>

          <Card className="p-6 mb-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">{sessionScore}</p>
                <p className="text-xs text-muted-foreground">Total Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{lines.length}</p>
                <p className="text-xs text-muted-foreground">Lines Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">{shadowedLines}</p>
                <p className="text-xs text-muted-foreground">Lines Shadowed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-500">{listenedLines}</p>
                <p className="text-xs text-muted-foreground">Lines Listened</p>
              </div>
            </div>
          </Card>

          {/* Mastery Breakdown */}
          <Card className="p-4 mb-4">
            <p className="font-semibold mb-3 text-foreground">Line Mastery</p>
            <div className="space-y-2">
              {lines.map(line => (
                <div key={line.id} className="flex items-center gap-2 text-sm">
                  <Badge className={MASTERY_LEVELS[line.mastery].color + " text-[10px]"}>{MASTERY_LEVELS[line.mastery].label}</Badge>
                  <span className="truncate text-foreground">{line.targetText}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Review Queue */}
          {reviewQueue.length > 0 && (
            <Card className="p-4 mb-4 border-orange-300 dark:border-orange-700">
              <p className="font-semibold mb-2 text-orange-600 dark:text-orange-400">📋 Needs Review ({reviewQueue.length})</p>
              {reviewQueue.map(line => (
                <p key={line.id} className="text-sm text-muted-foreground">• {line.targetText}</p>
              ))}
            </Card>
          )}

          {/* Bonuses */}
          <Card className="p-4 mb-4">
            <p className="font-semibold mb-2 text-foreground">Bonuses</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Perfect Conversation</span>
                <span className={reviewQueue.length === 0 ? "text-green-500 font-bold" : "text-muted-foreground"}>
                  {reviewQueue.length === 0 ? "+10 ✓" : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">No Translation Mode</span>
                <span className={displayMode === "target_only" ? "text-green-500 font-bold" : "text-muted-foreground"}>
                  {displayMode === "target_only" ? "+8 ✓" : "—"}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1" variant="outline" onClick={() => setView("home")}>Back to List</Button>
            <Button className="flex-1" onClick={() => startConversation(selectedConv)}>Practice Again</Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return null;
};

export default ConversationPractice;
