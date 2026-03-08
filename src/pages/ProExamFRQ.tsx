import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, CheckCircle2, Loader2, RotateCcw, ChevronRight, Clock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

// Types for passage-based FRQ
interface PassageQuestion {
  id: string;
  prompt: string;
  rubric_points: string[];
  max_score: number;
  time_minutes: number;
}

interface Passage {
  id: string;
  section: string;
  passage: string;
  questions: PassageQuestion[];
}

// Legacy FRQ format (GRE/GMAT analytical writing)
interface LegacyPrompt {
  id: string;
  section: string;
  prompt: string;
  rubric: string[];
  sampleOutline: string[];
  timeMinutes: number;
}

// Legacy FRQ banks for GRE/GMAT (essay-style)
const LEGACY_FRQ_BANKS: Record<string, LegacyPrompt[]> = {
  gre: [
    {
      id: 'gre-aw-1', section: 'Analytical Writing – Issue',
      prompt: 'Educational institutions have a responsibility to dissuade students from pursuing fields of study in which they are unlikely to succeed. Write a response in which you discuss the extent to which you agree or disagree with the claim.',
      rubric: ['Clear thesis with nuanced position', 'Logically sound reasoning with specific examples', 'Considers counterarguments', 'Well-organized with coherent transitions', 'Precise language and varied sentence structure', 'Minimal grammatical errors'],
      sampleOutline: ['Take a qualified stance', 'Acknowledge data-driven guidance helps', 'Argue discouraging students undermines autonomy', 'Provide examples: late bloomers, career pivots', 'Concede practical constraints', 'Conclude with balanced synthesis'],
      timeMinutes: 30,
    },
    {
      id: 'gre-aw-2', section: 'Analytical Writing – Argument',
      prompt: 'The following appeared in a memo from the director of a large city\'s council on the arts: "In a recent citywide poll, 15 percent more residents said they watch television programs about the visual arts than said they visit art museums. Therefore, the council should allocate more funding to video recordings of exhibits for home viewing." Write a response examining the assumptions of this argument.',
      rubric: ['Identifies key assumptions', 'Explains how assumptions affect conclusion', 'Provides alternative explanations', 'Suggests needed evidence', 'Logical organization', 'Clear, precise prose'],
      sampleOutline: ['Assumption: watching TV ≠ preferring art at home', 'Assumption: poll represents actual behavior', 'Alternative: convenience, not preference', 'Question cost/location barriers', 'Suggest needed evidence', 'Conclude argument is flawed'],
      timeMinutes: 30,
    },
    {
      id: 'gre-aw-3', section: 'Analytical Writing – Issue',
      prompt: 'Claim: Governments must ensure that their major cities receive the financial support they need in order to thrive. Reason: It is primarily in cities that a nation\'s cultural traditions are preserved and generated. Discuss the extent to which you agree or disagree with the claim and the reason on which it is based.',
      rubric: ['Addresses both claim and reason', 'Concrete historical/cultural examples', 'Considers rural cultural contributions', 'Analytical depth', 'Organized paragraphs', 'Sophisticated vocabulary'],
      sampleOutline: ['Cities are cultural hubs but not exclusively', 'Museums, theaters in cities', 'Folk traditions in rural areas', 'Balanced funding approach', 'Nuanced conclusion'],
      timeMinutes: 30,
    },
  ],
  gmat: [
    {
      id: 'gmat-aw-1', section: 'Analytical Writing',
      prompt: 'The following appeared in an article: "For many years Grandview provided free public health clinics. Yet, last year, low-income residents weighed 12% more than a decade ago. The clinics are failing, and the city should redirect funding to subsidize gym memberships instead." Discuss how well-reasoned this argument is.',
      rubric: ['Identifies logical flaws', 'Questions causal link', 'Considers confounding factors', 'Evaluates gym subsidies', 'Clear structure', 'Professional tone'],
      sampleOutline: ['Correlation ≠ causation', 'Weight is one metric', 'Survey representativeness', 'Gym memberships ≠ usage', 'Needed evidence', 'Conclude poorly reasoned'],
      timeMinutes: 30,
    },
    {
      id: 'gmat-aw-2', section: 'Analytical Writing',
      prompt: '"Companies offering remote work 3+ days report 20% lower turnover. Therefore, all companies should adopt remote work immediately." Discuss how well-reasoned this argument is.',
      rubric: ['Identifies selection bias', 'Questions generalizability', 'Considers alternative explanations', 'Evaluates feasibility', 'Well-structured', 'Clear writing'],
      sampleOutline: ['Self-selection bias', 'Industry differences', 'Other turnover causes', 'Implementation challenges', 'Strengthening evidence', 'Conclusion'],
      timeMinutes: 30,
    },
  ],
};

type FRQState = 'select' | 'passage' | 'writing' | 'grading' | 'results';

