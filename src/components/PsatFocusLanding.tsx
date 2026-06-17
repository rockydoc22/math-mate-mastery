import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calculator, PenTool, TrendingUp, Target, Layout } from "lucide-react";
import { useSkillRating } from "@/hooks/useSkillRating";
import { useTopicMastery } from "@/hooks/useTopicMastery";
import { ratingToExamScore, ratingToSectionScore } from "@/utils/examConfig";

const LAST_PSAT_QUIZ_KEY = "ao_last_psat_quiz";

/** Minimal PSAT landing: just the 3 things a student needs at open. */
export function PsatFocusLanding({ onShowFull }: { onShowFull: () => void }) {
  const navigate = useNavigate();
  const { ratings } = useSkillRating();
  const { weakestMathTopics, weakestEnglishTopics } = useTopicMastery();

  const lastRoute = (() => {
    try { return localStorage.getItem(LAST_PSAT_QUIZ_KEY) || ""; } catch { return ""; }
  })();

  const projectedRange = ratings ? ratingToExamScore(ratings.overallRating, 'psat') : null;
  const projected = projectedRange ? Math.round((projectedRange.min + projectedRange.max) / 2) : null;
  const mathScore = ratings ? ratingToSectionScore(ratings.mathRating, 'psat') : null;
  const engScore = ratings ? ratingToSectionScore(ratings.englishRating, 'psat') : null;

  const weakAreas = [...weakestMathTopics, ...weakestEnglishTopics].slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-6">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">PSAT/NMSQT · 39² + i²</p>
          <h1 className="text-2xl font-bold">Ready when you are</h1>
        </div>

        {/* 1. Continue where you left off */}
        <Card className="p-4 border-2 border-primary/30 bg-card">
          <Button
            size="lg"
            className="w-full h-14 gap-3 text-base font-bold"
            onClick={() => navigate(lastRoute || '/quiz?subject=both&count=10&difficulty=all&timer=true')}
          >
            <Play className="w-5 h-5" />
            {lastRoute ? 'Continue where you left off' : 'Start practicing'}
          </Button>
        </Card>

        {/* 2. Practice by section */}
        <Card className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Practice by section</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline" className="h-20 flex-col gap-1"
              onClick={() => {
                try { localStorage.setItem(LAST_PSAT_QUIZ_KEY, '/quiz?subject=math&count=10&timer=true'); } catch {}
                navigate('/quiz?subject=math&count=10&timer=true');
              }}
            >
              <Calculator className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold">Math</span>
              {mathScore != null && <span className="text-[10px] text-muted-foreground">~{mathScore}</span>}
            </Button>
            <Button
              variant="outline" className="h-20 flex-col gap-1"
              onClick={() => {
                try { localStorage.setItem(LAST_PSAT_QUIZ_KEY, '/quiz?subject=english&count=10&timer=true'); } catch {}
                navigate('/quiz?subject=english&count=10&timer=true');
              }}
            >
              <PenTool className="w-6 h-6 text-secondary" />
              <span className="text-sm font-semibold">Reading & Writing</span>
              {engScore != null && <span className="text-[10px] text-muted-foreground">~{engScore}</span>}
            </Button>
          </div>
        </Card>

        {/* 3. Score prediction + top weak areas */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projected PSAT</p>
            </div>
            <span className="text-2xl font-bold text-primary">{projected ?? '—'}</span>
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
                  <span className="text-[10px] text-muted-foreground">{Math.round((t.accuracy ?? 0) * 100)}%</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground pt-2 border-t">Answer a few questions to see your weak areas.</p>
          )}
        </Card>

        <Button
          variant="ghost" size="sm"
          className="w-full text-xs text-muted-foreground gap-1"
          onClick={onShowFull}
        >
          <Layout className="w-3 h-3" /> Show full dashboard
        </Button>
      </div>
    </div>
  );
}