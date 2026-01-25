import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Calculator, PenTool, Search, Lightbulb, 
  AlertTriangle, Target, Crown, ChevronDown, ChevronUp 
} from "lucide-react";
import { mathKeyConcepts, englishKeyConcepts, KeyConcept } from "@/data/satKeyConcepts";

const KeyPrinciples = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());

  const toggleExpand = (skill: string) => {
    const newExpanded = new Set(expandedConcepts);
    if (newExpanded.has(skill)) {
      newExpanded.delete(skill);
    } else {
      newExpanded.add(skill);
    }
    setExpandedConcepts(newExpanded);
  };

  const filterConcepts = (concepts: KeyConcept[]) => {
    if (!searchQuery.trim()) return concepts;
    const query = searchQuery.toLowerCase();
    return concepts.filter(c => 
      c.skill.toLowerCase().includes(query) ||
      c.domain.toLowerCase().includes(query) ||
      c.keyInsight.toLowerCase().includes(query) ||
      c.satTip.toLowerCase().includes(query)
    );
  };

  const ConceptCard = ({ concept }: { concept: KeyConcept }) => {
    const isExpanded = expandedConcepts.has(concept.skill);
    
    return (
      <Card className="p-4 border-2 hover:border-primary/30 transition-colors">
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={() => toggleExpand(concept.skill)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {concept.domain}
              </span>
            </div>
            <h3 className="font-semibold text-foreground">{concept.skill}</h3>
            <p className="text-sm text-muted-foreground mt-1">{concept.keyInsight}</p>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* SAT Tip */}
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 h-fit">
                <Lightbulb className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">SAT Tip</p>
                <p className="text-sm">{concept.satTip}</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-destructive/10 h-fit">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-xs font-semibold text-destructive mb-1">Common Mistakes</p>
                <ul className="text-sm space-y-1">
                  {concept.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advanced Trap */}
            {concept.advancedTrap && (
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 h-fit">
                  <Target className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">Advanced Trap</p>
                  <p className="text-sm">{concept.advancedTrap}</p>
                </div>
              </div>
            )}

            {/* Level 1600 Insight */}
            {concept.level1600Insight && (
              <div className="flex gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="p-2 rounded-lg bg-amber-500/20 h-fit">
                  <Crown className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">🏆 Level 1600 Insight</p>
                  <p className="text-sm font-medium">{concept.level1600Insight}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  };

  const filteredMath = filterConcepts(mathKeyConcepts);
  const filteredEnglish = filterConcepts(englishKeyConcepts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Key SAT Principles</h1>
            <p className="text-sm text-muted-foreground">High-yield concepts that separate 1550 from 1600</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="math" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="math" className="gap-2">
              <Calculator className="w-4 h-4" />
              Math ({filteredMath.length})
            </TabsTrigger>
            <TabsTrigger value="english" className="gap-2">
              <PenTool className="w-4 h-4" />
              English ({filteredEnglish.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="math" className="space-y-3">
            {filteredMath.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No concepts match your search</p>
            ) : (
              filteredMath.map((concept) => (
                <ConceptCard key={concept.skill} concept={concept} />
              ))
            )}
          </TabsContent>

          <TabsContent value="english" className="space-y-3">
            {filteredEnglish.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No concepts match your search</p>
            ) : (
              filteredEnglish.map((concept) => (
                <ConceptCard key={concept.skill} concept={concept} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KeyPrinciples;
