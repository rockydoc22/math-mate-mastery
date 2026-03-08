import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Eye, Shield, Link2, Flame, BarChart3, BookOpen,
  CheckCircle2, Clock, TrendingUp, Copy, Download, Printer
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";

interface ChildProfile {
  id: string;
  username: string;
  avatar_emoji: string;
}

interface ChildStats {
  questionsAnswered: number;
  accuracy: number;
  streak: number;
  quizzesCompleted: number;
  recentDomains: { domain: string; count: number; accuracy: number }[];
}

const ParentDashboard = () => {
  const { user } = useAuth();
  const [linkCode, setLinkCode] = useState('');
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [childStats, setChildStats] = useState<ChildStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadChildren();
  }, [user]);

  const loadChildren = async () => {
    if (!user) return;
    const { data: links } = await supabase
      .from('parent_links')
      .select('child_id')
      .eq('parent_id', user.id)
      .eq('status', 'accepted');

    if (!links || links.length === 0) { setLoading(false); return; }

    const childIds = links.map((l: any) => l.child_id);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, username, avatar_emoji')
      .in('id', childIds);

    setChildren((profiles || []).map((p: any) => ({
      id: p.id, username: p.username, avatar_emoji: p.avatar_emoji || '😎',
    })));

    if (profiles && profiles.length > 0) {
      setSelectedChild(profiles[0].id);
      await loadChildStats(profiles[0].id);
    }
    setLoading(false);
  };

  const loadChildStats = async (childId: string) => {
    const { count: totalQ } = await supabase
      .from('question_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', childId);

    const { count: correctQ } = await supabase
      .from('question_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', childId)
      .eq('is_correct', true);

    const { data: streakData } = await supabase
      .from('streaks')
      .select('current_streak')
      .eq('user_id', childId)
      .maybeSingle();

    const { count: quizCount } = await supabase
      .from('quiz_scores')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', childId);

    // Recent domain breakdown (last 100 attempts)
    const { data: recentAttempts } = await supabase
      .from('question_attempts')
      .select('domain, is_correct')
      .eq('user_id', childId)
      .order('created_at', { ascending: false })
      .limit(100);

    const domainMap: Record<string, { count: number; correct: number }> = {};
    (recentAttempts || []).forEach((a: any) => {
      if (!domainMap[a.domain]) domainMap[a.domain] = { count: 0, correct: 0 };
      domainMap[a.domain].count++;
      if (a.is_correct) domainMap[a.domain].correct++;
    });

    const total = totalQ || 0;
    setChildStats({
      questionsAnswered: total,
      accuracy: total > 0 ? Math.round(((correctQ || 0) / total) * 100) : 0,
      streak: streakData?.current_streak || 0,
      quizzesCompleted: quizCount || 0,
      recentDomains: Object.entries(domainMap)
        .map(([domain, d]) => ({ domain, count: d.count, accuracy: Math.round((d.correct / d.count) * 100) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6),
    });
  };

  const requestLink = async () => {
    if (!user || !linkCode.trim()) return;
    setLinking(true);
    // The link code is the child's username — find them
    const { data: child } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', linkCode.trim())
      .maybeSingle();

    if (!child) {
      toast({ title: "Student not found", description: "Check the username and try again.", variant: "destructive" });
      setLinking(false);
      return;
    }

    const { error } = await supabase.from('parent_links').insert({
      parent_id: user.id,
      child_id: child.id,
      link_code: linkCode.trim(),
      status: 'pending',
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Link request sent!", description: "Your child will need to accept the link." });
      setLinkCode('');
    }
    setLinking(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Please sign in to access the Parent Dashboard</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" /> Parent Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">Monitor your child's progress</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Link a child */}
        {children.length === 0 && (
          <Card className="p-6 text-center border-dashed space-y-3">
            <Link2 className="w-8 h-8 text-muted-foreground mx-auto" />
            <h3 className="font-bold">Link Your Child's Account</h3>
            <p className="text-sm text-muted-foreground">Enter your child's username to connect</p>
            <div className="flex gap-2 max-w-xs mx-auto">
              <Input placeholder="Child's username" value={linkCode} onChange={e => setLinkCode(e.target.value)} />
              <Button onClick={requestLink} disabled={linking}>Link</Button>
            </div>
          </Card>
        )}

        {/* Child selector */}
        {children.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {children.map(c => (
              <Button
                key={c.id}
                variant={selectedChild === c.id ? 'default' : 'outline'}
                size="sm"
                className="gap-1 shrink-0"
                onClick={() => { setSelectedChild(c.id); loadChildStats(c.id); }}
              >
                <span>{c.avatar_emoji}</span> {c.username}
              </Button>
            ))}
          </div>
        )}

        {/* Child stats */}
        {selectedChild && childStats && (
          <>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{children.find(c => c.id === selectedChild)?.avatar_emoji}</span>
              <div>
                <h2 className="text-lg font-bold">{children.find(c => c.id === selectedChild)?.username}</h2>
                <p className="text-xs text-muted-foreground">Student progress overview</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 text-center">
                <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold">{childStats.questionsAnswered}</p>
                <p className="text-[10px] text-muted-foreground">Questions Done</p>
              </Card>
              <Card className="p-3 text-center">
                <BarChart3 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-2xl font-bold">{childStats.accuracy}%</p>
                <p className="text-[10px] text-muted-foreground">Accuracy</p>
              </Card>
              <Card className="p-3 text-center">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <p className="text-2xl font-bold">{childStats.streak}</p>
                <p className="text-[10px] text-muted-foreground">Day Streak</p>
              </Card>
              <Card className="p-3 text-center">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-2xl font-bold">{childStats.quizzesCompleted}</p>
                <p className="text-[10px] text-muted-foreground">Quizzes Done</p>
              </Card>
            </div>

            {/* Domain breakdown */}
            {childStats.recentDomains.length > 0 && (
              <Card className="p-4">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Recent Focus Areas
                </h3>
                <div className="space-y-3">
                  {childStats.recentDomains.map(d => (
                    <div key={d.domain}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{d.domain}</span>
                        <span className={`text-xs font-bold ${d.accuracy >= 70 ? 'text-emerald-600' : d.accuracy >= 50 ? 'text-amber-500' : 'text-destructive'}`}>
                          {d.accuracy}% ({d.count} Qs)
                        </span>
                      </div>
                      <Progress value={d.accuracy} className={`h-2 ${d.accuracy >= 70 ? '[&>div]:bg-emerald-500' : d.accuracy >= 50 ? '[&>div]:bg-amber-500' : '[&>div]:bg-destructive'}`} />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Add another child */}
            <Card className="p-4 border-dashed">
              <h3 className="font-bold text-sm mb-2">Link Another Child</h3>
              <div className="flex gap-2">
                <Input placeholder="Username" value={linkCode} onChange={e => setLinkCode(e.target.value)} />
                <Button onClick={requestLink} disabled={linking} size="sm">Link</Button>
              </div>
            </Card>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ParentDashboard;
