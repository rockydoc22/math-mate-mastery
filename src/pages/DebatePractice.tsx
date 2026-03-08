import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, ChevronRight, CheckCircle2, Play, RotateCcw, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface DebateFormat {
  id: string;
  name: string;
  abbr: string;
  icon: string;
  description: string;
  prepTime: number; // seconds
  speechTime: number; // seconds
  structure: string[];
}

interface DebateTopic {
  id: string;
  resolution: string;
  category: string;
  format: string[];
}

const FORMATS: DebateFormat[] = [
  {
    id: 'ld', name: 'Lincoln-Douglas', abbr: 'LD', icon: '⚖️',
    description: '1v1 value-based debate focused on philosophical and moral questions',
    prepTime: 240, speechTime: 360,
    structure: ['Affirmative Constructive (6 min)', 'Cross-Examination (3 min)', 'Negative Constructive (7 min)', 'Cross-Examination (3 min)', 'First Affirmative Rebuttal (4 min)', 'Negative Rebuttal (6 min)', 'Second Affirmative Rebuttal (3 min)'],
  },
  {
    id: 'policy', name: 'Policy / CX', abbr: 'CX', icon: '📋',
    description: '2v2 evidence-heavy debate with plans and counterplans',
    prepTime: 480, speechTime: 480,
    structure: ['1AC - First Affirmative Constructive (8 min)', 'Cross-Ex by 2NC (3 min)', '1NC - First Negative Constructive (8 min)', 'Cross-Ex by 1AC (3 min)', '2AC - Second Affirmative Constructive (8 min)', 'Cross-Ex by 1NC (3 min)', '2NC - Second Negative Constructive (8 min)', 'Cross-Ex by 2AC (3 min)', '1NR - First Negative Rebuttal (5 min)', '1AR - First Affirmative Rebuttal (5 min)', '2NR - Second Negative Rebuttal (5 min)', '2AR - Second Affirmative Rebuttal (5 min)'],
  },
  {
    id: 'pf', name: 'Public Forum', abbr: 'PF', icon: '🗣️',
    description: '2v2 accessible debate on current events for a lay audience',
    prepTime: 120, speechTime: 240,
    structure: ['Team A Speaker 1 Constructive (4 min)', 'Team B Speaker 1 Constructive (4 min)', 'Crossfire (3 min)', 'Team A Speaker 2 Rebuttal (4 min)', 'Team B Speaker 2 Rebuttal (4 min)', 'Crossfire (3 min)', 'Team A Summary (3 min)', 'Team B Summary (3 min)', 'Grand Crossfire (3 min)', 'Team A Final Focus (2 min)', 'Team B Final Focus (2 min)'],
  },
];

const TOPICS: DebateTopic[] = [
  { id: 't1', resolution: 'Resolved: Civil disobedience in a democracy is morally justified.', category: 'Philosophy', format: ['ld'] },
  { id: 't2', resolution: 'Resolved: The United States should substantially reduce its military presence abroad.', category: 'Foreign Policy', format: ['policy', 'pf'] },
  { id: 't3', resolution: 'Resolved: Artificial intelligence poses a greater threat than benefit to humanity.', category: 'Technology', format: ['ld', 'pf'] },
  { id: 't4', resolution: 'Resolved: The US federal government should implement a universal basic income.', category: 'Economics', format: ['policy', 'pf'] },
  { id: 't5', resolution: 'Resolved: Individual privacy rights ought to be valued above national security interests.', category: 'Philosophy', format: ['ld'] },
  { id: 't6', resolution: 'Resolved: Social media companies should be held legally responsible for user-generated content.', category: 'Technology', format: ['pf'] },
  { id: 't7', resolution: 'Resolved: The US should adopt a carbon tax to combat climate change.', category: 'Environment', format: ['policy', 'pf'] },
  { id: 't8', resolution: 'Resolved: Plea bargaining undermines the American criminal justice system.', category: 'Justice', format: ['ld', 'policy'] },
  { id: 't9', resolution: 'Resolved: Wealthy nations have an obligation to accept climate refugees.', category: 'Ethics', format: ['ld', 'pf'] },
  { id: 't10', resolution: 'Resolved: The US federal government should ban the private ownership of assault-style weapons.', category: 'Policy', format: ['policy'] },
  { id: 't11', resolution: 'Resolved: Competition is superior to cooperation as a means of achieving excellence.', category: 'Philosophy', format: ['ld'] },
  { id: 't12', resolution: 'Resolved: The benefits of space exploration justify the costs.', category: 'Science', format: ['pf'] },
];

