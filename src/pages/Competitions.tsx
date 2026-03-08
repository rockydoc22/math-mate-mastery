import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Globe, MessageSquare } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const LANGUAGE_COMPETITIONS = [
  { id: 'french', name: 'French Competition', flag: '🇫🇷', description: 'CCFF-style grammar, culture, listening & elite phrases', route: '/french-competition', tools: ['/french-lightning', '/french-upgrade'] },
  { id: 'spanish', name: 'Spanish Competition', flag: '🇪🇸', description: 'Grammar, culture, vocabulary & conversation practice', route: '/competition/spanish', tools: [] },
  { id: 'german', name: 'German Competition', flag: '🇩🇪', description: 'Grammar, culture, vocabulary & reading comprehension', route: '/competition/german', tools: [] },
  { id: 'italian', name: 'Italian Competition', flag: '🇮🇹', description: 'Grammar, culture, vocabulary & literary analysis', route: '/competition/italian', tools: [] },
  { id: 'latin', name: 'Latin Competition', flag: '🏛️', description: 'Grammar, mythology, Roman culture & translation', route: '/competition/latin', tools: [] },
];

const DEBATE_FORMATS = [
  { id: 'ld', name: 'Lincoln-Douglas', abbr: 'LD', description: '1v1 value-based debate', icon: '⚖️' },
  { id: 'policy', name: 'Policy / CX', abbr: 'CX', description: '2v2 evidence-heavy debate', icon: '📋' },
  { id: 'pf', name: 'Public Forum', abbr: 'PF', description: '2v2 accessible current events debate', icon: '🗣️' },
];

const Competitions = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">🏆 Competitions</h1>
            <p className="text-sm text-muted-foreground">Language contests & debate practice</p>
          </div>
        </div>

        {/* Language Competitions */}
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-primary" /> Language Competitions
          </h2>
          <div className="space-y-3">
            {LANGUAGE_COMPETITIONS.map(lang => (
              <Link key={lang.id} to={lang.route}>
                <Card className="p-4 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold">{lang.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{lang.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Debate */}
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-primary" /> Debate Practice
          </h2>
          <Link to="/debate">
            <Card className="p-5 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎤</span>
                <div>
                  <h3 className="font-bold text-lg">Debate Competition Prep</h3>
                  <p className="text-xs text-muted-foreground">Practice all three major formats</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {DEBATE_FORMATS.map(fmt => (
                  <span key={fmt.id} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs font-medium">
                    {fmt.icon} {fmt.abbr}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Competitions;
