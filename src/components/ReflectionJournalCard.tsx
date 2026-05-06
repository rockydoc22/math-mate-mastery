import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Check } from "lucide-react";
import { toast } from "sonner";
import { useReflectionPrompt, saveReflectionEntry } from "@/hooks/useReflectionPrompts";

interface ReflectionJournalCardProps {
  subject?: string;
  sessionKey?: string;
  context?: string;
  compact?: boolean;
}

export function ReflectionJournalCard({ subject, sessionKey, context, compact }: ReflectionJournalCardProps) {
  const prompt = useReflectionPrompt(subject, sessionKey);
  const [response, setResponse] = useState("");
  const [saved, setSaved] = useState(false);
  const [showFollowups, setShowFollowups] = useState(false);

  const handleSave = () => {
    const text = response.trim();
    if (text.length < 5) {
      toast.error("Add a few words first");
      return;
    }
    saveReflectionEntry({
      promptId: prompt.id,
      subject: prompt.subject,
      prompt: prompt.prompt,
      response: text,
      context,
    });
    setSaved(true);
    toast.success("Reflection saved to your journal");
  };

  if (saved) {
    return (
      <Card className={`p-4 bg-emerald-500/5 border-emerald-500/30 ${compact ? "" : ""}`}>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          <Check className="w-4 h-4" /> Reflection saved. View it in your Mistake Journal.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-amber-500/5 border-amber-500/30 space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-amber-600" />
        <h4 className="text-sm font-bold">Reflection Journal</h4>
      </div>
      <p className="text-sm text-foreground/90">{prompt.prompt}</p>
      {showFollowups && prompt.followups?.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1 pl-4 list-disc">
          {prompt.followups.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
      <Textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Type your reflection..."
        className="min-h-[80px] text-sm"
      />
      <div className="flex gap-2 justify-between flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => setShowFollowups((s) => !s)}
        >
          {showFollowups ? "Hide prompts" : "Need ideas?"}
        </Button>
        <Button size="sm" onClick={handleSave}>
          Save Reflection
        </Button>
      </div>
    </Card>
  );
}