import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, FileText, Download, TrendingUp, TrendingDown,
  Trophy, Flame, Target, Brain, BarChart3, Printer
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

interface ReportData {
  totalQuestions: number;
  totalCorrect: number;
  accuracy: number;
  mathAccuracy: number;
  englishAccuracy: number;
  streakCurrent: number;
  streakLongest: number;
  quizzesCompleted: number;
  topicsAttempted: number;
  topicsMastered: number;
  practiceTests: number;
  avgTestScore: number;
  strongSkills: string[];
  weakSkills: string[];
  recentTrend: 'improving' | 'declining' | 'stable';
  weeklyQuestions: number[];
}

const ProgressReport = () => {
  const { user } = useAuth();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    generateReport();
  }, [user]);

  const generateReport = async () => {
    if (!user) return;

    const [attemptsRes, streakRes, quizzesRes, masteryRes, testsRes] = await Promise.all([
      supabase.from('question_attempts').select('domain, skill, is_correct, created_at').eq('user_id', user.id),
      supabase.from('streaks').select('current_streak, longest_streak').eq('user_id', user.id).maybeSingle(),
      supabase.from('quiz_scores').select('id, score, total_questions, percentage, created_at').eq('user_id', user.id),
      supabase.from('topic_mastery').select('topic_name, is_mastered, accuracy_percentage').eq('user_id', user.id),
      supabase.from('practice_tests').select('total_score').eq('user_id', user.id),
    ]);

    const attempts = attemptsRes.data || [];
    const quizzes = quizzesRes.data || [];
    const mastery = masteryRes.data || [];
    const tests = testsRes.data || [];

    const totalQuestions = attempts.length;
    const totalCorrect = attempts.filter(a => a.is_correct).length;
    const mathAttempts = attempts.filter(a => a.domain.toLowerCase().includes('math'));
    const englishAttempts = attempts.filter(a => !a.domain.toLowerCase().includes('math'));

    // Skill analysis
    const skillStats: Record<string, { correct: number; total: number }> = {};
    attempts.forEach(a => {
      if (!skillStats[a.skill]) skillStats[a.skill] = { correct: 0, total: 0 };
      skillStats[a.skill].total++;
      if (a.is_correct) skillStats[a.skill].correct++;
    });

    const sortedSkills = Object.entries(skillStats)
      .filter(([_, s]) => s.total >= 3)
      .map(([name, s]) => ({ name, accuracy: s.correct / s.total }))
      .sort((a, b) => b.accuracy - a.accuracy);

    // Weekly questions for last 4 weeks
    const weeklyQuestions: number[] = [];
    for (let w = 3; w >= 0; w--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (w + 1) * 7);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - w * 7);
      const count = attempts.filter(a => {
        const d = new Date(a.created_at);
        return d >= weekStart && d < weekEnd;
      }).length;
      weeklyQuestions.push(count);
    }

    // Trend
    const recentTrend = weeklyQuestions[3] > weeklyQuestions[2] ? 'improving'
      : weeklyQuestions[3] < weeklyQuestions[2] ? 'declining' : 'stable';

    setReport({
      totalQuestions,
      totalCorrect,
      accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      mathAccuracy: mathAttempts.length > 0 ? Math.round((mathAttempts.filter(a => a.is_correct).length / mathAttempts.length) * 100) : 0,
      englishAccuracy: englishAttempts.length > 0 ? Math.round((englishAttempts.filter(a => a.is_correct).length / englishAttempts.length) * 100) : 0,
      streakCurrent: streakRes.data?.current_streak || 0,
      streakLongest: streakRes.data?.longest_streak || 0,
      quizzesCompleted: quizzes.length,
      topicsAttempted: mastery.length,
      topicsMastered: mastery.filter(m => m.is_mastered).length,
      practiceTests: tests.length,
      avgTestScore: tests.length > 0 ? Math.round(tests.reduce((a, t) => a + (t.total_score || 0), 0) / tests.length) : 0,
      strongSkills: sortedSkills.slice(0, 3).map(s => s.name.replace(/_/g, ' ')),
      weakSkills: sortedSkills.slice(-3).reverse().map(s => s.name.replace(/_/g, ' ')),
      recentTrend,
      weeklyQuestions,
    });

    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto p-4 text-center py-20">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No Data Yet</h2>
          <p className="text-muted-foreground mb-4">Start practicing to generate your progress report</p>
          <Link to="/quiz"><Button>Start Practicing</Button></Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  const maxWeekly = Math.max(...report.weeklyQuestions, 1);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4" ref={reportRef}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 print:hidden">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">Progress Report</h1>
          <Button variant="outline" size="sm" className="ml-auto" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
        </div>

        {/* Print header */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold">📊 Student Progress Report</h1>
          <p className="text-sm text-muted-foreground">Generated {new Date().toLocaleDateString()}</p>
        </div>

        {/* Overall stats */}
        <Card className="p-5 mb-4">
          {/* Score Tracker entry — moved from Pro Exams hub */}
          <Link
            to="/pro-exam-scores"
            className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 hover:bg-primary/10 transition-colors print:hidden"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <div className="leading-tight">
                <p className="text-xs font-semibold">Score Tracker</p>
                <p className="text-[10px] text-muted-foreground">Full-length test scores across every exam</p>
              </div>
            </div>
            <span className="text-[11px] text-primary font-medium">Open →</span>
          </Link>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Overall Performance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Questions</p>
              <p className="text-2xl font-bold">{report.totalQuestions}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Overall Accuracy</p>
              <p className="text-2xl font-bold text-primary">{report.accuracy}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Math Accuracy</p>
              <div className="flex items-center gap-2">
                <Progress value={report.mathAccuracy} className="h-2 flex-1" />
                <span className="text-sm font-medium">{report.mathAccuracy}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">English Accuracy</p>
              <div className="flex items-center gap-2">
                <Progress value={report.englishAccuracy} className="h-2 flex-1" />
                <span className="text-sm font-medium">{report.englishAccuracy}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Milestones */}
        <Card className="p-5 mb-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Milestones
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{report.streakCurrent}</p>
              <p className="text-[10px] text-muted-foreground">Current Streak</p>
            </div>
            <div className="text-center">
              <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{report.quizzesCompleted}</p>
              <p className="text-[10px] text-muted-foreground">Quizzes Done</p>
            </div>
            <div className="text-center">
              <Target className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold">{report.topicsMastered}</p>
              <p className="text-[10px] text-muted-foreground">Topics Mastered</p>
            </div>
          </div>
        </Card>

        {/* Weekly activity chart */}
        <Card className="p-5 mb-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            {report.recentTrend === 'improving' ? <TrendingUp className="w-5 h-5 text-green-500" /> :
             report.recentTrend === 'declining' ? <TrendingDown className="w-5 h-5 text-red-500" /> :
             <BarChart3 className="w-5 h-5 text-blue-500" />}
            Weekly Activity
            <span className={`text-xs ml-auto px-2 py-0.5 rounded-full ${
              report.recentTrend === 'improving' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : report.recentTrend === 'declining' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            }`}>
              {report.recentTrend}
            </span>
          </h3>
          <div className="flex items-end gap-3 h-24">
            {report.weeklyQuestions.map((q, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{q}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(q / maxWeekly) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full bg-primary/80 rounded-t min-h-[4px]"
                />
                <span className="text-[9px] text-muted-foreground">W{i + 1}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4">
            <h4 className="font-semibold text-xs mb-2 flex items-center gap-1 text-green-600 dark:text-green-400">
              <TrendingUp className="w-3 h-3" /> Strengths
            </h4>
            {report.strongSkills.length > 0 ? (
              <ul className="space-y-1">
                {report.strongSkills.map(s => (
                  <li key={s} className="text-xs text-muted-foreground">✅ {s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">Practice more to see</p>
            )}
          </Card>
          <Card className="p-4">
            <h4 className="font-semibold text-xs mb-2 flex items-center gap-1 text-red-600 dark:text-red-400">
              <TrendingDown className="w-3 h-3" /> Needs Work
            </h4>
            {report.weakSkills.length > 0 ? (
              <ul className="space-y-1">
                {report.weakSkills.map(s => (
                  <li key={s} className="text-xs text-muted-foreground">⚠️ {s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">Practice more to see</p>
            )}
          </Card>
        </div>

        {/* Practice tests */}
        {report.practiceTests > 0 && (
          <Card className="p-5 mb-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Practice Tests
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Tests Taken</p>
                <p className="text-xl font-bold">{report.practiceTests}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Average Score</p>
                <p className="text-xl font-bold text-primary">{report.avgTestScore}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3 print:hidden">
          <Link to="/study?mode=weakness" className="flex-1">
            <Button variant="outline" className="w-full">
              <Brain className="w-4 h-4 mr-2" /> Practice Weaknesses
            </Button>
          </Link>
          <Link to="/insights" className="flex-1">
            <Button className="w-full">
              <BarChart3 className="w-4 h-4 mr-2" /> Deep Insights
            </Button>
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProgressReport;
