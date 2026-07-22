import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";
import { Search, Settings, User, RefreshCw, Bell } from "lucide-react";
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
  const [testSearchQuery, setTestSearchQuery] = useState("");

  const openTestSearch = () => {
    const q = testSearchQuery.trim();
    navigate(q ? `/tests?q=${encodeURIComponent(q)}` : "/tests");
  };

  // Category cards with searchable keywords so the search bar filters live.
  const CATEGORIES = [
    {
      id: "hs",
      route: "/high-school-exams",
      title: "SAT · PSAT · ACT · AP",
      subtitle: "College entrance exams & Advanced Placement courses",
      emojis: ["📐", "🎯", "🎓", "🧪"],
      keywords: "sat psat act ap advanced placement college board english math reading writing science subject test high school",
    },
    {
      id: "k12",
      route: "/k12-exams",
      title: "Homeschool & K-12 Exams",
      subtitle: "Iowa Assessments, GED, HiSET, TASC & more",
      emojis: ["🏫"],
      keywords: "homeschool k12 k-12 iowa ged hiset tasc map growth stanford terranova pssa star elementary middle school",
    },
    {
      id: "comp",
      route: "/competitions",
      title: "Competitions",
      subtitle: "French, Spanish, German, Italian, Latin, Debate, AMC, Physics Bowl…",
      emojis: ["🏆"],
      keywords: "competition olympiad amc aime usaco physics bowl chemistry biology economics french spanish german italian latin debate lincoln douglas policy public forum",
      isNew: true,
    },
    {
      id: "pro",
      route: "/pro-exams",
      title: "Professional School Exams",
      subtitle: "GRE, GMAT, LSAT, MCAT, DAT, OAT & more",
      emojis: ["🎓"],
      keywords: "gre gmat lsat mcat dat oat teas nclex bar law medical dental graduate professional",
    },
    {
      id: "iq",
      route: "/iq-personality",
      title: "Cognitive Skills & Personality",
      subtitle: "Big Five, MBTI, DISC, Enneagram, cognitive practice & more",
      emojis: ["🧠"],
      keywords: "iq personality cognitive big five ocean mbti disc enneagram strengths emotional intelligence learning style",
      isNew: true,
    },
  ];

  const q = testSearchQuery.trim().toLowerCase();
  const filtered = q
    ? CATEGORIES.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.keywords.includes(q)
      )
    : CATEGORIES;

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
          <h1 className="text-2xl font-bold">Choose your test</h1>
        </div>

        <Card className="p-3 border border-primary/20 bg-card">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={testSearchQuery}
                onChange={(e) => setTestSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openTestSearch();
                }}
                placeholder="Name your game"
                className="pl-9"
                aria-label="Search all tests and courses"
              />
            </div>
            <Button onClick={openTestSearch} className="shrink-0">
              Search
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            Switch anytime in Settings
          </p>
        </Card>

        {/* Category cards — all full-width */}
        <div className="space-y-3">
          {filtered.map(c => (
            <Card
              key={c.id}
              className="p-5 cursor-pointer border-2 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50"
              onClick={() => navigate(c.route)}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex gap-2 text-3xl">
                  {c.emojis.map((e, i) => <span key={i}>{e}</span>)}
                </div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg">{c.title}</h3>
                  {c.isNew && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">NEW</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{c.subtitle}</p>
              </div>
            </Card>
          ))}

          {filtered.length === 0 && (
            <Card className="p-6 text-center space-y-3 border-dashed">
              <p className="text-sm text-muted-foreground">
                No categories match "{testSearchQuery}".
              </p>
              <Button size="sm" onClick={openTestSearch} className="gap-2">
                <Search className="w-4 h-4" /> Search the full test catalog
              </Button>
            </Card>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          100% Free — No catch! Track progress, compete, earn achievements 🏆
        </p>
      </div>
    </div>
  );
};
