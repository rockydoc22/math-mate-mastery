import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ThesisPickerProps {
  promptText: string;
  responseText: string;
  onThesisIdentified?: (thesis: string, status: "pass" | "revise") => void;
}

const THESIS_CHECKS = [
  { id: "defensible", label: "Makes a defensible claim (not just fact)", regex: /\b(because|although|while|however|argues?|demonstrates?|reveals?|suggests?)\b/i },
  { id: "specific", label: "Specific enough to guide the essay", check: (t: string) => t.split(" ").length >= 8 },
  { id: "not_restate", label: "Does more than restate the prompt", check: (_t: string, _p: string) => true },
  { id: "position", label: "Takes a clear position or makes an argument", regex: /\b(should|must|because|therefore|thus|consequently|in order to)\b/i },
];

export const ThesisPicker = ({ promptText, responseText, onThesisIdentified }: ThesisPickerProps) => {
  const [selectedText, setSelectedText] = useState("");
  const [status, setStatus] = useState<"idle" | "pass" | "revise">("idle");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [upgradedThesis, setUpgradedThesis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runChecklist = () => {
    if (!selectedText.trim()) {
      toast.error("Please highlight or paste your thesis sentence first.");
      return;
    }

    const failures: string[] = [];
    for (const check of THESIS_CHECKS) {
      if (check.regex && !check.regex.test(selectedText)) {
        failures.push(check.label);
      }
      if (check.check && !check.check(selectedText, promptText)) {
        failures.push(check.label);
      }
    }

    if (failures.length === 0) {
      setStatus("pass");
      setSuggestions(["Strong thesis! Consider adding complexity with 'although' or a counterargument qualifier."]);
    } else {
      setStatus("revise");
      setSuggestions([
        ...failures.map(f => `Needs work: ${f}`),
        "Try starting with: 'Although [counterpoint], [your claim] because [reason].'",
      ]);
    }

    onThesisIdentified?.(selectedText, failures.length === 0 ? "pass" : "revise");
  };

  const handleUpgrade = async () => {
    if (!selectedText.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-writing-modules", {
        body: { action: "upgrade_thesis", prompt_text: promptText, thesis_text: selectedText, response_text: responseText },
      });
      if (error) throw error;
      setUpgradedThesis(data.upgraded_thesis);
      toast.success("Thesis upgraded!");
    } catch (e: any) {
      toast.error(e.message || "Failed to upgrade thesis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            📝 Step 1: Identify Your Thesis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Copy and paste your thesis sentence from your essay below. Your thesis should appear in your introduction or conclusion.
          </p>
          <Textarea
            value={selectedText}
            onChange={(e) => { setSelectedText(e.target.value); setStatus("idle"); setUpgradedThesis(null); }}
            placeholder="Paste or type your thesis sentence here..."
            className="min-h-[80px]"
          />
          <Button onClick={runChecklist} className="w-full">Check My Thesis</Button>
        </CardContent>
      </Card>

      {status !== "idle" && (
        <Card className={status === "pass" ? "border-green-300 bg-green-50/50 dark:bg-green-950/20" : "border-yellow-300 bg-yellow-50/50 dark:bg-yellow-950/20"}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center gap-2">
              {status === "pass" ? (
                <><CheckCircle2 className="w-5 h-5 text-green-600" /><Badge variant="outline" className="border-green-300 text-green-700">Pass</Badge></>
              ) : (
                <><AlertCircle className="w-5 h-5 text-yellow-600" /><Badge variant="outline" className="border-yellow-300 text-yellow-700">Revise</Badge></>
              )}
            </div>

            <ul className="space-y-1.5">
              {suggestions.map((s, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            {status === "revise" && (
              <Button onClick={handleUpgrade} variant="outline" className="gap-2 w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Upgrade my thesis (AI)
              </Button>
            )}

            {upgradedThesis && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                <p className="text-xs font-medium text-primary">✨ Upgraded Thesis:</p>
                <p className="text-sm font-medium">{upgradedThesis}</p>
                <Button size="sm" variant="ghost" onClick={() => { setSelectedText(upgradedThesis); setStatus("idle"); }}>
                  Use this thesis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
