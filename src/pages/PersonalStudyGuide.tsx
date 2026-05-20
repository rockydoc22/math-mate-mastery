import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Loader2, Target, Printer } from "lucide-react";
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
      setLoading(false);
    })();
  }, [user]);

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
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalStudyGuide;