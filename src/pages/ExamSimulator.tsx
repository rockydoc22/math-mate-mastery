import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Play, Pause, SkipForward, CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

interface ExamSection {
  name: string;
  questionCount: number;
  timeMinutes: number;
  subject: 'math' | 'english' | 'verbal' | 'quantitative' | 'reading' | 'science';
}

interface ExamBlueprint {
  id: string;
  name: string;
  icon: string;
  totalTime: number;
  sections: ExamSection[];
  breakAfterSection?: number[];
  breakMinutes: number;
}

const EXAM_BLUEPRINTS: ExamBlueprint[] = [
  {
    id: 'sat-full', name: 'SAT Full-Length', icon: '📝', totalTime: 134,
    sections: [
      { name: 'Reading & Writing Module 1', questionCount: 27, timeMinutes: 32, subject: 'english' },
      { name: 'Reading & Writing Module 2', questionCount: 27, timeMinutes: 32, subject: 'english' },
      { name: 'Math Module 1', questionCount: 22, timeMinutes: 35, subject: 'math' },
      { name: 'Math Module 2', questionCount: 22, timeMinutes: 35, subject: 'math' },
    ],
    breakAfterSection: [1], breakMinutes: 10,
  },
  {
    id: 'act-full', name: 'ACT Full-Length', icon: '🅰️', totalTime: 175,
    sections: [
      { name: 'English', questionCount: 75, timeMinutes: 45, subject: 'english' },
      { name: 'Mathematics', questionCount: 60, timeMinutes: 60, subject: 'math' },
      { name: 'Reading', questionCount: 40, timeMinutes: 35, subject: 'reading' },
      { name: 'Science', questionCount: 40, timeMinutes: 35, subject: 'science' },
    ],
    breakAfterSection: [1], breakMinutes: 10,
  },
  {
    id: 'gre-full', name: 'GRE General', icon: '🎓', totalTime: 114,
    sections: [
      { name: 'Analytical Writing', questionCount: 2, timeMinutes: 30, subject: 'english' },
      { name: 'Verbal Section 1', questionCount: 12, timeMinutes: 18, subject: 'verbal' },
      { name: 'Verbal Section 2', questionCount: 15, timeMinutes: 23, subject: 'verbal' },
      { name: 'Quantitative Section 1', questionCount: 12, timeMinutes: 21, subject: 'quantitative' },
      { name: 'Quantitative Section 2', questionCount: 15, timeMinutes: 26, subject: 'quantitative' },
    ],
    breakAfterSection: [0, 2], breakMinutes: 1,
  },
  {
    id: 'lsat-full', name: 'LSAT', icon: '⚖️', totalTime: 105,
    sections: [
      { name: 'Logical Reasoning', questionCount: 26, timeMinutes: 35, subject: 'reading' },
      { name: 'Analytical Reasoning', questionCount: 23, timeMinutes: 35, subject: 'reading' },
      { name: 'Reading Comprehension', questionCount: 27, timeMinutes: 35, subject: 'reading' },
    ],
    breakAfterSection: [1], breakMinutes: 15,
  },
];

// Simple question generator for simulation
function generateQuestion(subject: string, index: number) {
  const mathQs = [
    { q: `If 3x + 7 = 22, what is the value of x?`, options: ['3', '4', '5', '6'], correct: 2 },
    { q: `What is the slope of the line 2y = 6x - 4?`, options: ['2', '3', '6', '-4'], correct: 1 },
    { q: `If f(x) = x² - 4x + 3, what is f(5)?`, options: ['4', '6', '8', '10'], correct: 2 },
    { q: `A circle has a radius of 5. What is its area?`, options: ['25π', '10π', '50π', '15π'], correct: 0 },
    { q: `What is 15% of 240?`, options: ['30', '36', '42', '48'], correct: 1 },
  ];
  const engQs = [
    { q: `Which word best replaces "ubiquitous" in the sentence?`, options: ['rare', 'widespread', 'fleeting', 'ancient'], correct: 1 },
    { q: `The passage primarily serves to:`, options: ['argue', 'describe', 'refute', 'summarize'], correct: 1 },
    { q: `Which choice best maintains the sentence pattern?`, options: ['However,', 'Therefore,', 'Meanwhile,', 'Similarly,'], correct: 0 },
    { q: `The author's tone is best described as:`, options: ['hostile', 'analytical', 'nostalgic', 'indifferent'], correct: 1 },
    { q: `Which revision best clarifies the underlined portion?`, options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 2 },
  ];
  const pool = subject === 'math' || subject === 'quantitative' ? mathQs : engQs;
  return pool[index % pool.length];
}

type Phase = 'select' | 'countdown' | 'testing' | 'break' | 'results';

