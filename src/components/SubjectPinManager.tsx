import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Pin } from "lucide-react";

type ExamType = "sat" | "psat" | "act" | string;

type PinOption = {
  id: string;
  label: string;
  category: "Practice" | "Study" | "AI Help" | "Progress";
  exams?: ExamType[]; // omit = all exams
};

// Curated, exam-aware pin list. Limited to the most pin-worthy tiles
// (no duplicates, nothing off-topic for the chosen exam).
const PIN_OPTIONS: PinOption[] = [
  // Practice
  { id: "by-topic",       label: "📖 By Topic",        category: "Practice" },
  { id: "weaknesses",     label: "🎯 Weaknesses",      category: "Practice" },
  { id: "review-missed",  label: "🔄 Review Missed",   category: "Practice" },
  { id: "full-test",      label: "📝 Full Test",       category: "Practice" },
  { id: "booster",        label: "🚀 Booster Test",    category: "Practice" },

  // Study
  { id: "sat-vocab",      label: "📗 Vocabulary",      category: "Study" },
  { id: "key-rules",      label: "💡 Key Rules",       category: "Study" },
  { id: "flashcards",     label: "🃏 Flashcards",      category: "Study" },

  // AI Help — kept tight; no duplicate coach/tutor pinning
  { id: "ai-tutor",       label: "💬 AI Tutor",        category: "AI Help" },
  { id: "thinkpath",      label: "🧭 ThinkPath",       category: "AI Help" },
  { id: "homework-solver",label: "📐 HW Solver",       category: "AI Help" },

  // Progress
  { id: "study-progress", label: "🏆 Study Progress",  category: "Progress" },
  { id: "insights",       label: "🧠 Insights",        category: "Progress" },
  { id: "score-predictor",label: "📈 Score Predictor", category: "Progress" },
];

interface SubjectPinManagerProps {
  isOpen: boolean;
  onClose: () => void;
  pinnedSubjects: string[];
  onSave: (subjects: string[]) => void;
  examType?: ExamType;
}

const MAX_PINS = 6;

export const SubjectPinManager = ({ isOpen, onClose, pinnedSubjects, onSave, examType }: SubjectPinManagerProps) => {
  const [selected, setSelected] = useState<string[]>(pinnedSubjects);
  const { user } = useAuth();

  useEffect(() => {
    setSelected(pinnedSubjects);
  }, [pinnedSubjects, isOpen]);

  const available = useMemo(
    () => PIN_OPTIONS.filter(o => !o.exams || !examType || o.exams.includes(examType)),
    [examType]
  );

  const grouped = useMemo(() => {
    const out: Record<string, PinOption[]> = {};
    available.forEach(o => {
      (out[o.category] ||= []).push(o);
    });
    return out;
  }, [available]);

  const toggleSubject = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(s => s !== id);
      if (prev.length >= MAX_PINS) {
        toast.info(`You can pin up to ${MAX_PINS}. Unpin one first.`);
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ pinned_subjects: selected } as any)
      .eq("id", user.id);
    if (error) {
      toast.error("Failed to save preferences");
      return;
    }
    onSave(selected);
    toast.success("Dashboard customized!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pin className="w-5 h-5 text-primary" />
            Pin Your Shortcuts
          </DialogTitle>
          <DialogDescription>
            Pick up to {MAX_PINS} shortcuts to keep at the top of your dashboard.
            Only options relevant to your selected exam are shown.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {category}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {items.map(subject => (
                  <label
                    key={subject.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      selected.includes(subject.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <Checkbox
                      checked={selected.includes(subject.id)}
                      onCheckedChange={() => toggleSubject(subject.id)}
                    />
                    <span className="text-sm font-medium">{subject.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save ({selected.length}/{MAX_PINS} pinned)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
