import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FlagQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionType: 'math' | 'english' | 'science';
  questionData?: Record<string, any>;
}

export const FlagQuestionModal = ({ isOpen, onClose, questionId, questionType, questionData }: FlagQuestionModalProps) => {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!userId) {
      toast({ title: "Please sign in to flag questions", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: flagData, error } = await supabase.from('flagged_questions').insert({
        question_id: questionId,
        question_type: questionType,
        issue_type: 'user_report',
        notes: notes.trim() || null,
        user_id: userId,
      }).select('id').single();

      if (error) throw error;

      // Send email notification to admins (fire and forget)
      supabase.functions.invoke('notify-flagged-question', {
        body: {
          questionId,
          questionType,
          issueType: 'user_report',
          notes: notes.trim() || undefined,
        },
      }).catch(err => console.error('Email notification failed:', err));

      // Trigger AI auto-fix if we have question data (fire and forget)
      if (questionData && flagData?.id) {
        supabase.functions.invoke('ai-fix-question', {
          body: {
            flagId: flagData.id,
            questionData,
            issueType: 'user_report',
            notes: notes.trim() || undefined,
          },
        }).catch(err => console.error('AI fix generation failed:', err));
      }

      toast({ 
        title: "Thank you for letting us know! 🙏", 
        description: "We will review, adjust, and let you know when it's fixed." 
      });
      onClose();
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
          <DialogDescription>
            Tell us what's wrong and we'll fix it.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Textarea
            placeholder="What's the problem with this question?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={500}
            rows={4}
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
