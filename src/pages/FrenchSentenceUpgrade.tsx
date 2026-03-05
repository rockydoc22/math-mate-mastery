import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EXAMPLE_SENTENCES = [
  "Je pense que c'est bon.",
  "Il fait beau aujourd'hui.",
  "J'aime la France.",
  "C'est important pour moi.",
  "Je veux aller à Paris.",
];

const FrenchSentenceUpgrade = () => {
  const [input, setInput] = useState("");
  const [upgraded, setUpgraded] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleUpgrade = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setUpgraded("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ai-french-upgrade", {
        body: { sentence: input.trim() },
      });

      if (fnError) throw fnError;
      setUpgraded(data?.upgraded || "Could not generate upgrade.");
    } catch (err: any) {
      setError(err.message || "Failed to upgrade sentence");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(upgraded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/french-competition">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Sentence Upgrade
            </h1>
            <p className="text-sm text-muted-foreground">Transform basic French into competition-level</p>
          </div>
        </div>

        {/* Input */}
        <Card className="p-4 mb-4">
          <label className="text-sm font-medium mb-2 block">Your basic French sentence:</label>
          <Textarea
            placeholder="Type a simple French sentence..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="mb-3 min-h-[80px]"
          />
          <Button onClick={handleUpgrade} disabled={!input.trim() || loading} className="w-full gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Upgrading..." : "Upgrade My Sentence"}
          </Button>
        </Card>

        {/* Quick examples */}
        {!upgraded && !loading && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_SENTENCES.map((s, i) => (
                <Button key={i} variant="outline" size="sm" className="text-xs" onClick={() => setInput(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {upgraded && (
          <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">✨ Competition-Level:</span>
              <Button variant="ghost" size="sm" className="h-7 px-2" onClick={handleCopy}>
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
            <p className="text-sm whitespace-pre-wrap">{upgraded}</p>
          </Card>
        )}

        {error && (
          <Card className="p-3 border-destructive/50 bg-destructive/10">
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FrenchSentenceUpgrade;
