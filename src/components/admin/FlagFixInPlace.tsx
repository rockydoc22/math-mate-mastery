import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Wand2, Save, Sparkles, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Flag {
  id: string;
  question_id: string;
  question_type: string;
  notes: string | null;
  ai_suggested_fix: any | null;
}

interface OptionEdit { letter: string; text: string }

export function FlagFixInPlace({ flag, onSaved }: { flag: Flag; onSaved: () => void }) {
  const { user } = useAuth();
  const ai = flag.ai_suggested_fix?.suggestedFix ?? flag.ai_suggested_fix ?? null;
  const initial = ai && typeof ai === "object" ? ai : {};
  const [question, setQuestion] = useState<string>(initial.question ?? "");
  const [explanation, setExplanation] = useState<string>(initial.explanation ?? "");
  const [correct, setCorrect] = useState<string>(initial.correctAnswer ?? "A");
  const [opts, setOpts] = useState<OptionEdit[]>(
    Array.isArray(initial.options) && initial.options.length
      ? initial.options.map((o: any, i: number) => ({ letter: o.letter ?? String.fromCharCode(65 + i), text: o.text ?? String(o) }))
      : ["A","B","C","D"].map(l => ({ letter: l, text: "" }))
  );
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    setGenerating(true);
    try {
      const questionData = { id: flag.question_id, question, options: opts, correctAnswer: correct, explanation };
      const { data, error } = await supabase.functions.invoke("ai-fix-question", {
        body: { flagId: flag.id, questionData, issueType: "user_report", notes: flag.notes ?? undefined },
      });
      if (error) throw error;
      const fix = data?.suggestedFix?.suggestedFix ?? data?.suggestedFix;
      if (fix) {
        if (fix.question) setQuestion(fix.question);
        if (fix.explanation) setExplanation(fix.explanation);
        if (fix.correctAnswer) setCorrect(fix.correctAnswer);
        if (Array.isArray(fix.options)) {
          setOpts(fix.options.map((o: any, i: number) => ({ letter: o.letter ?? String.fromCharCode(65+i), text: o.text ?? String(o) })));
        }
        toast({ title: "AI suggestion applied", description: "Review and save." });
      }
    } catch (e: any) {
      toast({ title: "AI generation failed", description: e.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const override_data: any = { question, options: opts, correctAnswer: correct, explanation };
      const { error } = await supabase.from("question_overrides").upsert([{
        question_id: flag.question_id,
        question_type: flag.question_type,
        override_data,
        source_flag_id: flag.id,
        edited_by: user?.id,
      }], { onConflict: "question_id,question_type" });
      if (error) throw error;
      await supabase.from("flagged_questions").update({
        status: "resolved",
        resolved_at: new Date().toISOString(),
        resolution_notes: "Fixed in-place via override",
      }).eq("id", flag.id);
      toast({ title: "Saved", description: "Override is live for all learners." });
      onSaved();
    } catch (e: any) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-4 mt-3 space-y-3 bg-muted/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">In-place fix</Badge>
          {ai && <Badge variant="secondary" className="gap-1"><Sparkles className="w-3 h-3" />AI suggestion loaded</Badge>}
        </div>
        <Button size="sm" variant="outline" onClick={generate} disabled={generating} className="gap-1">
          <Wand2 className="w-3 h-3" />{generating ? "Generating…" : "AI suggest"}
        </Button>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Question</label>
        <Textarea value={question} onChange={e => setQuestion(e.target.value)} rows={3} />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Options · correct = {correct}</label>
        {opts.map((o, i) => (
          <div key={o.letter} className="flex gap-2 items-center">
            <button
              onClick={() => setCorrect(o.letter)}
              className={`w-7 h-7 rounded-md border-2 text-xs font-bold flex items-center justify-center ${
                correct === o.letter ? "border-primary bg-primary text-primary-foreground" : "border-border"
              }`}
              title="Mark as correct"
            >
              {correct === o.letter ? <Check className="w-3 h-3" /> : o.letter}
            </button>
            <Input value={o.text} onChange={e => {
              const next = [...opts]; next[i] = { ...o, text: e.target.value }; setOpts(next);
            }} />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Explanation</label>
        <Textarea value={explanation} onChange={e => setExplanation(e.target.value)} rows={3} />
      </div>
      <Button onClick={save} disabled={saving} className="w-full gap-2">
        <Save className="w-4 h-4" />{saving ? "Saving…" : "Save override & resolve flag"}
      </Button>
    </Card>
  );
}