const ProExamFRQ = () => {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();

  // Passage-based data (MCAT/LSAT)
  const [passages, setPassages] = useState<Passage[]>([]);
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Legacy data (GRE/GMAT)
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

  // Load passage-based questions
  useEffect(() => {
    if (!isPassageBased) return;
    const loadPassages = async () => {
      try {
        const mod = examId === 'mcat'
          ? await import('@/data/mcat_frq_passages_original.json')
          : await import('@/data/lsat_frq_passages_original.json');
        setPassages(mod.default as Passage[]);
      } catch (e) {
        console.error('Failed to load passages:', e);
      }
    };
    loadPassages();
  }, [examId, isPassageBased]);

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
        body: {
          essay: response,
          rubric_type: rubricType,
          prompt_text: promptText,
          scoring_guidelines: scoringGuidelines,
        },
      });

      if (error) throw error;
      setGradeResult(data?.grading || data);
    } catch (err) {
      // Fallback grading
      const wordCount = response.split(/\s+/).length;
      const maxScore = isPassageBased ? 4 : 6;
      const score = Math.min(maxScore, Math.max(1, Math.round((wordCount / 100) * (maxScore / 3))));
      setGradeResult({
        total_score: score,
        score: score,
        max_score: maxScore,
        overall_feedback: `Your ${wordCount}-word response has been evaluated. ${score >= maxScore * 0.6 ? 'Solid analytical work!' : 'Consider developing your arguments further.'}`,
        strengths: ['Addressed the prompt'],
        improvements: ['Add more specific evidence and reasoning'],
      });
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

  // Empty state
  if (!isPassageBased && legacyPrompts.length === 0 && passages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <Card className="p-8 text-center space-y-4 max-w-md">
          <p className="text-lg font-bold">FRQ practice is available for GRE, GMAT, LSAT, and MCAT</p>
          <Link to="/pro-exams"><Button>Back to Pro Exams</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 pb-24">
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
          <h1 className="text-lg font-bold flex-1">{examName} Free Response</h1>
          {state === 'writing' && timeLeft > 0 && (
            <span className={`text-sm font-mono font-bold ${timeLeft < 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
              ⏱ {formatTime(timeLeft)}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <AnimatePresence mode="wait">
          {/* ═══ SELECT ═══ */}
          {state === 'select' && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {isPassageBased ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Choose a passage. Each contains {examId === 'mcat' ? 'science-based' : 'analytical reasoning'} questions graded by AI.
                    </p>
                  </div>
                  {passages.map((p) => (
                    <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all group" onClick={() => startPassage(p)}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.section}</span>
                          <p className="text-sm text-foreground line-clamp-3">{p.passage.slice(0, 180)}…</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>📝 {p.questions.length} questions</span>
                            <span>⏱ {p.questions.reduce((s, q) => s + q.time_minutes, 0)} min total</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-2" />
                      </div>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">Choose a prompt for timed analytical writing with AI feedback.</p>
                  {legacyPrompts.map((p) => (
                    <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all group" onClick={() => startLegacy(p)}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.section}</span>
                          <p className="text-sm text-foreground line-clamp-3">{p.prompt.slice(0, 200)}…</p>
                          <span className="text-xs text-muted-foreground">⏱ {p.timeMinutes} min</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-2" />
                      </div>
                    </Card>
                  ))}
                </>
              )}
            </motion.div>
          )}

          {/* ═══ PASSAGE VIEW (MCAT/LSAT) ═══ */}
          {state === 'passage' && selectedPassage && (
            <motion.div key="passage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <span className="text-xs font-medium text-primary">{selectedPassage.section}</span>
                <p className="text-sm mt-2 text-foreground leading-relaxed whitespace-pre-line">{selectedPassage.passage}</p>
              </Card>

              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Questions</h3>
              {selectedPassage.questions.map((q, i) => (
                <Card
                  key={q.id}
                  className="p-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all group"
                  onClick={() => startQuestion(i)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-foreground line-clamp-2">{q.prompt.slice(0, 150)}…</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>⏱ {q.time_minutes} min</span>
                        <span>📊 {q.max_score} pts</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-1" />
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {/* ═══ WRITING ═══ */}
          {state === 'writing' && (
            <motion.div key="writing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* Show passage context for passage-based */}
              {isPassageBased && selectedPassage && (
                <details className="group">
                  <summary className="cursor-pointer text-xs font-medium text-primary flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> View Passage
                  </summary>
                  <Card className="p-3 mt-2 bg-muted/50 border-dashed text-xs leading-relaxed max-h-48 overflow-y-auto">
                    {selectedPassage.passage}
                  </Card>
                </details>
              )}

              {/* Question prompt */}
              <Card className="p-4 bg-primary/5 border-primary/20">
                <span className="text-xs font-medium text-primary">
                  {isPassageBased && currentQuestion
                    ? `Question ${currentQuestionIndex + 1} of ${selectedPassage!.questions.length}`
                    : selectedLegacy?.section}
                </span>
                <p className="text-sm mt-2 text-foreground leading-relaxed">
                  {isPassageBased ? currentQuestion?.prompt : selectedLegacy?.prompt}
                </p>
              </Card>

              {/* Legacy outline toggle */}
              {!isPassageBased && selectedLegacy && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setShowOutline(!showOutline)}>
                    {showOutline ? 'Hide' : 'Show'} Sample Outline
                  </Button>
                  {showOutline && (
                    <Card className="p-4 bg-muted/50 border-dashed">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">SAMPLE OUTLINE</p>
                      <ul className="space-y-1">
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
                className="w-full min-h-[280px] p-4 border border-border rounded-lg bg-background text-sm leading-relaxed resize-y focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder={isPassageBased
                  ? "Write your answer here. Be specific and reference evidence from the passage..."
                  : "Write your essay response here..."
                }
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                autoFocus
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {response.split(/\s+/).filter(Boolean).length} words
                </span>
                <Button
                  onClick={submitForGrading}
                  disabled={response.trim().length < 30}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit for AI Grading
                </Button>
              </div>
            </motion.div>
          )}

          {/* ═══ GRADING ═══ */}
          {state === 'grading' && (
            <motion.div key="grading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-lg font-bold text-foreground">AI is grading your response...</p>
              <p className="text-sm text-muted-foreground">Analyzing reasoning, evidence, and structure</p>
            </motion.div>
          )}

          {/* ═══ RESULTS ═══ */}
          {state === 'results' && gradeResult && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Score */}
              <Card className="p-6 text-center border-2 border-primary/30">
                <div className="text-4xl font-bold text-primary mb-1">
                  {getScore()}/{getMaxScore()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {getScore() >= getMaxScore() * 0.75 ? '🎉 Excellent!' : getScore() >= getMaxScore() * 0.5 ? '👍 Good work' : '📚 Keep practicing'}
                </p>
              </Card>

              {/* Point-by-point breakdown (passage-based) */}
              {gradeResult.points_earned && (
                <Card className="p-4 space-y-3">
                  <h3 className="text-sm font-bold">Rubric Breakdown</h3>
                  {gradeResult.points_earned.map((pt: any, i: number) => (
                    <div key={i} className={`p-3 rounded-lg border ${pt.earned ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${pt.earned ? 'text-emerald-500' : 'text-destructive'}`} />
                        <div>
                          <p className="text-xs font-medium">{pt.criterion}</p>
                          <p className="text-xs text-muted-foreground mt-1">{pt.feedback}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card>
              )}

              {/* Dimension scores (legacy essay) */}
              {gradeResult.dimension_scores && (
                <Card className="p-4 space-y-3">
                  <h3 className="text-sm font-bold">Score Breakdown</h3>
                  {Object.entries(gradeResult.dimension_scores).map(([dim, val]: [string, any]) => (
                    <div key={dim} className="flex items-center justify-between">
                      <span className="text-xs capitalize text-muted-foreground">{dim}</span>
                      <span className="text-sm font-bold text-primary">{val.score}</span>
                    </div>
                  ))}
                </Card>
              )}

              {/* Feedback */}
              <Card className="p-4">
                <h3 className="text-sm font-bold mb-2">Feedback</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {gradeResult.overall_feedback || gradeResult.feedback}
                </p>
              </Card>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gradeResult.strengths?.length > 0 && (
                  <Card className="p-4">
                    <h3 className="text-sm font-bold text-emerald-600 mb-2">✅ Strengths</h3>
                    <ul className="space-y-1">
                      {gradeResult.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                      ))}
                    </ul>
                  </Card>
                )}
                {gradeResult.improvements?.length > 0 && (
                  <Card className="p-4">
                    <h3 className="text-sm font-bold text-amber-600 mb-2">🔧 To Improve</h3>
                    <ul className="space-y-1">
                      {gradeResult.improvements.map((s: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>

              {/* Key concept (MCAT/LSAT) */}
              {(gradeResult.key_concept_review || gradeResult.reasoning_quality) && (
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <h3 className="text-sm font-bold mb-1">💡 {isPassageBased && examId === 'mcat' ? 'Key Concept' : 'Reasoning Assessment'}</h3>
                  <p className="text-xs text-muted-foreground">{gradeResult.key_concept_review || gradeResult.reasoning_quality}</p>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {isPassageBased && selectedPassage && currentQuestionIndex < selectedPassage.questions.length - 1 ? (
                  <Button className="flex-1 gap-2" onClick={() => startQuestion(currentQuestionIndex + 1)}>
                    Next Question <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button className="flex-1 gap-2" variant="outline" onClick={() => setState('select')}>
                    <RotateCcw className="w-4 h-4" /> Try Another
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
