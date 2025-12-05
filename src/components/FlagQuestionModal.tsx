import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FlagQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionType: 'math' | 'english';
}

const issueTypes = [
  { value: 'incorrect_answer', label: 'Incorrect Answer' },
  { value: 'typo', label: 'Typo or Grammar Error' },
  { value: 'unclear', label: 'Unclear Wording' },
  { value: 'offensive', label: 'Offensive Content' },
  { value: 'other', label: 'Other Issue' },
];

export const FlagQuestionModal = ({ isOpen, onClose, questionId, questionType }: FlagQuestionModalProps) => {
  const [issueType, setIssueType] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!issueType) {
      toast({ title: "Please select an issue type", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('flagged_questions').insert({
        question_id: questionId,
        question_type: questionType,
        issue_type: issueType,
        notes: notes.trim() || null,
      });

      if (error) throw error;

      toast({ title: "Question flagged", description: "Thank you for your feedback!" });
      onClose();
      setIssueType('');
      setNotes('');
    } catch (error) {
      console.error('Error flagging question:', error);
      toast({ title: "Error", description: "Failed to flag question. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report an Issue</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>What's wrong with this question?</Label>
            <RadioGroup value={issueType} onValueChange={setIssueType}>
              {issueTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="font-normal cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional details (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Describe the issue..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
