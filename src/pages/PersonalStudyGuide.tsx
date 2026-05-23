import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Loader2, Target, Printer, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { loadWeakAreas, type WeakArea } from "@/lib/weaknessAnalyzer";
import { SEO } from "@/components/SEO";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const MIN_ATTEMPTS = 8;

const PersonalStudyGuide = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [recentAccuracy, setRecentAccuracy] = useState(0);
  const [guide, setGuide] = useState<string>("");
  const [examType, setExamType] = useState<string>("sat");
  const [teaching, setTeaching] = useState<any[]>([]);
  const [diagnosing, setDiagnosing] = useState(false);

  const loadTeaching = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("adaptive_teaching_sections")
      .select("id, exam_family, section, skill, markdown_body, generated_at")
      .eq("user_id", user.id)
      .order("generated_at", { ascending: false })
      .limit(6);
    setTeaching(data ?? []);
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const [{ data: profile }, w] = await Promise.all([
        supabase.from("profiles").select("exam_type").eq("id", user.id).maybeSingle(),
        loadWeakAreas(user.id, 6),
      ]);
      if (profile?.exam_type) setExamType(profile.exam_type);
      setWeakAreas(w.weakAreas);
      setTotalAttempts(w.totalAttempts);
      setRecentAccuracy(w.recentAccuracy);
      await loadTeaching();
      setLoading(false);
    })();
  }, [user]);

  const rediagnose = async () => {
    setDiagnosing(true);
    try {
      const { error } = await supabase.functions.invoke("adaptive-diagnose", { body: { scope: {} } });
      if (error) throw error;
      await loadTeaching();
      toast.success("Refreshed teaching sections from your latest data.");
    } catch {
      toast.error("Could not refresh teaching sections.");
    } finally {
      setDiagnosing(false);
    }
  };

  const generate = async () => {
    setGenerating(true);
    setGuide("");
    try {
      const { data, error } = await supabase.functions.invoke("personal-study-guide", {
        body: { weakAreas, examType, recentAccuracy },
      });
      if (error) throw error;
      setGuide(data?.guide || "No guide returned.");
    } catch (e: any) {
      toast.error("Could not generate your study guide.");
    } finally {
      setGenerating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-6 max-w-md text-center">
          <p className="mb-4">Sign in to see your personal study guide.</p>
          <Link to="/auth"><Button>Sign in</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="My Study Guide — Personalized One-Pager" description="A concise, AI-personalized study guide built only from your weak areas." path="/study-guide" />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 print:p-0">
        <div className="flex items-center justify-between print:hidden">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          {guide && (
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-1" /> Print / Save PDF
            </Button>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 print:hidden">
          <Target className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">My Personal Study Guide</h1>
        </div>

        {loading ? (
          <Card className="p-8 mt-4 text-center">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
          </Card>
        ) : totalAttempts < MIN_ATTEMPTS || weakAreas.length === 0 ? (
          <Card className="p-6 mt-4">
            <p className="text-muted-foreground">
              Answer at least {MIN_ATTEMPTS} questions so we can find real patterns. So far: <b>{totalAttempts}</b>.
            </p>
            <Link to="/quiz"><Button className="mt-4">Take a quick quiz</Button></Link>
          </Card>
        ) : (
          <>
            {!guide && (
              <Card className="p-5 mt-4 print:hidden">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold">Built from your weak areas</h2>
                  <Badge variant="secondary">Accuracy: {Math.round(recentAccuracy * 100)}%</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {weakAreas.map((w) => (
                    <Badge key={`${w.questionType}-${w.skill}`} variant="outline">
                      {w.skill} · {Math.round(w.accuracy * 100)}%
                    </Badge>
                  ))}
                </div>
                <Button onClick={generate} disabled={generating} className="gap-2">
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {generating ? "Writing your one-pager…" : "Generate my study guide"}
                </Button>
              </Card>
            )}

            {guide && (
              <Card className="p-6 mt-4 print:shadow-none print:border-0">
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                  <ReactMarkdown>{guide}</ReactMarkdown>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 print:hidden">
                  <Link to="/booster"><Button><Target className="w-4 h-4 mr-1" /> Take Booster Test</Button></Link>
                  <Button variant="outline" onClick={generate} disabled={generating}>
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Regenerate"}
                  </Button>
                </div>
              </Card>
            )}

            <Card className="p-5 mt-4 print:shadow-none print:border-0">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">Per-skill teaching sections</h2>
                <Button size="sm" variant="outline" onClick={rediagnose} disabled={diagnosing} className="gap-2 print:hidden">
                  {diagnosing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  Refresh from latest data
                </Button>
              </div>
              {teaching.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No adaptive teaching sections yet. Click <b>Refresh from latest data</b> to generate one micro-lesson per top weak skill (includes worked example and practice prompts).
                </p>
              ) : (
                <div className="space-y-4">
                  {teaching.map((t) => (
                    <div key={t.id} className="border rounded-lg p-4">
                      <div className="text-xs text-muted-foreground mb-2">
                        {String(t.exam_family).toUpperCase()} · {t.section} · <b>{t.skill}</b>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{t.markdown_body}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-2 print:hidden">
                    <Link to="/weakness-retest"><Button size="sm"><Target className="w-4 h-4 mr-1" /> Weakness retest</Button></Link>
                    <Link to="/adaptive"><Button size="sm" variant="outline">Adaptive dashboard</Button></Link>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalStudyGuide;