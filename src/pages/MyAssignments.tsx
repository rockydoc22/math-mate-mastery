import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ClipboardList, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface StudentAssignment {
  id: string;
  title: string;
  subject: string;
  question_count: number;
  due_date: string;
  classroom_name: string;
  questions_completed: number;
  questions_correct: number;
  completed_at: string | null;
}

const MyAssignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Get student's classrooms
      const { data: memberships } = await supabase
        .from("classroom_members")
        .select("classroom_id")
        .eq("user_id", user.id);

      if (!memberships || memberships.length === 0) {
        setLoading(false);
        return;
      }

      const classIds = memberships.map((m) => m.classroom_id);

      // Get assignments for those classrooms
      const { data: assignData } = await supabase
        .from("assignments")
        .select("id, title, subject, question_count, due_date, classroom_id")
        .in("classroom_id", classIds)
        .order("due_date", { ascending: true });

      if (!assignData || assignData.length === 0) {
        setLoading(false);
        return;
      }

      // Get classroom names
      const { data: classrooms } = await supabase
        .from("classrooms")
        .select("id, name")
        .in("id", classIds);

      const classMap = Object.fromEntries((classrooms || []).map((c) => [c.id, c.name]));

      // Get progress for each assignment
      const assignIds = assignData.map((a) => a.id);
      const { data: progressData } = await supabase
        .from("assignment_progress")
        .select("assignment_id, questions_completed, questions_correct, completed_at")
        .eq("user_id", user.id)
        .in("assignment_id", assignIds);

      const progressMap = Object.fromEntries(
        (progressData || []).map((p) => [p.assignment_id, p])
      );

      setAssignments(
        assignData.map((a) => {
          const prog = progressMap[a.id];
          return {
            id: a.id,
            title: a.title,
            subject: a.subject,
            question_count: a.question_count,
            due_date: a.due_date,
            classroom_name: classMap[a.classroom_id] || "Unknown",
            questions_completed: prog?.questions_completed || 0,
            questions_correct: prog?.questions_correct || 0,
            completed_at: prog?.completed_at || null,
          };
        })
      );
      setLoading(false);
    };
    load();
  }, [user]);

  const isOverdue = (date: string) => new Date(date) < new Date();
  const isPending = (a: StudentAssignment) => !a.completed_at;
  const pending = assignments.filter(isPending);
  const completed = assignments.filter((a) => a.completed_at);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Sign in to view assignments</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" /> My Assignments
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : assignments.length === 0 ? (
          <Card className="p-6 text-center border-dashed">
            <ClipboardList className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="font-bold mb-1">No assignments yet</p>
            <p className="text-sm text-muted-foreground">Join a class to see your assignments</p>
            <Link to="/join-class"><Button className="mt-3">Join a Class</Button></Link>
          </Card>
        ) : (
          <>
            {pending.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-bold text-sm text-muted-foreground">Pending ({pending.length})</h2>
                {pending.map((a) => {
                  const pct = a.question_count > 0 ? Math.round((a.questions_completed / a.question_count) * 100) : 0;
                  const overdue = isOverdue(a.due_date);
                  return (
                    <Card key={a.id} className={`p-4 space-y-2 ${overdue ? "border-destructive/50" : ""}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-sm">{a.title}</h3>
                          <p className="text-xs text-muted-foreground">{a.classroom_name} • {a.subject}</p>
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${overdue ? "text-destructive" : "text-muted-foreground"}`}>
                          {overdue ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {overdue ? "Overdue" : `Due ${a.due_date}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="flex-1 h-2" />
                        <span className="text-xs font-mono">{a.questions_completed}/{a.question_count}</span>
                      </div>
                      <Link to={`/quiz?subject=${a.subject}&count=${a.question_count - a.questions_completed}`}>
                        <Button size="sm" className="w-full">{pct > 0 ? "Continue" : "Start"}</Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            )}

            {completed.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-bold text-sm text-muted-foreground">Completed ({completed.length})</h2>
                {completed.map((a) => (
                  <Card key={a.id} className="p-3 flex items-center gap-3 opacity-80">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{a.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {a.questions_correct}/{a.question_count} correct •{" "}
                        {a.question_count > 0 ? Math.round((a.questions_correct / a.question_count) * 100) : 0}%
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyAssignments;
