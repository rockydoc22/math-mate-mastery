import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, SkipForward } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface FlagQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionType: string;
  questionData?: Record<string, any>;
  onFlagged?: () => void;
}

export const FlagQuestionModal = ({ isOpen, onClose, questionId, questionType, questionData, onFlagged }: FlagQuestionModalProps) => {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setNotes('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!user?.id) {
      toast({ title: "Please sign in to flag questions", variant: "destructive" });
      return;
    }

    if (!questionId) {
      toast({ title: "Error", description: "Missing question ID. Please try again.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: flagData, error } = await supabase.from('flagged_questions').insert({
        question_id: questionId,
        question_type: questionType === 'science' ? 'math' : questionType,
        issue_type: 'user_report',
        notes: notes.trim() || null,
        user_id: user.id,
      }).select('id').single();

      if (error) {
        console.error('Flag insert error:', error);
        throw error;
      }

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
        description: "We will review and fix this question." 
      });
      setSubmitted(true);
    } catch (error: any) {
      console.error('Error flagging question:', error);
      toast({ 
        title: "Error", 
        description: error?.message || "Failed to flag question. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onFlagged?.();
    onClose();
  };

  const handleCloseAfterSubmit = () => {
    onClose();
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleCloseAfterSubmit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Question Flagged
            </DialogTitle>
            <DialogDescription>
              This question has been reported and will be reviewed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">No penalty for this question! 🛡️</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• <strong>Guess and get it right?</strong> You still get full credit! ✅</li>
                <li>• <strong>Guess and get it wrong?</strong> No penalty at all — it's the question's fault, not yours. 🙅</li>
                <li>• <strong>Want to skip?</strong> Move on with no effect on your score.</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button onClick={handleSkip} variant="outline" className="w-full gap-2">
              <SkipForward className="w-4 h-4" />
              Skip Without Penalty
            </Button>
            <Button onClick={handleCloseAfterSubmit} className="w-full">
              Try Answering (No Penalty if Wrong)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

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
          <Button onClick={handleSubmit} disabled={isSubmitting || !user}>
            {isSubmitting ? "Submitting..." : !user ? "Sign in to flag" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
