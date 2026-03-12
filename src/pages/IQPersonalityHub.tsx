import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Brain, Heart, BookOpen, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

interface AssessmentItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'personality' | 'iq' | 'sentence-completion';
  type: 'self-assessment' | 'knowledge-quiz' | 'both' | 'exercise';
  route: string;
}

const ASSESSMENTS: AssessmentItem[] = [
  // Personality Self-Assessments
  {
    id: 'big-five', name: 'Big Five (OCEAN)', icon: '🌊',
    description: 'Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism',
    category: 'personality', type: 'both', route: '/personality',
  },
  {
    id: 'mbti', name: 'MBTI-Style', icon: '🧩',
    description: '16 personality types — find your type (INTJ, ENFP, etc.)',
    category: 'personality', type: 'both', route: '/personality-mbti',
  },
  {
    id: 'disc', name: 'DISC Profile', icon: '🎯',
    description: 'Dominance, Influence, Steadiness, Conscientiousness',
    category: 'personality', type: 'both', route: '/personality-disc',
  },
  {
    id: 'enneagram', name: 'Enneagram', icon: '🔢',
    description: 'Discover your core type among 9 personality archetypes',
    category: 'personality', type: 'both', route: '/personality-enneagram',
  },
  {
    id: 'clifton', name: 'CliftonStrengths-Style', icon: '💪',
    description: 'Identify your top talent themes and strengths',
    category: 'personality', type: 'self-assessment', route: '/personality-strengths',
  },
  {
    id: 'eq', name: 'Emotional Intelligence (EQ)', icon: '❤️',
    description: 'Self-awareness, empathy, social skills, self-regulation',
    category: 'personality', type: 'both', route: '/personality',
  },

  // IQ Test
  {
    id: 'iq-test', name: 'IQ Assessment', icon: '🧠',
    description: 'Pattern recognition, spatial reasoning, verbal & numerical logic — estimates IQ score',
    category: 'iq', type: 'exercise', route: '/iq-test',
  },
  // Cognitive Skills Test
  {
    id: 'cognitive-skills', name: 'Cognitive Skills Test', icon: '⚡',
    description: 'Working memory, processing speed, and attention — tracks cognitive performance',
    category: 'iq', type: 'exercise', route: '/cognitive',
  },

  // Vocabulary Builder
  {
    id: 'vocab-builder', name: 'Vocabulary Builder', icon: '📚',
    description: 'Learn high-value words through context — boosts reading & test scores',
    category: 'sentence-completion', type: 'exercise', route: '/sentence-completion',
  },
];

const CATEGORIES = [
  { key: 'personality', label: 'Personality Assessments', icon: '🧩', description: 'Self-assessments + knowledge quizzes' },
  { key: 'iq', label: 'IQ & Cognitive Skills', icon: '🧠', description: 'Non-clinical reasoning exercises' },
  { key: 'sentence-completion', label: 'Sentence Completion', icon: '✏️', description: 'Vocabulary & reasoning drills' },
];

const IQPersonalityHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">IQ & Personality Tests</h1>
            <p className="text-xs text-muted-foreground">Assessments, quizzes & cognitive exercises</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Disclaimer */}
        <Card className="p-4 border-amber-500/30 bg-amber-500/5 space-y-2">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">⚠️ Important Disclaimer:</strong> These assessments are for <strong>self-discovery and educational purposes only</strong>. They are <strong>not</strong> official, licensed, or clinically validated diagnostic instruments. Results should not be used for medical, psychiatric, or employment decisions.
          </p>
          <p className="text-xs text-muted-foreground">
            If you are experiencing emotional distress, mental health concerns, or suspect a psychiatric condition, <strong>please consult a licensed mental health professional</strong> (psychologist, psychiatrist, or counselor). These tools do not replace professional evaluation, diagnosis, or treatment.
          </p>
        </Card>

        {CATEGORIES.map(cat => {
          const items = ASSESSMENTS.filter(a => a.category === cat.key);
          return (
            <div key={cat.key} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h2 className="font-bold text-lg">{cat.label}</h2>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>

              <div className="grid gap-2">
                {items.map(item => (
                  <Card
                    key={item.id}
                    className="p-3 cursor-pointer hover:border-primary/50 transition-all hover:shadow-md flex items-center gap-3"
                    onClick={() => navigate(item.route)}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        {item.type === 'both' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            Quiz + Self-Test
                          </span>
                        )}
                        {item.type === 'self-assessment' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent-foreground font-medium">
                            Self-Test
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default IQPersonalityHub;
