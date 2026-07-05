import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Calendar, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { K12_EXAMS } from "@/utils/k12ExamConfig";
import { loadK12ExamQuestions } from "@/data/k12Questions";
import { ConsentGate } from "@/components/ConsentGate";
import { SEO } from "@/components/SEO";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <SEO
        title="Free K-12 State & Standardized Test Prep"
        description="Free practice for MAP Growth, GED, HiSET, TASC, PSSA, Regents, Iowa Assessments, STAR, and more — adaptive and aligned to each exam."
        path="/k12-exams"
      />
      <div className="max-w-lg mx-auto space-y-5 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Homeschool & K-12 Exams</h1>
          <p className="text-sm text-muted-foreground">Standardized tests for homeschool and K-12 students</p>
        </div>

        <ConsentGate consentType="k12_ip" consentKey="k12_disclaimer" title="Important Disclaimer" disclaimerText={K12_DISCLAIMER} checkboxLabel={K12_CHECKBOX}>
          {/* Daily Challenge + Adaptive Tutor shortcuts */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card
              className="p-4 border-2 cursor-pointer transition-all hover:border-primary/30 hover:scale-[1.01] hover:shadow-md bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20"
              onClick={() => navigate("/k12-daily")}
            >
              <div className="text-center space-y-1">
                <Calendar className="w-6 h-6 mx-auto text-orange-500" />
                <h2 className="font-bold text-sm">Daily Challenge</h2>
                <p className="text-[10px] text-muted-foreground">Unique daily questions targeting your weak skills</p>
              </div>
            </Card>
            <Card
              className="p-4 border-2 cursor-pointer transition-all hover:border-primary/30 hover:scale-[1.01] hover:shadow-md bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20"
              onClick={() => navigate("/k12-tutor/ged")}
            >
              <div className="text-center space-y-1">
                <Brain className="w-6 h-6 mx-auto text-primary" />
                <h2 className="font-bold text-sm">Adaptive Tutor</h2>
                <p className="text-[10px] text-muted-foreground">AI-powered hints & difficulty that adapts to you</p>
              </div>
            </Card>
          </div>

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
    </div>
  );
};

export default K12Exams;
