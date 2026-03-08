import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Loader2, X, Sparkles, Route, Save, Check } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

interface SolutionPathAnalysisProps {
  question: string;
  questionId?: string;
  questionType?: string;
  options?: { letter: string; text: string }[];
  correctAnswer: string;
  competitionType: string;
  onClose: () => void;
}

const ANALYSIS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/solution-path-analysis`;

export const SolutionPathAnalysis = ({
  question,
  questionId,
  questionType = 'math',
  options,
  correctAnswer,
  competitionType,
  onClose,
}: SolutionPathAnalysisProps) => {
  const [approach, setApproach] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fetchAnalysis = async () => {
    if (!approach.trim()) {
      toast.error("Please describe your approach first.");
      return;
    }

    setIsLoading(true);
    setAnalysis("");
    setHasSubmitted(true);
    setIsSaved(false);

    try {
      const resp = await fetch(ANALYSIS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          question,
          options,
          correctAnswer,
          studentApproach: approach,
          competitionType,
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) { toast.error("Too many requests. Please wait."); return; }
        if (resp.status === 402) { toast.error("AI credits exhausted."); return; }
        throw new Error("Failed to get analysis");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setAnalysis(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Solution path analysis error:", error);
      toast.error("Failed to analyze your approach");
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnalysis = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Sign in to save your analysis");
        return;
      }

      const { error } = await supabase.from('solution_analyses').insert({
        user_id: user.id,
        question_id: questionId || 'unknown',
        question_type: questionType,
        question_text: question.substring(0, 500),
        student_approach: approach,
        ai_analysis: analysis,
      });

      if (error) throw error;
      setIsSaved(true);
      toast.success("Analysis saved for review!");
    } catch (error) {
      console.error("Save analysis error:", error);
      toast.error("Failed to save analysis");
    }
  };

  return (
    <Card className="border-accent/30 bg-accent/5 mt-3">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Route className="w-5 h-5 text-accent-foreground" />
          Solution Path Analysis
        </CardTitle>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {!hasSubmitted ? (
          <>
            <p className="text-xs text-muted-foreground">
              Describe how you solved (or would solve) this problem. The AI will evaluate your approach and suggest alternative methods.
            </p>
            <Textarea
              placeholder="e.g. I set up two equations from the given conditions, then substituted to eliminate one variable..."
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              className="min-h-[80px] text-sm"
              maxLength={2000}
            />
            <Button
              onClick={fetchAnalysis}
              disabled={!approach.trim()}
              className="w-full gap-2"
              size="sm"
            >
              <Brain className="w-4 h-4" />
              Analyze My Approach
            </Button>
          </>
        ) : (
          <>
            <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Your approach:</span> {approach}
            </div>

            {isLoading && !analysis && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing your solution path...
              </div>
            )}

            {analysis && (
              <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}

            {!isLoading && analysis && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHasSubmitted(false);
                    setAnalysis("");
                    setApproach("");
                    setIsSaved(false);
                  }}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Try Different Approach
                </Button>
                <Button
                  variant={isSaved ? "secondary" : "outline"}
                  size="sm"
                  onClick={saveAnalysis}
                  disabled={isSaved}
                  className="gap-2"
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {isSaved ? 'Saved' : 'Save Analysis'}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
