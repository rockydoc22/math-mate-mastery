import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Target, Sparkles, Brain, Gamepad2, Calendar, Globe2, Flame, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  USA_NATIONAL_TESTS,
  STAGE_LABELS,
  type NationalTest,
  type TestStage,
  getTest,
} from "@/data/usaNationalTests";
import { INTL_EXAMS } from "@/data/intlExamsRegistry";
import CoachMyTest from "@/components/path/CoachMyTest";
import MicroPlan from "@/components/path/MicroPlan";

const STORAGE_KEY = "alpha_path_v1";

interface PathState {
  age: number;
  targetTestId: string | null;
  testDate: string | null; // ISO yyyy-mm-dd
  focus: "quick_wins" | "deep_learning" | "competition" | "balanced";
}

const DEFAULT_STATE: PathState = {
  age: 16,
  targetTestId: null,
  testDate: null,
  focus: "balanced",
};

function loadState(): PathState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_STATE;
}

function saveState(s: PathState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

const FOCUS_OPTIONS: { id: PathState["focus"]; label: string; desc: string; icon: any }[] = [
  { id: "quick_wins", label: "Quick Wins", desc: "5-min games + streaks", icon: Gamepad2 },
  { id: "deep_learning", label: "Deep Learning", desc: "Focused weakness drills", icon: Brain },
  { id: "competition", label: "Competition", desc: "Duels & leaderboards", icon: Flame },
  { id: "balanced", label: "Balanced", desc: "A bit of everything", icon: Sparkles },
];

function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const target = new Date(iso + "T00:00:00").getTime();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((target - today.getTime()) / 86400000);
}

const STAGE_ORDER: TestStage[] = [
  "k8", "high_school", "college_admissions", "advanced_placement", "graduate", "professional", "career",
];

