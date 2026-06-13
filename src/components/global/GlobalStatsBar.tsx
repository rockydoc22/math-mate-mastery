import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Flame, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";

const HIDDEN_PREFIXES = ["/auth", "/battle/", "/k12-exam/", "/ap-study/", "/ap-frq/", "/pro-exam/"];

// Lightweight, dismissible top-right chip showing streak + quiz count.
export default function GlobalStatsBar() {
  const { user } = useAuth();
  const { streak } = useGameStats();
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => { setHidden(false); }, [pathname]);

  if (!user || hidden) return null;
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  if (pathname === "/" || pathname === "/landing") return null; // Home already shows its own

  const current = streak?.current_streak ?? 0;

  return (
    <div className="fixed top-3 right-3 z-30 flex items-center gap-1 pointer-events-none">
      <Link
        to="/streak-calendar"
        className="pointer-events-auto flex items-center gap-1 rounded-full bg-background/85 backdrop-blur border border-border px-2.5 py-1 text-xs font-semibold shadow-sm hover:border-primary/60 transition"
        aria-label={`Current streak ${current} days`}
      >
        <Flame className={`w-3.5 h-3.5 ${current > 0 ? "text-orange-500" : "text-muted-foreground"}`} />
        {current}
      </Link>
      <Link
        to="/achievements"
        className="pointer-events-auto flex items-center gap-1 rounded-full bg-background/85 backdrop-blur border border-border px-2.5 py-1 text-xs font-semibold shadow-sm hover:border-primary/60 transition"
        aria-label="Achievements"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-500" />
      </Link>
    </div>
  );
}