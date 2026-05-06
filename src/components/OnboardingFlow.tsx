import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Target, BookOpen, ChevronRight, Sparkles, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface OnboardingFlowProps {
  onComplete: (data: { gradeLevel: string; primaryGoal: string; targetExam: string }) => void;
}

const STAGES = [
  { label: "High School", value: "high_school", icon: BookOpen, description: "Grades 6–12", color: "text-blue-600 dark:text-blue-400" },
  { label: "College / Transfer", value: "college", icon: GraduationCap, description: "Undergrad or transfer", color: "text-teal-600 dark:text-teal-400" },
  { label: "Grad / Professional", value: "grad", icon: Briefcase, description: "Graduate & professional school", color: "text-purple-600 dark:text-purple-400" },
];

const GOALS = [
  { label: "Prepare for an exam", value: "prepare_exam", emoji: "🎯" },
  { label: "Improve my grades", value: "improve_grades", emoji: "📈" },
  { label: "Practice skills", value: "practice_skills", emoji: "💪" },
  { label: "Challenge friends", value: "challenge_friends", emoji: "⚔️" },
];

const EXAMS_BY_STAGE: Record<string, string[]> = {
  high_school: ["SAT", "PSAT", "ACT", "AP", "Regents", "General Practice"],
  college: ["GED", "HiSET", "TASC", "MAP", "STAR", "Iowa/ITBS", "Stanford 10", "TerraNova", "PSSA", "General Practice"],
  grad: ["MCAT", "GRE", "LSAT", "GMAT", "General Practice"],
};

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState("");
  const [goal, setGoal] = useState("");
  const [exam, setExam] = useState("");
  const [saving, setSaving] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // Fire-and-forget analytics
  const track = (event: string, extra: Record<string, any> = {}) => {
    supabase.from("onboarding_events").insert({
      user_id: user?.id ?? null,
      event,
      step_index: extra.step_index ?? null,
      stage: extra.stage ?? stage ?? null,
      goal: extra.goal ?? goal ?? null,
      exam: extra.exam ?? exam ?? null,
      meta: extra.meta ?? {},
    }).then(() => {}, () => {});
  };

  // View tracking on each step
  useEffect(() => {
    track("step_viewed", { step_index: step });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const availableExams = EXAMS_BY_STAGE[stage] || [];

  const handleFinish = async () => {
    if (!user) return;
    setShowLoading(true);
    setSaving(true);

    track("completed", { step_index: 2, exam });

    // Derive grade_level from stage
    const gradeMap: Record<string, string> = { high_school: "10", college: "college", grad: "grad" };
    const gradeLevel = gradeMap[stage] || "10";

    try {
      await supabase.from("profiles").update({
        grade_level: gradeLevel,
        primary_goal: goal,
        exam_type: exam.toLowerCase().replace(/\//g, "_"),
      }).eq("id", user.id);
    } catch (e) {
      console.error("Onboarding save error:", e);
    }

    // Show personalization loading for 2 seconds
    await new Promise(r => setTimeout(r, 2000));
    setSaving(false);
    setShowLoading(false);
    onComplete({ gradeLevel, primaryGoal: goal, targetExam: exam });
  };

  // Personalization loading screen
  if (showLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg animate-pulse">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold">Building your perfect dashboard…</h2>
          <p className="text-sm text-muted-foreground">
            Personalizing everything for {exam} prep.
          </p>
          <div className="w-48 mx-auto h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-[loading_2s_ease-in-out]" style={{ animation: 'loading 2s ease-in-out forwards' }} />
          </div>
        </div>
        <style>{`@keyframes loading { from { width: 0% } to { width: 100% } }`}</style>
      </div>
    );
  }

  const steps = [
    {
      title: "What stage are you at?",
      subtitle: "We'll personalize everything for you",
      content: (
        <div className="space-y-3">
          {STAGES.map(s => (
            <button
              key={s.value}
              onClick={() => { setStage(s.value); track("stage_selected", { step_index: 0, stage: s.value }); setStep(1); }}
              className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 text-left transition-all ${
                stage === s.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="p-2 rounded-lg bg-muted">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="font-semibold text-sm">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "What's your main goal?",
      subtitle: "This helps us recommend the right activities",
      content: (
        <div className="space-y-2">
          {GOALS.map(g => (
            <button
              key={g.value}
              onClick={() => { setGoal(g.value); track("goal_selected", { step_index: 1, goal: g.value }); setStep(2); }}
              className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-center gap-3 ${
                goal === g.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-lg">{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Which test are you targeting?",
      subtitle: "You can always change this later in Settings",
      content: (
        <div className="space-y-2">
          {availableExams.map(e => (
            <button
              key={e}
              onClick={() => { setExam(e); track("exam_selected", { step_index: 2, exam: e }); }}
              className={`w-full p-3 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                exam === e ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      ),
    },
  ];

  const current = steps[step];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 space-y-6">
        {/* Progress bar */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        {/* Header */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Step {step + 1} of 3</p>
          <h2 className="text-xl font-bold">{current.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{current.subtitle}</p>
        </div>

        {/* Content */}
        {current.content}

        {/* Continue button on last step */}
        {step === 2 && exam && (
          <Button onClick={handleFinish} disabled={saving} className="w-full gap-2 h-12">
            {saving ? "Saving..." : "Build My Dashboard"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {/* Back button */}
        {step > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setStep(s => s - 1)} className="w-full">
            Back
          </Button>
        )}
      </Card>
    </div>
  );
}
