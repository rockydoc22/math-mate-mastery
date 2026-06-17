import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Pin, Sparkles } from "lucide-react";

const KEY = "ao_coach_tip_seen_v1";

/** Tiny one-time tip card on the full dashboard. Dismiss to never see again. */
export function FirstRunCoachTip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { setShow(localStorage.getItem(KEY) !== "true"); } catch {}
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try { localStorage.setItem(KEY, "true"); } catch {}
    setShow(false);
  };

  return (
    <Card className="p-3 mb-3 border-primary/40 bg-primary/5 relative">
      <button
        onClick={dismiss}
        className="absolute top-2 right-2 p-1 rounded hover:bg-muted"
        aria-label="Dismiss tip"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      <div className="flex items-start gap-2 pr-6">
        <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div className="text-xs leading-relaxed">
          <p className="font-semibold mb-0.5">Two ways to find what you need</p>
          <p className="text-muted-foreground">
            Tap a <span className="font-medium text-foreground">character</span> to browse tools by vibe,
            or hit <span className="font-medium text-foreground"><Pin className="w-3 h-3 inline -mt-0.5" /> Customize</span> to keep favorites at the top.
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button size="sm" variant="ghost" className="h-6 text-[11px]" onClick={dismiss}>Got it</Button>
      </div>
    </Card>
  );
}