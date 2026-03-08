import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Users, Plus, BarChart3, Bell, Search,
  Clock, UserPlus, Send, GraduationCap, AlertTriangle, ChevronRight, Copy
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AssignmentCompletionView } from "@/components/teacher/AssignmentCompletionView";

interface ClassRoom {
  id: string;
  name: string;
  class_code: string;
  description: string;
  created_at: string;
  memberCount?: number;
}

interface StudentOverview {
  user_id: string;
  username: string;
  avatar_emoji: string;
  questionsAnswered: number;
  accuracy: number;
  lastActive: string;
  streak: number;
}

interface AssignmentRow {
  id: string;
  title: string;
  subject: string;
  question_count: number;
  due_date: string;
  classroom_id: string;
  completionRate?: number;
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<StudentOverview[]>([]);
  const [assignments, setAssignments] = useState<AssignmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [showNewClass, setShowNewClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', subject: 'math', questionCount: 10, dueDate: '', classroomId: '' });

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    // Load classrooms
    const { data: classData } = await supabase
      .from('classrooms')
      .select('*')
      .eq('teacher_id', user.id)
      .order('created_at', { ascending: false });

    const classrooms: ClassRoom[] = (classData || []).map((c: any) => ({
      id: c.id, name: c.name, class_code: c.class_code,
      description: c.description || '', created_at: c.created_at,
    }));

    // Get member counts
    for (const cls of classrooms) {
      const { count } = await supabase
        .from('classroom_members')
        .select('*', { count: 'exact', head: true })
        .eq('classroom_id', cls.id);
      cls.memberCount = count || 0;
    }

    setClasses(classrooms);

    // Load students from all classrooms
    const classIds = classrooms.map(c => c.id);
    if (classIds.length > 0) {
      const { data: members } = await supabase
        .from('classroom_members')
        .select('user_id')
        .in('classroom_id', classIds);

      const studentIds = [...new Set((members || []).map((m: any) => m.user_id))];
      if (studentIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, username, avatar_emoji')
          .in('id', studentIds);

        const studentList: StudentOverview[] = [];
        for (const p of (profiles || [])) {
          const { count: qCount } = await supabase
            .from('question_attempts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', p.id);

          const { count: correctCount } = await supabase
            .from('question_attempts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', p.id)
            .eq('is_correct', true);

          const { data: streakData } = await supabase
            .from('streaks')
            .select('current_streak')
            .eq('user_id', p.id)
            .maybeSingle();

          const total = qCount || 0;
          studentList.push({
            user_id: p.id,
            username: p.username,
            avatar_emoji: p.avatar_emoji || '😎',
            questionsAnswered: total,
            accuracy: total > 0 ? Math.round(((correctCount || 0) / total) * 100) : 0,
            lastActive: 'N/A',
            streak: streakData?.current_streak || 0,
          });
        }
        setStudents(studentList);
      }
    }

    // Load assignments
    const { data: assignData } = await supabase
      .from('assignments')
      .select('*')
      .eq('teacher_id', user.id)
      .order('due_date', { ascending: true });

    setAssignments((assignData || []).map((a: any) => ({
      id: a.id, title: a.title, subject: a.subject,
      question_count: a.question_count, due_date: a.due_date,
      classroom_id: a.classroom_id, completionRate: 0,
    })));

    setLoading(false);
  }, [user]);

  useEffect(() => { loadData(); }, [loadData]);

  const createClass = async () => {
    if (!user || !newClassName.trim()) return;
    const code = newClassName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6) + Math.floor(Math.random() * 1000);

    const { error } = await supabase.from('classrooms').insert({
      teacher_id: user.id,
      name: newClassName,
      class_code: code,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Class created!", description: `Join code: ${code}` });
      setNewClassName('');
      setShowNewClass(false);
      loadData();
    }
  };

  const createAssignment = async () => {
    if (!user || !newAssignment.title.trim() || !newAssignment.dueDate || !newAssignment.classroomId) return;

    const { error } = await supabase.from('assignments').insert({
      teacher_id: user.id,
      classroom_id: newAssignment.classroomId,
      title: newAssignment.title,
      subject: newAssignment.subject,
      question_count: newAssignment.questionCount,
      due_date: newAssignment.dueDate,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Assignment created!" });
      setNewAssignment({ title: '', subject: 'math', questionCount: 10, dueDate: '', classroomId: '' });
      setShowNewAssignment(false);
      loadData();
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: `Code ${code} copied to clipboard` });
  };

  const filteredStudents = students.filter(s =>
    s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = students.length;
  const avgAccuracy = students.length > 0 ? Math.round(students.reduce((s, st) => s + st.accuracy, 0) / students.length) : 0;
  const atRiskStudents = students.filter(s => s.accuracy < 60 || s.streak === 0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Please sign in to access the Teacher Dashboard</p>
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
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" /> Teacher Dashboard
            </h1>
          </div>
          {atRiskStudents.length > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/10">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-xs font-bold text-destructive">{atRiskStudents.length}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className="p-3 text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold">{totalStudents}</p>
            <p className="text-[10px] text-muted-foreground">Students</p>
          </Card>
          <Card className="p-3 text-center">
            <BarChart3 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{avgAccuracy}%</p>
            <p className="text-[10px] text-muted-foreground">Avg Accuracy</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold">{classes.length}</p>
            <p className="text-[10px] text-muted-foreground">Classes</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold">{assignments.length}</p>
            <p className="text-[10px] text-muted-foreground">Assignments</p>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assign</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {atRiskStudents.length > 0 && (
              <Card className="p-4 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-sm">Students Needing Attention</h3>
                </div>
                {atRiskStudents.map(s => (
                  <div key={s.user_id} className="flex items-center justify-between text-sm py-1">
                    <span>{s.avatar_emoji} {s.username}</span>
                    <span className="text-xs text-muted-foreground">{s.accuracy}% • {s.streak}d streak</span>
                  </div>
                ))}
              </Card>
            )}
            {classes.length === 0 && (
              <Card className="p-6 text-center border-dashed">
                <GraduationCap className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-bold mb-1">No classes yet</p>
                <p className="text-sm text-muted-foreground mb-3">Create your first class to start managing students</p>
                <Button onClick={() => { setActiveTab('classes'); setShowNewClass(true); }}>Create Class</Button>
              </Card>
            )}
            {assignments.slice(0, 3).map(a => (
              <Card key={a.id} className="p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{a.title}</h4>
                  <span className="text-xs text-muted-foreground">Due {a.due_date}</span>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Button onClick={() => setShowNewClass(!showNewClass)} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Create New Class
            </Button>
            {showNewClass && (
              <Card className="p-4 space-y-3 border-primary/30">
                <Input placeholder="Class name (e.g. AP Calculus — Period 3)" value={newClassName} onChange={e => setNewClassName(e.target.value)} />
                <div className="flex gap-2">
                  <Button onClick={createClass} className="flex-1">Create</Button>
                  <Button variant="outline" onClick={() => setShowNewClass(false)}>Cancel</Button>
                </div>
              </Card>
            )}
            {classes.map(c => (
              <Card key={c.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{c.name}</h3>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => copyCode(c.class_code)}>
                    <Copy className="w-3 h-3" /> {c.class_code}
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {c.memberCount} students</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(c.created_at).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search students..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {filteredStudents.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No students yet. Share your class code to invite students.</p>
            )}
            {filteredStudents.map(s => (
              <Card key={s.user_id} className="p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.avatar_emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{s.username}</h4>
                      {s.streak > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600">🔥 {s.streak}d</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{s.questionsAnswered} Qs</span>
                      <span className={s.accuracy >= 70 ? 'text-emerald-600' : 'text-destructive'}>{s.accuracy}%</span>
                    </div>
                  </div>
                  <Progress value={s.accuracy} className={`w-16 h-2 ${s.accuracy >= 70 ? '[&>div]:bg-emerald-500' : '[&>div]:bg-destructive'}`} />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Button onClick={() => setShowNewAssignment(!showNewAssignment)} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Create Assignment
            </Button>
            {showNewAssignment && (
              <Card className="p-4 space-y-3 border-primary/30">
                <Input placeholder="Assignment title" value={newAssignment.title} onChange={e => setNewAssignment(p => ({ ...p, title: e.target.value }))} />
                <div className="grid grid-cols-2 gap-2">
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={newAssignment.classroomId} onChange={e => setNewAssignment(p => ({ ...p, classroomId: e.target.value }))}>
                    <option value="">Select class...</option>
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={newAssignment.subject} onChange={e => setNewAssignment(p => ({ ...p, subject: e.target.value }))}>
                    <option value="math">Math</option>
                    <option value="english">English</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" min={5} max={50} value={newAssignment.questionCount} onChange={e => setNewAssignment(p => ({ ...p, questionCount: parseInt(e.target.value) || 10 }))} placeholder="# Questions" />
                  <Input type="date" value={newAssignment.dueDate} onChange={e => setNewAssignment(p => ({ ...p, dueDate: e.target.value }))} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={createAssignment} className="flex-1">Assign</Button>
                  <Button variant="outline" onClick={() => setShowNewAssignment(false)}>Cancel</Button>
                </div>
              </Card>
            )}
            {assignments.map(a => (
              <Card key={a.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{a.title}</h4>
                    <p className="text-xs text-muted-foreground">{a.question_count} questions • {a.subject} • Due {a.due_date}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
