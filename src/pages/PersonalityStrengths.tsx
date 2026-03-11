import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface SQuestion { id: number; text: string; theme: string; }

const THEMES_INFO: Record<string, { icon: string; domain: string; desc: string }> = {
  Achiever: { icon: "🏆", domain: "Executing", desc: "You have a constant drive for accomplishment and a great deal of stamina for hard work." },
  Activator: { icon: "🚀", domain: "Influencing", desc: "You turn thoughts into action and make things happen with urgency." },
  Analytical: { icon: "🔍", domain: "Strategic Thinking", desc: "You search for reasons and causes, and think about factors that affect a situation." },
  Arranger: { icon: "🧩", domain: "Executing", desc: "You organize and figure out the best way to get things done with available resources." },
  Communication: { icon: "🎤", domain: "Influencing", desc: "You find it easy to put thoughts into words and are a good conversationalist." },
  Competition: { icon: "🥇", domain: "Influencing", desc: "You measure your progress against others and strive to win." },
  Connectedness: { icon: "🌍", domain: "Relationship Building", desc: "You believe things happen for a reason and see links between all people and events." },
  Deliberative: { icon: "🛡️", domain: "Executing", desc: "You are careful, vigilant, and identify risks to make sound decisions." },
  Developer: { icon: "🌱", domain: "Relationship Building", desc: "You see potential in others and enjoy helping them grow and improve." },
  Empathy: { icon: "💞", domain: "Relationship Building", desc: "You sense others' feelings and can see the world through their eyes." },
  Focus: { icon: "🎯", domain: "Executing", desc: "You set goals and follow through, staying on track and prioritizing effectively." },
  Futuristic: { icon: "🔮", domain: "Strategic Thinking", desc: "You are inspired by the future and what could be, energizing others with your vision." },
  Harmony: { icon: "☮️", domain: "Relationship Building", desc: "You look for consensus and work to minimize conflict in groups." },
  Ideation: { icon: "💡", domain: "Strategic Thinking", desc: "You are fascinated by ideas and find connections between seemingly disparate phenomena." },
  Includer: { icon: "🤝", domain: "Relationship Building", desc: "You accept others and make everyone feel like they belong." },
  Individualization: { icon: "🎭", domain: "Relationship Building", desc: "You notice what makes each person unique and build on their distinct qualities." },
  Input: { icon: "📚", domain: "Strategic Thinking", desc: "You are curious, collect information, and archive things that interest you." },
  Intellection: { icon: "🧠", domain: "Strategic Thinking", desc: "You enjoy thinking, intellectual activity, and introspective reflection." },
  Learner: { icon: "📖", domain: "Strategic Thinking", desc: "You have a great desire to learn and continuously improve." },
  Maximizer: { icon: "💎", domain: "Influencing", desc: "You focus on strengths to stimulate excellence, transforming good into great." },
  Positivity: { icon: "☀️", domain: "Relationship Building", desc: "You have contagious enthusiasm and can get people excited about what they're doing." },
  Relator: { icon: "🤗", domain: "Relationship Building", desc: "You derive great pleasure from close relationships and deep connections." },
  Responsibility: { icon: "✅", domain: "Executing", desc: "You take ownership of commitments and follow through reliably." },
  Restorative: { icon: "🔧", domain: "Executing", desc: "You enjoy solving problems and figuring out what's wrong." },
  Strategic: { icon: "♟️", domain: "Strategic Thinking", desc: "You see patterns and can quickly spot relevant issues amid complexity." },
  Woo: { icon: "🌟", domain: "Influencing", desc: "You win others over with your charm, enjoy meeting new people, and break the ice." },
};

