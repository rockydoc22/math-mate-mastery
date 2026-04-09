import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";
import { Settings, User, RefreshCw, Bell } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { usePWAUpdate, APP_VERSION } from "@/hooks/usePWAUpdate";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ExamSelectorProps {
  onSelect: (examType: ExamType) => void;
  isModal?: boolean;
}

export const ExamSelector = ({ onSelect, isModal = false }: ExamSelectorProps) => {
  const navigate = useNavigate();
  const { forceUpdate, isUpdating, hasUpdate } = usePWAUpdate();
  const { user } = useAuth();
  const [playerUsername, setPlayerUsername] = useState("Student");
  const [playerAvatar, setPlayerAvatar] = useState("🧑‍🚀");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("username, avatar_emoji")
        .eq("id", user.id)
        .single();
      if (data) {
        setPlayerUsername(data.username || "Student");
        setPlayerAvatar(data.avatar_emoji || "🧑‍🚀");
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 ${!isModal ? 'bg-gradient-to-br from-background via-primary/5 to-accent/10' : ''}`}>
      <div className="max-w-lg w-full space-y-5 animate-in fade-in duration-500">

        {/* User header bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{playerAvatar}</span>
            <div>
              <p className="font-semibold text-sm">{playerUsername}</p>
              <p className="text-[10px] text-muted-foreground">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={forceUpdate}
              disabled={isUpdating}
              variant={hasUpdate ? "default" : "ghost"}
              size="sm"
              className={`gap-1 text-[10px] h-7 px-2 ${hasUpdate ? 'animate-pulse bg-emerald-500 hover:bg-emerald-600 text-white' : ''}`}
            >
              <RefreshCw className={`w-3 h-3 ${isUpdating ? "animate-spin" : ""}`} />
              {isUpdating ? "..." : hasUpdate ? `🆕 v${APP_VERSION}` : `v${APP_VERSION}`}
            </Button>
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bell className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <User className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">AΩ</span>
          </div>
          <h1 className="text-2xl font-bold">What are you studying for?</h1>
          <p className="text-sm text-muted-foreground">
            Choose your exam. You can switch anytime in Settings.
          </p>
        </div>

        {/* Category cards — all full-width */}
        <div className="space-y-3">

          {/* High School Standardized Tests */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate("/high-school-exams")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex gap-2 text-3xl">
                <span>📐</span><span>🎯</span><span>🎓</span><span>🧪</span>
              </div>
              <h3 className="font-bold text-lg">SAT · PSAT · ACT · AP</h3>
              <p className="text-xs text-muted-foreground">College entrance exams & Advanced Placement courses</p>
            </div>
          </Card>

          {/* Homeschool & K-12 */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate("/k12-exams")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">🏫</span>
              <h3 className="font-bold text-lg">Homeschool & K-12 Exams</h3>
              <p className="text-xs text-muted-foreground">Iowa Assessments, GED, HiSET, TASC & more</p>
            </div>
          </Card>

          {/* Competitions */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate("/competitions")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">🏆</span>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-lg">Competitions</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">NEW</span>
              </div>
              <p className="text-xs text-muted-foreground">French, Spanish, German, Italian, Latin & Debate</p>
            </div>
          </Card>

          {/* Professional Exams */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate("/pro-exams")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">🎓</span>
              <h3 className="font-bold text-lg">Professional School Exams</h3>
              <p className="text-xs text-muted-foreground">GRE, GMAT, LSAT, MCAT, DAT, OAT & more</p>
            </div>
          </Card>

          {/* IQ & Personality */}
          <Card
            className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
            onClick={() => navigate("/iq-personality")}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">🧠</span>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-lg">IQ & Personality Tests</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">NEW</span>
              </div>
              <p className="text-xs text-muted-foreground">Big Five, MBTI, DISC, Enneagram, IQ & more</p>
            </div>
          </Card>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          100% Free — No catch! Track progress, compete, earn achievements 🏆
        </p>
      </div>
    </div>
  );
};
