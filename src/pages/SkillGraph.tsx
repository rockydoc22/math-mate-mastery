import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Map, ChevronRight, Lock, CheckCircle2, Circle, Star, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Mastery levels with colors matching the spec
const MASTERY_LEVELS = [
  { id: "N0", label: "Not started", color: "bg-muted text-muted-foreground", ring: "ring-muted", dot: "bg-muted-foreground/30" },
  { id: "N1", label: "Introduced", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300", ring: "ring-blue-300", dot: "bg-blue-400" },
  { id: "N2", label: "Developing", color: "bg-blue-200 dark:bg-blue-800/40 text-blue-800 dark:text-blue-200", ring: "ring-blue-500", dot: "bg-blue-500" },
  { id: "N3", label: "Strong", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300", ring: "ring-green-500", dot: "bg-green-500" },
  { id: "N4", label: "Mastered", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300", ring: "ring-amber-500", dot: "bg-amber-500" },
];

// Skill categories for SAT/ACT
const MATH_SKILLS = [
  { id: "algebra-linear", name: "Linear Equations", category: "Algebra", prereqs: [] },
  { id: "algebra-systems", name: "Systems of Equations", category: "Algebra", prereqs: ["algebra-linear"] },
  { id: "algebra-quadratic", name: "Quadratics", category: "Algebra", prereqs: ["algebra-linear"] },
  { id: "algebra-exponential", name: "Exponential Functions", category: "Algebra", prereqs: ["algebra-linear"] },
  { id: "algebra-polynomial", name: "Polynomials", category: "Advanced Math", prereqs: ["algebra-quadratic"] },
  { id: "algebra-rational", name: "Rational Expressions", category: "Advanced Math", prereqs: ["algebra-polynomial"] },
  { id: "data-stats", name: "Statistics & Probability", category: "Problem Solving", prereqs: [] },
  { id: "data-rates", name: "Rates & Percentages", category: "Problem Solving", prereqs: ["data-stats"] },
  { id: "data-scatterplots", name: "Scatterplots & Models", category: "Problem Solving", prereqs: ["data-stats", "algebra-linear"] },
  { id: "geo-triangles", name: "Triangles & Angles", category: "Geometry", prereqs: [] },
  { id: "geo-circles", name: "Circles", category: "Geometry", prereqs: ["geo-triangles"] },
  { id: "geo-trig", name: "Trigonometry", category: "Geometry", prereqs: ["geo-triangles", "geo-circles"] },
  { id: "geo-volume", name: "Volume & Area", category: "Geometry", prereqs: ["geo-triangles"] },
];

const ENGLISH_SKILLS = [
  { id: "grammar-punctuation", name: "Punctuation", category: "Conventions", prereqs: [] },
  { id: "grammar-agreement", name: "Subject-Verb Agreement", category: "Conventions", prereqs: [] },
  { id: "grammar-modifiers", name: "Modifiers & Parallelism", category: "Conventions", prereqs: ["grammar-punctuation", "grammar-agreement"] },
  { id: "grammar-transitions", name: "Transitions", category: "Expression", prereqs: ["grammar-punctuation"] },
  { id: "reading-main-idea", name: "Main Idea", category: "Reading", prereqs: [] },
  { id: "reading-inference", name: "Inference", category: "Reading", prereqs: ["reading-main-idea"] },
  { id: "reading-evidence", name: "Evidence Support", category: "Reading", prereqs: ["reading-main-idea"] },
  { id: "reading-vocab", name: "Vocabulary in Context", category: "Reading", prereqs: ["reading-main-idea"] },
  { id: "reading-purpose", name: "Author's Purpose", category: "Reading", prereqs: ["reading-inference", "reading-evidence"] },
  { id: "craft-rhetoric", name: "Rhetorical Analysis", category: "Craft & Structure", prereqs: ["reading-purpose"] },
  { id: "craft-structure", name: "Text Structure", category: "Craft & Structure", prereqs: ["reading-main-idea"] },
];

// Day 5 — Seed SkillGraph nodes for top 3 ProExams (GRE, NCLEX, MCAT)
const GRE_SKILLS = [
  { id: "gre-arithmetic", name: "Arithmetic", category: "Quantitative", prereqs: [] },
  { id: "gre-algebra", name: "Algebra", category: "Quantitative", prereqs: ["gre-arithmetic"] },
  { id: "gre-geometry", name: "Geometry", category: "Quantitative", prereqs: ["gre-arithmetic"] },
  { id: "gre-data-analysis", name: "Data Analysis", category: "Quantitative", prereqs: ["gre-algebra"] },
  { id: "gre-vocab", name: "Vocabulary", category: "Verbal", prereqs: [] },
  { id: "gre-text-completion", name: "Text Completion", category: "Verbal", prereqs: ["gre-vocab"] },
  { id: "gre-sentence-equiv", name: "Sentence Equivalence", category: "Verbal", prereqs: ["gre-vocab"] },
  { id: "gre-reading-comp", name: "Reading Comprehension", category: "Verbal", prereqs: ["gre-text-completion"] },
  { id: "gre-analytical-writing", name: "Analytical Writing", category: "Writing", prereqs: ["gre-reading-comp"] },
];

const NCLEX_SKILLS = [
  { id: "nclex-safe-care", name: "Safe & Effective Care", category: "Safe Care", prereqs: [] },
  { id: "nclex-infection-control", name: "Infection Control", category: "Safe Care", prereqs: ["nclex-safe-care"] },
  { id: "nclex-health-promotion", name: "Health Promotion", category: "Promotion", prereqs: [] },
  { id: "nclex-psychosocial", name: "Psychosocial Integrity", category: "Psychosocial", prereqs: [] },
  { id: "nclex-basic-care", name: "Basic Care & Comfort", category: "Physiological", prereqs: [] },
  { id: "nclex-pharmacology", name: "Pharmacological Therapies", category: "Physiological", prereqs: ["nclex-basic-care"] },
  { id: "nclex-risk-reduction", name: "Risk Reduction", category: "Physiological", prereqs: ["nclex-basic-care"] },
  { id: "nclex-physio-adaptation", name: "Physiological Adaptation", category: "Physiological", prereqs: ["nclex-pharmacology", "nclex-risk-reduction"] },
];

const MCAT_SKILLS = [
  { id: "mcat-chem-gen", name: "General Chemistry", category: "Chem/Phys", prereqs: [] },
  { id: "mcat-physics", name: "Physics", category: "Chem/Phys", prereqs: [] },
  { id: "mcat-chem-org", name: "Organic Chemistry", category: "Chem/Phys", prereqs: ["mcat-chem-gen"] },
  { id: "mcat-biochem", name: "Biochemistry", category: "Bio/Biochem", prereqs: ["mcat-chem-org"] },
  { id: "mcat-bio-cell", name: "Cell Biology", category: "Bio/Biochem", prereqs: [] },
  { id: "mcat-bio-systems", name: "Body Systems", category: "Bio/Biochem", prereqs: ["mcat-bio-cell"] },
  { id: "mcat-psych", name: "Psychology", category: "Psych/Soc", prereqs: [] },
  { id: "mcat-soc", name: "Sociology", category: "Psych/Soc", prereqs: [] },
  { id: "mcat-cars", name: "Critical Analysis & Reasoning", category: "CARS", prereqs: [] },
];

type SkillNode = typeof MATH_SKILLS[0];

const TAB_LABELS: Record<string, string> = {
  math: "📐 Math",
  english: "📝 English",
  gre: "🎓 GRE",
  nclex: "🏥 NCLEX",
  mcat: "🔬 MCAT",
};

function getSkillsForTab(tab: string): SkillNode[] {
  switch (tab) {
    case "english": return ENGLISH_SKILLS;
    case "gre": return GRE_SKILLS;
    case "nclex": return NCLEX_SKILLS;
    case "mcat": return MCAT_SKILLS;
    default: return MATH_SKILLS;
  }
}

function getMasteryLevel(accuracy: number, attempts: number): number {
  if (attempts === 0) return 0; // N0
  if (attempts < 3) return 1; // N1
  if (accuracy < 50) return 1;
  if (accuracy < 70) return 2; // N2
  if (accuracy < 85) return 3; // N3
  return 4; // N4
}

function isUnlocked(node: SkillNode, masteryMap: Record<string, number>): boolean {
  if (node.prereqs.length === 0) return true;
  return node.prereqs.every(p => (masteryMap[p] || 0) >= 2);
}

export default function SkillGraph() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"math" | "english" | "gre" | "nclex" | "mcat">("math");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Load topic mastery data
  const { data: topicData } = useQuery({
    queryKey: ["topic-mastery", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("topic_mastery")
        .select("topic_key, questions_attempted, questions_correct, accuracy_percentage")
        .eq("user_id", user!.id);
      return data || [];
    },
  });

  // Load question attempt stats by skill
  const { data: attemptStats } = useQuery({
    queryKey: ["skill-attempt-stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("question_attempts")
        .select("skill, is_correct")
        .eq("user_id", user!.id);
      
      const map: Record<string, { correct: number; total: number }> = {};
      for (const a of (data || [])) {
        const key = (a.skill || "").toLowerCase().replace(/\s+/g, "-");
        if (!map[key]) map[key] = { correct: 0, total: 0 };
        map[key].total++;
        if (a.is_correct) map[key].correct++;
      }
      return map;
    },
  });

  // Build mastery map
  const masteryMap = useMemo(() => {
    const map: Record<string, number> = {};
    const skills = getSkillsForTab(activeTab);
    
    for (const skill of skills) {
      // Check topic_mastery first
      const topicMatch = topicData?.find(t => 
        t.topic_key.toLowerCase().replace(/\s+/g, "-").includes(skill.id.split("-").pop() || "")
      );
      
      // Check attempt stats
      const attemptMatch = attemptStats?.[skill.id];
      
      if (topicMatch && topicMatch.questions_attempted > 0) {
        map[skill.id] = getMasteryLevel(topicMatch.accuracy_percentage, topicMatch.questions_attempted);
      } else if (attemptMatch && attemptMatch.total > 0) {
        const accuracy = (attemptMatch.correct / attemptMatch.total) * 100;
        map[skill.id] = getMasteryLevel(accuracy, attemptMatch.total);
      } else {
        map[skill.id] = 0;
      }
    }
    return map;
  }, [topicData, attemptStats, activeTab]);

  const skills = getSkillsForTab(activeTab);
  const categories = [...new Set(skills.map(s => s.category))];

  // Stats
  const totalSkills = skills.length;
  const masteredCount = skills.filter(s => (masteryMap[s.id] || 0) >= 4).length;
  const strongCount = skills.filter(s => (masteryMap[s.id] || 0) >= 3).length;
  const inProgressCount = skills.filter(s => {
    const m = masteryMap[s.id] || 0;
    return m >= 1 && m < 3;
  }).length;

  const selected = selectedNode ? skills.find(s => s.id === selectedNode) : null;
  const selectedMastery = selected ? (masteryMap[selected.id] || 0) : 0;
  const selectedLevel = MASTERY_LEVELS[selectedMastery];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto text-center mt-20">
          <Map className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Skill Map</h1>
          <p className="text-muted-foreground mb-6">Sign in to see your knowledge map.</p>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Map className="w-6 h-6 text-primary" />
              Skill Map
            </h1>
            <p className="text-sm text-muted-foreground">Your knowledge graph</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {(["math", "english", "gre", "nclex", "mcat"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedNode(null); }}
              className={`shrink-0 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-amber-500">{masteredCount}</p>
            <p className="text-[10px] text-muted-foreground">Mastered</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-green-500">{strongCount}</p>
            <p className="text-[10px] text-muted-foreground">Strong+</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-blue-500">{inProgressCount}</p>
            <p className="text-[10px] text-muted-foreground">In Progress</p>
          </Card>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-5">
          {MASTERY_LEVELS.map(l => (
            <div key={l.id} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${l.dot}`} />
              <span className="text-[10px] text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Skill nodes by category */}
        {categories.map(cat => (
          <div key={cat} className="mb-5">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{cat}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skills.filter(s => s.category === cat).map((skill, i) => {
                const level = masteryMap[skill.id] || 0;
                const mastery = MASTERY_LEVELS[level];
                const unlocked = isUnlocked(skill, masteryMap);
                const isSelected = selectedNode === skill.id;

                return (
                  <motion.button
                    key={skill.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedNode(isSelected ? null : skill.id)}
                    className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                      !unlocked
                        ? "border-border/30 bg-muted/30 opacity-50 cursor-not-allowed"
                        : isSelected
                        ? `border-primary ${mastery.color} ring-2 ${mastery.ring} shadow-lg scale-[1.02]`
                        : `border-border ${mastery.color} hover:border-primary/40 hover:scale-[1.01]`
                    }`}
                    disabled={!unlocked}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-semibold leading-tight">{skill.name}</span>
                      {!unlocked && <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                      {level >= 4 && <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />}
                      {level === 3 && <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />}
                      {level >= 1 && level < 3 && <Circle className="w-3 h-3 text-blue-400 flex-shrink-0" />}
                    </div>
                    {/* Progress dots */}
                    <div className="flex gap-0.5 mt-2">
                      {[1, 2, 3, 4].map(n => (
                        <div
                          key={n}
                          className={`h-1 flex-1 rounded-full ${n <= level ? mastery.dot : "bg-muted-foreground/10"}`}
                        />
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Selected node detail panel */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Card className={`p-5 border-2 ${selectedLevel.ring.replace("ring-", "border-")}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground text-lg">{selected.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${selectedLevel.color}`}>
                  {selectedLevel.label}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Category: {selected.category}
              </p>

              {selected.prereqs.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Prerequisites:</p>
                  <div className="flex flex-wrap gap-1">
                    {selected.prereqs.map(p => {
                      const prereqSkill = skills.find(s => s.id === p);
                      const pLevel = masteryMap[p] || 0;
                      return (
                        <span key={p} className={`text-xs px-2 py-0.5 rounded-full ${
                          pLevel >= 2 
                            ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                            : "bg-destructive/10 text-destructive"
                        }`}>
                          {prereqSkill?.name || p} {pLevel >= 2 ? "✓" : "✗"}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Unlocks */}
              {(() => {
                const unlocks = skills.filter(s => s.prereqs.includes(selected.id));
                if (unlocks.length === 0) return null;
                return (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Unlocks:</p>
                    <div className="flex flex-wrap gap-1">
                      {unlocks.map(u => (
                        <span key={u.id} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {u.name} <ChevronRight className="w-3 h-3 inline" />
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <Link to={`/problems-by-topic`}>
                <Button size="sm" className="w-full gap-2 mt-2">
                  <Zap className="w-4 h-4" />
                  Practice This Skill
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
