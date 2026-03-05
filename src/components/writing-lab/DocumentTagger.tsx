import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface DocumentTaggerProps {
  responseText: string;
  documentCount?: number; // usually 7
}

const DOC_PATTERNS = [
  /\bDoc(?:ument)?\.?\s*(\d+)/gi,
  /\bSource\s*([A-G])/gi,
  /\bD(\d+)\b/g,
];

function detectDocUsage(text: string, totalDocs: number): { docsUsed: Set<string>; counts: Record<string, number> } {
  const counts: Record<string, number> = {};
  const docsUsed = new Set<string>();

  for (const pattern of DOC_PATTERNS) {
    pattern.lastIndex = 0;
    let m;
    while ((m = pattern.exec(text)) !== null) {
      const id = m[1].toUpperCase();
      const key = /^\d+$/.test(id) ? `D${id}` : id;
      docsUsed.add(key);
      counts[key] = (counts[key] || 0) + 1;
    }
  }

  return { docsUsed, counts };
}

export const DocumentTagger = ({ responseText, documentCount = 7 }: DocumentTaggerProps) => {
  const [analyzed, setAnalyzed] = useState(false);

  const allDocs = useMemo(() => {
    return Array.from({ length: documentCount }, (_, i) => `D${i + 1}`);
  }, [documentCount]);

  const { docsUsed, counts } = useMemo(() => detectDocUsage(responseText, documentCount), [responseText, documentCount]);

  const missingDocs = allDocs.filter(d => !docsUsed.has(d));
  const overusedDocs = Object.entries(counts).filter(([_, c]) => c >= 4);
  const coverage = (docsUsed.size / documentCount) * 100;
  const meetsThreshold = docsUsed.size >= 6;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📎 Document Tagger (DBQ)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Checks how many unique documents you reference. Aim for 6+ to earn full evidence points.
          </p>
          <Button onClick={() => setAnalyzed(true)} className="w-full" disabled={!responseText.trim()}>
            Scan for Documents
          </Button>
        </CardContent>
      </Card>

      {analyzed && (
        <>
          <Card>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Document Coverage</span>
                <Badge variant={meetsThreshold ? "default" : "destructive"}>
                  {docsUsed.size}/{documentCount} docs used
                </Badge>
              </div>
              <Progress value={coverage} className="h-3" />

              <div className="grid grid-cols-7 gap-2">
                {allDocs.map(doc => (
                  <div
                    key={doc}
                    className={`flex flex-col items-center p-2 rounded-lg text-xs font-medium ${
                      docsUsed.has(doc)
                        ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                    }`}
                  >
                    <span>{doc}</span>
                    {docsUsed.has(doc) ? (
                      <CheckCircle2 className="w-3 h-3 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mt-0.5" />
                    )}
                    {counts[doc] && <span className="text-[10px] opacity-70">×{counts[doc]}</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {missingDocs.length > 0 && (
            <Card className="border-yellow-300 bg-yellow-50/50 dark:bg-yellow-950/20">
              <CardContent className="pt-4 space-y-2">
                <p className="text-sm font-medium text-yellow-700">⚠️ Missing Documents: {missingDocs.join(", ")}</p>
                <p className="text-xs text-muted-foreground">
                  Try integrating these documents to strengthen your argument and earn full evidence points.
                </p>
              </CardContent>
            </Card>
          )}

          {overusedDocs.length > 0 && (
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardContent className="pt-4 space-y-2">
                <p className="text-sm font-medium text-blue-700">📊 Heavily Referenced:</p>
                {overusedDocs.map(([doc, count]) => (
                  <p key={doc} className="text-xs text-muted-foreground">
                    {doc} referenced {count} times — consider diversifying evidence.
                  </p>
                ))}
              </CardContent>
            </Card>
          )}

          {meetsThreshold && missingDocs.length <= 1 && (
            <Card className="border-green-300 bg-green-50/50 dark:bg-green-950/20">
              <CardContent className="pt-4 text-center">
                <p className="text-sm font-medium text-green-700">✅ Excellent document coverage!</p>
                <p className="text-xs text-muted-foreground">You're on track to earn full evidence points.</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
