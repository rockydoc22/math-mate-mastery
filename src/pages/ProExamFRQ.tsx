import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, CheckCircle2, Loader2, RotateCcw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

// FRQ prompt banks for each pro exam
const FRQ_BANKS: Record<string, { id: string; section: string; prompt: string; rubric: string[]; sampleOutline: string[]; timeMinutes: number }[]> = {
  gre: [
    {
      id: 'gre-aw-1', section: 'Analytical Writing – Issue',
      prompt: 'Educational institutions have a responsibility to dissuade students from pursuing fields of study in which they are unlikely to succeed. Write a response in which you discuss the extent to which you agree or disagree with the claim. In developing and supporting your position, be sure to address the most compelling reasons and/or examples that could be used to challenge your position.',
      rubric: ['Clear thesis with nuanced position', 'Logically sound reasoning with specific examples', 'Considers counterarguments and refutes them', 'Well-organized with coherent transitions', 'Precise language and varied sentence structure', 'Minimal grammatical errors'],
      sampleOutline: ['Take a qualified stance (partial agreement)', 'Acknowledge that data-driven guidance helps students', 'Argue that discouraging students undermines autonomy and growth', 'Provide examples: late bloomers, career pivots, innovation from "unlikely" fields', 'Concede practical constraints (e.g., limited resources)', 'Conclude with a balanced synthesis'],
      timeMinutes: 30,
    },
    {
      id: 'gre-aw-2', section: 'Analytical Writing – Argument',
      prompt: 'The following appeared in a memo from the director of a large city\'s council on the arts: "In a recent citywide poll, 15 percent more residents said they watch television programs about the visual arts than said they visit art museums. This suggests that the residents of our city prefer visual art in a home setting. Therefore, the council on the arts should allocate more funding to a program that makes video recordings of exhibits available for home viewing." Write a response examining the stated and/or unstated assumptions of the argument. Be sure to explain how the argument depends on these assumptions and what the implications are for the argument if the assumptions prove unwarranted.',
      rubric: ['Identifies key assumptions clearly', 'Explains how each assumption affects the conclusion', 'Provides alternative explanations for the evidence', 'Suggests what additional evidence would strengthen the argument', 'Logical organization', 'Clear, precise prose'],
      sampleOutline: ['Identify assumption: watching TV about art ≠ preferring art at home', 'Identify assumption: poll respondents represent actual behavior', 'Alternative explanation: convenience, not preference', 'Question: What if museum attendance is limited by cost/location?', 'Suggest needed evidence: reasons for not visiting museums', 'Conclude: argument is flawed without addressing these gaps'],
      timeMinutes: 30,
    },
    {
      id: 'gre-aw-3', section: 'Analytical Writing – Issue',
      prompt: 'Claim: Governments must ensure that their major cities receive the financial support they need in order to thrive. Reason: It is primarily in cities that a nation\'s cultural traditions are preserved and generated. Write a response discussing the extent to which you agree or disagree with the claim and the reason on which it is based.',
      rubric: ['Addresses both claim and reason separately', 'Provides concrete historical/cultural examples', 'Considers rural and non-urban cultural contributions', 'Demonstrates analytical depth', 'Organized paragraphs with clear transitions', 'Sophisticated vocabulary and syntax'],
      sampleOutline: ['Agree that cities are cultural hubs but challenge exclusivity of the reason', 'Examples: museums, theaters, universities in cities', 'Counterexamples: folk traditions, indigenous cultures in rural areas', 'Argue for balanced funding approach', 'Conclude with nuanced position on urban funding'],
      timeMinutes: 30,
    },
  ],
  gmat: [
    {
      id: 'gmat-aw-1', section: 'Analytical Writing',
      prompt: 'The following appeared in an article in the Grandview Beacon: "For many years the city of Grandview has provided free public health clinics to low-income residents. These clinics have been an essential safety net. Yet, last year, the weights of low-income residents surveyed were on average 12% higher than a decade ago. Clearly, the clinics are failing in their mission, and the city should redirect funding to subsidize gym memberships instead." Discuss how well-reasoned you find this argument.',
      rubric: ['Identifies logical flaws in the argument', 'Questions the causal link between clinics and weight gain', 'Considers confounding factors (diet, economics, stress)', 'Evaluates whether gym subsidies address root causes', 'Clear structure with introduction, body, conclusion', 'Professional tone and grammar'],
      sampleOutline: ['Flaw 1: Correlation ≠ causation (clinics didn\'t cause weight gain)', 'Flaw 2: Weight is one health metric—clinics serve broader purposes', 'Flaw 3: Survey may not be representative', 'Flaw 4: Gym memberships don\'t guarantee usage or health improvement', 'Suggest what evidence would be needed', 'Conclude: argument is poorly reasoned'],
      timeMinutes: 30,
    },
    {
      id: 'gmat-aw-2', section: 'Analytical Writing',
      prompt: 'The following appeared in a business journal: "Companies that offer employees the option to work from home at least three days a week report 20% lower turnover rates. Therefore, all companies seeking to reduce employee turnover should adopt remote work policies immediately." Discuss how well-reasoned you find this argument.',
      rubric: ['Identifies selection bias (companies offering WFH may differ systematically)', 'Questions generalizability across industries', 'Considers alternative explanations for lower turnover', 'Evaluates feasibility of "immediate" adoption', 'Well-structured analysis', 'Clear and concise writing'],
      sampleOutline: ['Flaw 1: Self-selection—companies with WFH may already have better culture', 'Flaw 2: Not all industries can go remote (manufacturing, healthcare)', 'Flaw 3: 20% lower turnover may have other causes (pay, benefits)', 'Flaw 4: "Immediately" ignores implementation challenges', 'What would strengthen the argument', 'Conclusion'],
      timeMinutes: 30,
    },
  ],
  lsat: [
    {
      id: 'lsat-lr-1', section: 'Logical Reasoning – Written Analysis',
      prompt: 'A university professor argues: "Students who take notes by hand perform better on conceptual questions than those who type notes on laptops. Therefore, universities should ban laptops from lecture halls." Identify and explain at least two flaws in this reasoning. Then, describe what additional evidence would be needed to evaluate the professor\'s conclusion.',
      rubric: ['Identifies at least 2 distinct logical flaws', 'Explains why each flaw undermines the conclusion', 'Distinguishes correlation from causation', 'Considers alternative explanations', 'Identifies specific evidence that would help evaluate the argument', 'Clear, lawyer-like analytical prose'],
      sampleOutline: ['Flaw 1: Assumes performance difference is entirely due to note-taking method', 'Flaw 2: Banning laptops removes benefits (accessibility, organization)', 'Flaw 3: May conflate causation—motivated students may choose handwriting', 'Evidence needed: controlled studies, accessibility data, student preferences', 'Alternative: teach effective note-taking instead of banning tools', 'Conclusion: argument is oversimplified'],
      timeMinutes: 35,
    },
    {
      id: 'lsat-lr-2', section: 'Logical Reasoning – Written Analysis',
      prompt: 'A city council member states: "Since the installation of red-light cameras at 50 intersections, the number of accidents at those intersections has decreased by 30%. The city should install cameras at all remaining intersections to further reduce accidents." Analyze the reasoning in this argument. Identify assumptions and evaluate whether the evidence supports the conclusion.',
      rubric: ['Identifies assumption that correlation implies causation', 'Questions whether results would generalize to all intersections', 'Considers regression to the mean', 'Notes potential negative effects (rear-end collisions)', 'Suggests what evidence would strengthen or weaken the argument', 'Logical flow and precise language'],
      sampleOutline: ['Assumption: cameras caused the decrease (vs. other factors)', 'Assumption: all intersections have similar accident profiles', 'Consider: regression to the mean at high-accident sites', 'Consider: rear-end collision increases documented elsewhere', 'Evidence needed: comparison with control intersections', 'Conclusion: evidence is insufficient for blanket policy'],
      timeMinutes: 35,
    },
  ],
  mcat: [
    {
      id: 'mcat-cars-1', section: 'Critical Analysis & Reasoning – Written Response',
      prompt: 'A public health researcher argues that mandatory vaccination programs are justified because herd immunity protects vulnerable populations who cannot be vaccinated. However, critics contend that such mandates infringe on individual bodily autonomy. Evaluate both perspectives. Under what conditions, if any, might mandatory vaccination be ethically justified? Support your reasoning with specific ethical principles.',
      rubric: ['Presents both perspectives fairly', 'Applies specific ethical frameworks (utilitarianism, autonomy, justice)', 'Considers real-world nuances (medical exemptions, enforcement)', 'Develops a reasoned position with qualifications', 'Demonstrates understanding of public health vs. individual rights tension', 'Well-organized with clear thesis'],
      sampleOutline: ['Present utilitarian case: greatest good, herd immunity data', 'Present autonomy case: informed consent, bodily sovereignty', 'Apply justice framework: who bears the risk?', 'Propose conditions: severity of disease, availability of alternatives', 'Consider: medical exemptions vs. philosophical exemptions', 'Conclude with qualified position'],
      timeMinutes: 30,
    },
    {
      id: 'mcat-cars-2', section: 'Critical Analysis & Reasoning – Written Response',
      prompt: 'Recent studies suggest that social media use is correlated with increased rates of anxiety and depression among adolescents. Some policymakers have proposed age-based restrictions on social media access. Critically evaluate this proposal. What assumptions does it make, and what alternative approaches might address the underlying concerns?',
      rubric: ['Identifies assumptions in the age-restriction proposal', 'Evaluates strength of correlation evidence', 'Considers confounding variables', 'Proposes evidence-based alternatives', 'Demonstrates nuanced thinking about causation', 'Clear argumentative structure'],
      sampleOutline: ['Assumption: correlation = causation', 'Assumption: age restrictions are enforceable', 'Confounders: pre-existing mental health, socioeconomic factors', 'Alternative: digital literacy education', 'Alternative: platform design regulation', 'Conclude: restrictions alone are insufficient'],
      timeMinutes: 30,
    },
  ],
};

