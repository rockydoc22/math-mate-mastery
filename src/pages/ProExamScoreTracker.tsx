import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Plus, Trophy, Target, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { PRO_EXAMS, type ProExamConfig } from '@/utils/proExamConfig';
import { toast } from '@/hooks/use-toast';

interface ScoreEntry {
  id: string;
  examId: string;
  score: number;
  date: string;
  notes: string;
}

const ProExamScoreTracker = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string>('gre');
  const [entries, setEntries] = useState<ScoreEntry[]>(() => {
    const saved = localStorage.getItem('pro-exam-scores');
    return saved ? JSON.parse(saved) : [];
  });
  const [newScore, setNewScore] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const exam = PRO_EXAMS.find(e => e.id === selectedExam);
  const examEntries = entries.filter(e => e.examId === selectedExam).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const save = (updated: ScoreEntry[]) => {
    setEntries(updated);
    localStorage.setItem('pro-exam-scores', JSON.stringify(updated));
  };

  const addEntry = () => {
    if (!exam) return;
    const score = parseInt(newScore);
    if (isNaN(score) || score < exam.scoreRange.min || score > exam.scoreRange.max) {
      toast({ title: 'Invalid score', description: `Enter a score between ${exam.scoreRange.min} and ${exam.scoreRange.max}`, variant: 'destructive' });
      return;
    }
    const entry: ScoreEntry = {
      id: crypto.randomUUID(),
      examId: selectedExam,
      score,
      date: new Date().toISOString(),
      notes: newNotes,
    };
    save([...entries, entry]);
    setNewScore('');
    setNewNotes('');
    setShowAdd(false);
    toast({ title: 'Score logged!' });
  };

  const deleteEntry = (id: string) => {
    save(entries.filter(e => e.id !== id));
  };

  const latest = examEntries[0]?.score;
  const best = examEntries.length > 0 ? Math.max(...examEntries.map(e => e.score)) : null;
  const avg = examEntries.length > 0 ? Math.round(examEntries.reduce((s, e) => s + e.score, 0) / examEntries.length) : null;

  // Trend
  const trend = examEntries.length >= 2
    ? examEntries[0].score - examEntries[1].score
    : null;

  const scorePercent = (score: number) => {
    if (!exam) return 0;
    return ((score - exam.scoreRange.min) / (exam.scoreRange.max - exam.scoreRange.min)) * 100;
  };

  const targetExams = PRO_EXAMS.filter(e => ['gre', 'gmat', 'lsat', 'mcat'].includes(e.id));

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/pro-exams')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Score Tracker</h1>
            <p className="text-xs text-muted-foreground">Track your practice test scores</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Exam Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {targetExams.map(e => (
            <button
              key={e.id}
              onClick={() => setSelectedExam(e.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedExam === e.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {e.icon} {e.shortName}
            </button>
          ))}
        </div>

        {/* Stats Summary */}
        {exam && examEntries.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Latest</p>
                  <p className="text-2xl font-black text-foreground">{latest}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Best</p>
                  <p className="text-2xl font-black text-primary">{best}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Average</p>
                  <p className="text-2xl font-black text-foreground">{avg}</p>
                </div>
              </div>
              {trend !== null && (
                <div className={`mt-3 text-center text-xs font-medium ${trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : trend < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {trend > 0 ? `📈 +${trend} from last` : trend < 0 ? `📉 ${trend} from last` : '➡️ Same as last'}
                </div>
              )}
              {best !== null && (
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>{exam.scoreRange.min}</span>
                    <span>Best: {best}</span>
                    <span>{exam.scoreRange.max}</span>
                  </div>
                  <Progress value={scorePercent(best)} className="h-2" />
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Add Score */}
        {showAdd ? (
          <Card className="p-4 space-y-3">
            <h3 className="font-bold text-sm">Log Practice Score</h3>
            <Input
              type="number"
              placeholder={exam ? `Score (${exam.scoreRange.min}–${exam.scoreRange.max})` : 'Score'}
              value={newScore}
              onChange={e => setNewScore(e.target.value)}
            />
            <Input
              placeholder="Notes (optional)"
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={addEntry} className="flex-1">Save</Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full" onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4 mr-2" /> Log Practice Score
          </Button>
        )}

        {/* Score History */}
        {examEntries.length > 0 ? (
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-foreground">Score History</h3>
            {examEntries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    entry.score === best ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {entry.score === best && <Trophy className="w-4 h-4" />}
                    {entry.score !== best && <Target className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{entry.score}</span>
                      {entry.score === best && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">Best</span>}
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                      {entry.notes && ` · ${entry.notes}`}
                    </p>
                  </div>
                  <button onClick={() => deleteEntry(entry.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <TrendingUp className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-bold text-foreground mb-1">No scores yet</p>
            <p className="text-xs text-muted-foreground">Log your practice test scores to track progress</p>
          </Card>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate(`/pro-exam/${selectedExam}`)}>
            <span className="text-lg">📝</span>
            <span className="text-xs">Practice {exam?.shortName}</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate(`/pro-exam-study/${selectedExam}`)}>
            <span className="text-lg">📖</span>
            <span className="text-xs">Study Guide</span>
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProExamScoreTracker;
