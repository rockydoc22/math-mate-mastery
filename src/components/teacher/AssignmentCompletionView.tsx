import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  assignmentId: string;
  assignmentTitle: string;
  questionCount: number;
  dueDate: string;
  classroomId: string;
}

interface StudentProgress {
  username: string;
  avatar_emoji: string;
  questions_completed: number;
  questions_correct: number;
  completed_at: string | null;
}

export const AssignmentCompletionView = ({ assignmentId, assignmentTitle, questionCount, dueDate, classroomId }: Props) => {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Get class members
      const { data: members } = await supabase
        .from("classroom_members")
        .select("user_id")
        .eq("classroom_id", classroomId);

      if (!members || members.length === 0) {
        setLoading(false);
        return;
      }

      const userIds = members.map((m) => m.user_id);

      // Get profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_emoji")
        .in("id", userIds);

      // Get progress
      const { data: progress } = await supabase
        .from("assignment_progress")
        .select("user_id, questions_completed, questions_correct, completed_at")
        .eq("assignment_id", assignmentId);

      const progressMap = Object.fromEntries(
        (progress || []).map((p) => [p.user_id, p])
      );

      setStudents(
        (profiles || []).map((p) => ({
          username: p.username,
          avatar_emoji: p.avatar_emoji || "😎",
          questions_completed: progressMap[p.id]?.questions_completed || 0,
          questions_correct: progressMap[p.id]?.questions_correct || 0,
          completed_at: progressMap[p.id]?.completed_at || null,
        }))
      );
      setLoading(false);
    };
    load();
  }, [assignmentId, classroomId]);

  const completedCount = students.filter((s) => s.completed_at).length;
  const completionRate = students.length > 0 ? Math.round((completedCount / students.length) * 100) : 0;

  if (loading) return <div className="py-2 text-xs text-muted-foreground">Loading...</div>;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="w-3 h-3" />
        <span>{completedCount}/{students.length} completed</span>
        <Progress value={completionRate} className="flex-1 h-1.5" />
        <span>{completionRate}%</span>
      </div>
      <div className="space-y-1">
        {students.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span>{s.avatar_emoji}</span>
            <span className="flex-1">{s.username}</span>
            {s.completed_at ? (
              <CheckCircle className="w-3 h-3 text-emerald-500" />
            ) : (
              <span className="text-muted-foreground">
                {s.questions_completed}/{questionCount}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