type Phase = 'select' | 'prep' | 'speech' | 'review' | 'feedback';

const DebatePractice = () => {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>('select');
  const [selectedFormat, setSelectedFormat] = useState<DebateFormat | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<DebateTopic | null>(null);
  const [side, setSide] = useState<'aff' | 'neg'>('aff');
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [notes, setNotes] = useState("");
  const [speechText, setSpeechText] = useState("");
  const [currentSpeechIdx, setCurrentSpeechIdx] = useState(0);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // Timer effect
  useState(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setTimerRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  });

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const selectFormat = (f: DebateFormat) => {
    setSelectedFormat(f);
    const relevantTopics = TOPICS.filter(t => t.format.includes(f.id));
    const random = relevantTopics[Math.floor(Math.random() * relevantTopics.length)];
    setSelectedTopic(random);
    setSide(Math.random() > 0.5 ? 'aff' : 'neg');
  };

  const startPrep = () => {
    if (!selectedFormat) return;
    setTimeLeft(selectedFormat.prepTime);
    setTimerRunning(true);
    setNotes("");
    setPhase('prep');
  };

  const startSpeech = () => {
    if (!selectedFormat) return;
    setTimeLeft(selectedFormat.speechTime);
    setTimerRunning(true);
    setSpeechText("");
    setCurrentSpeechIdx(0);
    setPhase('speech');
  };

  const submitForFeedback = async () => {
    if (!user || !selectedTopic || !selectedFormat) {
      toast({ title: "Sign in required", variant: "destructive" });
      return;
    }
    setLoadingFeedback(true);
    setPhase('feedback');

    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor-chat', {
        body: {
          messages: [
            { role: 'user', content: `I'm practicing ${selectedFormat.name} debate. The resolution is: "${selectedTopic.resolution}". I'm arguing the ${side === 'aff' ? 'affirmative' : 'negative'} side.\n\nHere are my prep notes:\n${notes}\n\nHere is my speech/argument:\n${speechText}\n\nPlease evaluate my argument. Score it on:\n1. Clarity of thesis (1-5)\n2. Evidence quality (1-5)\n3. Logical reasoning (1-5)\n4. Refutation potential (1-5)\n5. Persuasiveness (1-5)\n\nProvide specific feedback and suggestions for improvement.` }
          ]
        }
      });

      if (error) throw error;

      // Non-streaming response
      if (typeof data === 'string') {
        setAiFeedback(data);
      } else if (data?.choices?.[0]?.message?.content) {
        setAiFeedback(data.choices[0].message.content);
      } else {
        setAiFeedback("Feedback generated. Review your argument structure and evidence quality.");
      }
    } catch (e) {
      console.error(e);
      setAiFeedback("Could not generate AI feedback at this time. Review your argument for clarity, evidence, and logical flow.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  // Format selection
  if (phase === 'select') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center gap-3">
            <Link to="/competitions"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">🎤 Debate Practice</h1>
              <p className="text-sm text-muted-foreground">Lincoln-Douglas · Policy · Public Forum</p>
            </div>
          </div>

          <div className="space-y-4">
            {FORMATS.map(f => (
              <Card key={f.id} className={`p-5 cursor-pointer transition-all hover:shadow-md ${selectedFormat?.id === f.id ? 'border-primary border-2' : 'hover:border-primary/50'}`}
                onClick={() => selectFormat(f)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{f.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{f.name}</h3>
                    <p className="text-xs text-muted-foreground">{f.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline"><Clock className="w-3 h-3 mr-1" /> Prep: {Math.floor(f.prepTime / 60)} min</Badge>
                  <Badge variant="outline">Speeches: {f.structure.length}</Badge>
                </div>
              </Card>
            ))}
          </div>

          {selectedFormat && selectedTopic && (
            <Card className="p-5 border-primary/30 bg-primary/5 space-y-3">
              <h3 className="font-bold text-sm">Your Topic</h3>
              <p className="text-sm font-medium italic">"{selectedTopic.resolution}"</p>
              <div className="flex items-center gap-2">
                <Badge>{selectedTopic.category}</Badge>
                <Badge variant={side === 'aff' ? 'default' : 'secondary'}>
                  {side === 'aff' ? '✅ Affirmative' : '❌ Negative'}
                </Badge>
              </div>
              <Button className="w-full" onClick={startPrep}>
                <Play className="w-4 h-4 mr-1" /> Start Prep ({Math.floor(selectedFormat.prepTime / 60)} min)
              </Button>
            </Card>
          )}

          {/* Speech Structure Reference */}
          {selectedFormat && (
            <Card className="p-4">
              <h3 className="font-bold text-sm mb-2">Round Structure</h3>
              <div className="space-y-1">
                {selectedFormat.structure.map((step, i) => (
                  <p key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="font-mono w-5 text-right">{i + 1}.</span> {step}
                  </p>
                ))}
              </div>
            </Card>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // Prep phase
  if (phase === 'prep') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setPhase('select')}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Badge className={`font-mono text-lg px-3 py-1 ${timeLeft < 30 ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}>
              <Clock className="w-4 h-4 mr-1" /> {fmt(timeLeft)}
            </Badge>
          </div>

          <Card className="p-4 bg-primary/5">
            <p className="text-xs text-muted-foreground mb-1">Resolution:</p>
            <p className="font-medium text-sm italic">"{selectedTopic?.resolution}"</p>
            <Badge className="mt-2">{side === 'aff' ? '✅ Affirmative' : '❌ Negative'}</Badge>
          </Card>

          <div>
            <label className="text-sm font-bold mb-2 block">Prep Notes</label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Outline your arguments, evidence, and key points..."
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          <Button className="w-full" onClick={startSpeech}>
            <Play className="w-4 h-4 mr-1" /> Start Speech Practice
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Speech phase
  if (phase === 'speech') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{selectedFormat?.structure[currentSpeechIdx] || 'Speech'}</Badge>
            <Badge className={`font-mono text-lg px-3 py-1 ${timeLeft < 30 ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}>
              <Clock className="w-4 h-4 mr-1" /> {fmt(timeLeft)}
            </Badge>
          </div>

          {notes && (
            <Card className="p-3 bg-muted/50">
              <p className="text-xs font-bold mb-1">Your Notes:</p>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">{notes}</p>
            </Card>
          )}

          <div>
            <label className="text-sm font-bold mb-2 block">Type your argument (or use as a timer while speaking aloud)</label>
            <Textarea
              value={speechText}
              onChange={e => setSpeechText(e.target.value)}
              placeholder="Type your speech content here, or speak aloud and jot key points..."
              className="min-h-[250px] text-sm"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setPhase('select')}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Restart
            </Button>
            <Button className="flex-1" onClick={submitForFeedback}>
              <Sparkles className="w-4 h-4 mr-1" /> Get AI Feedback
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Review/Feedback phase
  if (phase === 'review' || phase === 'feedback') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setPhase('select')}><ArrowLeft className="w-5 h-5" /></Button>
            <h2 className="text-xl font-bold">AI Debate Coach Feedback</h2>
          </div>

          <Card className="p-4 bg-primary/5">
            <p className="text-xs text-muted-foreground mb-1">Resolution:</p>
            <p className="font-medium text-sm italic">"{selectedTopic?.resolution}"</p>
          </Card>

          <Card className="p-5">
            {loadingFeedback ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="ml-3 text-muted-foreground">Analyzing your argument...</p>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {aiFeedback || "No feedback yet."}
              </div>
            )}
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setPhase('select')}>
              <RotateCcw className="w-4 h-4 mr-1" /> New Topic
            </Button>
            <Button className="flex-1" onClick={() => { setPhase('prep'); setTimeLeft(selectedFormat?.prepTime || 240); }}>
              <Play className="w-4 h-4 mr-1" /> Practice Again
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return null;
};

export default DebatePractice;
