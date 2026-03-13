import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Target, BookOpen, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface OnboardingFlowProps {
  onComplete: (data: { gradeLevel: string; primaryGoal: string; targetExam: string }) => void;
}

const GRADES = ["6", "7", "8", "9", "10", "11", "12"];

const GOALS = [
  { label: "Improve grades", value: "improve_grades" },
  { label: "Prepare for exam", value: "prepare_exam" },
  { label: "Practice skills", value: "practice_skills" },
  { label: "Challenge friends", value: "challenge_friends" },
];

const EXAMS = [
  "SAT", "PSAT", "ACT", "AP", "GED", "HiSET", "TASC",
  "MAP", "STAR", "Iowa/ITBS", "Stanford 10", "TerraNova",
  "PSSA", "Regents", "General Practice",
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState("");
  const [goal, setGoal] = useState("");
  const [exam, setExam] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await supabase.from("profiles").update({
        grade_level: grade,
        primary_goal: goal,
        exam_type: exam.toLowerCase().replace(/\//g, "_"),
      }).eq("id", user.id);
    } catch (e) {
      console.error("Onboarding save error:", e);
    }
    setSaving(false);
    onComplete({ gradeLevel: grade, primaryGoal: goal, targetExam: exam });
  };

  const steps = [
    {
      title: "What grade are you in?",
      icon: GraduationCap,
      content: (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map(g => (
            <button
              key={g}
              onClick={() => { setGrade(g); setStep(1); }}
              className={`p-3 rounded-xl border-2 text-lg font-bold transition-all ${
                grade === g ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "What's your main goal?",
      icon: Target,
      content: (
        <div className="space-y-2">
          {GOALS.map(g => (
            <button
              key={g.value}
              onClick={() => { setGoal(g.value); setStep(2); }}
              className={`w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                goal === g.value ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Which test are you targeting?",
      icon: BookOpen,
      content: (
        <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
          {EXAMS.map(e => (
            <button
              key={e}
              onClick={() => setExam(e)}
              className={`p-2.5 rounded-lg border-2 text-xs font-medium transition-all ${
                exam === e ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
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
  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Step {step + 1} of 3</p>
            <h2 className="text-lg font-bold">{current.title}</h2>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        {current.content}

        {step === 2 && exam && (
          <Button
            onClick={handleFinish}
            disabled={saving}
            className="w-full mt-4 gap-2"
          >
            {saving ? "Saving..." : "Let's Go!"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {step > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setStep(s => s - 1)} className="mt-3 w-full">
            Back
          </Button>
        )}
      </Card>
    </div>
  );
}
