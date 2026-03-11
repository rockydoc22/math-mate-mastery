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

interface EQuestion { id: number; text: string; type: number; }

const QUESTIONS: EQuestion[] = [
  {id:1,text:"I strive to do everything correctly and ethically.",type:1},
  {id:2,text:"I have a strong inner critic that pushes me to improve.",type:1},
  {id:3,text:"I get frustrated when others don't follow the rules.",type:1},
  {id:4,text:"I notice errors and imperfections easily.",type:1},
  {id:5,text:"I naturally focus on helping and supporting others.",type:2},
  {id:6,text:"I often put others' needs before my own.",type:2},
  {id:7,text:"I feel good about myself when I'm needed by others.",type:2},
  {id:8,text:"I find it hard to ask for help even when I need it.",type:2},
  {id:9,text:"I am highly motivated by achievement and success.",type:3},
  {id:10,text:"I adapt my presentation to impress different audiences.",type:3},
  {id:11,text:"I set ambitious goals and work hard to reach them.",type:3},
  {id:12,text:"I am concerned about my image and how others perceive me.",type:3},
  {id:13,text:"I feel things more deeply than most people seem to.",type:4},
  {id:14,text:"I am drawn to beauty, art, and authentic self-expression.",type:4},
  {id:15,text:"I sometimes feel fundamentally different from others.",type:4},
  {id:16,text:"I long for what is missing rather than appreciating what I have.",type:4},
  {id:17,text:"I need a lot of time alone to think and recharge.",type:5},
  {id:18,text:"I prefer to observe and understand before participating.",type:5},
  {id:19,text:"I value knowledge and competence above most things.",type:5},
  {id:20,text:"I minimize my needs and can live with very little.",type:5},
  {id:21,text:"I often anticipate worst-case scenarios.",type:6},
  {id:22,text:"I value loyalty and commitment in relationships.",type:6},
  {id:23,text:"I question authority but also seek guidance from trusted sources.",type:6},
  {id:24,text:"I need to feel safe and secure before I can relax.",type:6},
  {id:25,text:"I love variety, adventure, and new experiences.",type:7},
  {id:26,text:"I quickly get bored and look for the next exciting thing.",type:7},
  {id:27,text:"I am optimistic and see the positive in most situations.",type:7},
  {id:28,text:"I avoid pain and discomfort, preferring to stay upbeat.",type:7},
  {id:29,text:"I am assertive and take control of situations naturally.",type:8},
  {id:30,text:"I protect the vulnerable and stand up against injustice.",type:8},
  {id:31,text:"I value strength and dislike showing vulnerability.",type:8},
  {id:32,text:"I am direct and sometimes intimidating to others.",type:8},
  {id:33,text:"I go along with others to keep the peace.",type:9},
  {id:34,text:"I see multiple perspectives and find it hard to take sides.",type:9},
  {id:35,text:"I tend to procrastinate and go with the flow.",type:9},
  {id:36,text:"I avoid conflict and want everyone to get along.",type:9},
];

