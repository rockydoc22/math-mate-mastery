import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Target, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Play,
    title: "Welcome to SAT Mastery! 🎯",
    description: "The 100% free SAT, PSAT & ACT prep platform built by students, for students.",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Adaptive Practice",
    description: "Questions adapt to your skill level. The more you practice, the smarter your study plan gets.",
    color: "text-emerald-500",
  },
  {
    icon: Brain,
    title: "Track & Improve",
    description: "Review missed questions, track your progress, and compete with friends on the leaderboard.",
    color: "text-purple-500",
  },
];

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("sat_mastery_welcome_seen");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("sat_mastery_welcome_seen", "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const current = steps[step];
  const Icon = current.icon;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="flex flex-col items-center gap-4 py-4">
          <div className={`p-4 rounded-full bg-primary/10`}>
            <Icon className={`w-10 h-10 ${current.color}`} />
          </div>
          <h2 className="text-xl font-bold">{current.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{current.description}</p>

          {/* Step dots */}
          <div className="flex gap-2 mt-2">
            {steps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>

          <div className="flex gap-3 w-full mt-2">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1 gap-2">
              {step === steps.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Let's Go!
                </>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