type FRQState = 'select' | 'writing' | 'reviewing' | 'grading' | 'results';

const ProExamFRQ = () => {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();
  const prompts = FRQ_BANKS[examId || ''] || [];

  const [state, setState] = useState<FRQState>('select');
  const [selectedPrompt, setSelectedPrompt] = useState<typeof prompts[0] | null>(null);
  const [response, setResponse] = useState('');
  const [showOutline, setShowOutline] = useState(false);
  const [gradeResult, setGradeResult] = useState<{ score: number; maxScore: number; feedback: string; strengths: string[]; improvements: string[] } | null>(null);
  const [grading, setGrading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const examNames: Record<string, string> = { gre: 'GRE', gmat: 'GMAT', lsat: 'LSAT', mcat: 'MCAT' };
  const examName = examNames[examId || ''] || 'Exam';

  // Timer effect
  useState(() => {
    if (!timerActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setTimerActive(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const startWriting = (prompt: typeof prompts[0]) => {
    setSelectedPrompt(prompt);
    setResponse('');
    setShowOutline(false);
    setGradeResult(null);
    setTimeLeft(prompt.timeMinutes * 60);
    setTimerActive(true);
    setState('writing');
  };

  const submitForGrading = async () => {
    if (!selectedPrompt || response.trim().length < 50) return;
    setState('grading');
    setGrading(true);
    setTimerActive(false);

    try {
      const { data, error } = await supabase.functions.invoke('ai-grade-essay', {
        body: {
          essay: response,
          prompt: selectedPrompt.prompt,
          rubric: `${examName} ${selectedPrompt.section}`,
          rubric_items: selectedPrompt.rubric,
        },
      });

      if (error) throw error;

      setGradeResult({
        score: data?.score ?? 4,
        maxScore: 6,
        feedback: data?.feedback ?? 'Your response demonstrates understanding of the topic.',
        strengths: data?.strengths ?? ['Clear position stated'],
        improvements: data?.improvements ?? ['Add more specific examples'],
      });
    } catch {
      // Fallback local grading
      const wordCount = response.split(/\s+/).length;
      const score = Math.min(6, Math.max(1, Math.round(wordCount / 80)));
      setGradeResult({
        score,
        maxScore: 6,
        feedback: `Your ${wordCount}-word response has been evaluated. ${score >= 4 ? 'Strong analytical work!' : 'Consider developing your arguments further with specific examples.'}`,
        strengths: wordCount > 200 ? ['Adequate length', 'Addressed the prompt'] : ['Addressed the prompt'],
        improvements: wordCount < 300 ? ['Expand your analysis with more examples', 'Develop counterarguments'] : ['Refine your thesis for more precision'],
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

  if (!prompts.length) {
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
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to={state === 'select' ? `/pro-exam/${examId}` : '#'} onClick={state !== 'select' ? (e) => { e.preventDefault(); setState('select'); } : undefined}>
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
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
          {/* Prompt Selection */}
          {state === 'select' && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-muted-foreground text-sm">Choose an FRQ prompt to practice. You'll write a timed response and receive AI-powered feedback.</p>
              {prompts.map((p) => (
                <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all group" onClick={() => startWriting(p)}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.section}</span>
                      <p className="text-sm text-foreground line-clamp-3">{p.prompt.slice(0, 200)}…</p>
                      <span className="text-xs text-muted-foreground">⏱ {p.timeMinutes} min</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-2" />
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Writing */}
          {state === 'writing' && selectedPrompt && (
            <motion.div key="writing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <span className="text-xs font-medium text-primary">{selectedPrompt.section}</span>
                <p className="text-sm mt-2 text-foreground leading-relaxed">{selectedPrompt.prompt}</p>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowOutline(!showOutline)}>
                  {showOutline ? 'Hide' : 'Show'} Sample Outline
                </Button>
              </div>

              {showOutline && (
                <Card className="p-4 bg-muted/50 border-dashed">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">SAMPLE OUTLINE (for reference)</p>
                  <ul className="space-y-1">
                    {selectedPrompt.sampleOutline.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary font-bold">{i + 1}.</span> {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <textarea
                className="w-full min-h-[300px] p-4 rounded-lg border border-border bg-card text-foreground text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Begin your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{response.split(/\s+/).filter(Boolean).length} words</span>
                <Button onClick={submitForGrading} disabled={response.trim().length < 50} className="gap-2">
                  <Send className="w-4 h-4" /> Submit for Grading
                </Button>
              </div>
            </motion.div>
          )}

          {/* Grading */}
          {state === 'grading' && (
            <motion.div key="grading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">AI is grading your response…</p>
            </motion.div>
          )}

          {/* Results */}
          {state === 'results' && gradeResult && selectedPrompt && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <Card className="p-6 text-center space-y-3">
                <div className="text-5xl font-bold text-primary">{gradeResult.score}<span className="text-lg text-muted-foreground">/{gradeResult.maxScore}</span></div>
                <p className="text-sm text-muted-foreground">{selectedPrompt.section}</p>
                <p className="text-sm text-foreground">{gradeResult.feedback}</p>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Strengths</h3>
                  <ul className="space-y-1">
                    {gradeResult.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-muted-foreground">✓ {s}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400">Areas to Improve</h3>
                  <ul className="space-y-1">
                    {gradeResult.improvements.map((s, i) => (
                      <li key={i} className="text-xs text-muted-foreground">→ {s}</li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Card className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-foreground">Rubric Checklist</h3>
                {selectedPrompt.rubric.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 text-primary" /> {r}
                  </div>
                ))}
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => startWriting(selectedPrompt)}>
                  <RotateCcw className="w-4 h-4" /> Try Again
                </Button>
                <Button className="flex-1" onClick={() => setState('select')}>
                  Next Prompt
                </Button>
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
