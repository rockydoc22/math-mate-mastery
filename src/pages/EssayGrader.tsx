import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type RubricType = 'apush_dbq' | 'ap_lang_rhetorical' | 'ap_lang_synthesis' | 'ap_lang_argument';

interface RubricOption {
  id: RubricType;
  label: string;
  description: string;
  maxScore: number;
  icon: string;
}

const RUBRIC_OPTIONS: RubricOption[] = [
  { id: 'apush_dbq', label: 'APUSH DBQ', description: 'Document-Based Question (7-point rubric)', maxScore: 7, icon: '🇺🇸' },
  { id: 'ap_lang_rhetorical', label: 'AP Lang: Rhetorical Analysis', description: 'Analyze rhetorical choices (6-point rubric)', maxScore: 6, icon: '🔍' },
  { id: 'ap_lang_synthesis', label: 'AP Lang: Synthesis', description: 'Argument using provided sources (6-point rubric)', maxScore: 6, icon: '🔗' },
  { id: 'ap_lang_argument', label: 'AP Lang: Argument', description: 'Evidence-based argument (6-point rubric)', maxScore: 6, icon: '💬' },
];

interface GradingResult {
  grading: Record<string, any>;
  max_score: number;
}

const ScoreBadge = ({ score, max, label }: { score: number; max: number; label: string }) => {
  const pct = max > 0 ? score / max : 0;
  const color = pct >= 0.8 ? 'text-green-600 bg-green-50 border-green-200' : pct >= 0.5 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' : 'text-red-600 bg-red-50 border-red-200';
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <div className="text-xs font-medium opacity-70">{label}</div>
      <div className="text-2xl font-bold">{score}/{max}</div>
    </div>
  );
};

const EssayGrader = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselect = searchParams.get('rubric') as RubricType | null;

  const [selectedRubric, setSelectedRubric] = useState<RubricType | null>(preselect);
  const [essay, setEssay] = useState('');
  const [promptText, setPromptText] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);

  const handleGrade = async () => {
    if (!selectedRubric || !essay.trim()) {
      toast.error('Please select a rubric and paste your essay');
      return;
    }
    if (essay.trim().length < 100) {
      toast.error('Essay seems too short. Please paste your full response.');
      return;
    }

    setIsGrading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-grade-essay', {
        body: { essay: essay.trim(), rubric_type: selectedRubric, prompt_text: promptText.trim() || undefined },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult(data);
    } catch (e: any) {
      console.error('Grading error:', e);
      toast.error(e.message || 'Failed to grade essay. Please try again.');
    } finally {
      setIsGrading(false);
    }
  };

  const rubricInfo = RUBRIC_OPTIONS.find(r => r.id === selectedRubric);

  const renderDBQScores = (grading: Record<string, any>) => (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      <ScoreBadge score={grading.thesis?.score ?? 0} max={1} label="Thesis" />
      <ScoreBadge score={grading.contextualization?.score ?? 0} max={1} label="Context" />
      <ScoreBadge score={grading.evidence_documents?.score ?? 0} max={2} label="Doc Evidence" />
      <ScoreBadge score={grading.evidence_beyond?.score ?? 0} max={1} label="Outside Evidence" />
      <ScoreBadge score={grading.analysis_reasoning?.score ?? 0} max={2} label="Analysis" />
    </div>
  );

  const renderLangScores = (grading: Record<string, any>) => (
    <div className="grid grid-cols-3 gap-2">
      <ScoreBadge score={grading.thesis?.score ?? 0} max={1} label="Thesis" />
      <ScoreBadge score={grading.evidence_commentary?.score ?? 0} max={4} label="Evidence & Commentary" />
      <ScoreBadge score={grading.sophistication?.score ?? 0} max={1} label="Sophistication" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Essay Grader
            </h1>
            <p className="text-sm text-muted-foreground">
              Get instant rubric-based feedback on your essays
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto gap-1.5" onClick={() => navigate('/writing-lab')}>
            ✍️ Writing Lab
          </Button>
        </div>

        {/* Rubric selector */}
        {!result && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RUBRIC_OPTIONS.map(r => (
              <Card
                key={r.id}
                className={`p-4 cursor-pointer transition-all hover:scale-[1.01] ${
                  selectedRubric === r.id ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setSelectedRubric(r.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm">{r.label}</h3>
                    <p className="text-xs text-muted-foreground">{r.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Essay input */}
        {selectedRubric && !result && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Prompt (optional)</label>
              <Textarea
                placeholder="Paste the essay prompt here (helps AI grade more accurately)..."
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Your Essay</label>
              <Textarea
                placeholder="Paste your full essay here..."
                value={essay}
                onChange={e => setEssay(e.target.value)}
                className="min-h-[300px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {essay.length > 0 ? `${essay.split(/\s+/).filter(Boolean).length} words` : 'Paste your essay above'}
              </p>
            </div>
            <Button onClick={handleGrade} disabled={isGrading || !essay.trim()} className="w-full">
              {isGrading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Grading your essay...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Grade My Essay ({rubricInfo?.maxScore}-point rubric)
                </>
              )}
            </Button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Total score */}
            <Card className="p-6 text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Score</div>
              <div className="text-5xl font-bold text-primary">
                {result.grading.total_score}/{result.max_score}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{rubricInfo?.label}</div>
            </Card>

            {/* Dimension scores */}
            {selectedRubric === 'apush_dbq' ? renderDBQScores(result.grading) : renderLangScores(result.grading)}

            {/* Detailed feedback */}
            <Card className="p-4 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Detailed Feedback
              </h3>
              {Object.entries(result.grading)
                .filter(([k]) => !['total_score', 'overall_feedback', 'next_steps'].includes(k))
                .map(([key, val]: [string, any]) => (
                  <div key={key} className="border-l-2 border-primary/30 pl-3">
                    <div className="text-xs font-semibold uppercase text-muted-foreground">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <p className="text-sm mt-1">{val?.feedback}</p>
                  </div>
                ))}
            </Card>

            {/* Overall & next steps */}
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary" /> Next Steps
              </h3>
              <p className="text-sm">{result.grading.overall_feedback}</p>
              <ul className="space-y-1">
                {(result.grading.next_steps || []).map((tip: string, i: number) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-primary font-bold">{i + 1}.</span> {tip}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => { setResult(null); setEssay(''); setPromptText(''); }}>
                Grade Another Essay
              </Button>
              <Button className="flex-1" onClick={() => navigate(-1)}>
                Back to Study
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayGrader;
