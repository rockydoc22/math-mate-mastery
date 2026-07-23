import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { DISCSliderQuestion } from "@/components/disc/DISCSliderQuestion";
import { DISCResultsView } from "@/components/disc/DISCResultsView";
import { DISCHistory } from "@/components/disc/DISCHistory";
import { pickQuick } from "@/utils/pickQuick";

interface DISCQuestion { id: number; text: string; dim: "D" | "I" | "S" | "C"; }

const ALL_QUESTIONS: DISCQuestion[] = [
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

const PersonalityDISC = () => {
  const { user } = useAuth();
  // Slider values: 0-100 for each question, default 50 (neutral)
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resultData, setResultData] = useState<{ pcts: Record<string, number>; primary: string } | null>(null);
  const [length, setLength] = useState<"quick" | "full">("quick");
  // Quick keeps five items per DISC dimension so scores remain balanced.
  const QUESTIONS = useMemo(
    () => (length === "quick" ? pickQuick(ALL_QUESTIONS, 20, "dim") : ALL_QUESTIONS),
    [length]
  );

  const qpp = 7;
  const totalPages = Math.ceil(QUESTIONS.length / qpp);
  const pageQs = QUESTIONS.slice(currentPage * qpp, (currentPage + 1) * qpp);
  const answeredCount = Object.keys(answers).length;

  const handleSliderChange = (id: number, value: number) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateProfile = () => {
    const scores: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
    QUESTIONS.forEach(q => {
      // Convert 0-100 slider to 1-5 scale for scoring
      const raw = answers[q.id] ?? 50;
      const scaled = 1 + (raw / 100) * 4; // 0→1, 50→3, 100→5
      scores[q.dim] += scaled;
    });
    const total = scores.D + scores.I + scores.S + scores.C;
    const pcts = {
      D: Math.round((scores.D / total) * 100),
      I: Math.round((scores.I / total) * 100),
      S: Math.round((scores.S / total) * 100),
      C: Math.round((scores.C / total) * 100),
    };
    const primary = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return { scores, pcts, primary };
  };

  const handleComplete = async () => {
    const profileData = calculateProfile();
    setResultData({ pcts: profileData.pcts, primary: profileData.primary });

    if (user) {
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
              answers: answers,
            },
          });
        if (error) throw error;
        toast({ title: "Results saved!" });
      } catch {
        toast({ title: "Results displayed but couldn't save", variant: "destructive" });
      } finally {
        setSaving(false);
      }
    }
    setCompleted(true);
  };

  if (completed && resultData) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link to="/iq-personality"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-xl font-bold text-foreground">Your DISC Profile</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <DISCResultsView
            pcts={resultData.pcts}
            primary={resultData.primary}
            onRetake={() => { setAnswers({}); setCurrentPage(0); setCompleted(false); setResultData(null); }}
          />
          <div className="mt-6">
            <DISCHistory />
          </div>
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
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">DISC Profile Assessment</h1>
            <p className="text-xs text-muted-foreground">{answeredCount}/{QUESTIONS.length}</p>
          </div>
        </div>
        <Progress value={(answeredCount / QUESTIONS.length) * 100} className="mt-2 h-1.5" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <Card className="p-4 border-amber-500/30 bg-amber-500/5">
          <p className="text-xs text-muted-foreground">
            <strong>⚠️</strong> Educational self-assessment only. Slide the bar to where you feel best represents you — anywhere along the line, not just the endpoints.
          </p>
        </Card>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-muted/60 border border-border">
          <button type="button" onClick={() => { setLength("quick"); setAnswers({}); setCurrentPage(0); }}
            className={`py-2 text-xs font-semibold rounded-md transition-colors ${length === "quick" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            Quick · 20 questions
          </button>
          <button type="button" onClick={() => { setLength("full"); setAnswers({}); setCurrentPage(0); }}
            className={`py-2 text-xs font-semibold rounded-md transition-colors ${length === "full" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            Full · {ALL_QUESTIONS.length} questions
          </button>
        </div>

        {pageQs.map(q => (
          <DISCSliderQuestion
            key={q.id}
            questionId={q.id}
            text={q.text}
            value={answers[q.id] ?? 50}
            onChange={handleSliderChange}
          />
        ))}

        <div className="flex gap-3">
          {currentPage > 0 && (
            <Button variant="outline" className="flex-1" onClick={() => setCurrentPage(p => p - 1)}>
              Previous
            </Button>
          )}
          {currentPage < totalPages - 1 ? (
            <Button className="flex-1" onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
          ) : (
            <Button
              className="flex-1"
              onClick={handleComplete}
              disabled={answeredCount < QUESTIONS.length * 0.5 || saving}
            >
              {saving ? "Saving..." : "See Results"}
            </Button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PersonalityDISC;
