import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, WifiOff, Trash2, Check, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { getOfflineQuestions, clearOfflineQuestions, OfflineQ } from "@/lib/offlineCache";

export default function OfflinePractice() {
  const navigate = useNavigate();
  const [list, setList] = useState<OfflineQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => { setList(getOfflineQuestions()); }, []);
  const q = list[idx];

  const reset = () => { clearOfflineQuestions(); setList([]); setIdx(0); setPicked(null); };

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO title="Offline Practice — AlphaOmega" description="Re-practice your last 50 questions, no internet needed." path="/offline" />
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <WifiOff className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold">Offline Practice</h1>
        </div>
        <p className="text-muted-foreground mb-4">
          Your last {list.length} attempted questions, cached on this device. Works without a network.
        </p>

        {list.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="mb-3">Nothing cached yet — practice a few questions online first.</p>
            <Link to="/quiz"><Button>Practice now</Button></Link>
          </Card>
        ) : q ? (
          <Card className="p-5">
            <div className="text-xs text-muted-foreground mb-2">{idx+1} / {list.length}{q.subject ? ` • ${q.subject}` : ""}</div>
            <p className="text-lg mb-4">{q.prompt}</p>
            <div className="space-y-2">
              {q.choices.map((c, i) => {
                const correct = picked !== null && i === q.correctIndex;
                const wrong = picked === i && i !== q.correctIndex;
                return (
                  <button key={i} onClick={() => picked===null && setPicked(i)} disabled={picked!==null}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                      correct ? "border-emerald-500 bg-emerald-500/10" :
                      wrong ? "border-red-500 bg-red-500/10" :
                      "border-border hover:bg-muted"}`}>
                    <span className="inline-flex items-center gap-2">
                      {correct && <Check className="w-4 h-4 text-emerald-600" />}
                      {wrong && <X className="w-4 h-4 text-red-600" />}
                      {c}
                    </span>
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <>
                {q.explanation && <p className="mt-3 text-sm text-muted-foreground">{q.explanation}</p>}
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => { setIdx((idx+1) % list.length); setPicked(null); }} className="flex-1">Next</Button>
                </div>
              </>
            )}
          </Card>
        ) : null}

        {list.length > 0 && (
          <Button variant="ghost" size="sm" onClick={reset} className="mt-4 gap-1 text-muted-foreground">
            <Trash2 className="w-4 h-4" /> Clear cache
          </Button>
        )}
      </div>
    </div>
  );
}