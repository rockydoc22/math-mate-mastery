import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, BookOpen, ChevronRight, Loader2, Sparkles, FileText, PenLine, ScrollText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAPSubject } from "@/utils/apConfig";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  FRQ_SUBJECT_MAP,
  loadHistorySAQs,
  loadHistoryDBQs,
  loadHistoryLEQs,
  loadCalcFRQs,
  loadSTEMFRQs,
  loadEssayPrompts,
  loadCSPPrompts,
  loadCSPChecklists,
  type SAQQuestion,
  type DBQQuestion,
  type LEQQuestion,
  type FRQQuestion,
  type EssayPrompt,
  type CSPPlanningPrompt,
  type CSPChecklist,
} from "@/data/frqDataLoaders";

type ActiveQuestion = {
  type: 'saq';
  data: SAQQuestion;
} | {
  type: 'dbq';
  data: DBQQuestion;
} | {
  type: 'leq';
  data: LEQQuestion;
} | {
  type: 'frq';
  data: FRQQuestion;
} | {
  type: 'essay';
  data: EssayPrompt;
} | {
  type: 'csp';
  data: CSPPlanningPrompt;
};

const FRQPractice = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subject = subjectId ? getAPSubject(subjectId) : undefined;
  const config = subjectId ? FRQ_SUBJECT_MAP[subjectId] : undefined;

  const [saqs, setSaqs] = useState<SAQQuestion[]>([]);
  const [dbqs, setDbqs] = useState<DBQQuestion[]>([]);
  const [leqs, setLeqs] = useState<LEQQuestion[]>([]);
  const [frqs, setFrqs] = useState<FRQQuestion[]>([]);
  const [essays, setEssays] = useState<EssayPrompt[]>([]);
  const [cspPrompts, setCspPrompts] = useState<CSPPlanningPrompt[]>([]);
  const [cspChecklists, setCspChecklists] = useState<CSPChecklist[]>([]);
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState<ActiveQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<any>(null);

  useEffect(() => {
    if (!config) { setLoading(false); return; }
    const load = async () => {
      const promises: Promise<void>[] = [];
      if (config.types.includes('saq')) promises.push(loadHistorySAQs(config.course).then(setSaqs));
      if (config.types.includes('dbq')) promises.push(loadHistoryDBQs(config.course).then(setDbqs));
      if (config.types.includes('leq')) promises.push(loadHistoryLEQs(config.course).then(setLeqs));
      if (config.types.includes('frq')) {
        if (config.course.includes('Calculus')) {
          promises.push(loadCalcFRQs(config.course).then(setFrqs));
        } else {
          promises.push(loadSTEMFRQs(config.course).then(setFrqs));
        }
      }
      if (config.types.includes('essay')) promises.push(loadEssayPrompts(config.course).then(setEssays));
      if (config.types.includes('csp')) {
        promises.push(loadCSPPrompts().then(setCspPrompts));
        promises.push(loadCSPChecklists().then(setCspChecklists));
      }
      await Promise.all(promises);
      setLoading(false);
    };
    load();
  }, [subjectId]);

  if (!subject || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center space-y-4 max-w-sm">
          <h2 className="text-xl font-bold">No FRQ Content</h2>
          <p className="text-muted-foreground text-sm">FRQ practice isn't available for this subject yet.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Card>
      </div>
    );
  }

  const handleGrade = async () => {
    if (!active || !answer.trim()) { toast.error("Write your response first"); return; }
    if (answer.trim().length < 30) { toast.error("Your answer seems too short"); return; }

    setIsGrading(true);
    setGradingResult(null);

    try {
      let rubric_type = "frq_stem";
      let prompt_text = "";
      let scoring_guidelines: any = undefined;

      if (active.type === 'saq') {
        rubric_type = "frq_stem";
        prompt_text = active.data.questions.map(q => `${q.part}. ${q.prompt}`).join("\n");
        scoring_guidelines = [{ point: 1, criteria: active.data.scoring_guidance.per_part }];
      } else if (active.type === 'dbq') {
        rubric_type = "apush_dbq";
        prompt_text = active.data.prompt;
      } else if (active.type === 'leq') {
        rubric_type = "frq_stem";
        prompt_text = active.data.prompt;
      } else if (active.type === 'frq') {
        rubric_type = "frq_stem";
        prompt_text = active.data.prompt + "\n" + active.data.parts.map(p => `${p.part}. ${p.task}`).join("\n");
        scoring_guidelines = active.data.scoring_guidelines;
      } else if (active.type === 'essay') {
        const variant = active.data.variant.toLowerCase();
        if (variant.includes('rhetorical')) rubric_type = "ap_lang_rhetorical";
        else if (variant.includes('synthesis')) rubric_type = "ap_lang_synthesis";
        else rubric_type = "ap_lang_argument";
        prompt_text = active.data.prompt;
      }

      const { data, error } = await supabase.functions.invoke('ai-grade-essay', {
        body: { essay: answer.trim(), rubric_type, prompt_text, scoring_guidelines },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setGradingResult(data);
    } catch (e: any) {
      console.error("Grading error:", e);
      toast.error(e.message || "Failed to grade. Try again.");
    } finally {
      setIsGrading(false);
    }
  };

  // ─── Active question view ───
  if (active) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Button variant="ghost" size="sm" onClick={() => { setActive(null); setAnswer(""); setGradingResult(null); }} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Questions
          </Button>

          {/* Question display */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
              <FileText className="w-3.5 h-3.5" />
              {active.type.toUpperCase()} • {active.type === 'saq' ? `Unit ${active.data.unit}` : active.type === 'frq' ? active.data.course : active.type === 'essay' ? active.data.variant : ''}
            </div>

            {active.type === 'saq' && (
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg text-sm italic">{active.data.stimulus.text}</div>
                {active.data.questions.map(q => (
                  <p key={q.part} className="text-sm"><strong>{q.part}.</strong> {q.prompt}</p>
                ))}
              </div>
            )}
            {active.type === 'dbq' && (
              <div className="space-y-3">
                <p className="font-semibold text-sm">{active.data.prompt}</p>
                <div className="space-y-1">
                  {active.data.documents?.map(d => (
                    <div key={d.doc_id} className="text-xs p-2 bg-muted/30 rounded">
                      <strong>{d.doc_id}</strong> ({d.type}): {d.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {active.type === 'leq' && <p className="text-sm font-semibold">{active.data.prompt}</p>}
            {active.type === 'frq' && (
              <div className="space-y-3">
                <p className="text-sm">{active.data.prompt}</p>
                {active.data.stimulus && typeof active.data.stimulus === 'object' && active.data.stimulus.title && (
                  <div className="p-3 bg-muted/50 rounded-lg text-xs">
                    <strong>{active.data.stimulus.title}</strong>
                    {active.data.stimulus.rows && (
                      <table className="mt-1 w-full text-left">
                        <thead><tr>{active.data.stimulus.columns?.map((c: string) => <th key={c} className="pr-4">{c}</th>)}</tr></thead>
                        <tbody>{active.data.stimulus.rows.map((r: string[], i: number) => <tr key={i}>{r.map((v, j) => <td key={j} className="pr-4">{v}</td>)}</tr>)}</tbody>
                      </table>
                    )}
                  </div>
                )}
                {active.data.parts.map(p => (
                  <p key={p.part} className="text-sm"><strong>({p.part})</strong> {p.task}</p>
                ))}
                {active.data.calculator_allowed !== undefined && (
                  <p className="text-xs text-muted-foreground">🧮 Calculator: {active.data.calculator_allowed ? 'Allowed' : 'Not allowed'}</p>
                )}
              </div>
            )}
            {active.type === 'essay' && <p className="text-sm font-semibold">{active.data.prompt}</p>}
            {active.type === 'csp' && <p className="text-sm font-semibold">{active.data.prompt}</p>}
          </Card>

          {/* Answer / grading */}
          {!gradingResult ? (
            <div className="space-y-3">
              <Textarea
                placeholder="Write your response here..."
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                className="min-h-[250px]"
              />
              <p className="text-xs text-muted-foreground">{answer.split(/\s+/).filter(Boolean).length} words</p>
              <Button onClick={handleGrade} disabled={isGrading || !answer.trim()} className="w-full">
                {isGrading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Grading...</> : <><Sparkles className="w-4 h-4 mr-2" /> Grade My Response</>}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Card className="p-6 text-center">
                <div className="text-sm text-muted-foreground mb-1">Score</div>
                <div className="text-5xl font-bold text-primary">
                  {gradingResult.grading.total_score}/{gradingResult.max_score}
                </div>
              </Card>

              {/* Dimension scores */}
              {gradingResult.grading.parts ? (
                <div className="grid grid-cols-3 gap-2">
                  {gradingResult.grading.parts.map((p: any) => (
                    <Card key={p.part} className={`p-3 ${p.score > 0 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="text-xs font-medium opacity-70">Part {p.part}</div>
                      <div className="text-xl font-bold">{p.score}/1</div>
                      <p className="text-xs mt-1 text-muted-foreground">{p.feedback}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(gradingResult.grading)
                    .filter(([k, v]: [string, any]) => v && typeof v === 'object' && 'score' in v)
                    .map(([key, val]: [string, any]) => (
                      <Card key={key} className={`p-3 ${val.score > 0 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                        <div className="text-xs font-medium opacity-70">{key.replace(/_/g, ' ')}</div>
                        <div className="text-xl font-bold">{val.score}</div>
                      </Card>
                    ))}
                </div>
              )}

              {/* Feedback */}
              <Card className="p-4 space-y-3">
                <p className="text-sm">{gradingResult.grading.overall_feedback}</p>
                {gradingResult.grading.next_steps?.length > 0 && (
                  <ul className="space-y-1">
                    {gradingResult.grading.next_steps.map((tip: string, i: number) => (
                      <li key={i} className="text-sm flex gap-2"><span className="text-primary font-bold">{i + 1}.</span> {tip}</li>
                    ))}
                  </ul>
                )}
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => { setGradingResult(null); setAnswer(""); }}>Try Again</Button>
                <Button className="flex-1" onClick={() => { setActive(null); setAnswer(""); setGradingResult(null); }}>Next Question</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Question list view ───
  const defaultTab = searchParams.get('tab') || config.types[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/ap-study/${subjectId}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <PenLine className="w-6 h-6 text-primary" />
              {subject.shortName} FRQ Practice
            </h1>
            <p className="text-sm text-muted-foreground">Free-response questions with AI grading</p>
          </div>
        </div>

        {loading ? (
          <Card className="p-8 text-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading questions...</Card>
        ) : (
          <Tabs defaultValue={defaultTab} className="w-full">
            {config.types.length > 1 && (
              <TabsList className={`grid w-full grid-cols-${config.types.length}`}>
                {config.types.includes('saq') && <TabsTrigger value="saq">SAQ ({saqs.length})</TabsTrigger>}
                {config.types.includes('dbq') && <TabsTrigger value="dbq">DBQ ({dbqs.length})</TabsTrigger>}
                {config.types.includes('leq') && <TabsTrigger value="leq">LEQ ({leqs.length})</TabsTrigger>}
                {config.types.includes('frq') && <TabsTrigger value="frq">FRQ ({frqs.length})</TabsTrigger>}
                {config.types.includes('essay') && <TabsTrigger value="essay">Essays ({essays.length})</TabsTrigger>}
                {config.types.includes('csp') && <TabsTrigger value="csp">Create Task</TabsTrigger>}
              </TabsList>
            )}

            {config.types.includes('saq') && (
              <TabsContent value="saq" className="mt-4 space-y-2">
                {saqs.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No SAQs available</p> : saqs.map((q, i) => (
                  <Card key={q.id} className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all" onClick={() => setActive({ type: 'saq', data: q })}>
                    <div className="flex items-center gap-3">
                      <ScrollText className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">SAQ #{i + 1} — Unit {q.unit}</h3>
                        <p className="text-xs text-muted-foreground truncate">{q.stimulus.text.slice(0, 80)}...</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                ))}
              </TabsContent>
            )}

            {config.types.includes('dbq') && (
              <TabsContent value="dbq" className="mt-4 space-y-2">
                {dbqs.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No DBQs available</p> : dbqs.map((q, i) => (
                  <Card key={q.id} className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all" onClick={() => setActive({ type: 'dbq', data: q })}>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">DBQ #{i + 1} — {q.unit_range}</h3>
                        <p className="text-xs text-muted-foreground truncate">{q.prompt.slice(0, 80)}...</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                ))}
              </TabsContent>
            )}

            {config.types.includes('leq') && (
              <TabsContent value="leq" className="mt-4 space-y-2">
                {leqs.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No LEQs available</p> : leqs.map((q, i) => (
                  <Card key={q.id} className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all" onClick={() => setActive({ type: 'leq', data: q })}>
                    <div className="flex items-center gap-3">
                      <PenLine className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">LEQ #{i + 1}</h3>
                        <p className="text-xs text-muted-foreground truncate">{q.prompt.slice(0, 80)}...</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                ))}
              </TabsContent>
            )}

            {config.types.includes('frq') && (
              <TabsContent value="frq" className="mt-4 space-y-2">
                {frqs.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No FRQs available</p> : frqs.map((q, i) => (
                  <Card key={q.id} className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all" onClick={() => setActive({ type: 'frq', data: q })}>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">FRQ #{i + 1} {q.calculator_allowed !== undefined ? (q.calculator_allowed ? '🧮' : '✏️') : ''}</h3>
                        <p className="text-xs text-muted-foreground truncate">{q.parts.length} parts</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                ))}
              </TabsContent>
            )}

            {config.types.includes('essay') && (
              <TabsContent value="essay" className="mt-4 space-y-2">
                {essays.length === 0 ? <p className="text-sm text-muted-foreground text-center py-4">No essay prompts available</p> : essays.map((q, i) => (
                  <Card key={q.id} className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all" onClick={() => setActive({ type: 'essay', data: q })}>
                    <div className="flex items-center gap-3">
                      <PenLine className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">{q.variant} #{i + 1}</h3>
                        <p className="text-xs text-muted-foreground truncate">{q.prompt.slice(0, 80)}...</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                ))}
              </TabsContent>
            )}

            {config.types.includes('csp') && (
              <TabsContent value="csp" className="mt-4 space-y-4">
                <h3 className="font-semibold text-sm">Planning Prompts</h3>
                {cspPrompts.map((q, i) => (
                  <Card key={q.id} className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all" onClick={() => setActive({ type: 'csp', data: q })}>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-sm flex-1">{q.prompt}</p>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                ))}
                {cspChecklists.length > 0 && (
                  <>
                    <h3 className="font-semibold text-sm mt-4">Rubric Checklists</h3>
                    {cspChecklists.map(cl => (
                      <Card key={cl.id} className="p-4">
                        <h4 className="text-sm font-semibold mb-2">{cl.category}</h4>
                        <ul className="space-y-1">
                          {cl.items.map((item, i) => (
                            <li key={i} className="text-xs flex gap-2">
                              <span>☐</span>
                              <div><strong>{item.label}</strong> — {item.help_text}</div>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </>
                )}
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default FRQPractice;
