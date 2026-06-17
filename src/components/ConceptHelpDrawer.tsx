import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Sparkles, Youtube, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface Props {
  question: string;
  skill?: string;
  domain?: string;
}

/**
 * In-question "Study this concept" drawer. Three tiers:
 *  1. Quick (<=25 words) - one-line nudge
 *  2. Short (<=180 words) - tight refresher with worked micro-example
 *  3. Deep dive - elaborate lesson, loaded only on demand
 * Plus an embedded YouTube tab (no API key needed: listType=search).
 */
export function ConceptHelpDrawer({ question, skill, domain }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ quick: string; short: string; youtubeQuery: string } | null>(null);
  const [deep, setDeep] = useState<string>("");
  const [deepLoading, setDeepLoading] = useState(false);
  const [tab, setTab] = useState("quick");

  const load = async () => {
    if (data || loading) return;
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("concept-refresher", {
        body: { question, skill, domain },
      });
      if (error) throw error;
      setData(res);
    } catch (e) {
      setData({
        quick: "Couldn't load a refresher right now. Try again in a moment.",
        short: "Couldn't load a refresher right now.",
        youtubeQuery: `${skill || domain || "SAT"} concept`,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDeep = async () => {
    if (deep || deepLoading) return;
    setDeepLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("concept-refresher", {
        body: { question, skill, domain, deep: true },
      });
      if (error) throw error;
      setDeep(res?.deep || "No deep dive available.");
    } catch {
      setDeep("Couldn't load deep dive. Try again later.");
    } finally {
      setDeepLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (v) load(); }}>
      <SheetTrigger asChild>
        <Button
          type="button" variant="outline" size="sm"
          className="gap-2 border-violet-400/40 text-violet-700 hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-950/40"
        >
          <BookOpen className="w-4 h-4" />
          Study this concept
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            {skill || domain || "Concept refresher"}
          </SheetTitle>
        </SheetHeader>

        {loading && !data && (
          <div className="flex items-center justify-center py-12 text-sm text-muted-foreground gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading short refresher…
          </div>
        )}

        {data && (
          <Tabs value={tab} onValueChange={setTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quick" className="text-xs">Quick tip</TabsTrigger>
              <TabsTrigger value="short" className="text-xs">Explain</TabsTrigger>
              <TabsTrigger value="deep" className="text-xs" onClick={loadDeep}>Deep dive</TabsTrigger>
              <TabsTrigger value="video" className="text-xs gap-1">
                <Youtube className="w-3 h-3" /> Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="mt-4">
              <p className="text-base leading-relaxed">{data.quick}</p>
              <p className="text-[11px] text-muted-foreground mt-3">
                Need more? Tap <span className="font-medium">Explain</span>.
              </p>
            </TabsContent>

            <TabsContent value="short" className="mt-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{data.short}</ReactMarkdown>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">
                Still fuzzy? Tap <span className="font-medium">Deep dive</span> or watch the video.
              </p>
            </TabsContent>

            <TabsContent value="deep" className="mt-4">
              {deepLoading && (
                <div className="flex items-center justify-center py-8 text-sm text-muted-foreground gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading deeper lesson…
                </div>
              )}
              {!deepLoading && deep && (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{deep}</ReactMarkdown>
                </div>
              )}
              {!deepLoading && !deep && (
                <Button size="sm" onClick={loadDeep}>Load deep dive</Button>
              )}
            </TabsContent>

            <TabsContent value="video" className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                Top YouTube result for: <span className="font-medium">{data.youtubeQuery}</span>
              </p>
              <div className="aspect-video w-full rounded-lg overflow-hidden border bg-black">
                <iframe
                  title="Concept video"
                  src={`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(data.youtubeQuery)}`}
                  className="w-full h-full"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.youtubeQuery)}`}
                target="_blank" rel="noreferrer"
                className="text-xs text-primary underline"
              >
                Open on YouTube
              </a>
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
}