const QUESTIONS: SQuestion[] = [
  {id:1,text:"I have a strong internal drive to accomplish things every day.",theme:"Achiever"},
  {id:2,text:"I prefer to act immediately rather than deliberate for too long.",theme:"Activator"},
  {id:3,text:"I always want to understand why something happened before moving on.",theme:"Analytical"},
  {id:4,text:"I enjoy organizing people and resources for maximum efficiency.",theme:"Arranger"},
  {id:5,text:"I can easily explain complex ideas in simple, engaging language.",theme:"Communication"},
  {id:6,text:"I naturally compare my performance to others.",theme:"Competition"},
  {id:7,text:"I believe there are no coincidences — everything is connected.",theme:"Connectedness"},
  {id:8,text:"I think carefully about potential risks before making decisions.",theme:"Deliberative"},
  {id:9,text:"I find great satisfaction in watching someone grow and improve.",theme:"Developer"},
  {id:10,text:"I can easily sense what other people are feeling.",theme:"Empathy"},
  {id:11,text:"I set clear goals and stay focused on achieving them.",theme:"Focus"},
  {id:12,text:"I am inspired by visions of what the future could look like.",theme:"Futuristic"},
  {id:13,text:"I seek areas of agreement and try to steer away from confrontation.",theme:"Harmony"},
  {id:14,text:"I am delighted when I discover new concepts or unexpected connections.",theme:"Ideation"},
  {id:15,text:"I naturally include people who feel left out.",theme:"Includer"},
  {id:16,text:"I notice the unique qualities and talents of each person.",theme:"Individualization"},
  {id:17,text:"I love collecting facts, books, articles, and interesting things.",theme:"Input"},
  {id:18,text:"I enjoy time alone to think deeply and reflect.",theme:"Intellection"},
  {id:19,text:"The process of learning excites me as much as the outcome.",theme:"Learner"},
  {id:20,text:"I prefer to build on existing strengths rather than fix weaknesses.",theme:"Maximizer"},
  {id:21,text:"I naturally see the bright side and uplift those around me.",theme:"Positivity"},
  {id:22,text:"I have a few very close friendships rather than many acquaintances.",theme:"Relator"},
  {id:23,text:"When I commit to something, I follow through no matter what.",theme:"Responsibility"},
  {id:24,text:"I enjoy diagnosing problems and finding solutions.",theme:"Restorative"},
  {id:25,text:"I can quickly see patterns and find the best path forward.",theme:"Strategic"},
  {id:26,text:"I love meeting new people and winning them over.",theme:"Woo"},
  {id:27,text:"I feel unsettled if a day passes without something to show for it.",theme:"Achiever"},
  {id:28,text:"I get impatient with excessive planning — let's just start.",theme:"Activator"},
  {id:29,text:"I need proof and data before I accept a claim.",theme:"Analytical"},
  {id:30,text:"I can juggle many moving pieces and keep them all aligned.",theme:"Arranger"},
  {id:31,text:"I enjoy presenting ideas and telling compelling stories.",theme:"Communication"},
  {id:32,text:"Winning matters to me and motivates me to push harder.",theme:"Competition"},
  {id:33,text:"I believe every person has a role to play in the bigger picture.",theme:"Connectedness"},
  {id:34,text:"I anticipate obstacles and prepare contingency plans.",theme:"Deliberative"},
];

