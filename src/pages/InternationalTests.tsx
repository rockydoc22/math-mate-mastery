import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe2, Sparkles } from "lucide-react";
import { INTL_EXAMS } from "@/data/intlExamsRegistry";
import { INTL_SAMPLE_BANKS } from "@/data/intlSampleQuestions";
import { SEO } from "@/components/SEO";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

export default function InternationalTests() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const grouped = useMemo(() => {
    const filtered = INTL_EXAMS.filter(e =>
      !q || e.name.toLowerCase().includes(q.toLowerCase()) || e.region.toLowerCase().includes(q.toLowerCase())
    );
    const map: Record<string, typeof INTL_EXAMS> = {};
    for (const e of filtered) {
      (map[e.region] ||= []).push(e);
    }
    return map;
  }, [q]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO
        title="International Tests — AlphaOmega"
        description="Coming soon: prep for GCSE, A-Level, IB, IGCSE, JEE, NEET, Gaokao, Abitur, Baccalauréat, NAPLAN, IELTS, and more."
        path="/international"
      />
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <Globe2 className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold">International Tests</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          The same adaptive engine, expanding worldwide. Vote with your interest — popular exams get banks built first.
        </p>

        <Input
          placeholder="Search by exam name or country (e.g. 'IB' or 'India')…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="mb-6"
        />

        <div className="space-y-6">
          {Object.entries(grouped).map(([region, exams]) => (
            <div key={region}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">{region}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {exams.map(e => {
                  const hasSample = !!INTL_SAMPLE_BANKS[e.id];
                  return (
                    <Card key={e.id} className="p-4 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold">{e.name}</div>
                        <div className="text-xs text-muted-foreground">{e.description}</div>
                      </div>
                      {hasSample ? (
                        <Link to={`/international/${e.id}`} className="shrink-0">
                          <Button size="sm">Try sample</Button>
                        </Link>
                      ) : (
                        <Badge variant="secondary" className="shrink-0 gap-1">
                          <Sparkles className="w-3 h-3" /> Coming soon
                        </Badge>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Card className="p-4 mt-8 bg-muted/40">
          <p className="text-sm">
            Want one of these prioritized? <Link to="/settings" className="underline text-primary">Tell us in feedback</Link> — we ship the most-requested banks first.
          </p>
        </Card>
      </div>
    </div>
  );
}