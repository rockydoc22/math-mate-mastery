import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Heart, ChevronRight, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

interface PersonalityItem {
  id: string;
  track: string;
  trait?: string;
  domain?: string;
  prompt: string;
  response_scale: { type: string; labels: string[] };
  scoring_direction?: number;
}

type AssessmentMode = "select" | "big5" | "eq" | "lp" | "results";

interface TraitScore {
  trait: string;
  score: number;
  max: number;
  label: string;
}

const TRAIT_LABELS: Record<string, string> = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Extraversion",
  agreeableness: "Agreeableness",
  neuroticism: "Emotional Sensitivity",
  self_awareness: "Self-Awareness",
  self_regulation: "Self-Regulation",
  motivation: "Motivation",
  empathy: "Empathy",
  social_skills: "Social Skills",
  independent_vs_collaborative: "Independent vs Collaborative",
  fast_vs_deep: "Fast vs Deep",
  visual_vs_verbal: "Visual vs Verbal",
  structured_vs_exploratory: "Structured vs Exploratory",
  competitive_vs_personal: "Competitive vs Personal",
  morning_vs_evening: "Morning vs Evening",
  quiet_vs_social: "Quiet vs Social",
  digital_vs_analog: "Digital vs Analog",
};

const PersonalityAssessment = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<AssessmentMode>("select");
  const [items, setItems] = useState<PersonalityItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<TraitScore[]>([]);

  const loadItems = async (type: "big5" | "eq") => {
    const mod =
      type === "big5"
        ? await import("@/data/big_five_style_items_60.json")
        : await import("@/data/eq_items_50.json");
    const data = (mod.default || mod) as PersonalityItem[];
    setItems(data);
    setCurrentIndex(0);
    setAnswers({});
    setMode(type);
  };

  const handleAnswer = (value: number) => {
    const item = items[currentIndex];
    const direction = item.scoring_direction ?? 1;
    const score = direction === 1 ? value : 4 - value;
    setAnswers((prev) => ({ ...prev, [item.id]: score }));

    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate results
      const traitKey = mode === "big5" ? "trait" : "domain";
      const traitScores: Record<string, { total: number; count: number }> = {};
      items.forEach((item) => {
        const t = (item as any)[traitKey] || "unknown";
        if (!traitScores[t]) traitScores[t] = { total: 0, count: 0 };
        const ans = answers[item.id] ?? score; // use current answer for last item
        if (item.id === items[currentIndex].id) {
          traitScores[t].total += score;
        } else {
          traitScores[t].total += ans;
        }
        traitScores[t].count += 1;
      });

      const scored: TraitScore[] = Object.entries(traitScores).map(
        ([trait, { total, count }]) => ({
          trait,
          score: total,
          max: count * 4,
          label: TRAIT_LABELS[trait] || trait,
        })
      );
      setResults(scored);
      setMode("results");
    }
  };

  const currentItem = items[currentIndex];
  const progress = items.length > 0 ? Math.round(((currentIndex + 1) / items.length) * 100) : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Sign in to take assessments</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" /> Personality & EQ
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {mode === "select" && (
          <div className="space-y-4">
            <Card
              className="p-6 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => loadItems("big5")}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">🧠</div>
                <div className="flex-1">
                  <h3 className="font-bold">Personality Style</h3>
                  <p className="text-sm text-muted-foreground">
                    60 questions • Discover your Big Five personality traits
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => loadItems("eq")}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">💖</div>
                <div className="flex-1">
                  <h3 className="font-bold">Emotional Intelligence</h3>
                  <p className="text-sm text-muted-foreground">
                    50 questions • Measure your EQ across 5 domains
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </div>
        )}

        {(mode === "big5" || mode === "eq") && currentItem && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-xs font-mono text-muted-foreground">
                {currentIndex + 1}/{items.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6">
                  <p className="text-lg font-medium mb-6 leading-relaxed">
                    {currentItem.prompt}
                  </p>
                  <div className="space-y-2">
                    {currentItem.response_scale.labels.map((label, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => handleAnswer(i)}
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-3 shrink-0">
                          {i + 1}
                        </span>
                        {label}
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {mode === "results" && (
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <BarChart3 className="w-10 h-10 text-primary mx-auto mb-2" />
              <h2 className="text-xl font-bold mb-1">Your Results</h2>
              <p className="text-sm text-muted-foreground">
                Based on your {items.length} responses
              </p>
            </Card>

            <div className="space-y-3">
              {results
                .sort((a, b) => b.score / b.max - a.score / a.max)
                .map((r) => {
                  const pct = Math.round((r.score / r.max) * 100);
                  return (
                    <Card key={r.trait} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-sm">{r.label}</h3>
                        <span className="text-xs font-mono text-muted-foreground">{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </Card>
                  );
                })}
            </div>

            <Button
              className="w-full"
              onClick={() => { setMode("select"); setResults([]); }}
            >
              Take Another Assessment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityAssessment;
