import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";
import { useExamType } from "@/hooks/useExamType";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const HighSchoolExams = () => {
  const navigate = useNavigate();
  const { setExamType } = useExamType();
  const { user } = useAuth();

  const handleExamSelect = async (type: ExamType) => {
    await setExamType(type);
    if (user) sessionStorage.setItem(`exam_choice_session_${user.id}`, "true");
    toast.success(`Switched to ${EXAM_CONFIGS[type].name || type.toUpperCase()}!`, {
      description: "You can change this anytime in Settings.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <SEO
        title="Free SAT, ACT & PSAT Practice"
        description="Authentic SAT practice questions plus full ACT and PSAT prep — 100% free. Adaptive quizzes, score prediction, and instant explanations."
        path="/high-school-exams"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "SAT, ACT & PSAT Prep",
          description: "Free adaptive prep for the SAT, ACT, and PSAT.",
          provider: { "@type": "Organization", name: "AlphaOmega" },
        }}
      />
      <div className="max-w-lg mx-auto space-y-5 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">High School Exams</h1>
          <p className="text-sm text-muted-foreground">Choose your exam to start practicing</p>
        </div>

        <div className="space-y-3">
          {/* SAT */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => handleExamSelect('sat')}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{EXAM_CONFIGS.sat.icon}</span>
              <div>
                <h3 className="font-bold text-lg">SAT</h3>
                <p className="text-xs text-muted-foreground">{EXAM_CONFIGS.sat.tagline}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Score: {EXAM_CONFIGS.sat.scoreRange.min}–{EXAM_CONFIGS.sat.scoreRange.max}</p>
              </div>
            </div>
          </Card>

          {/* PSAT */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => handleExamSelect('psat')}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{EXAM_CONFIGS.psat.icon}</span>
              <div>
                <h3 className="font-bold text-lg">PSAT/NMSQT</h3>
                <p className="text-xs text-muted-foreground">{EXAM_CONFIGS.psat.tagline}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Score: {EXAM_CONFIGS.psat.scoreRange.min}–{EXAM_CONFIGS.psat.scoreRange.max}</p>
              </div>
            </div>
          </Card>

          {/* ACT */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => handleExamSelect('act')}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{EXAM_CONFIGS.act.icon}</span>
              <div>
                <h3 className="font-bold text-lg">ACT</h3>
                <p className="text-xs text-muted-foreground">{EXAM_CONFIGS.act.tagline}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Score: {EXAM_CONFIGS.act.scoreRange.min}–{EXAM_CONFIGS.act.scoreRange.max}</p>
              </div>
            </div>
          </Card>

          {/* AP Tests */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate("/ap-tests")}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🧪</span>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg">AP Tests</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">NEW</span>
                </div>
                <p className="text-xs text-muted-foreground">Physics, Bio, Calc & more</p>
                <p className="text-[10px] text-muted-foreground mt-1">Score: 1–5</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HighSchoolExams;
