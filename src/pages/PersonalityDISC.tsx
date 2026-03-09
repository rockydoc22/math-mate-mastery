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

interface DISCQuestion { id: number; text: string; dim: "D" | "I" | "S" | "C"; }

const QUESTIONS: DISCQuestion[] = [
  {id:1,text:"I enjoy taking charge and leading others.",dim:"D"},
  {id:2,text:"I make decisions quickly and decisively.",dim:"D"},
  {id:3,text:"I am direct and straightforward in communication.",dim:"D"},
  {id:4,text:"I thrive on competition and winning.",dim:"D"},
  {id:5,text:"I challenge the status quo when I see inefficiency.",dim:"D"},
  {id:6,text:"I am comfortable with confrontation when necessary.",dim:"D"},
  {id:7,text:"I focus on bottom-line results over process.",dim:"D"},
  {id:8,text:"I enjoy persuading and influencing others.",dim:"I"},
  {id:9,text:"I am naturally optimistic and enthusiastic.",dim:"I"},
  {id:10,text:"I enjoy networking and meeting new people.",dim:"I"},
  {id:11,text:"I express my ideas with energy and emotion.",dim:"I"},
  {id:12,text:"I motivate others through encouragement.",dim:"I"},
  {id:13,text:"I prefer collaborative brainstorming over solo work.",dim:"I"},
  {id:14,text:"I enjoy being recognized for my contributions.",dim:"I"},
  {id:15,text:"I value stability and predictable environments.",dim:"S"},
  {id:16,text:"I am patient and a good listener.",dim:"S"},
  {id:17,text:"I prefer working at a steady, even pace.",dim:"S"},
  {id:18,text:"I am loyal and supportive of my team.",dim:"S"},
  {id:19,text:"I prefer harmony and avoid unnecessary conflict.",dim:"S"},
  {id:20,text:"I like helping others and being dependable.",dim:"S"},
  {id:21,text:"Change makes me uncomfortable unless well-explained.",dim:"S"},
  {id:22,text:"I pay close attention to accuracy and quality.",dim:"C"},
  {id:23,text:"I follow rules and procedures carefully.",dim:"C"},
  {id:24,text:"I analyze information thoroughly before deciding.",dim:"C"},
  {id:25,text:"I value precision and correctness in my work.",dim:"C"},
  {id:26,text:"I prefer working independently with clear standards.",dim:"C"},
  {id:27,text:"I ask many questions to understand fully.",dim:"C"},
  {id:28,text:"I set high standards for myself and others.",dim:"C"},
];

const LIKERT = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const PROFILES: Record<string, { icon: string; title: string; desc: string; strengths: string[]; growth: string[]; color: string }> = {
  D: { icon: "🔴", title: "Dominance", desc: "You are results-oriented, direct, and decisive. You thrive on challenges and taking charge.", strengths: ["Strong leadership", "Quick decision-making", "Results-focused", "Confident under pressure"], growth: ["Practice active listening", "Show patience with details", "Consider others' feelings", "Delegate with trust"], color: "text-red-500" },
  I: { icon: "🟡", title: "Influence", desc: "You are enthusiastic, optimistic, and collaborative. You excel at motivating and persuading others.", strengths: ["Inspirational communication", "Team building", "Creative problem-solving", "Positive energy"], growth: ["Follow through on commitments", "Focus on details and data", "Manage time carefully", "Be objective in decisions"], color: "text-yellow-500" },
  S: { icon: "🟢", title: "Steadiness", desc: "You are patient, reliable, and supportive. You value consistency and create harmonious environments.", strengths: ["Reliable and dependable", "Excellent listener", "Team-oriented", "Patient and calm"], growth: ["Speak up for your needs", "Embrace necessary change", "Set clear boundaries", "Express disagreement when needed"], color: "text-green-500" },
  C: { icon: "🔵", title: "Conscientiousness", desc: "You are analytical, detail-oriented, and systematic. You value accuracy and maintain high standards.", strengths: ["Thorough analysis", "Quality-focused", "Systematic approach", "Objective decision-making"], growth: ["Accept 'good enough' sometimes", "Be open to intuitive approaches", "Share your reasoning with others", "Take action before perfect information"], color: "text-blue-500" },
};

const PersonalityDISC = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const qpp = 7;
  const totalPages = Math.ceil(QUESTIONS.length / qpp);
  const pageQs = QUESTIONS.slice(currentPage * qpp, (currentPage + 1) * qpp);
  const answeredCount = Object.keys(answers).length;

  const calculateProfile = () => {
    const scores: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
    QUESTIONS.forEach(q => { scores[q.dim] += answers[q.id] || 3; });
    const total = scores.D + scores.I + scores.S + scores.C;
    const pcts = { D: Math.round((scores.D / total) * 100), I: Math.round((scores.I / total) * 100), S: Math.round((scores.S / total) * 100), C: Math.round((scores.C / total) * 100) };
    const primary = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as keyof typeof PROFILES;
    return { scores, pcts, primary };
  };

  const saveResults = async (profileData: { scores: Record<string, number>; pcts: Record<string, number>; primary: keyof typeof PROFILES }) => {
    if (!user) return false;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("personality_results")
        .insert({
          user_id: user.id,
          assessment_type: "disc",
          raw_scores: profileData.scores,
          result_type: profileData.primary,
          result_data: {
            percentages: profileData.pcts,
            profile: PROFILES[profileData.primary],
            answers: answers
          }
        });

      if (error) throw error;
      
      toast({ title: "Results saved successfully!" });
      return true;
    } catch (error) {
      console.error("Error saving DISC results:", error);
      toast({ 
        title: "Failed to save results", 
        description: "Your results are still displayed, but couldn't be saved to your profile.",
        variant: "destructive" 
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  if (completed) {
    const { pcts, primary } = calculateProfile();
    const info = PROFILES[primary];
    const sorted = Object.entries(pcts).sort((a, b) => b[1] - a[1]);
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link to="/iq-personality"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-xl font-bold">Your DISC Profile</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <Card className="p-4 border-amber-500/30 bg-amber-500/5">
            <p className="text-xs text-muted-foreground"><strong>⚠️ Non-Clinical:</strong> Educational self-assessment only. Not a diagnostic tool. If you have mental health concerns, please consult a licensed professional.</p>
          </Card>
          <Card className="p-6 text-center space-y-2">
            <span className="text-5xl">{info.icon}</span>
            <h2 className={`text-3xl font-black ${info.color}`}>{info.title}</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{info.desc}</p>
          </Card>
          <Card className="p-5 space-y-4">
            <h3 className="font-bold">Profile Breakdown</h3>
            {sorted.map(([dim, pct]) => (
              <div key={dim} className="space-y-1">
                <div className="flex justify-between text-xs"><span className="font-medium">{PROFILES[dim].icon} {PROFILES[dim].title}</span><span>{pct}%</span></div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </Card>
          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-green-600">💪 Strengths</h3>
            {info.strengths.map((s, i) => <p key={i} className="text-sm pl-4 border-l-2 border-green-500/30">{s}</p>)}
          </Card>
          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-amber-600">🌱 Growth Areas</h3>
            {info.growth.map((g, i) => <p key={i} className="text-sm pl-4 border-l-2 border-amber-500/30">{g}</p>)}
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
          <div className="flex-1"><h1 className="text-lg font-bold">DISC Profile Assessment</h1><p className="text-xs text-muted-foreground">{answeredCount}/{QUESTIONS.length}</p></div>
        </div>
        <Progress value={(answeredCount / QUESTIONS.length) * 100} className="mt-2 h-1.5" />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 border-amber-500/30 bg-amber-500/5"><p className="text-xs text-muted-foreground"><strong>⚠️</strong> Educational self-assessment only. Not a clinical instrument. If you have mental health concerns, please seek professional help.</p></Card>
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

export default PersonalityDISC;