const ExamSimulator = () => {
  const [phase, setPhase] = useState<Phase>('select');
  const [blueprint, setBlueprint] = useState<ExamBlueprint | null>(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sectionResults, setSectionResults] = useState<{ name: string; correct: number; total: number; timeUsed: number }[]>([]);
  const [sectionStartTime, setSectionStartTime] = useState(0);
  const [countdownVal, setCountdownVal] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSection = blueprint?.sections[sectionIndex];
  const currentQ = currentSection ? generateQuestion(currentSection.subject, questionIndex) : null;
  const qKey = `${sectionIndex}-${questionIndex}`;

  // Countdown
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdownVal <= 0) {
      setPhase('testing');
      setTimeLeft((currentSection?.timeMinutes ?? 0) * 60);
      setSectionStartTime(Date.now());
      return;
    }
    const t = setTimeout(() => setCountdownVal(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdownVal, currentSection]);

  // Timer
  useEffect(() => {
    if (phase !== 'testing' || isPaused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishSection();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, isPaused, sectionIndex]);

  const finishSection = useCallback(() => {
    if (!currentSection || !blueprint) return;
    const timeUsed = Math.round((Date.now() - sectionStartTime) / 1000);
    let correct = 0;
    for (let i = 0; i < currentSection.questionCount; i++) {
      const q = generateQuestion(currentSection.subject, i);
      if (answers[`${sectionIndex}-${i}`] === q.correct) correct++;
    }
    setSectionResults(prev => [...prev, { name: currentSection.name, correct, total: currentSection.questionCount, timeUsed }]);
    
    const nextIdx = sectionIndex + 1;
    if (nextIdx >= blueprint.sections.length) {
      setPhase('results');
    } else if (blueprint.breakAfterSection?.includes(sectionIndex)) {
      setPhase('break');
      setTimeLeft(blueprint.breakMinutes * 60);
    } else {
      setSectionIndex(nextIdx);
      setQuestionIndex(0);
      setCountdownVal(3);
      setPhase('countdown');
    }
  }, [currentSection, blueprint, sectionIndex, answers, sectionStartTime]);

  // Break timer
  useEffect(() => {
    if (phase !== 'break') return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const startExam = (bp: ExamBlueprint) => {
    setBlueprint(bp);
    setSectionIndex(0);
    setQuestionIndex(0);
    setAnswers({});
    setSectionResults([]);
    setCountdownVal(3);
    setPhase('countdown');
  };

  const selectAnswer = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qKey]: optIdx }));
  };

  const nextQuestion = () => {
    if (!currentSection) return;
    if (questionIndex + 1 >= currentSection.questionCount) {
      finishSection();
    } else {
      setQuestionIndex(qi => qi + 1);
    }
  };

  const skipBreak = () => {
    const nextIdx = sectionIndex + 1;
    setSectionIndex(nextIdx);
    setQuestionIndex(0);
    setCountdownVal(3);
    setPhase('countdown');
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const totalCorrect = sectionResults.reduce((a, r) => a + r.correct, 0);
  const totalQ = sectionResults.reduce((a, r) => a + r.total, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">🎯 Exam Simulator</h1>
        </div>

        {phase === 'select' && (
          <div className="space-y-4">
            <p className="text-muted-foreground">Choose a full-length timed exam to simulate real test-day conditions.</p>
            {EXAM_BLUEPRINTS.map(bp => (
              <Card key={bp.id} className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => startExam(bp)}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{bp.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{bp.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {bp.sections.length} sections · {bp.totalTime} min · {bp.sections.reduce((a, s) => a + s.questionCount, 0)} questions
                    </p>
                  </div>
                  <Play className="w-5 h-5 text-primary" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {phase === 'countdown' && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground mb-2">{currentSection?.name}</p>
            <motion.div key={countdownVal} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-7xl font-black text-primary">
              {countdownVal > 0 ? countdownVal : 'GO!'}
            </motion.div>
          </div>
        )}

        {phase === 'testing' && currentSection && currentQ && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{currentSection.name}</Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Badge className={`font-mono ${timeLeft < 60 ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}>
                  <Clock className="w-3 h-3 mr-1" /> {fmt(timeLeft)}
                </Badge>
              </div>
            </div>

            <Progress value={((questionIndex + 1) / currentSection.questionCount) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">Q {questionIndex + 1} / {currentSection.questionCount}</p>

            {isPaused ? (
              <Card className="p-8 text-center">
                <Pause className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold">Exam Paused</p>
                <p className="text-sm text-muted-foreground">Timer is stopped. Click play to resume.</p>
              </Card>
            ) : (
              <Card className="p-6 space-y-4">
                <p className="font-medium">{currentQ.q}</p>
                <div className="space-y-2">
                  {currentQ.options.map((opt, i) => (
                    <button key={i} onClick={() => selectAnswer(i)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${answers[qKey] === i ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-border hover:border-primary/50'}`}
                    >
                      <span className="font-mono mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={nextQuestion} disabled={answers[qKey] === undefined}>
                    {questionIndex + 1 >= currentSection.questionCount ? 'Finish Section' : 'Next'} <SkipForward className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {phase === 'break' && (
          <Card className="p-8 text-center space-y-4">
            <div className="text-5xl">☕</div>
            <h2 className="text-2xl font-bold">Break Time</h2>
            <p className="text-muted-foreground">Take a moment to stretch and rest your eyes.</p>
            <p className="text-3xl font-mono font-bold text-primary">{fmt(timeLeft)}</p>
            <Button onClick={skipBreak}>Skip Break & Continue <SkipForward className="w-4 h-4 ml-1" /></Button>
          </Card>
        )}

        {phase === 'results' && blueprint && (
          <div className="space-y-4">
            <Card className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold">Exam Complete!</h2>
              <p className="text-4xl font-black text-primary">{totalCorrect}/{totalQ}</p>
              <p className="text-muted-foreground">{Math.round((totalCorrect / totalQ) * 100)}% overall accuracy</p>
            </Card>

            <h3 className="font-bold text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Section Breakdown</h3>
            {sectionResults.map((r, i) => {
              const pct = Math.round((r.correct / r.total) * 100);
              return (
                <Card key={i} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{r.name}</span>
                    <Badge variant={pct >= 70 ? 'default' : 'destructive'}>{pct}%</Badge>
                  </div>
                  <Progress value={pct} className="h-2 mb-1" />
                  <p className="text-xs text-muted-foreground">{r.correct}/{r.total} correct · {fmt(r.timeUsed)} used</p>
                </Card>
              );
            })}

            <Button className="w-full" onClick={() => setPhase('select')}>Try Another Exam</Button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ExamSimulator;