const LIKERT = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const TYPE_INFO: Record<number, { name: string; icon: string; title: string; desc: string; fear: string; desire: string; strengths: string[]; growth: string[] }> = {
  1: { name: "Type 1", icon: "⚖️", title: "The Reformer", desc: "Principled, purposeful, self-controlled, and perfectionistic.", fear: "Being corrupt or defective", desire: "To be good, ethical, and balanced", strengths: ["Integrity and fairness","Strong moral compass","Detail-oriented excellence","Responsible and reliable"], growth: ["Embrace imperfection","Practice self-compassion","Allow room for spontaneity","Accept that 'good enough' is okay"] },
  2: { name: "Type 2", icon: "❤️", title: "The Helper", desc: "Generous, demonstrative, people-pleasing, and possessive.", fear: "Being unloved or unwanted", desire: "To feel loved and needed", strengths: ["Empathetic and caring","Generous spirit","Strong emotional intelligence","Relationship building"], growth: ["Attend to your own needs","Learn to say no","Accept love without giving first","Recognize your own worth independently"] },
  3: { name: "Type 3", icon: "⭐", title: "The Achiever", desc: "Adaptable, excelling, driven, and image-conscious.", fear: "Being worthless or without value", desire: "To feel valuable and worthwhile", strengths: ["Goal-oriented drive","Adaptable and efficient","Inspirational energy","Competent execution"], growth: ["Value being over doing","Be authentic, not just impressive","Slow down and reflect","Connect with your feelings"] },
  4: { name: "Type 4", icon: "🎨", title: "The Individualist", desc: "Expressive, dramatic, self-absorbed, and temperamental.", fear: "Having no identity or significance", desire: "To find themselves and their significance", strengths: ["Deep emotional awareness","Creative expression","Authenticity","Compassion for suffering"], growth: ["Practice gratitude for what you have","Don't over-identify with feelings","Take action despite mood","Recognize your commonality with others"] },
  5: { name: "Type 5", icon: "🔬", title: "The Investigator", desc: "Perceptive, innovative, secretive, and isolated.", fear: "Being useless, helpless, or incapable", desire: "To be capable and competent", strengths: ["Deep analytical thinking","Independence","Objective observation","Knowledge accumulation"], growth: ["Engage more with the physical world","Share knowledge and feelings","Participate before fully understanding","Trust your own competence"] },
  6: { name: "Type 6", icon: "🛡️", title: "The Loyalist", desc: "Engaging, responsible, anxious, and suspicious.", fear: "Being without support and guidance", desire: "To have security and support", strengths: ["Loyal and committed","Excellent troubleshooter","Responsible and hardworking","Courageous when tested"], growth: ["Trust your own judgment","Don't project fears onto situations","Take action despite uncertainty","Practice present-moment awareness"] },
  7: { name: "Type 7", icon: "🎉", title: "The Enthusiast", desc: "Spontaneous, versatile, acquisitive, and scattered.", fear: "Being deprived or in pain", desire: "To be satisfied and content", strengths: ["Optimistic energy","Quick thinking","Versatile and adventurous","Joy-generating presence"], growth: ["Stay with difficult emotions","Complete projects before starting new ones","Practice moderation","Find depth in commitment"] },
  8: { name: "Type 8", icon: "💪", title: "The Challenger", desc: "Self-confident, decisive, willful, and confrontational.", fear: "Being harmed or controlled by others", desire: "To protect themselves and control their own destiny", strengths: ["Strong leadership","Protective of others","Direct honesty","Decisive action"], growth: ["Show vulnerability to trusted people","Listen before reacting","Practice gentleness","Consider others' perspectives"] },
  9: { name: "Type 9", icon: "☮️", title: "The Peacemaker", desc: "Receptive, reassuring, complacent, and resigned.", fear: "Loss and separation", desire: "To have inner stability and peace of mind", strengths: ["Seeing all perspectives","Calming presence","Inclusive and accepting","Patient mediator"], growth: ["Assert your own position","Engage with conflict when needed","Prioritize your own goals","Stay awake to your own desires"] },
};

