import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ParagraphEntry {
  text: string;
  mainPoint: string;
  thesisLink: string;
  connector: string;
}

interface LineOfReasoningMapProps {
  responseText: string;
  thesisText: string;
  promptText: string;
}

export const LineOfReasoningMap = ({ responseText, thesisText, promptText }: LineOfReasoningMapProps) => {
  const rawParagraphs = useMemo(() => responseText.split(/\n\n+/).filter(p => p.trim().length > 20), [responseText]);

  const [entries, setEntries] = useState<ParagraphEntry[]>(
    rawParagraphs.map(text => ({ text, mainPoint: "", thesisLink: "", connector: "" }))
  );
  const [logicGaps, setLogicGaps] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [reorderSuggestion, setReorderSuggestion] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const updateEntry = (index: number, field: keyof ParagraphEntry, value: string) => {
    setEntries(prev => prev.map((e, i) => i === index ? { ...e, [field]: value } : e));
  };

  const runAnalysis = () => {
    const gaps: string[] = [];
    entries.forEach((e, i) => {
      if (!e.mainPoint.trim()) gaps.push(`¶${i + 1}: Missing main point`);
      if (!e.thesisLink.trim()) gaps.push(`¶${i + 1}: No thesis connection`);
      if (i > 0 && !e.connector.trim()) gaps.push(`¶${i + 1}: Missing transition/connector`);
    });

    // Check for repetition
    const points = entries.map(e => e.mainPoint.toLowerCase().trim()).filter(Boolean);
    const seen = new Set<string>();
    for (const p of points) {
      if (seen.has(p)) gaps.push(`Repeated main point: "${p}"`);
      seen.add(p);
    }

    setLogicGaps(gaps);
    setAnalyzed(true);
  };

  const handleSuggestReorder = async () => {
    setLoading(true);
    try {
      const paragraphData = entries.map((e, i) => ({
        index: i,
        mainPoint: e.mainPoint || `(paragraph ${i + 1})`,
        preview: e.text.slice(0, 100),
      }));
      const { data, error } = await supabase.functions.invoke("ai-writing-modules", {
        body: { action: "suggest_reorder", prompt_text: promptText, thesis_text: thesisText, paragraphs: paragraphData },
      });
      if (error) throw error;
      setReorderSuggestion(data);
      toast.success("Reorder suggestion ready!");
    } catch (e: any) {
      toast.error(e.message || "Failed to get suggestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🗺️ Line-of-Reasoning Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            For each paragraph, write its main point (6-10 words), how it connects to your thesis, and the transition from the previous paragraph.
          </p>

          {thesisText && (
            <div className="p-2 rounded bg-primary/5 border border-primary/20">
              <p className="text-xs font-medium text-primary">Your Thesis:</p>
              <p className="text-sm">{thesisText}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {entries.map((entry, i) => (
        <Card key={i} className="border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Badge variant="outline" className="font-mono">¶{i + 1}</Badge>
              <span className="text-xs text-muted-foreground truncate">{entry.text.slice(0, 60)}...</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input
              value={entry.mainPoint}
              onChange={(e) => updateEntry(i, "mainPoint", e.target.value)}
              placeholder="Main point (6-10 words)"
              className="text-sm"
            />
            <Input
              value={entry.thesisLink}
              onChange={(e) => updateEntry(i, "thesisLink", e.target.value)}
              placeholder="How does this connect to your thesis?"
              className="text-sm"
            />
            {i > 0 && (
              <Input
                value={entry.connector}
                onChange={(e) => updateEntry(i, "connector", e.target.value)}
                placeholder="Transition from previous paragraph"
                className="text-sm"
              />
            )}
          </CardContent>
        </Card>
      ))}

      <Button onClick={runAnalysis} className="w-full">Check Reasoning Flow</Button>

      {analyzed && (
        <Card className={logicGaps.length === 0 ? "border-green-300 bg-green-50/50 dark:bg-green-950/20" : "border-yellow-300 bg-yellow-50/50 dark:bg-yellow-950/20"}>
          <CardContent className="pt-4 space-y-3">
            {logicGaps.length === 0 ? (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">All paragraphs connected to thesis!</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-yellow-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">{logicGaps.length} issue(s) found</span>
                </div>
                <ul className="space-y-1">
                  {logicGaps.map((gap, i) => (
                    <li key={i} className="text-xs text-muted-foreground">• {gap}</li>
                  ))}
                </ul>
              </>
            )}

            <Button
              onClick={handleSuggestReorder}
              variant="outline"
              className="w-full gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Suggest reorder + bridging sentence (AI)
            </Button>

            {reorderSuggestion && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                <p className="text-xs font-medium text-primary">✨ AI Suggestion:</p>
                <p className="text-sm">{reorderSuggestion.explanation}</p>
                {reorderSuggestion.bridging_sentence && (
                  <div className="mt-2 p-2 bg-background rounded border">
                    <p className="text-xs text-muted-foreground">Bridging sentence:</p>
                    <p className="text-sm italic">"{reorderSuggestion.bridging_sentence}"</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
