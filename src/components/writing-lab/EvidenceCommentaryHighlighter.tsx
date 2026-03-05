import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Span { start: number; end: number; label: string; type: "evidence" | "commentary"; }
interface Gap { afterLabel: string; reason: string; }

interface EvidenceCommentaryHighlighterProps {
  responseText: string;
  promptText: string;
  sourceMode?: "DBQ" | "Synthesis" | "None";
}

const EVIDENCE_PATTERNS = [
  /[""][^""]+[""]/g,
  /\b(?:Doc(?:ument)?\.?\s*\d|Source\s*[A-G]|according to|as stated in|the (?:author|text|passage) (?:states?|claims?|argues?))/gi,
];

const COMMENTARY_PATTERNS = [
  /\b(?:this (?:shows?|demonstrates?|reveals?|suggests?|illustrates?|proves?)|because|therefore|thus|consequently|in other words|as a result|the significance|which means)\b/gi,
];

function detectSpans(text: string): { evidenceSpans: Span[]; commentarySpans: Span[]; } {
  const evidenceSpans: Span[] = [];
  const commentarySpans: Span[] = [];

  for (const pattern of EVIDENCE_PATTERNS) {
    pattern.lastIndex = 0;
    let m;
    while ((m = pattern.exec(text)) !== null) {
      evidenceSpans.push({ start: m.index, end: m.index + m[0].length, label: m[0].slice(0, 30), type: "evidence" });
    }
  }

  for (const pattern of COMMENTARY_PATTERNS) {
    pattern.lastIndex = 0;
    let m;
    while ((m = pattern.exec(text)) !== null) {
      const sentenceEnd = text.indexOf(".", m.index);
      const end = sentenceEnd > m.index ? sentenceEnd + 1 : m.index + m[0].length;
      commentarySpans.push({ start: m.index, end, label: text.slice(m.index, end).slice(0, 40), type: "commentary" });
    }
  }

  return { evidenceSpans, commentarySpans };
}

function detectGaps(paragraphs: string[], evidenceSpans: Span[], commentarySpans: Span[], fullText: string): Gap[] {
  const gaps: Gap[] = [];
  let offset = 0;
  for (const para of paragraphs) {
    const paraEnd = offset + para.length;
    const hasEvidence = evidenceSpans.some(s => s.start >= offset && s.start < paraEnd);
    const hasCommentary = commentarySpans.some(s => s.start >= offset && s.start < paraEnd);
    if (hasEvidence && !hasCommentary) {
      gaps.push({ afterLabel: para.slice(0, 40) + "...", reason: "Evidence found but no commentary connecting it to your argument." });
    }
    offset = paraEnd + 1;
  }
  return gaps;
}

export const EvidenceCommentaryHighlighter = ({ responseText, promptText, sourceMode }: EvidenceCommentaryHighlighterProps) => {
  const [analyzed, setAnalyzed] = useState(false);
  const [suggestedCommentary, setSuggestedCommentary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedGapEvidence, setSelectedGapEvidence] = useState<string | null>(null);

  const paragraphs = useMemo(() => responseText.split(/\n\n+/).filter(p => p.trim()), [responseText]);
  const { evidenceSpans, commentarySpans } = useMemo(() => detectSpans(responseText), [responseText]);
  const gaps = useMemo(() => detectGaps(paragraphs, evidenceSpans, commentarySpans, responseText), [paragraphs, evidenceSpans, commentarySpans, responseText]);

  const handleSuggestCommentary = async (evidenceText: string) => {
    setLoading(true);
    setSelectedGapEvidence(evidenceText);
    try {
      const { data, error } = await supabase.functions.invoke("ai-writing-modules", {
        body: { action: "suggest_commentary", prompt_text: promptText, evidence_text: evidenceText, response_text: responseText },
      });
      if (error) throw error;
      setSuggestedCommentary(data.suggested_commentary);
    } catch (e: any) {
      toast.error(e.message || "Failed to suggest commentary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🔍 Evidence vs Commentary Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={() => setAnalyzed(true)} className="w-full" disabled={!responseText.trim()}>
            Analyze My Essay
          </Button>
        </CardContent>
      </Card>

      {analyzed && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{evidenceSpans.length}</div>
                <div className="text-xs text-muted-foreground">Evidence Spans</div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-green-600">{commentarySpans.length}</div>
                <div className="text-xs text-muted-foreground">Commentary Spans</div>
              </CardContent>
            </Card>
          </div>

          {evidenceSpans.length > 0 && (
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">📌 Evidence Found</CardTitle></CardHeader>
              <CardContent className="space-y-1.5">
                {evidenceSpans.slice(0, 8).map((s, i) => (
                  <div key={i} className="text-xs p-2 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200">
                    <Badge variant="outline" className="text-[10px] mr-2 border-blue-300">Evidence</Badge>
                    "{s.label}"
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {gaps.length > 0 && (
            <Card className="border-yellow-300 bg-yellow-50/50 dark:bg-yellow-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  Commentary Gaps ({gaps.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {gaps.map((g, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-xs text-muted-foreground">{g.reason}</p>
                    <p className="text-xs italic">Near: "{g.afterLabel}"</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs"
                      onClick={() => handleSuggestCommentary(g.afterLabel)}
                      disabled={loading}
                    >
                      {loading && selectedGapEvidence === g.afterLabel ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      Suggest 1 commentary sentence (AI)
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {suggestedCommentary && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-4">
                <p className="text-xs font-medium text-primary mb-1">✨ Suggested Commentary:</p>
                <p className="text-sm">{suggestedCommentary}</p>
              </CardContent>
            </Card>
          )}

          {gaps.length === 0 && (
            <Card className="border-green-300 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm text-green-700 font-medium">✅ No obvious commentary gaps detected!</p>
                <p className="text-xs text-muted-foreground mt-1">Each evidence span appears to have nearby commentary.</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
