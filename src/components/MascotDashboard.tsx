import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Pin, PinOff, ChevronRight } from "lucide-react";
import { MASCOTS, TOOL_META, type MascotKey } from "@/data/toolPitches";

export interface MascotTool {
  id: string;
  label: string;
  to: string;
}

interface Props {
  availableTools: MascotTool[]; // already filtered by examType in caller
  pinnedIds: string[];
  onTogglePin: (id: string) => void;
}

/**
 * Five friendly character cards. Tapping a card opens a bottom drawer with
 * 4–6 of that character's tools, each with its own emoji + one-line pitch +
 * Open / Pin actions. Makes the full dashboard browsable by *vibe*, not by
 * scrolling a 50-icon wall.
 */
export function MascotDashboard({ availableTools, pinnedIds, onTogglePin }: Props) {
  const [openMascot, setOpenMascot] = useState<MascotKey | null>(null);

  // Bucket the available tools by their mascot.
  const byMascot = new Map<MascotKey, (MascotTool & { emoji: string; pitch: string })[]>();
  for (const t of availableTools) {
    const meta = TOOL_META[t.id];
    if (!meta) continue;
    const arr = byMascot.get(meta.mascot) ?? [];
    arr.push({ ...t, emoji: meta.emoji, pitch: meta.pitch });
    byMascot.set(meta.mascot, arr);
  }

  const activeTools = openMascot ? (byMascot.get(openMascot) ?? []) : [];
  const activeMascot = MASCOTS.find(m => m.key === openMascot);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Meet your helpers
        </h3>
        <span className="text-[10px] text-muted-foreground">Tap a character</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {MASCOTS.map((m) => {
          const count = (byMascot.get(m.key) ?? []).length;
          if (count === 0) return null;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setOpenMascot(m.key)}
              className="text-left rounded-xl p-3 border border-border/60 bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl leading-none">{m.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground">{count} tools</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{m.pitch}</p>
            </button>
          );
        })}
      </div>

      <Sheet open={openMascot !== null} onOpenChange={(o) => !o && setOpenMascot(null)}>
        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <span className="text-2xl">{activeMascot?.emoji}</span>
              {activeMascot?.name}
            </SheetTitle>
            <SheetDescription>{activeMascot?.pitch}</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2 pb-6">
            {activeTools.map((t) => {
              const isPinned = pinnedIds.includes(t.id);
              return (
                <Card key={t.id} className="p-3 flex items-center gap-3">
                  <span className="text-2xl shrink-0">{t.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{t.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{t.pitch}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="shrink-0"
                    onClick={() => onTogglePin(t.id)}
                    title={isPinned ? "Unpin from dashboard" : "Pin to dashboard"}
                  >
                    {isPinned ? <PinOff className="w-4 h-4 text-primary" /> : <Pin className="w-4 h-4" />}
                  </Button>
                  <Link to={t.to} onClick={() => setOpenMascot(null)}>
                    <Button size="sm" className="shrink-0">Open</Button>
                  </Link>
                </Card>
              );
            })}
            {activeTools.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No tools in this category yet.
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}