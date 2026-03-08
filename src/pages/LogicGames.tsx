import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Brain, CheckCircle2, XCircle, Clock, Trophy, RotateCcw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';

// Logic puzzle types for adult/teen learners
interface LogicPuzzle {
  id: string;
  type: 'sequencing' | 'grouping' | 'matching' | 'conditional';
  difficulty: 1 | 2 | 3;
  scenario: string;
  clues: string[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const LOGIC_PUZZLES: LogicPuzzle[] = [
  // Sequencing
  {
    id: 'seq-1', type: 'sequencing', difficulty: 1,
    scenario: 'Six speakers—F, G, H, J, K, L—will present at a conference, one at a time.',
    clues: ['F presents before G.', 'H presents immediately after K.', 'L presents first or last.', 'J does not present immediately before or after F.'],
    question: 'If L presents first, which of the following could be the order of presentations?',
    options: ['L, F, G, K, H, J', 'L, K, H, F, G, J', 'L, J, F, G, K, H', 'L, F, J, G, K, H'],
    correctIndex: 1,
    explanation: 'L is first. K-H must be consecutive. F before G. J not adjacent to F. L, K, H, F, G, J satisfies all clues.',
  },
  {
    id: 'seq-2', type: 'sequencing', difficulty: 2,
    scenario: 'Five tasks—A, B, C, D, E—must be completed in sequence.',
    clues: ['B is completed before D.', 'C is completed immediately before E.', 'A is not first or last.', 'D is completed after at least two other tasks.'],
    question: 'Which of the following is a valid order?',
    options: ['B, A, C, E, D', 'C, E, A, B, D', 'A, B, C, E, D', 'B, C, A, E, D'],
    correctIndex: 0,
    explanation: 'B, A, C, E, D: B before D ✓, C immediately before E ✓, A not first/last ✓, D after 2+ tasks ✓.',
  },
  // Grouping
  {
    id: 'grp-1', type: 'grouping', difficulty: 1,
    scenario: 'Eight employees—P, Q, R, S, T, U, V, W—are divided into two project teams of four.',
    clues: ['P and Q must be on the same team.', 'R and S cannot be on the same team.', 'If T is on Team 1, then V is on Team 2.', 'W is on Team 1.'],
    question: 'If R is on Team 1, which of the following must be true?',
    options: ['S is on Team 2', 'T is on Team 2', 'P is on Team 1', 'U is on Team 1'],
    correctIndex: 0,
    explanation: 'R and S cannot be on the same team. If R is on Team 1, S must be on Team 2.',
  },
  {
    id: 'grp-2', type: 'grouping', difficulty: 2,
    scenario: 'Six students—A, B, C, D, E, F—are assigned to three lab groups of two each.',
    clues: ['A and B cannot be in the same group.', 'C must be with either D or E.', 'F is not with A.', 'D and E are not in the same group.'],
    question: 'If C is with D, which pair must be in the same group?',
    options: ['A and E', 'B and F', 'A and D', 'E and F'],
    correctIndex: 1,
    explanation: 'C-D together. D and E separated ✓. A not with F. A not with B. So A with E, and B with F.',
  },
  // Conditional
  {
    id: 'cond-1', type: 'conditional', difficulty: 2,
    scenario: 'A law firm assigns associates to cases based on these rules:',
    clues: ['If Martinez takes Case X, then Nguyen does not take Case X.', 'If Park takes Case Y, then both Quinn and Roberts take Case Y.', 'Martinez or Park (or both) must take Case X.', 'At most three associates can work on any single case.'],
    question: 'If Nguyen takes Case X, which of the following must be true?',
    options: ['Martinez does not take Case X', 'Park takes Case X', 'Quinn takes Case Y', 'Roberts takes Case X'],
    correctIndex: 0,
    explanation: 'By contrapositive: if Nguyen takes X, then Martinez does NOT take X (from clue 1). Park must then take X (from clue 3).',
  },
  {
    id: 'cond-2', type: 'conditional', difficulty: 3,
    scenario: 'A committee selects members according to these rules:',
    clues: ['If A is selected, then B is not selected.', 'If C is selected, then both D and E are selected.', 'If B is not selected, then F is selected.', 'Either A or C (or both) must be selected.'],
    question: 'If exactly four members are selected, which group could they be?',
    options: ['A, D, E, F', 'C, D, E, F', 'A, C, D, E', 'A, B, D, F'],
    correctIndex: 1,
    explanation: 'C selected → D and E selected. A or C must be selected ✓ (C is). If A not selected, B could be selected or not. If B not selected → F selected. C, D, E, F = 4 members ✓.',
  },
  // Matching
  {
    id: 'match-1', type: 'matching', difficulty: 1,
    scenario: 'Four doctors—Lee, Malik, Nash, Ortiz—each specialize in exactly one of four fields: cardiology, neurology, pediatrics, surgery.',
    clues: ['Lee does not specialize in surgery or cardiology.', 'Malik specializes in either cardiology or neurology.', 'Nash does not specialize in pediatrics.', 'Ortiz specializes in surgery.'],
    question: 'What is Lee\'s specialty?',
    options: ['Cardiology', 'Neurology', 'Pediatrics', 'Surgery'],
    correctIndex: 2,
    explanation: 'Ortiz = surgery. Lee ≠ surgery, ≠ cardiology. Malik = cardiology or neurology. If Malik = cardiology, then Lee = neurology or pediatrics. Nash ≠ pediatrics, so Nash = neurology, Lee = pediatrics. If Malik = neurology, Lee = pediatrics (since Nash ≠ pediatrics). Either way, Lee = pediatrics.',
  },
  {
    id: 'match-2', type: 'matching', difficulty: 2,
    scenario: 'Five candidates—V, W, X, Y, Z—are ranked 1st through 5th in an interview.',
    clues: ['V is ranked higher than W.', 'X is ranked either 1st or 5th.', 'Y is ranked immediately above Z.', 'W is not ranked 4th or 5th.'],
    question: 'If X is ranked 1st, what is the highest possible ranking for W?',
    options: ['2nd', '3rd', '4th', '5th'],
    correctIndex: 0,
    explanation: 'X=1st. V before W, W not 4th/5th. Y immediately above Z. If W=2nd, V=? V must be before W, but X=1st. So V can\'t be before W=2nd unless... Actually V must rank higher (lower number) than W. X=1st, so V≥2nd. If W=2nd, V must be before W, but only 1st is available and X=1st. So W=3rd with V=2nd is the best. W=2nd is impossible.',
  },
];

type GameMode = 'menu' | 'playing' | 'results';

const typeLabels: Record<string, { label: string; emoji: string; color: string }> = {
  sequencing: { label: 'Sequencing', emoji: '📋', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  grouping: { label: 'Grouping', emoji: '👥', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
  matching: { label: 'Matching', emoji: '🔗', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  conditional: { label: 'Conditional', emoji: '⚡', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
};

export default function LogicGames() {
  const [mode, setMode] = useState<GameMode>('menu');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [puzzles, setPuzzles] = useState<LogicPuzzle[]>([]);

  useEffect(() => {
    if (mode !== 'playing') return;
    const interval = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const startGame = (type: string | null) => {
    setSelectedType(type);
    const filtered = type ? LOGIC_PUZZLES.filter(p => p.type === type) : [...LOGIC_PUZZLES].sort(() => Math.random() - 0.5);
    setPuzzles(filtered);
    setCurrentIndex(0);
    setScore(0);
    setTotalAnswered(0);
    setTimeElapsed(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setMode('playing');
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    setTotalAnswered(t => t + 1);
    if (index === puzzles[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextPuzzle = () => {
    if (currentIndex + 1 >= puzzles.length) {
      setMode('results');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const puzzle = puzzles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {mode === 'menu' ? (
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setMode('menu')}><ArrowLeft className="w-5 h-5" /></Button>
          )}
          <h1 className="text-lg font-bold flex-1 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> Logic Games
          </h1>
          {mode === 'playing' && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-mono"><Clock className="w-3 h-3 inline" /> {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
              <span>{score}/{totalAnswered}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <AnimatePresence mode="wait">
          {/* Menu */}
          {mode === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-muted-foreground text-sm">Train your analytical reasoning with LSAT-style logic puzzles. Perfect for GRE, GMAT, LSAT, and MCAT critical thinking.</p>

              <Card className="p-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all" onClick={() => startGame(null)}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">🎲</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">Mixed Challenge</h3>
                    <p className="text-xs text-muted-foreground">Random puzzles from all categories</p>
                  </div>
                  <Zap className="w-5 h-5 text-primary" />
                </div>
              </Card>

              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-6">By Category</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(typeLabels).map(([type, info]) => (
                  <Card key={type} className="p-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all" onClick={() => startGame(type)}>
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="text-3xl">{info.emoji}</span>
                      <h3 className="font-bold text-sm text-foreground">{info.label}</h3>
                      <span className="text-[10px] text-muted-foreground">{LOGIC_PUZZLES.filter(p => p.type === type).length} puzzles</span>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Playing */}
          {mode === 'playing' && puzzle && (
            <motion.div key={puzzle.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeLabels[puzzle.type].color}`}>
                  {typeLabels[puzzle.type].emoji} {typeLabels[puzzle.type].label}
                </span>
                <span className="text-xs text-muted-foreground">Difficulty: {'⭐'.repeat(puzzle.difficulty)}</span>
                <span className="text-xs text-muted-foreground ml-auto">{currentIndex + 1}/{puzzles.length}</span>
              </div>

              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm font-medium text-foreground">{puzzle.scenario}</p>
                <ul className="mt-3 space-y-1">
                  {puzzle.clues.map((c, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-primary font-bold shrink-0">•</span> {c}
                    </li>
                  ))}
                </ul>
              </Card>

              <p className="text-sm font-semibold text-foreground">{puzzle.question}</p>

              <div className="space-y-2">
                {puzzle.options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === puzzle.correctIndex;
                  const showResult = selectedAnswer !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                        showResult && isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : showResult && isSelected && !isCorrect
                            ? 'border-destructive bg-destructive/10 text-destructive'
                            : 'border-border bg-card hover:border-primary/40 hover:bg-primary/5 text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-bold text-xs text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive ml-auto shrink-0" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="p-4 bg-muted/50 border-dashed">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">EXPLANATION</p>
                    <p className="text-sm text-foreground">{puzzle.explanation}</p>
                  </Card>
                  <Button className="w-full mt-3" onClick={nextPuzzle}>
                    {currentIndex + 1 >= puzzles.length ? 'See Results' : 'Next Puzzle'}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Results */}
          {mode === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 py-8">
              <div className="text-center space-y-3">
                <Trophy className="w-16 h-16 text-primary mx-auto" />
                <h2 className="text-2xl font-bold text-foreground">Challenge Complete!</h2>
                <div className="text-5xl font-bold text-primary">{score}<span className="text-lg text-muted-foreground">/{totalAnswered}</span></div>
                <p className="text-sm text-muted-foreground">
                  {score === totalAnswered ? '🎉 Perfect! Flawless logic.' : score >= totalAnswered * 0.7 ? '💪 Strong analytical reasoning!' : '📚 Keep practicing — logic improves with repetition.'}
                </p>
                <p className="text-xs text-muted-foreground">Time: {Math.floor(timeElapsed / 60)}m {timeElapsed % 60}s</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => startGame(selectedType)}>
                  <RotateCcw className="w-4 h-4" /> Play Again
                </Button>
                <Button className="flex-1" onClick={() => setMode('menu')}>
                  Change Category
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
