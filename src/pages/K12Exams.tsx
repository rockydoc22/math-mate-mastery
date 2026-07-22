import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAIAssistant } from "@/hooks/useAIAssistant";
import { useNavigate } from "react-router-dom";
import { K12_EXAMS } from "@/utils/k12ExamConfig";
import { loadK12ExamQuestions } from "@/data/k12Questions";
import { ConsentGate } from "@/components/ConsentGate";
import { SEO } from "@/components/SEO";
import { BottomNav } from "@/components/BottomNav";

const K12_DISCLAIMER = `Important Disclaimer

This application provides original practice questions and materials created independently.

This app is not affiliated with, endorsed by, sponsored by, or in any way officially connected to:

• Riverside Insights (Iowa Assessments / ITBS)
• GED Testing Service or Pearson VUE
• ETS (HiSET)
• Data Recognition Corporation (TASC)
• NWEA (MAP Growth)
• Renaissance Learning (STAR Assessments)
• Pearson (Stanford 10 / SAT-10)
• Data Recognition Corporation (TerraNova / CAT-6)
• Pennsylvania Department of Education (PSSA)
• New York State Education Department (Regents Exams)
• Any other official testing organization or standardized exam

None of the questions or content in this app are copied from, derived from, or reproduce official exams. This app is intended solely as an independent study aid.

The use of exam names is for informational purposes only and does not imply any official relationship or approval.

For official preparation materials, please visit the respective official websites.

AlphaOmega assumes no responsibility for how users perform on actual standardized exams.`;

const K12_CHECKBOX = "I understand this platform uses only original content and is not affiliated with official testing organizations.";

const K12Exams = () => {
  const navigate = useNavigate();
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});
  const [loadingCounts, setLoadingCounts] = useState(true);
  const { enabled: aiAssistantOn } = useAIAssistant();

  useEffect(() => {
    // Load counts for all exams in parallel
    Promise.all(
      K12_EXAMS.map(async (exam) => {
        const qs = await loadK12ExamQuestions(exam.examKeys, exam.legacyJsonFiles);
        return { id: exam.id, count: qs.length };
      })
    ).then((results) => {
      const counts: Record<string, number> = {};
      results.forEach(r => { counts[r.id] = r.count; });
      setQuestionCounts(counts);
      setLoadingCounts(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-24">
      <SEO
        title="Free K-12 State & Standardized Test Prep"
        description="Free practice for MAP Growth, GED, HiSET, TASC, PSSA, Regents, Iowa Assessments, STAR, and more — adaptive and aligned to each exam."
        path="/k12-exams"
      />
      <div className="max-w-lg mx-auto space-y-5 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Homeschool & K-12 Exams</h1>
          <p className="text-sm text-muted-foreground">Standardized tests for homeschool and K-12 students</p>
        </div>

        <ConsentGate consentType="k12_ip" consentKey="k12_disclaimer" title="Important Disclaimer" disclaimerText={K12_DISCLAIMER} checkboxLabel={K12_CHECKBOX}>
          {/* Daily Challenge is the primary entry point — it's the friendliest
              way in and the one most students should try first. AI Assistant
              (formerly "Adaptive Tutor") is optional and can be turned off in
              Settings; when off we hide the card entirely. */}
          <Card
            className="p-5 border-2 cursor-pointer transition-all hover:border-primary/40 hover:scale-[1.01] hover:shadow-md bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 mb-3"
            onClick={() => navigate("/k12-daily")}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-500 shrink-0" />
              <div className="flex-1">
                <h2 className="font-bold">Daily Challenge</h2>
                <p className="text-xs text-muted-foreground">Start here — a fresh mini-set every day, tuned to your weak skills.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          {aiAssistantOn && (
            <Card
              className="p-4 border-2 cursor-pointer transition-all hover:border-primary/30 hover:scale-[1.01] hover:shadow-md bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 mb-2"
              onClick={() => navigate("/k12-tutor/ged")}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary shrink-0" />
                <div className="flex-1">
                  <h2 className="font-bold text-sm">AI Assistant <span className="text-[10px] font-normal text-muted-foreground">(optional)</span></h2>
                  <p className="text-[11px] text-muted-foreground">Hints and difficulty that adapt to you. Skip it any time.</p>
                </div>
              </div>
            </Card>
          )}
          <p className="text-[11px] text-muted-foreground mb-4 text-center">
            {aiAssistantOn ? (
              <>Prefer to study without the AI? <Link to="/settings#ai-assistant" className="text-primary hover:underline">Turn AI Assistant off</Link></>
            ) : (
              <>AI Assistant is off. <Link to="/settings#ai-assistant" className="text-primary hover:underline">Turn it back on</Link></>
            )}
          </p>

          <div className="space-y-3">
            {K12_EXAMS.map((exam) => {
              const count = questionCounts[exam.id];
              return (
                <Card
                  key={exam.id}
                  className="p-4 border-2 cursor-pointer transition-all hover:border-primary/30 hover:scale-[1.01] hover:shadow-md"
                  onClick={() => navigate(`/k12-exam/${exam.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{exam.icon}</span>
                    <div className="flex-1">
                      <h2 className="font-bold text-sm">{exam.name}</h2>
                      <p className="text-xs text-muted-foreground">{exam.description}</p>
                      {!loadingCounts && count !== undefined && (
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {count.toLocaleString()} questions
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </ConsentGate>
      </div>
      <BottomNav />
    </div>
  );
};

export default K12Exams;
