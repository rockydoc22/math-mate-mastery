import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";

interface MBTIQuestion { id: number; text: string; dimA: string; dimB: string; }

const QUESTIONS: MBTIQuestion[] = [
  // E vs I (1-18)
  {id:1,text:"At a party, I interact with many people including strangers.",dimA:"E",dimB:"I"},
  {id:2,text:"I prefer one-on-one conversations to group activities.",dimA:"I",dimB:"E"},
  {id:3,text:"Being around lots of people energizes me.",dimA:"E",dimB:"I"},
  {id:4,text:"I need time alone to recharge after socializing.",dimA:"I",dimB:"E"},
  {id:5,text:"I tend to think out loud and process ideas by talking.",dimA:"E",dimB:"I"},
  {id:6,text:"I usually reflect internally before sharing my thoughts.",dimA:"I",dimB:"E"},
  {id:7,text:"I enjoy meeting new people and making friends easily.",dimA:"E",dimB:"I"},
  {id:8,text:"I have a small circle of close friends I prefer.",dimA:"I",dimB:"E"},
  {id:9,text:"I get restless if I spend too much time alone.",dimA:"E",dimB:"I"},
  {id:10,text:"I enjoy spending extended periods in quiet solitude.",dimA:"I",dimB:"E"},
  {id:11,text:"I am usually the one to start conversations.",dimA:"E",dimB:"I"},
  {id:12,text:"I wait for others to approach me first.",dimA:"I",dimB:"E"},
  {id:13,text:"Working in a team motivates me more than working alone.",dimA:"E",dimB:"I"},
  {id:14,text:"I do my best work when I can focus independently.",dimA:"I",dimB:"E"},
  {id:15,text:"I feel comfortable being the center of attention.",dimA:"E",dimB:"I"},
  {id:16,text:"I prefer to stay in the background and observe.",dimA:"I",dimB:"E"},
  {id:17,text:"I express my emotions openly and easily.",dimA:"E",dimB:"I"},
  {id:18,text:"I keep my feelings private and share selectively.",dimA:"I",dimB:"E"},
  // S vs N (19-36)
  {id:19,text:"I pay close attention to facts and details.",dimA:"S",dimB:"N"},
  {id:20,text:"I focus more on the big picture and future possibilities.",dimA:"N",dimB:"S"},
  {id:21,text:"I prefer practical, hands-on learning experiences.",dimA:"S",dimB:"N"},
  {id:22,text:"I enjoy exploring theories and abstract concepts.",dimA:"N",dimB:"S"},
  {id:23,text:"I trust information I can verify with my five senses.",dimA:"S",dimB:"N"},
  {id:24,text:"I trust my gut feelings and hunches about things.",dimA:"N",dimB:"S"},
  {id:25,text:"I like following step-by-step instructions.",dimA:"S",dimB:"N"},
  {id:26,text:"I prefer figuring things out my own creative way.",dimA:"N",dimB:"S"},
  {id:27,text:"I focus on what is real and actual right now.",dimA:"S",dimB:"N"},
  {id:28,text:"I often imagine what could be or what might happen.",dimA:"N",dimB:"S"},
  {id:29,text:"I describe things literally and precisely.",dimA:"S",dimB:"N"},
  {id:30,text:"I use metaphors and analogies to explain ideas.",dimA:"N",dimB:"S"},
  {id:31,text:"I value experience over speculation.",dimA:"S",dimB:"N"},
  {id:32,text:"I find brainstorming and innovation exciting.",dimA:"N",dimB:"S"},
  {id:33,text:"I prefer routines and established methods.",dimA:"S",dimB:"N"},
  {id:34,text:"I get bored with routine and seek variety.",dimA:"N",dimB:"S"},
  {id:35,text:"I am a realistic, down-to-earth person.",dimA:"S",dimB:"N"},
  {id:36,text:"People describe me as imaginative or inventive.",dimA:"N",dimB:"S"},
  // T vs F (37-54)
  {id:37,text:"I make decisions based on logic and objective analysis.",dimA:"T",dimB:"F"},
  {id:38,text:"I consider how decisions will affect people's feelings.",dimA:"F",dimB:"T"},
  {id:39,text:"I value truth and fairness above tact.",dimA:"T",dimB:"F"},
  {id:40,text:"I value harmony and try to avoid hurting others.",dimA:"F",dimB:"T"},
  {id:41,text:"I can easily spot flaws in reasoning or arguments.",dimA:"T",dimB:"F"},
  {id:42,text:"I naturally tune into others' emotional needs.",dimA:"F",dimB:"T"},
  {id:43,text:"I think it's more important to be right than to be liked.",dimA:"T",dimB:"F"},
  {id:44,text:"Being liked and accepted matters a lot to me.",dimA:"F",dimB:"T"},
  {id:45,text:"I handle criticism without taking it personally.",dimA:"T",dimB:"F"},
  {id:46,text:"Criticism can deeply hurt my feelings.",dimA:"F",dimB:"T"},
  {id:47,text:"I analyze problems objectively, even emotional ones.",dimA:"T",dimB:"F"},
  {id:48,text:"I lead with empathy when someone shares a problem.",dimA:"F",dimB:"T"},
  {id:49,text:"Rules should apply equally to everyone, no exceptions.",dimA:"T",dimB:"F"},
  {id:50,text:"I believe exceptions should be made for special circumstances.",dimA:"F",dimB:"T"},
  {id:51,text:"I respect people most for their competence.",dimA:"T",dimB:"F"},
  {id:52,text:"I respect people most for their kindness.",dimA:"F",dimB:"T"},
  {id:53,text:"Debating ideas energizes me intellectually.",dimA:"T",dimB:"F"},
  {id:54,text:"Arguments and conflict drain my energy.",dimA:"F",dimB:"T"},
  // J vs P (55-70)
  {id:55,text:"I prefer having a plan and sticking to it.",dimA:"J",dimB:"P"},
  {id:56,text:"I like keeping my options open and staying flexible.",dimA:"P",dimB:"J"},
  {id:57,text:"I feel satisfied when I complete tasks early.",dimA:"J",dimB:"P"},
  {id:58,text:"I work best under last-minute pressure.",dimA:"P",dimB:"J"},
  {id:59,text:"I like organizing my environment and keeping things tidy.",dimA:"J",dimB:"P"},
  {id:60,text:"I don't mind a bit of mess if it means more freedom.",dimA:"P",dimB:"J"},
  {id:61,text:"I make lists and follow schedules consistently.",dimA:"J",dimB:"P"},
  {id:62,text:"I go with the flow and adapt as situations change.",dimA:"P",dimB:"J"},
  {id:63,text:"I prefer finishing one project before starting another.",dimA:"J",dimB:"P"},
  {id:64,text:"I often juggle multiple projects simultaneously.",dimA:"P",dimB:"J"},
  {id:65,text:"I like clear expectations and defined deadlines.",dimA:"J",dimB:"P"},
  {id:66,text:"I find too many rules and deadlines stifling.",dimA:"P",dimB:"J"},
  {id:67,text:"I feel uneasy when plans change unexpectedly.",dimA:"J",dimB:"P"},
  {id:68,text:"I welcome spontaneous changes and surprises.",dimA:"P",dimB:"J"},
  {id:69,text:"I usually decide quickly and move on.",dimA:"J",dimB:"P"},
  {id:70,text:"I prefer to gather more information before deciding.",dimA:"P",dimB:"J"},
];

const LIKERT = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const TYPE_DESCRIPTIONS: Record<string, { title: string; description: string; strengths: string[]; growth: string[] }> = {
  INTJ: { title: "The Architect", description: "Strategic, independent thinkers who value competence and knowledge. You approach life with a plan and enjoy mastering complex systems.", strengths: ["Strategic planning","Independent problem-solving","Deep analytical thinking"], growth: ["Practice patience with others' pace","Express appreciation more often","Stay open to spontaneous opportunities"] },
  INTP: { title: "The Logician", description: "Inventive, curious analysts who love exploring ideas and theories. You seek to understand the underlying principles of everything.", strengths: ["Innovative thinking","Logical analysis","Intellectual curiosity"], growth: ["Follow through on projects to completion","Share your insights more openly","Pay attention to practical details"] },
  ENTJ: { title: "The Commander", description: "Bold, decisive leaders who enjoy organizing people and resources. You see the big picture and drive toward ambitious goals.", strengths: ["Decisive leadership","Strategic vision","Efficient organization"], growth: ["Listen more before directing","Consider emotional impacts","Allow room for others' approaches"] },
  ENTP: { title: "The Debater", description: "Quick-witted, curious innovators who thrive on intellectual challenges. You love exploring new ideas and challenging the status quo.", strengths: ["Creative problem-solving","Adaptability","Energetic brainstorming"], growth: ["Follow through on commitments","Be sensitive to others' feelings","Focus on one project at a time"] },
  INFJ: { title: "The Advocate", description: "Insightful, principled idealists driven by a deep sense of purpose. You seek meaning in all things and care deeply about helping others.", strengths: ["Deep empathy","Visionary thinking","Strong moral compass"], growth: ["Set healthy boundaries","Don't take on others' problems as your own","Share your needs openly"] },
  INFP: { title: "The Mediator", description: "Thoughtful, creative idealists who are guided by strong personal values. You see the best in people and are driven by a desire to make the world better.", strengths: ["Creative expression","Deep empathy","Authentic self-awareness"], growth: ["Be decisive when needed","Don't avoid necessary conflict","Balance idealism with practicality"] },
  ENFJ: { title: "The Protagonist", description: "Charismatic, inspiring leaders who are driven to help others reach their potential. You naturally organize people toward a shared vision.", strengths: ["Inspirational leadership","Strong emotional intelligence","Community building"], growth: ["Prioritize your own needs too","Accept that you can't fix everything","Be comfortable with disagreement"] },
  ENFP: { title: "The Campaigner", description: "Enthusiastic, creative free spirits who see life as full of possibilities. You connect easily with others and bring infectious energy.", strengths: ["Enthusiasm and optimism","Creative connections","Empathetic communication"], growth: ["Focus on follow-through","Manage your energy sustainably","Ground ideas in practical steps"] },
  ISTJ: { title: "The Logistician", description: "Responsible, thorough individuals who value duty and tradition. You are reliable, detail-oriented, and committed to doing things right.", strengths: ["Reliability and consistency","Attention to detail","Strong work ethic"], growth: ["Stay open to new approaches","Express feelings more openly","Be flexible with changing plans"] },
  ISFJ: { title: "The Defender", description: "Warm, dedicated protectors who care deeply about the well-being of others. You are supportive, reliable, and notice what others need.", strengths: ["Caring attentiveness","Practical helpfulness","Loyal commitment"], growth: ["Learn to say no when overwhelmed","Don't neglect your own needs","Speak up about your own opinions"] },
  ESTJ: { title: "The Executive", description: "Organized, dependable managers who value order and tradition. You take charge, establish clear structures, and follow through decisively.", strengths: ["Organizational excellence","Clear communication","Decisive action"], growth: ["Consider emotional perspectives","Be patient with less structured people","Stay open to unconventional ideas"] },
  ESFJ: { title: "The Consul", description: "Caring, social individuals who thrive on helping others and maintaining harmony. You are attentive to others' needs and create welcoming environments.", strengths: ["Social awareness","Practical caregiving","Community connection"], growth: ["Don't seek approval at the expense of authenticity","Handle criticism constructively","Set personal boundaries"] },
  ISTP: { title: "The Virtuoso", description: "Bold, practical problem-solvers who enjoy understanding how things work. You value efficiency and learn best through hands-on experience.", strengths: ["Practical problem-solving","Cool under pressure","Adaptable and resourceful"], growth: ["Communicate your plans to others","Consider long-term consequences","Open up emotionally to trusted people"] },
  ISFP: { title: "The Adventurer", description: "Gentle, caring artists who live in the moment and enjoy exploring the world through their senses. You value authenticity and personal freedom.", strengths: ["Artistic sensitivity","Living authentically","Gentle compassion"], growth: ["Plan ahead for important goals","Speak up in group settings","Develop comfort with constructive conflict"] },
  ESTP: { title: "The Entrepreneur", description: "Energetic, action-oriented realists who enjoy living on the edge. You learn by doing and thrive in dynamic environments.", strengths: ["Quick decision-making","Hands-on problem-solving","Energetic action"], growth: ["Think before acting","Consider long-term consequences","Develop patience with slower processes"] },
  ESFP: { title: "The Entertainer", description: "Spontaneous, energetic performers who love life and bring joy to others. You live in the moment and make everything more fun.", strengths: ["Infectious enthusiasm","Social connection","Present-moment awareness"], growth: ["Develop long-term planning skills","Handle serious topics when needed","Save resources for future needs"] },
};

const PersonalityMBTI = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const questionsPerPage = 5;
  const totalPages = Math.ceil(QUESTIONS.length / questionsPerPage);
  const pageQuestions = QUESTIONS.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;

  const handleAnswer = (qId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const calculateType = () => {
    const scores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    QUESTIONS.forEach(q => {
      const val = answers[q.id] || 3;
      if (val > 3) { scores[q.dimA] += val - 3; }
      else if (val < 3) { scores[q.dimB] += 3 - val; }
    });
    const type = (scores.E >= scores.I ? 'E' : 'I') + (scores.S >= scores.N ? 'S' : 'N') + (scores.T >= scores.F ? 'T' : 'F') + (scores.J >= scores.P ? 'J' : 'P');
    const percentages = {
      EI: Math.round((scores.E / (scores.E + scores.I || 1)) * 100),
      SN: Math.round((scores.S / (scores.S + scores.N || 1)) * 100),
      TF: Math.round((scores.T / (scores.T + scores.F || 1)) * 100),
      JP: Math.round((scores.J / (scores.J + scores.P || 1)) * 100),
    };
    return { type, percentages, scores };
  };

  const saveResults = async (resultData: { type: string; percentages: Record<string, number>; scores: Record<string, number> }) => {
    if (!user) return false;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("personality_results")
        .insert({
          user_id: user.id,
          assessment_type: "mbti",
          raw_scores: resultData.scores,
          result_type: resultData.type,
          result_data: {
            percentages: resultData.percentages,
            profile: TYPE_DESCRIPTIONS[resultData.type],
            answers: answers
          }
        });

      if (error) throw error;
      
      toast({ title: "Results saved successfully!" });
      return true;
    } catch (error) {
      console.error("Error saving MBTI results:", error);
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

  const handleComplete = async () => {
    const resultData = calculateType();
    await saveResults(resultData);
    setCompleted(true);
  };

  if (completed) {
    const { type, percentages } = calculateType();
    const info = TYPE_DESCRIPTIONS[type] || { title: type, description: "", strengths: [], growth: [] };
    const dims = [
      { left: "Extraversion (E)", right: "Introversion (I)", pct: percentages.EI, letter: type[0] },
      { left: "Sensing (S)", right: "Intuition (N)", pct: percentages.SN, letter: type[1] },
      { left: "Thinking (T)", right: "Feeling (F)", pct: percentages.TF, letter: type[2] },
      { left: "Judging (J)", right: "Perceiving (P)", pct: percentages.JP, letter: type[3] },
    ];

    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Link to="/iq-personality"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-xl font-bold">Your MBTI Results</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <Card className="p-4 border-amber-500/30 bg-amber-500/5 space-y-1">
            <p className="text-xs text-muted-foreground"><strong>⚠️ Non-Clinical:</strong> This is an educational self-assessment, not a licensed MBTI® instrument. If you have concerns about your mental health, please seek help from a licensed professional.</p>
          </Card>
          <Card className="p-6 text-center space-y-2">
            <span className="text-6xl font-black tracking-wider text-primary">{type}</span>
            <h2 className="text-2xl font-bold">{info.title}</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{info.description}</p>
          </Card>
          <Card className="p-5 space-y-4">
            <h3 className="font-bold">Your Dimension Preferences</h3>
            {dims.map(d => (
              <div key={d.left} className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{d.left} {d.pct}%</span>
                  <span>{100 - d.pct}% {d.right}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </Card>
          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-green-600">💪 Strengths</h3>
            {info.strengths.map((s, i) => <p key={i} className="text-sm pl-4 border-l-2 border-green-500/30">{s}</p>)}
          </Card>
          <Card className="p-5 space-y-3">
            <h3 className="font-bold text-amber-600">🌱 Growth Opportunities</h3>
            {info.growth.map((g, i) => <p key={i} className="text-sm pl-4 border-l-2 border-amber-500/30">{g}</p>)}
          </Card>
          <Button onClick={() => { setAnswers({}); setCurrentPage(0); setCompleted(false); }} className="w-full">Retake Assessment</Button>
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
            <h1 className="text-lg font-bold">MBTI-Style Assessment</h1>
            <p className="text-xs text-muted-foreground">{answeredCount}/{QUESTIONS.length} answered</p>
          </div>
        </div>
        <Progress value={progress} className="mt-2 h-1.5" />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-4 border-amber-500/30 bg-amber-500/5">
          <p className="text-xs text-muted-foreground"><strong>⚠️ Non-Clinical:</strong> Educational self-assessment only. Not a licensed MBTI® instrument.</p>
        </Card>
        {pageQuestions.map(q => (
          <Card key={q.id} className="p-4 space-y-3">
            <p className="text-sm font-medium">{q.id}. {q.text}</p>
            <div className="flex gap-1.5 flex-wrap">
              {LIKERT.map(l => (
                <Button key={l.value} size="sm" variant={answers[q.id] === l.value ? "default" : "outline"}
                  className="text-xs flex-1 min-w-[60px]" onClick={() => handleAnswer(q.id, l.value)}>
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
            <Button className="flex-1" onClick={handleComplete} disabled={answeredCount < QUESTIONS.length * 0.8 || saving}>
              {saving ? "Saving..." : "See Results"}
            </Button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PersonalityMBTI;
