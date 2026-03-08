import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Building2, Users, GraduationCap, BarChart3, Search,
  Download, Shield
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SchoolClass {
  id: string;
  name: string;
  class_code: string;
  teacher_id: string;
  teacher_name: string;
  studentCount: number;
}

interface SchoolStudent {
  id: string;
  username: string;
  avatar_emoji: string;
  questionsAnswered: number;
  accuracy: number;
}

const SchoolAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [students, setStudents] = useState<SchoolStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) return;
    const checkAdmin = async () => {
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      setIsAdmin(!!data);
      if (data) loadData();
      else setLoading(false);
    };
    checkAdmin();
  }, [user]);

  const loadData = async () => {
    // Get all classrooms (admin can see all)
    const { data: allClasses } = await supabase
      .from("classrooms")
      .select("id, name, class_code, teacher_id")
      .order("created_at", { ascending: false });

    const classrooms = allClasses || [];

    // Get teacher names
    const teacherIds = [...new Set(classrooms.map((c) => c.teacher_id))];
    const { data: teacherProfiles } = await supabase
      .from("profiles")
      .select("id, username")
      .in("id", teacherIds);
    const teacherMap = Object.fromEntries((teacherProfiles || []).map((p) => [p.id, p.username]));

    // Get member counts
    const classWithCounts: SchoolClass[] = [];
    for (const c of classrooms) {
      const { count } = await supabase
        .from("classroom_members")
        .select("*", { count: "exact", head: true })
        .eq("classroom_id", c.id);
      classWithCounts.push({
        ...c,
        teacher_name: teacherMap[c.teacher_id] || "Unknown",
        studentCount: count || 0,
      });
    }
    setClasses(classWithCounts);

    // Get all students (admin stats function)
    const { data: stats } = await supabase.rpc("get_admin_user_stats");
    setStudents(
      (stats || []).map((s: any) => ({
        id: s.user_id,
        username: s.username,
        avatar_emoji: s.avatar_emoji || "😎",
        questionsAnswered: s.questions_answered || 0,
        accuracy: s.questions_answered > 0
          ? Math.round((s.correct_answers / s.questions_answered) * 100)
          : 0,
      }))
    );

    setLoading(false);
  };

  const exportCSV = () => {
    const rows = [["Username", "Questions", "Accuracy %"]];
    students.forEach((s) => rows.push([s.username, String(s.questionsAnswered), String(s.accuracy)]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "school_students.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported!", description: "CSV downloaded." });
  };

  const filteredStudents = students.filter((s) =>
    s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = students.length;
  const totalClasses = classes.length;
  const totalTeachers = new Set(classes.map((c) => c.teacher_id)).size;
  const avgAccuracy = students.length > 0
    ? Math.round(students.reduce((s, st) => s + st.accuracy, 0) / students.length)
    : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Sign in to access admin</p>
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <Shield className="w-8 h-8 text-destructive mx-auto" />
          <p className="font-bold">Admin access required</p>
          <Link to="/"><Button variant="outline">Back to Home</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> School Admin
          </h1>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className="p-3 text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold">{totalStudents}</p>
            <p className="text-[10px] text-muted-foreground">Total Students</p>
          </Card>
          <Card className="p-3 text-center">
            <GraduationCap className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{totalTeachers}</p>
            <p className="text-[10px] text-muted-foreground">Teachers</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold">{totalClasses}</p>
            <p className="text-[10px] text-muted-foreground">Classes</p>
          </Card>
          <Card className="p-3 text-center">
            <BarChart3 className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-bold">{avgAccuracy}%</p>
            <p className="text-[10px] text-muted-foreground">Avg Accuracy</p>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-bold mb-3">Top Performing Classes</h3>
              {classes.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b last:border-0 border-border">
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">Teacher: {c.teacher_name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.studentCount} students</span>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-3">
            {classes.map((c) => (
              <Card key={c.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {c.teacher_name} • {c.studentCount} students • Code: {c.class_code}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            {filteredStudents.map((s) => (
              <Card key={s.id} className="p-3 flex items-center gap-3">
                <span className="text-2xl">{s.avatar_emoji}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{s.username}</h4>
                  <p className="text-xs text-muted-foreground">{s.questionsAnswered} Qs • {s.accuracy}%</p>
                </div>
                <Progress value={s.accuracy} className="w-16 h-2" />
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchoolAdmin;
