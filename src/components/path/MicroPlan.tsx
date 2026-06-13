import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import type { NationalTest } from "@/data/usaNationalTests";

interface Props {
  target: NationalTest;
  daysUntil: number | null;
  focus: "quick_wins" | "deep_learning" | "competition" | "balanced";
}

interface Day {
  label: string;
  activity: string;
  route: string;
}

// Pure, deterministic 7-day micro plan derived from focus + days remaining.
function buildPlan(target: NationalTest, focus: Props["focus"], daysUntil: number | null): Day[] {
  const baseRoute = target.route ?? "/tests";
  const crunch = daysUntil !== null && daysUntil <= 14;
  const recipes: Record<Props["focus"], Day[]> = {
    quick_wins: [
      { label: "Mon", activity: "5-question daily challenge", route: "/daily" },
      { label: "Tue", activity: "Rapid Facts (60s)", route: "/rapid-facts" },
      { label: "Wed", activity: "Word of the Day + spin wheel", route: "/word-of-the-day" },
      { label: "Thu", activity: "Streak booster set", route: "/daily" },
      { label: "Fri", activity: "Quick Duel (3Q / 45s)", route: "/battle" },
      { label: "Sat", activity: `${target.shortName} mini-quiz (10Q)`, route: baseRoute },
      { label: "Sun", activity: "Review mistakes", route: "/mistake-journal" },
    ],
    deep_learning: [
      { label: "Mon", activity: `${target.shortName} diagnostic`, route: baseRoute },
      { label: "Tue", activity: "Weakness retest (top 2 skills)", route: "/weakness-retest" },
      { label: "Wed", activity: "Concept explainer on weakest topic", route: "/concept-explainer" },
      { label: "Thu", activity: "Targeted 15Q drill", route: baseRoute },
      { label: "Fri", activity: "Mistake journal deep dive", route: "/mistake-journal" },
      { label: "Sat", activity: `${target.shortName} timed section`, route: baseRoute },
      { label: "Sun", activity: "Reflection + skill graph review", route: "/skill-graph" },
    ],
    competition: [
      { label: "Mon", activity: "Quick Duel warm-up", route: "/battle" },
      { label: "Tue", activity: "Boss Battle", route: "/boss-battle" },
      { label: "Wed", activity: "Leaderboard climb (10Q)", route: "/leaderboard" },
      { label: "Thu", activity: "Survival mode", route: "/survival" },
      { label: "Fri", activity: "Endurance run (3 lives)", route: "/endurance-run" },
      { label: "Sat", activity: `${target.shortName} elite practice`, route: "/elite-practice" },
      { label: "Sun", activity: "Friend compare + rematch", route: "/friend-compare" },
    ],
    balanced: [
      { label: "Mon", activity: "Daily challenge", route: "/daily" },
      { label: "Tue", activity: `${target.shortName} adaptive drill`, route: "/adaptive-learning" },
      { label: "Wed", activity: "Weakness retest", route: "/weakness-retest" },
      { label: "Thu", activity: "Quick Duel", route: "/battle" },
      { label: "Fri", activity: "Concept explainer", route: "/concept-explainer" },
      { label: "Sat", activity: `${target.shortName} full practice set`, route: baseRoute },
      { label: "Sun", activity: "Mistake journal review", route: "/mistake-journal" },
    ],
  };
  const plan = recipes[focus];
  if (crunch) {
    // In test-week crunch: weight weekend toward full practice.
    plan[5] = { label: "Sat", activity: `${target.shortName} full timed simulation`, route: baseRoute };
    plan[6] = { label: "Sun", activity: "Review every miss + light recap", route: "/mistake-journal" };
  }
  return plan;
}

export default function MicroPlan({ target, daysUntil, focus }: Props) {
  const plan = buildPlan(target, focus, daysUntil);
  return (
    <Card className="p-4">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-sm font-bold">Your 7-day micro plan</h3>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          Tuned to {focus.replace("_", " ")}
        </span>
      </div>
      <ol className="grid sm:grid-cols-2 gap-2">
        {plan.map((d) => (
          <li key={d.label}>
            <Link
              to={d.route}
              className="flex items-center gap-2 rounded-md border border-border hover:border-primary/60 p-2 text-sm transition"
            >
              <span className="w-9 text-xs font-bold text-primary">{d.label}</span>
              <span className="flex-1">{d.activity}</span>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ol>
    </Card>
  );
}