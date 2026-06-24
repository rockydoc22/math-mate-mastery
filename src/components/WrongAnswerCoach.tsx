import { useEffect, useState } from "react";
import { Loader2, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MathText } from "@/components/MathText";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  question: string;
  options?: { letter: string; text: string }[];
  correctAnswer: string;
  studentAnswer: string;
  skill?: string;
  domain?: string;
  difficulty?: string | number;
}

interface Distractor { label: string; oneLineFix: string; category: string; confidence: string }
interface Parallel {
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export function WrongAnswerCoach({ question, options, correctAnswer, studentAnswer, skill, domain, difficulty }: Props) {
  const [distractor, setDistractor] = useState<Distractor | null>(null);
  const [distractorLoading, setDistractorLoading] = useState(true);
  const [parallel, setParallel] = useState<Parallel | null>(null);
  const [parallelLoading, setParallelLoading] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  // Auto-fire distractor labeling
  useEffect(() => {
    let alive = true;
    setDistractor(null);
    setParallel(null);
    setPicked(null);
    setDistractorLoading(true);
    supabase.functions
      .invoke("analyze-distractor", { body: { question, options, correctAnswer, studentAnswer, skill, domain } })
      .then(({ data, error }) => {
        if (!alive) return;
        if (!error && data && !data.error) setDistractor(data as Distractor);
      })
      .finally(() => alive && setDistractorLoading(false));
    return () => { alive = false; };
  }, [question, correctAnswer, studentAnswer]);

  const fetchParallel = async () => {
    setParallelLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-parallel-question", {
        body: { sourceQuestion: question, skill, domain, difficulty },
      });
      if (!error && data && !data.error) setParallel(data as Parallel);
    } finally {
      setParallelLoading(false);
    }
  };

  return (
    <Card className="p-4 border-primary/30 bg-primary/5 space-y-3">
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">Why you missed it</span>
        {distractor?.confidence && (
          <Badge variant="outline" className="text-xs">{distractor.confidence} confidence</Badge>
        )}
      </div>
      {distractorLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" /> Analyzing your choice…
        </div>
      ) : distractor ? (
        <div className="space-y-1 text-sm">
          <p><span className="font-semibold">Misconception:</span> {distractor.label}</p>
          <p className="text-muted-foreground"><span className="font-semibold text-foreground">Fix:</span> {distractor.oneLineFix}</p>
        </div>
      ) : null}

      {!parallel ? (
        <Button size="sm" variant="default" onClick={fetchParallel} disabled={parallelLoading} className="gap-2">
          {parallelLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          {parallelLoading ? "Generating…" : "Try a similar one"}
        </Button>
      ) : (
        <div className="space-y-2 pt-2 border-t">
          <p className="text-xs font-semibold text-primary">Parallel retry</p>
          <div className="text-sm"><MathText text={parallel.question} /></div>
          <div className="space-y-1">
            {parallel.options.map((o) => {
              const isCorrect = picked && o.letter === parallel.correctAnswer;
              const isWrongPick = picked === o.letter && o.letter !== parallel.correctAnswer;
              return (
                <button
                  key={o.letter}
                  disabled={!!picked}
                  onClick={() => setPicked(o.letter)}
                  className={`w-full text-left text-sm px-3 py-2 rounded border transition ${
                    isCorrect ? "bg-green-500/10 border-green-500/50" :
                    isWrongPick ? "bg-destructive/10 border-destructive/50" :
                    picked ? "opacity-60" : "hover:bg-accent"
                  }`}
                >
                  <span className="font-semibold mr-2">{o.letter}.</span>
                  <MathText text={o.text} />
                </button>
              );
            })}
          </div>
          {picked && (
            <div className="text-xs text-muted-foreground pt-1 border-t">
              <span className="font-semibold text-foreground">
                {picked === parallel.correctAnswer ? "✓ Got it!" : `✗ Answer: ${parallel.correctAnswer}.`}
              </span>{" "}
              <MathText text={parallel.explanation} />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}