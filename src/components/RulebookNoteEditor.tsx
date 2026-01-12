import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BookOpen, Save, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useRulebookNotes, RulebookNote } from '@/hooks/useRulebookNotes';
import { motion, AnimatePresence } from 'framer-motion';

interface RulebookNoteEditorProps {
  questionId: string;
  attemptId?: string;
  onSaved?: () => void;
  compact?: boolean;
}

export const RulebookNoteEditor = ({ 
  questionId, 
  attemptId,
  onSaved,
  compact = false 
}: RulebookNoteEditorProps) => {
  const { saveNote, getNoteForQuestion, loading } = useRulebookNotes();
  const [expanded, setExpanded] = useState(!compact);
  const [existingNote, setExistingNote] = useState<RulebookNote | null>(null);
  
  const [errorPattern, setErrorPattern] = useState('');
  const [triggerPhrase, setTriggerPhrase] = useState('');
  const [preventionRule, setPreventionRule] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      const note = await getNoteForQuestion(questionId);
      if (note) {
        setExistingNote(note);
        setErrorPattern(note.errorPattern);
        setTriggerPhrase(note.triggerPhrase);
        setPreventionRule(note.preventionRule);
        setNotes(note.notes);
      }
    };
    loadNote();
  }, [questionId, getNoteForQuestion]);

  const handleSave = async () => {
    const success = await saveNote(questionId, {
      errorPattern,
      triggerPhrase,
      preventionRule,
      notes,
      attemptId,
    });
    if (success) {
      onSaved?.();
    }
  };

  const hasContent = errorPattern || triggerPhrase || preventionRule || notes;

  if (compact && !expanded) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setExpanded(true)}
        className="w-full gap-2 border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
      >
        <BookOpen className="w-4 h-4" />
        {existingNote ? 'Edit Rulebook Note' : 'Add to Rulebook'}
        <ChevronDown className="w-4 h-4 ml-auto" />
      </Button>
    );
  }

  return (
    <Card className="border-2 border-amber-500/30 bg-amber-500/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            Personal Rulebook
          </CardTitle>
          {compact && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Log the error pattern, what triggered it, and your prevention rule
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div>
              <Label className="text-xs font-medium">What error did I make?</Label>
              <Textarea
                placeholder="e.g., Solved for x when question asked for 2x"
                value={errorPattern}
                onChange={(e) => setErrorPattern(e.target.value)}
                className="mt-1 h-16 text-sm resize-none"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">What phrase/pattern triggered it?</Label>
              <Textarea
                placeholder='e.g., "What is the value of..."'
                value={triggerPhrase}
                onChange={(e) => setTriggerPhrase(e.target.value)}
                className="mt-1 h-16 text-sm resize-none"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">My prevention rule:</Label>
              <Textarea
                placeholder='e.g., Circle what the question is ACTUALLY asking before solving'
                value={preventionRule}
                onChange={(e) => setPreventionRule(e.target.value)}
                className="mt-1 h-16 text-sm resize-none"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Additional notes (optional)</Label>
              <Textarea
                placeholder="Any other observations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 h-12 text-sm resize-none"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={loading || !hasContent}
              className="w-full gap-2"
              size="sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {existingNote ? 'Update Rulebook Entry' : 'Save to Rulebook'}
            </Button>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