const AlphaPath = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<PathState>(loadState());
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<TestStage | "all">("all");

  useEffect(() => { saveState(state); }, [state]);

  const target = state.targetTestId ? getTest(state.targetTestId) : undefined;
  const days = daysUntil(state.testDate);

  const filtered: NationalTest[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USA_NATIONAL_TESTS.filter((t) => {
      if (stageFilter !== "all" && t.stage !== stageFilter) return false;
      if (state.age < t.ageRange[0] || state.age > t.ageRange[1]) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.shortName.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    });
  }, [query, stageFilter, state.age]);

  const grouped = useMemo(() => {
    const map = new Map<TestStage, NationalTest[]>();
    for (const stage of STAGE_ORDER) map.set(stage, []);
    for (const t of filtered) map.get(t.stage)!.push(t);
    return map;
  }, [filtered]);

  const pickTest = (id: string) => setState((s) => ({ ...s, targetTestId: id }));

  // Day 4: weakness-targeted next-best-action
  const recommended = useMemo(() => {
    if (!target) {
      return { title: "Pick your test below", desc: "Tell us what you're preparing for and we'll build a path.", route: "#tests", cta: "Choose a test" };
    }
    switch (state.focus) {
      case "quick_wins":
        return { title: "Daily Challenge", desc: `5 questions tuned for ${target.shortName}. Build your streak.`, route: "/daily", cta: "Start daily" };
      case "competition":
        return { title: "Quick Duel", desc: `Head-to-head ${target.shortName} sprint — 3 questions, 45s.`, route: "/battle", cta: "Find opponent" };
      case "deep_learning":
        return { title: "Weakness Retest", desc: `Drill your weakest ${target.shortName} skills.`, route: "/weakness-retest", cta: "Focus drill" };
      default:
        return { title: target.route ? `${target.shortName} Practice` : "Test Catalog", desc: `Start a balanced ${target.shortName} session.`, route: target.route ?? "/tests", cta: "Begin session" };
    }
  }, [target, state.focus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-16">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Go back" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Target className="w-7 h-7 text-primary" />
              Your AlphaOmega Path
            </h1>
            <p className="text-sm text-muted-foreground">One app, every test — built around you. 100% free.</p>
          </div>
        </div>

        {/* My Path summary */}
        <Card className="p-5 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">My target test</div>
              <div className="text-xl font-bold">{target ? target.name : "Not chosen yet"}</div>
              {target?.coverage && <div className="text-xs text-muted-foreground">{target.coverage}</div>}
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Test date
              </label>
              <Input
                type="date"
                value={state.testDate ?? ""}
                onChange={(e) => setState((s) => ({ ...s, testDate: e.target.value || null }))}
                className="h-9"
              />
              {days !== null && (
                <div className="text-xs text-muted-foreground">
                  {days > 0 ? `${days} days to go` : days === 0 ? "Test day!" : `${Math.abs(days)} days ago`}
                </div>
              )}
            </div>
            <div>
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => recommended.route !== "#tests" && navigate(recommended.route)}
              >
                <Sparkles className="w-4 h-4" />
                {recommended.cta}
              </Button>
              <div className="text-xs text-muted-foreground mt-2">{recommended.desc}</div>
            </div>
          </div>
        </Card>

        {/* Focus selector */}
        <div>
          <div className="text-sm font-semibold mb-2">How do you like to learn?</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {FOCUS_OPTIONS.map((f) => {
              const Icon = f.icon;
              const active = state.focus === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setState((s) => ({ ...s, focus: f.id }))}
                  className={`text-left rounded-lg p-3 border transition ${
                    active ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">{f.label}</span>
                    {active && <CheckCircle2 className="w-3 h-3 text-primary ml-auto" />}
                  </div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day 6-7: AI Coach + 7-day micro plan, only shown after a test is picked */}
        {target && (
          <div className="grid md:grid-cols-2 gap-4">
            <CoachMyTest target={target} daysUntil={days} focus={state.focus} />
            <MicroPlan target={target} daysUntil={days} focus={state.focus} />
          </div>
        )}

        {/* Age + search */}
        <Card className="p-4 space-y-4" id="tests">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Age</label>
              <div className="flex items-center gap-3">
                <Slider
                  value={[state.age]}
                  min={6}
                  max={60}
                  step={1}
                  onValueChange={(v) => setState((s) => ({ ...s, age: v[0] }))}
                />
                <span className="text-sm font-semibold w-10 text-right">{state.age}</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground mb-1 block">Search tests</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="SAT, MCAT, NCLEX…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStageFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                stageFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >All</button>
            {STAGE_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => setStageFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  stageFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >{STAGE_LABELS[s]}</button>
            ))}
          </div>
        </Card>

        {/* Test grid */}
        <div className="space-y-6">
          {STAGE_ORDER.map((stage) => {
            const tests = grouped.get(stage) ?? [];
            if (tests.length === 0) return null;
            return (
              <div key={stage}>
                <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  {STAGE_LABELS[stage]}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tests.map((t) => {
                    const selected = state.targetTestId === t.id;
                    return (
                      <Card
                        key={t.id}
                        className={`p-4 cursor-pointer transition ${
                          selected ? "border-primary ring-2 ring-primary/40" : "hover:border-primary/60"
                        }`}
                        onClick={() => pickTest(t.id)}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="font-bold">{t.name}</div>
                          <Badge
                            variant={t.status === "live" ? "default" : t.status === "beta" ? "secondary" : "outline"}
                            className="text-[10px]"
                          >
                            {t.status === "live" ? "Live" : t.status === "beta" ? "Beta" : "Soon"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">{t.description}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">
                            Ages {t.ageRange[0]}–{t.ageRange[1]}
                          </span>
                          {selected && t.route && (
                            <Link
                              to={t.route}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-semibold text-primary hover:underline"
                            >Open →</Link>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <Card className="p-6 text-center text-sm text-muted-foreground">
              No tests match. Try widening your age range or clearing the search.
            </Card>
          )}
        </div>

        {/* International rail */}
        <Card className="p-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-2">
            <Globe2 className="w-4 h-4" /> International — coming soon
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {INTL_EXAMS.map((e) => (
              <div key={e.id} className="rounded-md border border-dashed border-border p-3 opacity-80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{e.name}</span>
                  <Badge variant="outline" className="text-[10px]">{e.region}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">{e.description}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlphaPath;