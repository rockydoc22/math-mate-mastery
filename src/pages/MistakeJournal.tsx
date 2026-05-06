import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, BookMarked, TrendingDown, AlertTriangle, Brain,
  ChevronRight, Filter, BarChart3
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { getReflectionEntries, type ReflectionEntry } from "@/hooks/useReflectionPrompts";

interface MistakeEntry {
  id: string;
  question_id: string;
  domain: string;
  skill: string;
  created_at: string;
  miss_reason: string | null;
  time_taken_ms: number | null;
  review_count: number;
}

interface MistakePattern {
  skill: string;
  domain: string;
  count: number;
  lastMissed: string;
}

const MistakeJournal = () => {
  const { user } = useAuth();
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [patterns, setPatterns] = useState<MistakePattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDomain, setFilterDomain] = useState("all");
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadMistakes();
  }, [user]);

  const loadMistakes = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('question_attempts')
      .select('id, question_id, domain, skill, created_at, miss_reason, time_taken_ms, review_count')
      .eq('user_id', user.id)
      .eq('is_correct', false)
      .order('created_at', { ascending: false })
      .limit(200);

    if (data) {
      setMistakes(data);

      // Build patterns
      const skillMap: Record<string, MistakePattern> = {};
      data.forEach(m => {
        const key = `${m.domain}|${m.skill}`;
        if (!skillMap[key]) {
          skillMap[key] = { skill: m.skill, domain: m.domain, count: 0, lastMissed: m.created_at };
        }
        skillMap[key].count++;
        if (m.created_at > skillMap[key].lastMissed) {
          skillMap[key].lastMissed = m.created_at;
        }
      });

      setPatterns(
        Object.values(skillMap).sort((a, b) => b.count - a.count)
      );
    }

    setLoading(false);
  };

  const domains = [...new Set(mistakes.map(m => m.domain))];
  const filteredMistakes = filterDomain === "all"
    ? mistakes
    : mistakes.filter(m => m.domain === filterDomain);
  const filteredPatterns = filterDomain === "all"
    ? patterns
    : patterns.filter(p => p.domain === filterDomain);

  const formatTime = (ms: number | null) => {
    if (!ms) return "—";
    const secs = Math.round(ms / 1000);
    return secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}m ${secs % 60}s`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString();
  };

  const getDomainEmoji = (domain: string) => {
    if (domain.toLowerCase().includes('math')) return '🧮';
    if (domain.toLowerCase().includes('english') || domain.toLowerCase().includes('reading')) return '📝';
    return '📊';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <h1 className="text-2xl font-bold">Mistake Journal</h1>
          <BookMarked className="w-6 h-6 text-primary ml-auto" />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center">
            <TrendingDown className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{mistakes.length}</div>
            <div className="text-[10px] text-muted-foreground">Total Mistakes</div>
          </Card>
          <Card className="p-3 text-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xl font-bold">{patterns.length}</div>
            <div className="text-[10px] text-muted-foreground">Weak Skills</div>
          </Card>
          <Card className="p-3 text-center">
            <Brain className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-xl font-bold">
              {patterns.length > 0 ? patterns[0].skill.split('_').slice(0, 2).join(' ') : '—'}
            </div>
            <div className="text-[10px] text-muted-foreground">#1 Weak Spot</div>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filterDomain} onValueChange={setFilterDomain}>
            <SelectTrigger className="w-40 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {domains.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="recent">Recent Mistakes</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            {loading ? (
              <div className="text-center py-10 text-muted-foreground text-sm">Loading...</div>
            ) : filteredMistakes.length === 0 ? (
              <div className="text-center py-10">
                <BookMarked className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No mistakes recorded yet!</p>
                <p className="text-muted-foreground text-xs">Start practicing to track your errors</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMistakes.slice(0, 50).map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <Card className="p-3">
                      <div className="flex items-start gap-3">
                        <span className="text-xl mt-0.5">{getDomainEmoji(m.domain)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-medium text-sm truncate">{m.skill.replace(/_/g, ' ')}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{m.domain}</span>
                            <span>⏱ {formatTime(m.time_taken_ms)}</span>
                            <span>{formatDate(m.created_at)}</span>
                          </div>
                          {m.miss_reason && (
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 italic">
                              "{m.miss_reason}"
                            </p>
                          )}
                        </div>
                        {m.review_count > 0 && (
                          <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded-full">
                            Reviewed ×{m.review_count}
                          </span>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="patterns">
            {filteredPatterns.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-sm">No patterns yet</div>
            ) : (
              <div className="space-y-2">
                {filteredPatterns.map((p, idx) => {
                  const severity = p.count >= 10 ? 'high' : p.count >= 5 ? 'medium' : 'low';
                  return (
                    <motion.div
                      key={`${p.domain}-${p.skill}`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className={`p-4 border-l-4 ${
                        severity === 'high' ? 'border-l-red-500'
                        : severity === 'medium' ? 'border-l-amber-500'
                        : 'border-l-blue-500'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{p.skill.replace(/_/g, ' ')}</p>
                          <span className={`text-xs font-bold ${
                            severity === 'high' ? 'text-red-500'
                            : severity === 'medium' ? 'text-amber-500'
                            : 'text-blue-500'
                          }`}>
                            {p.count} misses
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{getDomainEmoji(p.domain)} {p.domain}</span>
                          <span>Last missed: {formatDate(p.lastMissed)}</span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}

                <Link to="/study?mode=weakness" className="block mt-4">
                  <Button className="w-full">
                    <Brain className="w-4 h-4 mr-2" /> Practice Weak Areas
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <ReflectionsSection />
      </div>
      <BottomNav />
    </div>
  );
};

export default MistakeJournal;

function ReflectionsSection() {
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  useEffect(() => {
    setEntries(getReflectionEntries());
  }, []);
  if (entries.length === 0) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-bold">Your Reflections</h2>
        <span className="text-xs text-muted-foreground ml-auto">{entries.length} entries</span>
      </div>
      <div className="space-y-3">
        {entries.slice(0, 10).map((e) => (
          <Card key={e.id} className="p-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="uppercase tracking-wide">{e.subject}</span>
              <span>{new Date(e.createdAt).toLocaleDateString()}</span>
            </div>
            {e.context && <p className="text-[11px] text-muted-foreground italic">{e.context}</p>}
            <p className="text-xs text-muted-foreground">{e.prompt}</p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{e.response}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
