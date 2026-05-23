import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check, X, Loader2, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AnsweredItem = {
  id: string;
  stem: string;
  options: { letter: string; text: string }[];
  correctKey: string;
  chosenKey: string | null;
  isCorrect: boolean;
  skill?: string;
  domain?: string;
  trapType?: string | null;
  wrongExplanations?: Record<string, string> | null;
};

const TRAP_LABEL: Record<string, string> = {
  partial_match: "Partial-match trap",
  reversed: "Reversed reasoning",
  near_miss: "Near-miss value",
  decoy: "Plausible decoy",
  over_general: "Over-generalization",
};

export const DeepExplanationsPanel = ({ items }: { items: AnsweredItem[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [deep, setDeep] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchDeep = async (it: AnsweredItem) => {
    setLoadingId(it.id);
    try {
      const { data, error } = await supabase.functions.invoke("elaborate-explanation", {
        body: {
          question: it.stem,
          options: it.options,
          correctAnswer: it.correctKey,
          studentAnswer: it.chosenKey,
          skill: it.skill,
          domain: it.domain,
        },
      });
      if (error) throw error;
      setDeep((d) => ({ ...d, [it.id]: data?.explanation || "" }));
    } catch {
      toast.error("Could not load deep explanation.");
    } finally {
      setLoadingId(null);
    }
  };

  if (!items.length) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Deep explanations</h2>
      {items.map((it, i) => {
        const isOpen = openId === it.id;
        const trap = it.trapType ? TRAP_LABEL[it.trapType] ?? it.trapType : null;
        const baselineWhy = it.chosenKey && it.wrongExplanations?.[it.chosenKey];
        return (
          <Card key={it.id} className="p-4">
            <button
              onClick={() => setOpenId(isOpen ? null : it.id)}
              className="w-full flex items-start gap-3 text-left"
            >
              <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${it.isCorrect ? "bg-emerald-500/15 text-emerald-700" : "bg-rose-500/15 text-rose-700"}`}>
                {it.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">Q{i + 1}</span>
                  {it.skill && <Badge variant="outline" className="text-[10px]">{it.skill}</Badge>}
                  {!it.isCorrect && trap && (
                    <Badge className="bg-amber-500/15 text-amber-700 text-[10px] gap-1">
                      <AlertTriangle className="w-3 h-3" /> {trap}
                    </Badge>
                  )}
                </div>
                <p className="text-sm mt-1 line-clamp-2">{it.stem}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  You: <b>{it.chosenKey ?? "—"}</b> · Correct: <b>{it.correctKey}</b>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="mt-3 space-y-3 border-t pt-3">
                {!it.isCorrect && baselineWhy && (
                  <div className="rounded-md bg-muted/50 p-3 text-sm">
                    <div className="text-[10px] uppercase text-muted-foreground mb-1">Why {it.chosenKey} is wrong</div>
                    {baselineWhy}
                  </div>
                )}
                {!deep[it.id] ? (
                  <Button size="sm" variant="secondary" onClick={() => fetchDeep(it)} disabled={loadingId === it.id} className="gap-2">
                    {loadingId === it.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Get elaborate AI breakdown
                  </Button>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{deep[it.id]}</ReactMarkdown>
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default DeepExplanationsPanel;