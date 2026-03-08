import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Users, Plus, BookOpen, BarChart3, Bell, Search,
  CheckCircle2, Clock, TrendingUp, UserPlus, Clipboard, Send,
  GraduationCap, Target, AlertTriangle, ChevronRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ClassRoom {
  id: string;
  name: string;
  code: string;
  studentCount: number;
  createdAt: string;
}

interface StudentOverview {
  id: string;
  username: string;
  avatar_emoji: string;
  questionsAnswered: number;
  accuracy: number;
  lastActive: string;
  streak: number;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  dueDate: string;
  completionRate: number;
  assignedTo: string; // class id
}

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<StudentOverview[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // New class form
  const [showNewClass, setShowNewClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  // New assignment form
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', subject: 'math', questionCount: 10, dueDate: '' });

  useEffect(() => {
    // Demo data — in production this would come from DB tables
    setClasses([
      { id: 'c1', name: 'AP Calculus AB — Period 2', code: 'CALC2024', studentCount: 28, createdAt: '2026-01-15' },
      { id: 'c2', name: 'SAT Prep — Block 4', code: 'SAT2026', studentCount: 32, createdAt: '2026-02-01' },
    ]);

    setStudents([
      { id: 's1', username: 'Alex_M', avatar_emoji: '🎯', questionsAnswered: 342, accuracy: 78, lastActive: '2h ago', streak: 12 },
      { id: 's2', username: 'Sarah_K', avatar_emoji: '⭐', questionsAnswered: 512, accuracy: 85, lastActive: '30m ago', streak: 24 },
      { id: 's3', username: 'Jordan_T', avatar_emoji: '🔥', questionsAnswered: 189, accuracy: 62, lastActive: '1d ago', streak: 3 },
      { id: 's4', username: 'Emily_R', avatar_emoji: '💎', questionsAnswered: 425, accuracy: 91, lastActive: '4h ago', streak: 18 },
      { id: 's5', username: 'Chris_B', avatar_emoji: '🚀', questionsAnswered: 98, accuracy: 55, lastActive: '3d ago', streak: 0 },
    ]);

    setAssignments([
      { id: 'a1', title: 'Algebra Review — Linear Equations', subject: 'math', questionCount: 15, dueDate: '2026-03-12', completionRate: 72, assignedTo: 'c2' },
      { id: 'a2', title: 'Derivatives Practice Set', subject: 'ap-calculus-ab', questionCount: 20, dueDate: '2026-03-15', completionRate: 45, assignedTo: 'c1' },
      { id: 'a3', title: 'SAT Reading — Craft & Structure', subject: 'english', questionCount: 10, dueDate: '2026-03-10', completionRate: 88, assignedTo: 'c2' },
    ]);

    setLoading(false);
  }, [user]);

  const createClass = () => {
    if (!newClassName.trim()) return;
    const code = newClassName.replace(/\s+/g, '').toUpperCase().slice(0, 6) + Math.floor(Math.random() * 100);
    const newClass: ClassRoom = {
      id: `c${Date.now()}`,
      name: newClassName,
      code,
      studentCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setClasses(prev => [...prev, newClass]);
    setNewClassName('');
    setShowNewClass(false);
    toast({ title: "Class created!", description: `Join code: ${code}` });
  };

  const createAssignment = () => {
    if (!newAssignment.title.trim() || !newAssignment.dueDate) return;
    const assignment: Assignment = {
      id: `a${Date.now()}`,
      ...newAssignment,
      completionRate: 0,
      assignedTo: classes[0]?.id || 'c1',
    };
    setAssignments(prev => [...prev, assignment]);
    setNewAssignment({ title: '', subject: 'math', questionCount: 10, dueDate: '' });
    setShowNewAssignment(false);
    toast({ title: "Assignment created!", description: `${assignment.questionCount} questions assigned` });
  };

  const filteredStudents = students.filter(s =>
    s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Aggregate stats
  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const avgAccuracy = students.length > 0 ? Math.round(students.reduce((s, st) => s + st.accuracy, 0) / students.length) : 0;
  const atRiskStudents = students.filter(s => s.accuracy < 60 || s.streak === 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Teacher Dashboard
            </h1>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Bell className="w-4 h-4" /> Alerts
            {atRiskStudents.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                {atRiskStudents.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className="p-3 text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold">{totalStudents}</p>
            <p className="text-[10px] text-muted-foreground">Total Students</p>
          </Card>
          <Card className="p-3 text-center">
            <BarChart3 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{avgAccuracy}%</p>
            <p className="text-[10px] text-muted-foreground">Avg Accuracy</p>
          </Card>
          <Card className="p-3 text-center">
            <Clipboard className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{assignments.length}</p>
            <p className="text-[10px] text-muted-foreground">Active Assignments</p>
          </Card>
          <Card className="p-3 text-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{atRiskStudents.length}</p>
            <p className="text-[10px] text-muted-foreground">At-Risk Students</p>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-4">
            {/* At-risk students */}
            {atRiskStudents.length > 0 && (
              <Card className="p-4 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-sm">Students Needing Attention</h3>
                </div>
                <div className="space-y-2">
                  {atRiskStudents.map(s => (
                    <div key={s.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{s.avatar_emoji}</span>
                        <span className="font-medium">{s.username}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{s.accuracy}% accuracy</span>
                        <span>Streak: {s.streak}d</span>
                        <span>Last: {s.lastActive}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Recent assignments */}
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Recent Assignments</h3>
              {assignments.slice(0, 3).map(a => (
                <Card key={a.id} className="p-3 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{a.title}</h4>
                    <span className="text-xs text-muted-foreground">Due {a.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={a.completionRate} className="flex-1 h-2" />
                    <span className="text-xs font-mono">{a.completionRate}%</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Class performance */}
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Class Performance</h3>
              <div className="grid gap-3">
                {classes.map(c => (
                  <Card key={c.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm">{c.name}</h4>
                        <p className="text-xs text-muted-foreground">{c.studentCount} students • Code: {c.code}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* CLASSES */}
          <TabsContent value="classes" className="space-y-4">
            <Button onClick={() => setShowNewClass(!showNewClass)} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Create New Class
            </Button>

            {showNewClass && (
              <Card className="p-4 space-y-3 border-primary/30">
                <Input
                  placeholder="Class name (e.g. AP Calculus — Period 3)"
                  value={newClassName}
                  onChange={e => setNewClassName(e.target.value)}
                />
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
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-mono">{c.code}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {c.studentCount} students</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Created {c.createdAt}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="gap-1">
                    <UserPlus className="w-3 h-3" /> Invite
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Send className="w-3 h-3" /> Notify All
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* STUDENTS */}
          <TabsContent value="students" className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search students..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {filteredStudents.map(s => (
                <Card key={s.id} className="p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.avatar_emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{s.username}</h4>
                        {s.streak > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                            🔥 {s.streak}d
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span>{s.questionsAnswered} questions</span>
                        <span className={s.accuracy >= 70 ? 'text-emerald-600' : 'text-destructive'}>
                          {s.accuracy}% accuracy
                        </span>
                        <span>Active {s.lastActive}</span>
                      </div>
                    </div>
                    <div className="w-12">
                      <Progress value={s.accuracy} className={`h-2 ${s.accuracy >= 70 ? '[&>div]:bg-emerald-500' : '[&>div]:bg-destructive'}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ASSIGNMENTS */}
          <TabsContent value="assignments" className="space-y-4">
            <Button onClick={() => setShowNewAssignment(!showNewAssignment)} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Create Assignment
            </Button>

            {showNewAssignment && (
              <Card className="p-4 space-y-3 border-primary/30">
                <Input
                  placeholder="Assignment title"
                  value={newAssignment.title}
                  onChange={e => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newAssignment.subject}
                    onChange={e => setNewAssignment(prev => ({ ...prev, subject: e.target.value }))}
                  >
                    <option value="math">Math</option>
                    <option value="english">English</option>
                    <option value="both">Both</option>
                    <option value="ap-calculus-ab">AP Calculus AB</option>
                    <option value="ap-us-history">AP US History</option>
                    <option value="ap-biology">AP Biology</option>
                  </select>
                  <Input
                    type="number"
                    min={5}
                    max={50}
                    value={newAssignment.questionCount}
                    onChange={e => setNewAssignment(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 10 }))}
                    placeholder="# Questions"
                  />
                </div>
                <Input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={e => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button onClick={createAssignment} className="flex-1">Assign</Button>
                  <Button variant="outline" onClick={() => setShowNewAssignment(false)}>Cancel</Button>
                </div>
              </Card>
            )}

            {assignments.map(a => (
              <Card key={a.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-sm">{a.title}</h4>
                    <p className="text-xs text-muted-foreground">{a.questionCount} questions • {a.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Due {a.dueDate}</p>
                    <p className={`text-sm font-bold ${a.completionRate >= 80 ? 'text-emerald-600' : a.completionRate >= 50 ? 'text-amber-500' : 'text-destructive'}`}>
                      {a.completionRate}% complete
                    </p>
                  </div>
                </div>
                <Progress value={a.completionRate} className="h-2" />
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
