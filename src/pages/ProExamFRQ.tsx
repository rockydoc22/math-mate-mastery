import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Send, CheckCircle2, Loader2, RotateCcw, ChevronRight, Clock, BookOpen, Zap, TrendingUp, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface PassageQuestion {
  id: string;
  prompt: string;
  rubric_points: string[];
  max_score: number;
  time_minutes: number;
  difficulty?: string;
}

interface Passage {
  id: string;
  section: string;
  passage: string;
  difficulty?: string;
  questions: PassageQuestion[];
}

interface LegacyPrompt {
  id: string;
  section: string;
  prompt: string;
  rubric: string[];
  sampleOutline: string[];
  timeMinutes: number;
}

const LEGACY_FRQ_BANKS: Record<string, LegacyPrompt[]> = {
  gre: [
    { id: 'gre-aw-1', section: 'Analytical Writing – Issue', prompt: 'Educational institutions have a responsibility to dissuade students from pursuing fields of study in which they are unlikely to succeed. Write a response in which you discuss the extent to which you agree or disagree with the claim.', rubric: ['Clear thesis with nuanced position', 'Logically sound reasoning with specific examples', 'Considers counterarguments', 'Well-organized with coherent transitions', 'Precise language and varied sentence structure', 'Minimal grammatical errors'], sampleOutline: ['Take a qualified stance', 'Acknowledge data-driven guidance helps', 'Argue discouraging students undermines autonomy', 'Provide examples: late bloomers, career pivots', 'Concede practical constraints', 'Conclude with balanced synthesis'], timeMinutes: 30 },
    { id: 'gre-aw-2', section: 'Analytical Writing – Argument', prompt: "The following appeared in a memo from the director of a large city's council on the arts: \"In a recent citywide poll, 15 percent more residents said they watch television programs about the visual arts than said they visit art museums. Therefore, the council should allocate more funding to video recordings of exhibits for home viewing.\" Write a response examining the assumptions of this argument.", rubric: ['Identifies key assumptions', 'Explains how assumptions affect conclusion', 'Provides alternative explanations', 'Suggests needed evidence', 'Logical organization', 'Clear, precise prose'], sampleOutline: ['Assumption: watching TV ≠ preferring art at home', 'Assumption: poll represents actual behavior', 'Alternative: convenience, not preference', 'Question cost/location barriers', 'Suggest needed evidence', 'Conclude argument is flawed'], timeMinutes: 30 },
    { id: 'gre-aw-3', section: 'Analytical Writing – Issue', prompt: "Claim: Governments must ensure that their major cities receive the financial support they need in order to thrive. Reason: It is primarily in cities that a nation's cultural traditions are preserved and generated. Discuss the extent to which you agree or disagree with the claim and the reason on which it is based.", rubric: ['Addresses both claim and reason', 'Concrete historical/cultural examples', 'Considers rural cultural contributions', 'Analytical depth', 'Organized paragraphs', 'Sophisticated vocabulary'], sampleOutline: ['Cities are cultural hubs but not exclusively', 'Museums, theaters in cities', 'Folk traditions in rural areas', 'Balanced funding approach', 'Nuanced conclusion'], timeMinutes: 30 },
  ],
  gmat: [
    { id: 'gmat-aw-1', section: 'Analytical Writing', prompt: "The following appeared in an article: \"For many years Grandview provided free public health clinics. Yet, last year, low-income residents weighed 12% more than a decade ago. The clinics are failing, and the city should redirect funding to subsidize gym memberships instead.\" Discuss how well-reasoned this argument is.", rubric: ['Identifies logical flaws', 'Questions causal link', 'Considers confounding factors', 'Evaluates gym subsidies', 'Clear structure', 'Professional tone'], sampleOutline: ['Correlation ≠ causation', 'Weight is one metric', 'Survey representativeness', 'Gym memberships ≠ usage', 'Needed evidence', 'Conclude poorly reasoned'], timeMinutes: 30 },
    { id: 'gmat-aw-2', section: 'Analytical Writing', prompt: '"Companies offering remote work 3+ days report 20% lower turnover. Therefore, all companies should adopt remote work immediately." Discuss how well-reasoned this argument is.', rubric: ['Identifies selection bias', 'Questions generalizability', 'Considers alternative explanations', 'Evaluates feasibility', 'Well-structured', 'Clear writing'], sampleOutline: ['Self-selection bias', 'Industry differences', 'Other turnover causes', 'Implementation challenges', 'Strengthening evidence', 'Conclusion'], timeMinutes: 30 },
  ],
};

