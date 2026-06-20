import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * COPPA-compliant parental gate. Asks an arithmetic question only an adult can
 * easily solve before opening external links or App Store / IAP flows.
 * Apple Kids Category guideline 1.3.
 */
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPass: () => void;
  reason?: string;
}

const newChallenge = () => {
  const a = 7 + Math.floor(Math.random() * 12); // 7-18
  const b = 6 + Math.floor(Math.random() * 9);  // 6-14
  return { a, b, answer: a * b };
};

export const ParentalGate = ({ open, onOpenChange, onPass, reason }: Props) => {
  const [{ a, b, answer }, setQ] = useState(newChallenge);
  const [val, setVal] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (parseInt(val.trim(), 10) === answer) {
      setVal("");
      setError("");
      setQ(newChallenge());
      onOpenChange(false);
      onPass();
    } else {
      setError("That's not quite right. Please try again.");
      setQ(newChallenge());
      setVal("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Ask a grown-up</DialogTitle>
          <DialogDescription>
            {reason ?? "This action leaves the app or contacts a website. A parent must continue."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label>What is {a} × {b}?</Label>
          <Input
            type="number"
            inputMode="numeric"
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ParentalGate;
