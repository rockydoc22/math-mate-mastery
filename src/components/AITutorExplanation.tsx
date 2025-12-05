import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface AITutorExplanationProps {
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  userAnswer: string;
  explanation: string;
  onClose: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

export const AITutorExplanation = ({
  question,
  options,
  correctAnswer,
  userAnswer,
  explanation,
  onClose,
}: AITutorExplanationProps) => {
  const [aiExplanation, setAiExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchExplanation = async () => {
    if (hasLoaded) return;
    
    setIsLoading(true);
    setAiExplanation("");

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          question,
          options,
          correctAnswer,
          userAnswer,
          explanation,
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast.error("Too many requests. Please wait a moment.");
          return;
        }
        if (resp.status === 402) {
          toast.error("AI credits exhausted.");
          return;
        }
        throw new Error("Failed to get AI explanation");
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
              setAiExplanation(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setHasLoaded(true);
    } catch (error) {
      console.error("AI tutor error:", error);
      toast.error("Failed to get AI explanation");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch on mount
  useState(() => {
    fetchExplanation();
  });

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Tutor Explanation
        </CardTitle>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && !aiExplanation && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating personalized explanation...
          </div>
        )}
        {aiExplanation && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{aiExplanation}</p>
          </div>
        )}
        {!hasLoaded && !isLoading && (
          <Button onClick={fetchExplanation} variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Get AI Explanation
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
