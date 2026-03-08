import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Globe, MessageSquare, Search } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { STEM_COMPETITION_CATEGORIES } from "@/data/stem_competitions";
import { Input } from "@/components/ui/input";

const LANGUAGE_COMPETITIONS = [
  { id: 'french', name: 'French Competition', flag: '🇫🇷', description: 'CCFF-style grammar, culture, listening & elite phrases', route: '/french-competition' },
  { id: 'spanish', name: 'Spanish Competition', flag: '🇪🇸', description: 'Grammar, culture, vocabulary & conversation practice', route: '/competition/spanish' },
  { id: 'german', name: 'German Competition', flag: '🇩🇪', description: 'Grammar, culture, vocabulary & reading comprehension', route: '/competition/german' },
  { id: 'italian', name: 'Italian Competition', flag: '🇮🇹', description: 'Grammar, culture, vocabulary & literary analysis', route: '/competition/italian' },
  { id: 'latin', name: 'Latin Competition', flag: '🏛️', description: 'Grammar, mythology, Roman culture & translation', route: '/competition/latin' },
];

const DEBATE_FORMATS = [
  { id: 'ld', name: 'Lincoln-Douglas', abbr: 'LD', description: '1v1 value-based debate', icon: '⚖️' },
  { id: 'policy', name: 'Policy / CX', abbr: 'CX', description: '2v2 evidence-heavy debate', icon: '📋' },
  { id: 'pf', name: 'Public Forum', abbr: 'PF', description: '2v2 accessible current events debate', icon: '🗣️' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Intermediate: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  Advanced: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  Elite: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

const Competitions = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const lowerSearch = search.toLowerCase();

  const filteredCategories = STEM_COMPETITION_CATEGORIES.map(cat => ({
    ...cat,
    competitions: cat.competitions.filter(c =>
      !search || c.name.toLowerCase().includes(lowerSearch) || c.abbr.toLowerCase().includes(lowerSearch) || c.description.toLowerCase().includes(lowerSearch)
    )
  })).filter(cat => cat.competitions.length > 0);

  const filteredLang = LANGUAGE_COMPETITIONS.filter(l =>
    !search || l.name.toLowerCase().includes(lowerSearch) || l.description.toLowerCase().includes(lowerSearch)
  );

  const showDebate = !search || 'debate'.includes(lowerSearch) || DEBATE_FORMATS.some(f => f.name.toLowerCase().includes(lowerSearch));

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">🏆 Competitions</h1>
            <p className="text-xs text-muted-foreground">Academic contests & olympiad prep</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search competitions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* STEM Competition Categories */}
        {filteredCategories.map(cat => (
          <div key={cat.id}>
            <h2 className="text-base font-bold flex items-center gap-2 mb-3">
              <span className="text-lg">{cat.icon}</span> {cat.name}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                {cat.competitions.length}
              </span>
            </h2>
            <div className="space-y-2">
              {cat.competitions.map(comp => (
                <Card
                  key={comp.id}
                  className="p-3 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer"
                  onClick={() => navigate(`/competition-hub/${comp.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">{comp.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm">{comp.name}</h3>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${DIFFICULTY_COLORS[comp.difficulty]}`}>
                          {comp.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{comp.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground">{comp.teamSize}</span>
                        <span className="text-[10px] text-primary font-medium">{comp.sampleQuestions.length} practice Q</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Language Competitions */}
        {filteredLang.length > 0 && (
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-primary" /> Language Competitions
            </h2>
            <div className="space-y-2">
              {filteredLang.map(lang => (
                <Link key={lang.id} to={lang.route}>
                  <Card className="p-3 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm">{lang.name}</h3>
                        <p className="text-[11px] text-muted-foreground truncate">{lang.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Debate */}
        {showDebate && (
          <div>
            <h2 className="text-base font-bold flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-primary" /> Debate Practice
            </h2>
            <Link to="/debate">
              <Card className="p-4 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎤</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">Debate Competition Prep</h3>
                    <p className="text-[11px] text-muted-foreground">Practice all three major formats</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {DEBATE_FORMATS.map(fmt => (
                    <span key={fmt.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium">
                      {fmt.icon} {fmt.abbr}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Competitions;