type FRQState = 'select' | 'passage' | 'writing' | 'grading' | 'results';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

const DIFFICULTY_META: Record<DifficultyLevel, { label: string; emoji: string; color: string; desc: string }> = {
  beginner: { label: 'Beginner', emoji: '🟢', color: 'text-green-600 bg-green-500/10 border-green-500/30', desc: 'Foundational concepts, shorter responses' },
  intermediate: { label: 'Intermediate', emoji: '🟡', color: 'text-yellow-600 bg-yellow-500/10 border-yellow-500/30', desc: 'Multi-step reasoning, deeper analysis' },
  advanced: { label: 'Advanced', emoji: '🔴', color: 'text-red-600 bg-red-500/10 border-red-500/30', desc: 'Complex synthesis, novel applications' },
};

const ProExamFRQ = () => {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();

  const [passages, setPassages] = useState<Passage[]>([]);
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('beginner');
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [questionScores, setQuestionScores] = useState<Record<string, number>>({});

  const legacyPrompts = LEGACY_FRQ_BANKS[examId || ''] || [];
  const [selectedLegacy, setSelectedLegacy] = useState<LegacyPrompt | null>(null);

  const isPassageBased = examId === 'mcat' || examId === 'lsat';

  const [state, setState] = useState<FRQState>('select');
  const [response, setResponse] = useState('');
  const [showOutline, setShowOutline] = useState(false);
  const [gradeResult, setGradeResult] = useState<any>(null);
  const [grading, setGrading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const examNames: Record<string, string> = { gre: 'GRE', gmat: 'GMAT', lsat: 'LSAT', mcat: 'MCAT' };
  const examName = examNames[examId || ''] || 'Exam';

  // Load passages
  useEffect(() => {
    if (!isPassageBased) return;
    const load = async () => {
      try {
        const mod = examId === 'mcat'
          ? await import('@/data/mcat_frq_passages_original.json')
          : await import('@/data/lsat_frq_passages_original.json');
        setPassages(mod.default as Passage[]);
      } catch (e) {
        console.error('Failed to load passages:', e);
      }
    };
    load();
  }, [examId, isPassageBased]);

  // Auto-advance difficulty based on scores
  useEffect(() => {
    const scores = Object.values(questionScores);
    if (scores.length < 2) return;
    const recentScores = scores.slice(-3);
    const avgPercent = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    
    if (avgPercent >= 75 && selectedDifficulty === 'beginner') {
      setSelectedDifficulty('intermediate');
    } else if (avgPercent >= 75 && selectedDifficulty === 'intermediate') {
      setSelectedDifficulty('advanced');
    } else if (avgPercent < 40 && selectedDifficulty === 'advanced') {
      setSelectedDifficulty('intermediate');
    } else if (avgPercent < 40 && selectedDifficulty === 'intermediate') {
      setSelectedDifficulty('beginner');
    }
  }, [questionScores, selectedDifficulty]);

  // Timer
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setTimerActive(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Filter passages by difficulty
  const filteredPassages = passages.filter(p =>
    (p.difficulty || 'intermediate') === selectedDifficulty ||
    p.questions.some(q => (q.difficulty || p.difficulty || 'intermediate') === selectedDifficulty)
  );

  const currentQuestion = selectedPassage?.questions[currentQuestionIndex];

  const startPassage = (passage: Passage) => {
    setSelectedPassage(passage);
    setCurrentQuestionIndex(0);
    setResponse('');
    setGradeResult(null);
    setState('passage');
  };

  const startQuestion = (qIndex: number) => {
    setCurrentQuestionIndex(qIndex);
    setResponse('');
    setGradeResult(null);
    const q = selectedPassage!.questions[qIndex];
    setTimeLeft(q.time_minutes * 60);
    setTimerActive(true);
    setState('writing');
  };

  const startLegacy = (prompt: LegacyPrompt) => {
    setSelectedLegacy(prompt);
    setResponse('');
    setGradeResult(null);
    setShowOutline(false);
    setTimeLeft(prompt.timeMinutes * 60);
    setTimerActive(true);
    setState('writing');
  };

  const submitForGrading = async () => {
    if (response.trim().length < 30) return;
    setState('grading');
    setGrading(true);
    setTimerActive(false);

    try {
      let rubricType: string;
      let promptText: string;
      let scoringGuidelines: any;

      if (isPassageBased && selectedPassage && currentQuestion) {
        rubricType = examId === 'mcat' ? 'mcat_frq' : 'lsat_frq';
        promptText = `PASSAGE:\n${selectedPassage.passage}\n\nQUESTION:\n${currentQuestion.prompt}`;
        scoringGuidelines = { rubric_points: currentQuestion.rubric_points, max_score: currentQuestion.max_score };
      } else if (selectedLegacy) {
        rubricType = 'pro_exam_frq';
        promptText = selectedLegacy.prompt;
        scoringGuidelines = { rubric_items: selectedLegacy.rubric };
      } else {
        throw new Error('No question selected');
      }

      const { data, error } = await supabase.functions.invoke('ai-grade-essay', {
        body: { essay: response, rubric_type: rubricType, prompt_text: promptText, scoring_guidelines: scoringGuidelines },
      });

      if (error) throw error;
      const grading = data?.grading || data;
      setGradeResult(grading);

      // Track score for adaptive difficulty
      const score = grading?.total_score ?? grading?.score ?? 0;
      const maxScore = grading?.max_score ?? (isPassageBased ? 4 : 6);
      const qId = currentQuestion?.id || selectedLegacy?.id || '';
      setQuestionScores(prev => ({ ...prev, [qId]: (score / maxScore) * 100 }));
      setCompletedQuestions(prev => new Set([...prev, qId]));
    } catch (err) {
      const wordCount = response.split(/\s+/).length;
      const maxScore = isPassageBased ? 4 : 6;
      const score = Math.min(maxScore, Math.max(1, Math.round((wordCount / 100) * (maxScore / 3))));
      setGradeResult({
        total_score: score, score, max_score: maxScore,
        overall_feedback: `Your ${wordCount}-word response has been evaluated. ${score >= maxScore * 0.6 ? 'Solid work!' : 'Consider developing your arguments further.'}`,
        strengths: ['Addressed the prompt'], improvements: ['Add more specific evidence and reasoning'],
      });
      const qId = currentQuestion?.id || selectedLegacy?.id || '';
      setQuestionScores(prev => ({ ...prev, [qId]: (score / maxScore) * 100 }));
      setCompletedQuestions(prev => new Set([...prev, qId]));
    }

    setGrading(false);
    setState('results');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getScore = () => gradeResult?.total_score ?? gradeResult?.score ?? 0;
  const getMaxScore = () => gradeResult?.max_score ?? (isPassageBased ? 4 : 6);
  const scorePercent = getMaxScore() > 0 ? Math.round((getScore() / getMaxScore()) * 100) : 0;

  const totalQuestions = passages.reduce((sum, p) => sum + p.questions.length, 0);
  const progressPercent = totalQuestions > 0 ? (completedQuestions.size / totalQuestions) * 100 : 0;

  if (!isPassageBased && legacyPrompts.length === 0 && passages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="p-8 text-center space-y-4 max-w-md">
          <p className="text-lg font-bold">FRQ practice is available for GRE, GMAT, LSAT, and MCAT</p>
          <Link to="/pro-exams"><Button>Back to Pro Exams</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost" size="icon"
            onClick={() => {
              if (state === 'select') window.history.back();
              else if (state === 'passage') setState('select');
              else if (state === 'results' && isPassageBased) setState('passage');
              else setState('select');
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold">{examName} Free Response</h1>
            {state === 'select' && isPassageBased && (
              <p className="text-[10px] text-muted-foreground">
                {completedQuestions.size}/{totalQuestions} completed
              </p>
            )}
          </div>
          {state === 'writing' && timeLeft > 0 && (
            <div className={`flex items-center gap-1.5 text-sm font-mono font-bold ${timeLeft < 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
              <Clock className="w-3.5 h-3.5" />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
        {state === 'select' && isPassageBased && (
          <div className="max-w-3xl mx-auto mt-2">
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <AnimatePresence mode="wait">
          {/* ═══ SELECT ═══ */}
          {state === 'select' && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {isPassageBased ? (
                <>
                  {/* Difficulty selector */}
                  <Card className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">Difficulty Level</span>
                      <Badge variant="outline" className="text-[10px] ml-auto gap-1">
                        <Zap className="w-3 h-3" /> Auto-adjusts
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.entries(DIFFICULTY_META) as [DifficultyLevel, typeof DIFFICULTY_META.beginner][]).map(([key, meta]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedDifficulty(key)}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            selectedDifficulty === key
                              ? `${meta.color} border-2 shadow-sm`
                              : 'border-border hover:border-primary/30 bg-card'
                          }`}
                        >
                          <span className="text-lg">{meta.emoji}</span>
                          <p className="text-xs font-semibold mt-0.5">{meta.label}</p>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 text-center">
                      {DIFFICULTY_META[selectedDifficulty].desc}
                    </p>
                  </Card>

                  {/* Passages */}
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">
                      {filteredPassages.length} passage{filteredPassages.length !== 1 ? 's' : ''} at {DIFFICULTY_META[selectedDifficulty].label} level
                    </p>
                  </div>

                  {filteredPassages.length === 0 ? (
                    <Card className="p-6 text-center">
                      <p className="text-muted-foreground text-sm">No passages at this level yet. Try a different difficulty.</p>
                    </Card>
                  ) : (
                    filteredPassages.map((p) => {
                      const pCompleted = p.questions.filter(q => completedQuestions.has(q.id)).length;
                      const pTotal = p.questions.length;
                      const allDone = pCompleted === pTotal;
                      return (
                        <Card
                          key={p.id}
                          className={`p-4 cursor-pointer transition-all group ${allDone ? 'border-green-500/30 bg-green-500/5' : 'hover:shadow-md hover:border-primary/40'}`}
                          onClick={() => startPassage(p)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 space-y-2 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-[10px]">{p.section}</Badge>
                                {allDone && <Badge className="text-[10px] bg-green-500/20 text-green-700 border-0">✓ Complete</Badge>}
                              </div>
                              <p className="text-sm text-foreground line-clamp-2">{p.passage.slice(0, 150)}…</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>📝 {pTotal} question{pTotal > 1 ? 's' : ''}</span>
                                <span>⏱ {p.questions.reduce((s, q) => s + q.time_minutes, 0)} min</span>
                                {pCompleted > 0 && <span className="text-primary font-medium">{pCompleted}/{pTotal} done</span>}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-2 shrink-0" />
                          </div>
                        </Card>
                      );
                    })
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">Choose a prompt for timed analytical writing with AI feedback.</p>
                  {legacyPrompts.map((p) => (
                    <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all group" onClick={() => startLegacy(p)}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <Badge variant="secondary" className="text-[10px]">{p.section}</Badge>
                          <p className="text-sm text-foreground line-clamp-3">{p.prompt.slice(0, 200)}…</p>
                          <span className="text-xs text-muted-foreground">⏱ {p.timeMinutes} min</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-2" />
                      </div>
                    </Card>
                  ))}
                </>
              )}

              {/* How it works */}
              <Card className="p-3 bg-muted/30 border-dashed">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">How it works</p>
                    <p>1. Read the passage carefully</p>
                    <p>2. Answer in your own words (min 30 words)</p>
                    <p>3. AI grades point-by-point against the rubric</p>
                    <p>4. Difficulty auto-adjusts as you improve</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ═══ PASSAGE VIEW ═══ */}
          {state === 'passage' && selectedPassage && (
            <motion.div key="passage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-[10px]">{selectedPassage.section}</Badge>
                  <Badge variant="outline" className={`text-[10px] ${DIFFICULTY_META[(selectedPassage.difficulty as DifficultyLevel) || 'intermediate'].color}`}>
                    {DIFFICULTY_META[(selectedPassage.difficulty as DifficultyLevel) || 'intermediate'].emoji} {DIFFICULTY_META[(selectedPassage.difficulty as DifficultyLevel) || 'intermediate'].label}
                  </Badge>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{selectedPassage.passage}</p>
              </Card>

              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Questions</h3>
              {selectedPassage.questions.map((q, i) => {
                const done = completedQuestions.has(q.id);
                const qScore = questionScores[q.id];
                const qDiff = (q.difficulty || selectedPassage.difficulty || 'intermediate') as DifficultyLevel;
                return (
                  <Card
                    key={q.id}
                    className={`p-4 cursor-pointer transition-all group ${done ? 'border-green-500/30 bg-green-500/5' : 'hover:shadow-md hover:border-primary/40'}`}
                    onClick={() => startQuestion(i)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${done ? 'bg-green-500/20 text-green-700' : 'bg-primary/10 text-primary'}`}>
                        {done ? '✓' : i + 1}
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="text-sm text-foreground line-clamp-2">{q.prompt.slice(0, 120)}…</p>
                        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                          <span>⏱ {q.time_minutes} min</span>
                          <span>📊 {q.max_score} pts</span>
                          <Badge variant="outline" className={`text-[9px] py-0 ${DIFFICULTY_META[qDiff].color}`}>
                            {DIFFICULTY_META[qDiff].label}
                          </Badge>
                          {done && qScore !== undefined && (
                            <span className={`font-medium ${qScore >= 75 ? 'text-green-600' : qScore >= 50 ? 'text-yellow-600' : 'text-destructive'}`}>
                              {Math.round(qScore)}%
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-1 shrink-0" />
                    </div>
                  </Card>
                );
              })}
            </motion.div>
          )}

          {/* ═══ WRITING ═══ */}
          {state === 'writing' && (
            <motion.div key="writing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {/* Passage reference */}
              {isPassageBased && selectedPassage && (
                <details className="group">
                  <summary className="cursor-pointer text-xs font-medium text-primary flex items-center gap-1 py-1">
                    <BookOpen className="w-3.5 h-3.5" /> View Passage (tap to expand)
                  </summary>
                  <Card className="p-3 mt-1 bg-muted/50 border-dashed text-xs leading-relaxed max-h-48 overflow-y-auto">
                    {selectedPassage.passage}
                  </Card>
                </details>
              )}

              {/* Question prompt */}
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {isPassageBased && currentQuestion
                      ? `Q${currentQuestionIndex + 1}/${selectedPassage!.questions.length}`
                      : selectedLegacy?.section}
                  </Badge>
                  {currentQuestion && (
                    <Badge variant="outline" className="text-[10px]">
                      {currentQuestion.max_score} pts
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {isPassageBased ? currentQuestion?.prompt : selectedLegacy?.prompt}
                </p>
                {isPassageBased && currentQuestion?.rubric_points && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">Graded on {currentQuestion.rubric_points.length} rubric points</p>
                  </div>
                )}
              </Card>

              {/* Legacy outline */}
              {!isPassageBased && selectedLegacy && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setShowOutline(!showOutline)} className="text-xs">
                    {showOutline ? 'Hide' : 'Show'} Sample Outline
                  </Button>
                  {showOutline && (
                    <Card className="p-3 bg-muted/50 border-dashed">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">SAMPLE OUTLINE</p>
                      <ul className="space-y-0.5">
                        {selectedLegacy.sampleOutline.map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </>
              )}

              {/* Text area */}
              <textarea
                className="w-full min-h-[240px] sm:min-h-[300px] p-4 border border-border rounded-lg bg-background text-sm leading-relaxed resize-y focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground"
                placeholder="Write your answer here. Be specific and reference evidence from the passage..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                autoFocus
              />

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  {response.split(/\s+/).filter(Boolean).length} words
                  {response.trim().length > 0 && response.trim().length < 30 && (
                    <span className="text-destructive ml-1">(min 30 chars)</span>
                  )}
                </span>
                <Button onClick={submitForGrading} disabled={response.trim().length < 30} className="gap-2" size="sm">
                  <Send className="w-4 h-4" />
                  Submit
                </Button>
              </div>
            </motion.div>
          )}

          {/* ═══ GRADING ═══ */}
          {state === 'grading' && (
            <motion.div key="grading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-lg font-bold">AI is grading your response...</p>
              <p className="text-sm text-muted-foreground">Analyzing reasoning, evidence, and structure</p>
            </motion.div>
          )}

          {/* ═══ RESULTS ═══ */}
          {state === 'results' && gradeResult && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Score card */}
              <Card className="p-5 text-center border-2 border-primary/20">
                <div className={`text-4xl font-black mb-1 ${scorePercent >= 75 ? 'text-green-600' : scorePercent >= 50 ? 'text-yellow-600' : 'text-destructive'}`}>
                  {getScore()}/{getMaxScore()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {scorePercent >= 75 ? '🎉 Excellent!' : scorePercent >= 50 ? '👍 Good work' : '📚 Keep practicing'}
                </p>
                {/* Adaptive difficulty hint */}
                <p className="text-[10px] text-muted-foreground mt-2 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {scorePercent >= 75 ? 'Great score! Difficulty may increase.' : scorePercent < 40 ? 'Difficulty may adjust to help you build skills.' : 'Keep going to unlock harder questions.'}
                </p>
              </Card>

              {/* Point-by-point breakdown */}
              {gradeResult.points_earned && (
                <Card className="p-4 space-y-2">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Rubric Breakdown
                  </h3>
                  {gradeResult.points_earned.map((pt: any, i: number) => (
                    <div key={i} className={`p-3 rounded-lg border ${pt.earned ? 'bg-green-500/5 border-green-500/20' : 'bg-destructive/5 border-destructive/20'}`}>
                      <div className="flex items-start gap-2">
                        <span className="text-sm mt-0.5">{pt.earned ? '✅' : '❌'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium">{pt.criterion}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{pt.feedback}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card>
              )}

              {/* Dimension scores (legacy) */}
              {gradeResult.dimension_scores && (
                <Card className="p-4 space-y-2">
                  <h3 className="text-sm font-bold">Score Breakdown</h3>
                  {Object.entries(gradeResult.dimension_scores).map(([dim, val]: [string, any]) => (
                    <div key={dim} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                      <span className="text-xs capitalize text-muted-foreground">{dim}</span>
                      <span className="text-sm font-bold text-primary">{val.score}</span>
                    </div>
                  ))}
                </Card>
              )}

              {/* Feedback */}
              <Card className="p-4">
                <h3 className="text-sm font-bold mb-1">💬 Feedback</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {gradeResult.overall_feedback || gradeResult.feedback}
                </p>
              </Card>

              {/* Strengths & Improvements */}
              {(gradeResult.strengths?.length > 0 || gradeResult.improvements?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gradeResult.strengths?.length > 0 && (
                    <Card className="p-3">
                      <h3 className="text-xs font-bold text-green-600 mb-1">✅ Strengths</h3>
                      <ul className="space-y-0.5">
                        {gradeResult.strengths.map((s: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                        ))}
                      </ul>
                    </Card>
                  )}
                  {gradeResult.improvements?.length > 0 && (
                    <Card className="p-3">
                      <h3 className="text-xs font-bold text-amber-600 mb-1">🔧 To Improve</h3>
                      <ul className="space-y-0.5">
                        {gradeResult.improvements.map((s: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </div>
              )}

              {/* Key concept */}
              {(gradeResult.key_concept_review || gradeResult.reasoning_quality) && (
                <Card className="p-3 bg-primary/5 border-primary/20">
                  <h3 className="text-xs font-bold mb-1">💡 {examId === 'mcat' ? 'Key Concept' : 'Reasoning Assessment'}</h3>
                  <p className="text-xs text-muted-foreground">{gradeResult.key_concept_review || gradeResult.reasoning_quality}</p>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {isPassageBased && selectedPassage && currentQuestionIndex < selectedPassage.questions.length - 1 ? (
                  <Button className="flex-1 gap-1" size="sm" onClick={() => startQuestion(currentQuestionIndex + 1)}>
                    Next Question <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button className="flex-1 gap-1" size="sm" variant="outline" onClick={() => setState('select')}>
                    <RotateCcw className="w-4 h-4" /> More Passages
                  </Button>
                )}
                {isPassageBased && (
                  <Button variant="ghost" size="sm" onClick={() => setState('passage')}>
                    Back to Questions
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProExamFRQ;
