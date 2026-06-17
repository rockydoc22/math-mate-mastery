import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calculator, PenTool, BookOpen, FlaskConical, TrendingUp, Target, Layout } from "lucide-react";
import { useSkillRating } from "@/hooks/useSkillRating";
import { useTopicMastery } from "@/hooks/useTopicMastery";
import { EXAM_CONFIGS, ratingToExamScore, ratingToSectionScore, type ExamType } from "@/utils/examConfig";

const LAST_QUIZ_KEY = (exam: ExamType) => `ao_last_${exam}_quiz`;

type SectionDef = { key: string; label: string; icon: any; subject: string };

const SECTIONS: Record<ExamType, SectionDef[]> = {
  sat:  [
    { key: "math",    label: "Math",              icon: Calculator, subject: "math" },
    { key: "english", label: "Reading & Writing", icon: PenTool,    subject: "english" },
  ],
  psat: [
    { key: "math",    label: "Math",              icon: Calculator, subject: "math" },
    { key: "english", label: "Reading & Writing", icon: PenTool,    subject: "english" },
  ],
  act:  [
    { key: "math",    label: "Math",    icon: Calculator,   subject: "math" },
    { key: "english", label: "English", icon: PenTool,      subject: "english" },
    { key: "reading", label: "Reading", icon: BookOpen,     subject: "reading" },
    { key: "science", label: "Science", icon: FlaskConical, subject: "science" },
  ],
};

const TAGLINES: Record<ExamType, string> = {
  sat:  "SAT · 40²",
  psat: "PSAT/NMSQT · 39² + i²",
  act:  "ACT · 6²",
};

/** Minimal landing: Continue + Practice-by-section + Score & weak areas. */
export function ExamFocusLanding({
  examType,
  onShowFull,
}: {
  examType: ExamType;
  onShowFull: () => void;
}) {
  const navigate = useNavigate();
  const { ratings } = useSkillRating();
  const { weakestMathTopics, weakestEnglishTopics } = useTopicMastery();

  const config = EXAM_CONFIGS[examType];
  const sections = SECTIONS[examType] ?? SECTIONS.sat;
  const lastKey = LAST_QUIZ_KEY(examType);

  const lastRoute = (() => {
    try { return localStorage.getItem(lastKey) || ""; } catch { return ""; }
  })();

  const projectedRange = ratings ? ratingToExamScore(ratings.overallRating, examType) : null;
  const projected = projectedRange ? Math.round((projectedRange.min + projectedRange.max) / 2) : null;

  const sectionScore = (subject: string) => {
    if (!ratings) return null;
    if (subject === "math")    return ratingToSectionScore(ratings.mathRating, examType);
    if (subject === "english") return ratingToSectionScore(ratings.englishRating, examType);
    return null;
  };

  const weakAreas = [...weakestMathTopics, ...weakestEnglishTopics].slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-6">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{TAGLINES[examType]}</p>
          <h1 className="text-2xl font-bold">Ready when you are</h1>
        </div>

        {/* 1. Continue where you left off */}
        <Card className="p-4 border-2 border-primary/30 bg-card">
          <Button
            size="lg"
            className="w-full h-14 gap-3 text-base font-bold"
            onClick={() => navigate(lastRoute || `/quiz?subject=both&count=10&difficulty=all&timer=true`)}
          >
            <Play className="w-5 h-5" />
            {lastRoute ? "Continue where you left off" : "Start practicing"}
          </Button>
        </Card>

        {/* 2. Practice by section */}
        <Card className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Practice by section
          </p>
          <div className={`grid ${sections.length === 4 ? "grid-cols-2" : "grid-cols-2"} gap-2`}>
            {sections.map(({ key, label, icon: Icon, subject }) => {
              const score = sectionScore(subject);
              const route = `/quiz?subject=${subject}&count=10&timer=true`;
              return (
                <Button
                  key={key}
                  variant="outline"
                  className="h-20 flex-col gap-1"
                  onClick={() => {
                    try { localStorage.setItem(lastKey, route); } catch {}
                    navigate(route);
                  }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold">{label}</span>
                  {score != null && (
                    <span className="text-[10px] text-muted-foreground">~{score}</span>
                  )}
                </Button>
              );
            })}
          </div>
        </Card>

        {/* 3. Score prediction + top weak areas */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Projected {config.shortName}
              </p>
            </div>
            <span className="text-2xl font-bold text-primary">{projected ?? "—"}</span>
          </div>
          {weakAreas.length > 0 ? (
            <div className="space-y-1.5 pt-2 border-t">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Target className="w-3 h-3" /> Drill these next
              </p>
              {weakAreas.map((t: any) => (
                <button
                  key={t.topic || t.id}
                  onClick={() => navigate(`/study?mode=weakness`)}
                  className="w-full text-left text-sm px-2 py-1.5 rounded hover:bg-muted flex items-center justify-between"
                >
                  <span className="truncate">{t.topic || t.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {Math.round((t.accuracy ?? 0) * 100)}%
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground pt-2 border-t">
              Answer a few questions to see your weak areas.
            </p>
          )}
        </Card>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs text-muted-foreground gap-1"
          onClick={onShowFull}
        >
          <Layout className="w-3 h-3" /> Show full dashboard
        </Button>
      </div>
    </div>
  );
}