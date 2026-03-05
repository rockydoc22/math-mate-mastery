import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Pin } from "lucide-react";

const ALL_SUBJECTS = [
  { id: "arcade", label: "🎮 Arcade" },
  { id: "full-test", label: "📝 Full Test" },
  { id: "study-progress", label: "🏆 Study Progress" },
  { id: "by-topic", label: "📖 By Topic" },
  { id: "weaknesses", label: "🎯 Weaknesses" },
  { id: "review-missed", label: "🔄 Review Missed" },
  { id: "insights", label: "🧠 Insights" },
  { id: "key-rules", label: "💡 Key Rules" },
  { id: "boss-battle", label: "💀 Boss Battle" },
  { id: "elite-practice", label: "👑 Elite Practice" },
  { id: "sat-vocab", label: "📗 SAT Vocab" },
  { id: "french-comp", label: "🌐 French Comp" },
  { id: "writing-lab", label: "✍️ Writing Lab" },
  { id: "ap-tests", label: "🧪 AP Tests" },
  { id: "essay-grader", label: "📄 Essay Grader" },
];

interface SubjectPinManagerProps {
  isOpen: boolean;
  onClose: () => void;
  pinnedSubjects: string[];
  onSave: (subjects: string[]) => void;
}

export const SubjectPinManager = ({ isOpen, onClose, pinnedSubjects, onSave }: SubjectPinManagerProps) => {
  const [selected, setSelected] = useState<string[]>(pinnedSubjects);
  const { user } = useAuth();

  useEffect(() => {
    setSelected(pinnedSubjects);
  }, [pinnedSubjects, isOpen]);

  const toggleSubject = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
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
            Pin Your Subjects
          </DialogTitle>
          <DialogDescription>
            Pinned subjects appear first on your dashboard. Select the ones you're actively studying.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto py-2">
          {ALL_SUBJECTS.map(subject => (
            <label
              key={subject.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
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
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save ({selected.length} pinned)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
