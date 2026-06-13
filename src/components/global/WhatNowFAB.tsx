import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getTest } from "@/data/usaNationalTests";

// Hide on these routes (auth flows, full-screen quiz/battle surfaces).
const HIDDEN_PREFIXES = ["/auth", "/battle/", "/quiz", "/k12-exam/", "/ap-study/", "/ap-frq/", "/pro-exam/"];

interface PathState {
  targetTestId: string | null;
  testDate: string | null;
  focus: "quick_wins" | "deep_learning" | "competition" | "balanced";
}

function loadPath(): PathState | null {
  try {
    const raw = localStorage.getItem("alpha_path_v1");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function pickNext(path: PathState | null): { label: string; route: string; reason: string } {
  if (!path?.targetTestId) {
    return { label: "Build my AlphaOmega Path", route: "/path", reason: "Pick your test in 30 seconds." };
  }
  const test = getTest(path.targetTestId);
  const short = test?.shortName ?? "test";
  // Test-date crunch wins everything.
  if (path.testDate) {
    const days = Math.round((new Date(path.testDate + "T00:00:00").getTime() - Date.now()) / 86400000);
    if (days >= 0 && days <= 7) {
      return { label: `${short} crunch — review misses`, route: "/review-queue", reason: `${days} days to go.` };
    }
  }
  switch (path.focus) {
    case "quick_wins": return { label: "5-Q Daily Challenge", route: "/daily", reason: "Quickest win today." };
    case "competition": return { label: "Quick Duel (3Q · 45s)", route: "/battle", reason: "Race a real opponent." };
    case "deep_learning": return { label: "Weakness retest", route: "/weakness-retest", reason: "Drill your weakest skill." };
    default: return { label: `${short} session`, route: test?.route ?? "/tests", reason: "Balanced practice." };
  }
}

export default function WhatNowFAB() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [path, setPath] = useState<PathState | null>(null);

  useEffect(() => { setPath(loadPath()); }, [pathname]);

  if (!user) return null;
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/") || (p.endsWith("/") && pathname.startsWith(p)))) return null;
  if (pathname === "/path" || pathname === "/start") return null;

  const next = pickNext(path);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
      {open && !dismissed && (
        <Card className="p-3 shadow-lg border-primary/40 bg-gradient-to-br from-background to-primary/5 max-w-[260px] animate-fade-in">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="text-xs font-bold uppercase tracking-wide text-primary">What now?</div>
            <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="text-sm font-semibold mb-1">{next.label}</div>
          <div className="text-xs text-muted-foreground mb-2">{next.reason}</div>
          <Button size="sm" className="w-full gap-1" onClick={() => { navigate(next.route); setOpen(false); }}>
            Start <ArrowRight className="w-3 h-3" />
          </Button>
        </Card>
      )}
      <Button
        size="icon"
        aria-label="What should I do next?"
        className="rounded-full shadow-xl h-12 w-12 bg-primary hover:bg-primary/90"
        onClick={() => { setDismissed(false); setOpen((o) => !o); }}
      >
        <Sparkles className="w-5 h-5" />
      </Button>
    </div>
  );
}