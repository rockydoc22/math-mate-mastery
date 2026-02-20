import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Check, Eye, ShieldAlert, Users, Flag, GraduationCap, BarChart3, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { QuestionDistribution } from "@/components/admin/QuestionDistribution";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

interface FlaggedQuestion {
  id: string;
  question_id: string;
  question_type: string;
  issue_type: string;
  notes: string | null;
  status: string;
  created_at: string;
  user_id: string | null;
  resolved_at: string | null;
  resolution_notes: string | null;
}

interface UserStats {
  id: string;
  username: string;
  avatar_emoji: string | null;
  created_at: string;
  questions_answered: number;
  quizzes_completed: number;
  correct_answers: number;
}

interface RetentionWeek {
  week: string;
  active_users: number;
  attempts: number;
}

interface StreakData {
  range: string;
  users: number;
}

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [retentionData, setRetentionData] = useState<RetentionWeek[]>([]);
  const [streakData, setStreakData] = useState<StreakData[]>([]);
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Check if user has admin role
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminRole();
    }
  }, [user, authLoading]);

  const fetchFlaggedQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('flagged_questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlaggedQuestions(data || []);
    } catch (error) {
      console.error('Error fetching flagged questions:', error);
      toast({ title: "Error", description: "Failed to load flagged questions", variant: "destructive" });
    }
  };

  const fetchUserStats = async () => {
    try {
      // Use secure server-side RPC with admin validation
      const { data, error } = await supabase.rpc('get_admin_user_stats');

      if (error) throw error;

      const stats: UserStats[] = (data || []).map((row: {
        user_id: string;
        username: string;
        avatar_emoji: string | null;
        created_at: string;
        questions_answered: number;
        correct_answers: number;
        quizzes_completed: number;
      }) => ({
        id: row.user_id,
        username: row.username,
        avatar_emoji: row.avatar_emoji,
        created_at: row.created_at,
        questions_answered: Number(row.questions_answered),
        correct_answers: Number(row.correct_answers),
        quizzes_completed: Number(row.quizzes_completed),
      }));

      setUserStats(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      toast({ title: "Error", description: "Failed to load user stats", variant: "destructive" });
    }
  };

  const fetchRetentionData = async () => {
    try {
      const { data: attempts, error } = await supabase
        .from('question_attempts')
        .select('user_id, created_at')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const weekMap = new Map<string, Set<string>>();
      const attemptMap = new Map<string, number>();

      (attempts || []).forEach((a) => {
        const d = new Date(a.created_at);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(new Date(a.created_at).setDate(diff));
        const weekKey = monday.toISOString().split('T')[0];

        if (!weekMap.has(weekKey)) weekMap.set(weekKey, new Set());
        weekMap.get(weekKey)!.add(a.user_id);
        attemptMap.set(weekKey, (attemptMap.get(weekKey) || 0) + 1);
      });

      const retention: RetentionWeek[] = Array.from(weekMap.entries())
        .map(([week, users]) => ({
          week: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          active_users: users.size,
          attempts: attemptMap.get(week) || 0,
        }))
        .slice(-12);

      setRetentionData(retention);

      const { data: streaks } = await supabase
        .from('streaks')
        .select('current_streak');

      const buckets: Record<string, number> = { '0 days': 0, '1-3 days': 0, '4-7 days': 0, '8-14 days': 0, '15+ days': 0 };
      (streaks || []).forEach((s) => {
        const cs = s.current_streak;
        if (cs === 0) buckets['0 days']++;
        else if (cs <= 3) buckets['1-3 days']++;
        else if (cs <= 7) buckets['4-7 days']++;
        else if (cs <= 14) buckets['8-14 days']++;
        else buckets['15+ days']++;
      });

      setStreakData(Object.entries(buckets).map(([range, users]) => ({ range, users })));

      const { count } = await supabase.from('profiles').select('id', { count: 'exact', head: true });
      setTotalRegistered(count || 0);
    } catch (error) {
      console.error('Error fetching retention data:', error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchFlaggedQuestions();
      fetchUserStats();
      fetchRetentionData();
      
      // Subscribe to new flagged questions in realtime
      const channel = supabase
        .channel('admin-flags')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'flagged_questions',
          },
          (payload) => {
            const newFlag = payload.new as FlaggedQuestion;
            setFlaggedQuestions(prev => [newFlag, ...prev]);
            toast({
              title: "🚩 New flagged question!",
              description: `Question ${newFlag.question_id} was reported`,
            });
          }
        )
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAdmin]);

  const updateStatus = async (id: string, status: string, sendNotification = true) => {
    try {
      const flag = flaggedQuestions.find(q => q.id === id);
      
      const updateData: Record<string, unknown> = { status };
      if (status === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
        updateData.resolution_notes = 'Issue has been fixed by admin';
      }
      
      const { error } = await supabase
        .from('flagged_questions')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      // Send notification to the user who flagged the question
      if (status === 'resolved' && flag?.user_id && sendNotification) {
        await supabase.from('user_notifications').insert({
          user_id: flag.user_id,
          title: '🎉 Your flag was resolved!',
          message: `Thanks for reporting question ${flag.question_id}. We've fixed the issue!`,
          type: 'success',
        });
      }
      
      setFlaggedQuestions(prev => 
        prev.map(q => q.id === id ? { ...q, status } : q)
      );
      toast({ title: "Status updated" + (status === 'resolved' && flag?.user_id ? " - User notified!" : "") });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({ title: "Error updating status", variant: "destructive" });
    }
  };

  const deleteFlag = async (id: string) => {
    try {
      const { error } = await supabase
        .from('flagged_questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setFlaggedQuestions(prev => prev.filter(q => q.id !== id));
      toast({ title: "Flag removed" });
    } catch (error) {
      console.error('Error deleting flag:', error);
      toast({ title: "Error removing flag", variant: "destructive" });
    }
  };

  const getIssueLabel = (type: string) => {
    const labels: Record<string, string> = {
      incorrect_answer: 'Incorrect Answer',
      typo: 'Typo',
      unclear: 'Unclear',
      offensive: 'Offensive',
      other: 'Other',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewed': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">Loading...</CardContent>
        </Card>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please log in with an admin account to access this page.
            </p>
            <div className="flex gap-2">
              <Link to="/auth" className="flex-1">
                <Button className="w-full">Log In</Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <ShieldAlert className="w-5 h-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You don't have permission to access this page. Admin privileges are required.
            </p>
            <Link to="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Link to="/demo">
            <Button variant="outline" size="sm" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Demo Mode
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users ({userStats.length})
            </TabsTrigger>
            <TabsTrigger value="flags" className="gap-2">
              <Flag className="w-4 h-4" />
              Flagged ({flaggedQuestions.length})
            </TabsTrigger>
            <TabsTrigger value="questions" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="retention" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Retention
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Student Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">User</th>
                        <th className="text-center py-2 px-2">Questions</th>
                        <th className="text-center py-2 px-2">Correct</th>
                        <th className="text-center py-2 px-2">Accuracy</th>
                        <th className="text-center py-2 px-2">Quizzes</th>
                        <th className="text-right py-2 px-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userStats.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-2">
                            <div className="flex items-center gap-2">
                              <span>{user.avatar_emoji || '👤'}</span>
                              <span className="font-medium">{user.username}</span>
                            </div>
                          </td>
                          <td className="text-center py-2 px-2">{user.questions_answered}</td>
                          <td className="text-center py-2 px-2">{user.correct_answers}</td>
                          <td className="text-center py-2 px-2">
                            {user.questions_answered > 0 
                              ? `${Math.round((user.correct_answers / user.questions_answered) * 100)}%`
                              : '-'}
                          </td>
                          <td className="text-center py-2 px-2">{user.quizzes_completed}</td>
                          <td className="text-right py-2 px-2 text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {userStats.length === 0 && (
                    <p className="text-center py-4 text-muted-foreground">No users yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flags" className="space-y-4 mt-4">
            {flaggedQuestions.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No flagged questions yet.</CardContent></Card>
            ) : (
              <div className="space-y-4">
                {flaggedQuestions.map((flag) => (
                  <Card key={flag.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary">{flag.question_type.toUpperCase()}</Badge>
                            <Badge variant="outline">{getIssueLabel(flag.issue_type)}</Badge>
                            <Badge className={getStatusColor(flag.status)}>{flag.status}</Badge>
                          </div>
                          <p className="font-mono text-sm">Question ID: {flag.question_id}</p>
                          {flag.notes && <p className="text-sm text-muted-foreground">{flag.notes}</p>}
                          <p className="text-xs text-muted-foreground">
                            {new Date(flag.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {flag.status === 'pending' && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(flag.id, 'reviewed')}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          {flag.status !== 'resolved' && (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(flag.id, 'resolved')}>
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => deleteFlag(flag.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="questions" className="mt-4">
            <QuestionDistribution />
          </TabsContent>
          <TabsContent value="retention" className="space-y-4 mt-4">
            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{totalRegistered}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Registered</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">
                    {retentionData.length > 0 ? retentionData[retentionData.length - 1].active_users : 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Active This Week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">
                    {totalRegistered > 0 && retentionData.length > 0
                      ? `${Math.round((retentionData[retentionData.length - 1].active_users / totalRegistered) * 100)}%`
                      : '0%'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Weekly Retention</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly active users chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Active Users (real practice sessions)</CardTitle>
              </CardHeader>
              <CardContent>
                {retentionData.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No activity data yet.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={retentionData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                      <Tooltip formatter={(v: number, name: string) => [v, name === 'active_users' ? 'Active Users' : 'Questions Answered']} />
                      <Line type="monotone" dataKey="active_users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="active_users" />
                      <Line type="monotone" dataKey="attempts" stroke="hsl(var(--accent))" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="attempts" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
                <p className="text-xs text-muted-foreground mt-2">Solid = unique users actively practicing · Dashed = total questions answered</p>
              </CardContent>
            </Card>

            {/* Streak distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Streak Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={streakData}>
                    <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip formatter={(v: number) => [v, 'Users']} />
                    <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2">How many days in a row each user has practiced</p>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
