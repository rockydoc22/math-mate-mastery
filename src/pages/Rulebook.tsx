import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ArrowLeft, Trash2, Loader2, AlertTriangle, Brain, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRulebookNotes, RulebookNote } from '@/hooks/useRulebookNotes';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

interface MissPatternStats {
  reason: string;
  count: number;
  label: string;
  icon: string;
}

const Rulebook = () => {
  const { user } = useAuth();
  const { getAllNotes, deleteNote, loading } = useRulebookNotes();
  const [notes, setNotes] = useState<RulebookNote[]>([]);
  const [missPatterns, setMissPatterns] = useState<MissPatternStats[]>([]);
  const [loadingPatterns, setLoadingPatterns] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      // Load rulebook notes
      const allNotes = await getAllNotes();
      setNotes(allNotes);

      // Load miss pattern statistics
      setLoadingPatterns(true);
      const { data: attempts } = await supabase
        .from('question_attempts')
        .select('miss_reason')
        .eq('user_id', user.id)
        .not('miss_reason', 'is', null);

      if (attempts) {
        const reasonCounts: Record<string, number> = {};
        attempts.forEach(a => {
          const reason = a.miss_reason || 'unknown';
          reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
        });

        const reasonLabels: Record<string, { label: string; icon: string }> = {
          careless: { label: 'Careless Mistakes', icon: '😅' },
          concept_gap: { label: 'Concept Gaps', icon: '🤔' },
          timing: { label: 'Timing Issues', icon: '⏱️' },
          trap_answer: { label: 'Fell for Traps', icon: '🪤' },
          guessed: { label: 'Guessed', icon: '🎲' },
        };

        const patterns = Object.entries(reasonCounts)
          .map(([reason, count]) => ({
            reason,
            count,
            label: reasonLabels[reason]?.label || reason,
            icon: reasonLabels[reason]?.icon || '❓',
          }))
          .sort((a, b) => b.count - a.count);

        setMissPatterns(patterns);
      }
      setLoadingPatterns(false);
    };

    loadData();
  }, [user, getAllNotes]);

  const handleDelete = async (noteId: string) => {
    const success = await deleteNote(noteId);
    if (success) {
      setNotes(prev => prev.filter(n => n.id !== noteId));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view your Rulebook</h1>
          <p className="text-muted-foreground mb-4">Your personal error patterns and prevention rules</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-500/5 p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-2xl font-bold">Personal Rulebook</h1>
              <p className="text-sm text-muted-foreground">Your error patterns and prevention rules</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="patterns" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patterns" className="gap-2">
              <Brain className="w-4 h-4" />
              Error Patterns
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <Target className="w-4 h-4" />
              Rulebook Entries
            </TabsTrigger>
          </TabsList>

          {/* Error Pattern Statistics */}
          <TabsContent value="patterns">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Your Most Common Miss Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingPatterns ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : missPatterns.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No error patterns tracked yet. Complete some quizzes and log your miss reasons!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {missPatterns.map((pattern, i) => (
                      <motion.div
                        key={pattern.reason}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <span className="text-2xl">{pattern.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{pattern.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {pattern.count} {pattern.count === 1 ? 'time' : 'times'}
                          </div>
                        </div>
                        <Badge variant={i === 0 ? 'destructive' : 'secondary'}>
                          #{i + 1}
                        </Badge>
                      </motion.div>
                    ))}

                    {missPatterns.length > 0 && (
                      <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        <h4 className="font-semibold text-sm mb-2">💡 Focus Area</h4>
                        <p className="text-sm text-muted-foreground">
                          Your top error type is <strong>{missPatterns[0].label}</strong>.
                          {missPatterns[0].reason === 'careless' && ' Double-check your work before submitting.'}
                          {missPatterns[0].reason === 'concept_gap' && ' Review the underlying concepts for topics you miss.'}
                          {missPatterns[0].reason === 'timing' && ' Practice pacing - aim for 75 seconds per question.'}
                          {missPatterns[0].reason === 'trap_answer' && ' Read all options carefully before choosing.'}
                          {missPatterns[0].reason === 'guessed' && ' Skip and return to questions you\'re unsure about.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rulebook Notes */}
          <TabsContent value="notes">
            <AnimatePresence>
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : notes.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No rulebook entries yet</h3>
                    <p className="text-muted-foreground mb-4">
                      When you miss a question, add it to your rulebook to track patterns and prevention rules.
                    </p>
                    <Link to="/elite-practice">
                      <Button>Start Elite Practice</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {notes.map((note, i) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="border-amber-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              {note.errorPattern && (
                                <div>
                                  <span className="text-xs font-medium text-muted-foreground">Error Made:</span>
                                  <p className="text-sm">{note.errorPattern}</p>
                                </div>
                              )}
                              {note.triggerPhrase && (
                                <div>
                                  <span className="text-xs font-medium text-muted-foreground">Trigger:</span>
                                  <p className="text-sm italic">"{note.triggerPhrase}"</p>
                                </div>
                              )}
                              {note.preventionRule && (
                                <div className="p-2 rounded bg-green-500/10 border border-green-500/30">
                                  <span className="text-xs font-medium text-green-600">Prevention Rule:</span>
                                  <p className="text-sm font-medium">{note.preventionRule}</p>
                                </div>
                              )}
                              {note.notes && (
                                <div>
                                  <span className="text-xs font-medium text-muted-foreground">Notes:</span>
                                  <p className="text-sm text-muted-foreground">{note.notes}</p>
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Added {new Date(note.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(note.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rulebook;