const LIKERT = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const PersonalityStrengths = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const qpp = 8;
  const totalPages = Math.ceil(QUESTIONS.length / qpp);
  const pageQs = QUESTIONS.slice(currentPage * qpp, (currentPage + 1) * qpp);
  const answeredCount = Object.keys(answers).length;

  const calculate = () => {
    const scores: Record<string, number> = {};
    QUESTIONS.forEach(q => {
      if (!scores[q.theme]) scores[q.theme] = 0;
      scores[q.theme] += answers[q.id] || 3;
    });
    return Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([theme, score]) => ({ theme, score }));
  };

  if (completed) {
    const sorted = calculate();
    const top5 = sorted.slice(0, 5);
    const domains: Record<string, number> = {};
    top5.forEach(({ theme }) => {
      const d = THEMES_INFO[theme]?.domain || "Other";
      domains[d] = (domains[d] || 0) + 1;
    });

    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link to="/iq-personality"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-xl font-bold">Your Top Strengths</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <Card className="p-4 border-amber-500/30 bg-amber-500/5"><p className="text-xs text-muted-foreground"><strong>⚠️</strong> Educational self-assessment inspired by strengths-based frameworks. Not affiliated with Gallup®. Not a clinical instrument. If you have mental health concerns, please consult a licensed professional.</p></Card>
          <Card className="p-5 space-y-1 text-center">
            <h2 className="text-xl font-bold">Your Top 5 Talent Themes</h2>
            <p className="text-xs text-muted-foreground">These are the areas where you naturally excel</p>
          </Card>
          {top5.map(({ theme }, i) => {
            const info = THEMES_INFO[theme];
            return (
              <Card key={theme} className="p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{info?.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">#{i + 1}</span>
                      <h3 className="font-bold">{theme}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{info?.domain}</p>
                  </div>
                </div>
                <p className="text-sm">{info?.desc}</p>
              </Card>
            );
          })}
          <Card className="p-5 space-y-3">
            <h3 className="font-bold">Domain Balance</h3>
            {Object.entries(domains).sort((a, b) => b[1] - a[1]).map(([domain, count]) => (
              <div key={domain} className="flex justify-between items-center">
                <span className="text-sm">{domain}</span>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{count} theme{count > 1 ? 's' : ''}</span>
              </div>
            ))}
          </Card>
          <Card className="p-5 space-y-3">
            <h3 className="font-bold">All Themes Ranked</h3>
            {sorted.map(({ theme, score }, i) => (
              <div key={theme} className="flex items-center gap-2 text-xs">
                <span className="w-5 text-right text-muted-foreground">{i + 1}.</span>
                <span>{THEMES_INFO[theme]?.icon}</span>
                <span className="flex-1">{theme}</span>
                <div className="w-20 h-1.5 bg-muted rounded-full"><div className={`h-full rounded-full ${i < 5 ? 'bg-primary' : 'bg-muted-foreground/30'}`} style={{ width: `${(score / sorted[0].score) * 100}%` }} /></div>
              </div>
            ))}
          </Card>
          <Button onClick={() => { setAnswers({}); setCurrentPage(0); setCompleted(false); }} className="w-full">Retake</Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/iq-personality"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex-1"><h1 className="text-lg font-bold">CliftonStrengths-Style</h1><p className="text-xs text-muted-foreground">{answeredCount}/{QUESTIONS.length}</p></div>
        </div>
        <Progress value={(answeredCount / QUESTIONS.length) * 100} className="mt-2 h-1.5" />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 border-amber-500/30 bg-amber-500/5"><p className="text-xs text-muted-foreground"><strong>⚠️</strong> Educational assessment inspired by strengths-based frameworks. Not a diagnostic tool. If you have mental health concerns, please seek professional help.</p></Card>
        {pageQs.map(q => (
          <Card key={q.id} className="p-4 space-y-3">
            <p className="text-sm font-medium">{q.id}. {q.text}</p>
            <div className="flex gap-1.5 flex-wrap">
              {LIKERT.map(l => (
                <Button key={l.value} size="sm" variant={answers[q.id] === l.value ? "default" : "outline"} className="text-xs flex-1 min-w-[60px]" onClick={() => setAnswers(p => ({ ...p, [q.id]: l.value }))}>
                  {l.label}
                </Button>
              ))}
            </div>
          </Card>
        ))}
        <div className="flex gap-3">
          {currentPage > 0 && <Button variant="outline" className="flex-1" onClick={() => setCurrentPage(p => p - 1)}>Previous</Button>}
          {currentPage < totalPages - 1 ? <Button className="flex-1" onClick={() => setCurrentPage(p => p + 1)}>Next</Button> : <Button className="flex-1" onClick={() => setCompleted(true)} disabled={answeredCount < QUESTIONS.length * 0.8}>See Results</Button>}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PersonalityStrengths;
