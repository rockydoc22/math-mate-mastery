import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Languages, Sparkles, Loader2, Bookmark, BookOpen, Trash2 } from "lucide-react";
import { Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

const LANGS = [
  { id: "fr", label: "French" },
  { id: "es", label: "Spanish" },
  { id: "de", label: "German" },
  { id: "it", label: "Italian" },
  { id: "pt", label: "Portuguese" },
  { id: "la", label: "Latin" },
  { id: "el", label: "Greek (modern)" },
  { id: "grc", label: "Ancient Greek" },
  { id: "he", label: "Hebrew" },
  { id: "ar", label: "Arabic" },
  { id: "zh", label: "Chinese (Mandarin)" },
  { id: "ja", label: "Japanese" },
  { id: "ko", label: "Korean" },
  { id: "ru", label: "Russian" },
];

// Map our lang IDs to BCP-47 tags the Web Speech API understands.
const SPEECH_LOCALE: Record<string, string> = {
  fr: "fr-FR", es: "es-ES", de: "de-DE", it: "it-IT", pt: "pt-PT",
  la: "it-IT", el: "el-GR", grc: "el-GR", he: "he-IL", ar: "ar-SA",
  zh: "zh-CN", ja: "ja-JP", ko: "ko-KR", ru: "ru-RU",
};

function speak(text: string, langId: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = SPEECH_LOCALE[langId] || "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch {}
}

const SAMPLES: Record<string, string> = {
  fr: "Le petit prince habitait une planète à peine plus grande que lui.",
  es: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme…",
  de: "Es war einmal ein kleines Mädchen, das hatte eine rote Kappe.",
  la: "Gallia est omnis divisa in partes tres.",
  grc: "ἐν ἀρχῇ ἦν ὁ λόγος.",
};

export default function InterpretationLab() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lang, setLang] = useState("fr");
  const [text, setText] = useState(SAMPLES.fr);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<{ lang: string; text: string; result: string; at: number }[]>([]);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem("ao_interp_history") || "[]")); } catch {}
  }, []);

  const saveToHistory = (entry: { lang: string; text: string; result: string }) => {
    const next = [{ ...entry, at: Date.now() }, ...history].slice(0, 20);
    setHistory(next);
    try { localStorage.setItem("ao_interp_history", JSON.stringify(next)); } catch {}
    toast({ title: "Saved to your library" });
  };

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem("ao_interp_history"); } catch {}
  };

  const exportFlashcards = () => {
    // Extract single foreign words (length 2-20, no spaces) from saved passages.
    const words = new Set<string>();
    history.forEach(h => {
      h.text.split(/[\s.,;:!?¡¿«»"'()\[\]]+/).forEach(w => {
        const clean = w.trim();
        if (clean.length >= 2 && clean.length <= 20 && !/^\d+$/.test(clean)) words.add(clean);
      });
    });
    if (words.size === 0) { toast({ title: "Nothing to export yet" }); return; }
    const csv = "front,back\n" + Array.from(words).slice(0, 200).map(w => `"${w}","(translate)"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "flashcards.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: `Exported ${Math.min(words.size, 200)} flashcards` });
  };

  const interpret = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke("interpret-passage", {
        body: { language: lang, text: text.trim() },
      });
      if (error) throw error;
        const out = (data as any)?.interpretation || "No interpretation returned.";
        setResult(out);
    } catch (e: any) {
      toast({ title: "Could not interpret", description: e.message || "Try again", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLangChange = (v: string) => {
    setLang(v);
    if (SAMPLES[v]) setText(SAMPLES[v]);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO
        title="Interpretation Lab — Read foreign languages"
        description="Paste any passage and learn by interpretation: word-by-word breakdown, idioms, grammar notes, and a natural English rendering."
        path="/interpretation"
      />
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="flex items-center gap-3 mb-2">
          <Languages className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold">Interpretation Lab</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Read foreign-language passages by <em>interpretation</em> — word-by-word, with grammar and cultural notes,
          then a natural English rendering. Paste any passage you're curious about.
        </p>

        <Card className="p-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium">Language:</label>
            <Select value={lang} onValueChange={handleLangChange}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LANGS.map(l => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Paste a sentence or short passage…"
            className="font-serif"
          />
          <Button onClick={interpret} disabled={loading || !user} className="gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Interpreting…" : "Interpret"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => speak(text, lang)}
            disabled={!text.trim()}
            className="gap-2 ml-2"
          >
            <Volume2 className="w-4 h-4" /> Listen
          </Button>
          {!user && <p className="text-xs text-muted-foreground">Sign in to use interpretation.</p>}
        </Card>

        {result && (
          <Card className="p-4 mt-4">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{result}</div>
            <Button size="sm" variant="outline" className="mt-3 gap-1" onClick={() => saveToHistory({ lang, text, result })}>
              <Bookmark className="w-4 h-4" /> Save to library
            </Button>
          </Card>
        )}

        {history.length > 0 && (
          <Card className="p-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-semibold"><BookOpen className="w-4 h-4 text-primary" /> Your library ({history.length})</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={exportFlashcards}>Export flashcards</Button>
                <Button size="sm" variant="ghost" onClick={clearHistory} className="text-muted-foreground gap-1">
                  <Trash2 className="w-3 h-3" /> Clear
                </Button>
              </div>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {history.map((h, i) => (
                <div key={i} className="text-xs border border-border rounded-md p-2">
                  <div className="text-muted-foreground mb-1">{LANGS.find(l => l.id === h.lang)?.label} • {new Date(h.at).toLocaleDateString()}</div>
                  <div className="font-serif italic truncate">{h.text}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-3 mt-6 bg-muted/40 text-xs text-muted-foreground">
          Family-safe: passages and AI output are filtered to keep content appropriate for all ages.
        </Card>
      </div>
    </div>
  );
}