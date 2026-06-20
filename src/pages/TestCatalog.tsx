import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, ExternalLink, Download, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useParentalGate } from "@/hooks/useParentalGate";
import {
  TEST_CATALOG, TEST_TYPE_LABELS, GRADE_BUCKETS, AGE_BUCKETS,
  searchCatalog, type TestType,
} from "@/data/testCatalog";

const ALL_TYPES = Object.keys(TEST_TYPE_LABELS) as TestType[];

export default function TestCatalog() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { guard, gate } = useParentalGate();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [types, setTypes] = useState<TestType[]>(
    (params.get("type")?.split(",").filter(Boolean) as TestType[]) ?? []
  );
  const [gradeBucket, setGradeBucket] = useState<string>(params.get("grade") ?? "");
  const [ageBucket, setAgeBucket] = useState<string>(params.get("age") ?? "");

  const results = useMemo(
    () => searchCatalog(q, { types, gradeBucket: gradeBucket || undefined, ageBucket: ageBucket || undefined }),
    [q, types, gradeBucket, ageBucket]
  );

  const toggleType = (t: TestType) => {
    setTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const sync = () => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (types.length) next.set("type", types.join(","));
    if (gradeBucket) next.set("grade", gradeBucket);
    if (ageBucket) next.set("age", ageBucket);
    setParams(next, { replace: true });
  };

  const clearAll = () => {
    setQ(""); setTypes([]); setGradeBucket(""); setAgeBucket("");
    setParams(new URLSearchParams(), { replace: true });
  };

  const open = (href: string, external?: boolean) => {
    if (external || href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      navigate(href);
    }
  };

  const activeFilterCount =
    (q ? 1 : 0) + types.length + (gradeBucket ? 1 : 0) + (ageBucket ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <SEO
        title="Find a Test — Search by Grade, Age & Type"
        description="Search every test, course, and practice flow. Filter by grade level, age, and exam type."
        path="/tests"
      />
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-xl font-bold flex-1">Find a Test</h1>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1 text-xs">
              <X className="w-3 h-3" /> Clear
            </Button>
          )}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={sync}
            placeholder="Search tests… (e.g. prealgebra, GED, AP Chem, MBTI)"
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <Card className="p-3 space-y-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Type</div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TYPES.map(t => {
                const active = types.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => { toggleType(t); setTimeout(sync, 0); }}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      active ? "bg-primary text-primary-foreground border-primary"
                             : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {TEST_TYPE_LABELS[t]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Grade level</div>
            <div className="flex flex-wrap gap-1.5">
              {GRADE_BUCKETS.map(g => {
                const active = gradeBucket === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => { setGradeBucket(active ? "" : g.id); setTimeout(sync, 0); }}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      active ? "bg-primary text-primary-foreground border-primary"
                             : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Age</div>
            <div className="flex flex-wrap gap-1.5">
              {AGE_BUCKETS.map(a => {
                const active = ageBucket === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => { setAgeBucket(active ? "" : a.id); setTimeout(sync, 0); }}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      active ? "bg-primary text-primary-foreground border-primary"
                             : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="text-xs text-muted-foreground px-1">
          {results.length} of {TEST_CATALOG.length} {results.length === 1 ? "result" : "results"}
        </div>

        <div className="grid gap-2">
          {results.map(item => (
            item.external || item.href.startsWith("http") ? (
              <button
                key={item.id}
                type="button"
                onClick={() => guard(
                  () => window.open(item.href, "_blank", "noopener,noreferrer"),
                  { reason: "This opens an external download or website. A parent must continue." }
                )}
                className="block w-full text-left p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
              >
                <CardBody item={item} />
              </button>
            ) : (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.href)}
                className="block w-full text-left p-3 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
              >
                <CardBody item={item} />
              </button>
            )
          ))}

          {results.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No tests match your search. Try clearing filters or different keywords.
              </p>
              <Button variant="outline" size="sm" className="mt-3" onClick={clearAll}>Clear filters</Button>
            </Card>
          )}
        </div>
        {gate}
      </div>
    </div>
  );
}

function CardBody({ item }: { item: ReturnType<typeof searchCatalog>[number] }) {
  return (
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{item.icon ?? "📚"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    {item.external && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold">
                        <Download className="w-3 h-3" /> PDF
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                      {TEST_TYPE_LABELS[item.type]}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      Grades {summarizeGrades(item.grades)}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      Ages {item.ageMin}{item.ageMax >= 99 ? "+" : `–${item.ageMax}`}
                    </span>
                  </div>
                </div>
                {item.external && <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />}
              </div>
  );
}

function summarizeGrades(grades: string[]): string {
  if (grades.includes("adult") && grades.length === 1) return "Adult";
  const numeric = grades.filter(g => /^\d+$/.test(g)).map(Number).sort((a,b) => a-b);
  const extras = grades.filter(g => !/^\d+$/.test(g));
  let out = "";
  if (numeric.length) {
    out = numeric.length > 1 ? `${numeric[0]}–${numeric[numeric.length-1]}` : `${numeric[0]}`;
  }
  if (extras.length) out += (out ? ", " : "") + extras.map(capitalize).join(", ");
  return out || "All";
}
function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }