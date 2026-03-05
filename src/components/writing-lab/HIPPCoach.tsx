import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle } from "lucide-react";

interface HIPPEntry {
  docId: string;
  H: string;
  I: string;
  P: string;
  POV: string;
}

interface HIPPCoachProps {
  documentCount?: number;
}

const TEMPLATES = {
  H: "At the time, ___ was happening, which helps explain ___.",
  I: "Because the author addressed ___, the message emphasizes ___.",
  P: "The author aims to ___, so the document highlights ___.",
  POV: "From the perspective of ___, the author likely ___.",
};

const HIPP_KEYS = ["H", "I", "P", "POV"] as const;

export const HIPPCoach = ({ documentCount = 7 }: HIPPCoachProps) => {
  const [entries, setEntries] = useState<Record<string, HIPPEntry>>({});
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  const docs = Array.from({ length: documentCount }, (_, i) => `D${i + 1}`);
  const completedDocs = docs.filter(d => {
    const e = entries[d];
    if (!e) return false;
    return HIPP_KEYS.some(k => e[k].trim().length > 10);
  });
  const needsThree = completedDocs.length >= 3;

  const updateEntry = (docId: string, key: string, value: string) => {
    setEntries(prev => ({
      ...prev,
      [docId]: { ...(prev[docId] || { docId, H: "", I: "", P: "", POV: "" }), [key]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🏛️ HIPP Coach (DBQ Sourcing)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Complete HIPP sourcing for at least <strong>3 documents</strong> to earn the sourcing point.
            Pick any HIPP dimension that fits each document best.
          </p>

          <div className="flex items-center gap-2">
            <Badge variant={needsThree ? "default" : "outline"}>
              {completedDocs.length}/3 docs sourced
            </Badge>
            {needsThree && <span className="text-xs text-green-600 font-medium">✓ Sourcing point earned!</span>}
          </div>

          <div className="flex flex-wrap gap-2">
            {docs.map(d => (
              <Button
                key={d}
                size="sm"
                variant={activeDoc === d ? "default" : completedDocs.includes(d) ? "secondary" : "outline"}
                onClick={() => setActiveDoc(activeDoc === d ? null : d)}
                className="gap-1"
              >
                {completedDocs.includes(d) ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                {d}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {activeDoc && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">HIPP for {activeDoc}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {HIPP_KEYS.map(key => (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-mono">{key}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {key === "H" && "Historical Context"}
                    {key === "I" && "Intended Audience"}
                    {key === "P" && "Purpose"}
                    {key === "POV" && "Point of View"}
                  </span>
                </div>
                <p className="text-xs italic text-muted-foreground">{TEMPLATES[key]}</p>
                <Textarea
                  value={entries[activeDoc]?.[key] || ""}
                  onChange={(e) => updateEntry(activeDoc, key, e.target.value)}
                  placeholder={`Fill in the blanks for ${key}...`}
                  className="min-h-[60px] text-sm"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
