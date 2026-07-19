import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { getDailyLimit, setDailyLimit, DAILY_CREDIT_MAX } from "@/hooks/useDailyCredits";
import { readUsageLog, UsageLogEntry } from "@/hooks/useGameZoneStats";

type Teen = { id: string; name: string };

const TEENS_KEY = "aoParentTeens";

function loadTeens(): Teen[] {
  try {
    const raw = localStorage.getItem(TEENS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Seed with the anonymous local device profile so parents see something.
  return [{ id: "anon", name: "This device" }];
}

function saveTeens(teens: Teen[]) {
  try { localStorage.setItem(TEENS_KEY, JSON.stringify(teens)); } catch {}
}

function last7Days(): string[] {
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }
  return out;
}

function TeenRow({ teen, onRemove }: { teen: Teen; onRemove: () => void }) {
  const [limit, setLimit] = useState<number>(() => getDailyLimit(teen.id));
  const [log, setLog] = useState<UsageLogEntry[]>(() => readUsageLog(teen.id));

  useEffect(() => {
    setLimit(getDailyLimit(teen.id));
    setLog(readUsageLog(teen.id));
  }, [teen.id]);

  const days = last7Days();
  const byDay = useMemo(() => {
    const map: Record<string, { plays: number; points: number }> = {};
    days.forEach((d) => (map[d] = { plays: 0, points: 0 }));
    log.forEach((e) => {
      if (map[e.date]) {
        map[e.date].plays += 1;
        map[e.date].points += e.points;
      }
    });
    return days.map((d) => ({ date: d, ...map[d] }));
  }, [log, days]);

  const maxPlays = Math.max(1, ...byDay.map((d) => d.plays));
  const weekPlays = byDay.reduce((s, d) => s + d.plays, 0);
  const weekPoints = byDay.reduce((s, d) => s + d.points, 0);

  // Simple score trend: compare last 3 days vs prior 3 days (average points/day).
  const first3 = byDay.slice(0, 3).reduce((s, d) => s + d.points, 0) / 3;
  const last3 = byDay.slice(4, 7).reduce((s, d) => s + d.points, 0) / 3;
  const trend = last3 - first3;
  const trendLabel = trend > 5 ? `▲ improving (+${Math.round(trend)})`
    : trend < -5 ? `▼ dipping (${Math.round(trend)})`
    : "→ steady";
  const trendColor = trend > 5 ? "text-emerald-600" : trend < -5 ? "text-destructive" : "text-muted-foreground";

  const applyLimit = (n: number) => {
    setLimit(n);
    setDailyLimit(teen.id, n);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold">{teen.name}</div>
          <div className="text-xs text-muted-foreground">ID: {teen.id.slice(0, 12)}{teen.id.length > 12 && "…"}</div>
        </div>
        {teen.id !== "anon" && (
          <Button variant="ghost" size="sm" onClick={onRemove} aria-label="Remove">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        )}
      </div>

      {/* Weekly usage */}
      <div>
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-semibold uppercase tracking-wider text-muted-foreground">Last 7 days</span>
          <span className="text-muted-foreground">{weekPlays} plays · {weekPoints} pts</span>
        </div>
        <div className="flex items-end gap-1 h-20">
          {byDay.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm bg-primary/70 hover:bg-primary transition-colors"
                style={{ height: `${(d.plays / maxPlays) * 100}%`, minHeight: d.plays > 0 ? 4 : 2 }}
                title={`${d.date}: ${d.plays} plays, ${d.points} pts`}
              />
              <span className="text-[9px] text-muted-foreground">
                {new Date(d.date + "T00:00").toLocaleDateString(undefined, { weekday: "narrow" })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Score trend */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Score trend</span>
        <span className={`font-semibold ${trendColor}`}>{trendLabel}</span>
      </div>

      {/* Daily limit */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Daily play limit</span>
          <span className="text-sm font-bold tabular-nums">{limit} / day</span>
        </div>
        <Slider
          value={[limit]}
          onValueChange={(v) => applyLimit(v[0])}
          min={0}
          max={30}
          step={1}
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          Default is {DAILY_CREDIT_MAX}. Set to 0 to pause games for today.
        </p>
      </div>
    </Card>
  );
}

export default function ParentControls() {
  const [teens, setTeens] = useState<Teen[]>(() => loadTeens());
  const [newName, setNewName] = useState("");
  const [newId, setNewId] = useState("");

  const addTeen = () => {
    const name = newName.trim();
    const id = newId.trim();
    if (!name || !id) return;
    if (teens.some((t) => t.id === id)) return;
    const next = [...teens, { name, id }];
    setTeens(next);
    saveTeens(next);
    setNewName("");
    setNewId("");
  };

  const removeTeen = (id: string) => {
    const next = teens.filter((t) => t.id !== id);
    setTeens(next);
    saveTeens(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <GameZoneHeader />
      <main className="max-w-lg mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5" /> Parent Controls
          </h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Track each teen's weekly Game Zone activity and set their daily play cap.
          Limits apply immediately.
        </p>

        <div className="space-y-3">
          {teens.map((t) => (
            <TeenRow key={t.id} teen={t} onRemove={() => removeTeen(t.id)} />
          ))}
        </div>

        <Card className="p-4 space-y-2">
          <div className="text-sm font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add a teen profile
          </div>
          <p className="text-xs text-muted-foreground">
            Enter the teen's display name and their account user ID
            (they can find it in Profile → Settings). Or leave it as "anon"
            to track this device.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Name (e.g. Alex)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Input
              placeholder="User ID"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
            />
            <Button onClick={addTeen} disabled={!newName.trim() || !newId.trim()}>
              Add
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}