const PersonalityEnneagram = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const qpp = 9;
  const totalPages = Math.ceil(QUESTIONS.length / qpp);
  const pageQs = QUESTIONS.slice(currentPage * qpp, (currentPage + 1) * qpp);
  const answeredCount = Object.keys(answers).length;

  const calculate = () => {
    const scores: Record<number, number> = {};
    for (let i = 1; i <= 9; i++) scores[i] = 0;
    QUESTIONS.forEach(q => { scores[q.type] += answers[q.id] || 3; });
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([t, s]) => ({ type: Number(t), score: s }));
    const max = sorted[0].score;
    const pcts: Record<number, number> = {};
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    for (const [t, s] of Object.entries(scores)) pcts[Number(t)] = Math.round((s / total) * 100);
    return { primary: sorted[0].type, wing: sorted[1].type, pcts, sorted };
  };

  if (completed) {
    const { primary, wing, sorted } = calculate();
    const info = TYPE_INFO[primary];
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link to="/iq-personality"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-xl font-bold">Your Enneagram Results</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <Card className="p-4 border-amber-500/30 bg-amber-500/5"><p className="text-xs text-muted-foreground"><strong>⚠️</strong> Educational self-assessment only. Not a clinical or diagnostic instrument. If you have concerns about your mental health, please consult a licensed professional.</p></Card>
          <Card className="p-6 text-center space-y-2">
            <span className="text-5xl">{info.icon}</span>
            <h2 className="text-3xl font-black text-primary">{info.name}</h2>
            <p className="text-xl font-bold">{info.title}</p>
            <p className="text-sm text-muted-foreground">{info.desc}</p>
            {wing !== primary && <p className="text-xs text-muted-foreground">Wing: Type {wing} ({TYPE_INFO[wing].title})</p>}
          </Card>
          <Card className="p-5 space-y-4">
            <h3 className="font-bold">All Types</h3>
            {sorted.map(({ type, score }) => (
              <div key={type} className="space-y-1">
                <div className="flex justify-between text-xs"><span>{TYPE_INFO[type].icon} Type {type}: {TYPE_INFO[type].title}</span><span>{score}</span></div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${type === primary ? 'bg-primary' : 'bg-muted-foreground/30'}`} style={{ width: `${(score / sorted[0].score) * 100}%` }} />
                </div>
              </div>
            ))}
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4 space-y-2"><h4 className="text-sm font-bold text-red-400">😨 Core Fear</h4><p className="text-sm text-muted-foreground">{info.fear}</p></Card>
            <Card className="p-4 space-y-2"><h4 className="text-sm font-bold text-green-400">💚 Core Desire</h4><p className="text-sm text-muted-foreground">{info.desire}</p></Card>
          </div>
          <Card className="p-5 space-y-3"><h3 className="font-bold text-green-600">💪 Strengths</h3>{info.strengths.map((s, i) => <p key={i} className="text-sm pl-4 border-l-2 border-green-500/30">{s}</p>)}</Card>
          <Card className="p-5 space-y-3"><h3 className="font-bold text-amber-600">🌱 Growth</h3>{info.growth.map((g, i) => <p key={i} className="text-sm pl-4 border-l-2 border-amber-500/30">{g}</p>)}</Card>
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
          <div className="flex-1"><h1 className="text-lg font-bold">Enneagram Assessment</h1><p className="text-xs text-muted-foreground">{answeredCount}/{QUESTIONS.length}</p></div>
        </div>
        <Progress value={(answeredCount / QUESTIONS.length) * 100} className="mt-2 h-1.5" />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 border-amber-500/30 bg-amber-500/5"><p className="text-xs text-muted-foreground"><strong>⚠️</strong> Educational self-assessment only. Not a diagnostic tool. If concerned about your mental health, please seek professional help.</p></Card>
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
          {currentPage < totalPages - 1 ? (
            <Button className="flex-1" onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
          ) : (
            <Button className="flex-1" disabled={answeredCount < QUESTIONS.length * 0.8 || saving} onClick={async () => {
              const result = calculate();
              if (user) {
                setSaving(true);
                try {
                  await supabase.from("personality_results").insert({
                    user_id: user.id,
                    assessment_type: "enneagram",
                    raw_scores: Object.fromEntries(result.sorted.map(s => [s.type, s.score])),
                    result_type: `Type ${result.primary} - ${TYPE_INFO[result.primary].title}`,
                    result_data: { percentages: result.pcts, wing: result.wing, answers },
                  });
                  toast({ title: "Results saved!" });
                } catch { toast({ title: "Failed to save", variant: "destructive" }); }
                setSaving(false);
              }
              setCompleted(true);
            }}>
              {saving ? "Saving..." : "See Results"}
            </Button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PersonalityEnneagram;
