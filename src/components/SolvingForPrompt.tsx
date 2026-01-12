import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SolvingForPromptProps {
  onConfirm: () => void;
  questionType: 'math' | 'english';
}

export const SolvingForPrompt = ({ onConfirm, questionType }: SolvingForPromptProps) => {
  const [answer, setAnswer] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (questionType !== 'math') {
    // Only show for math questions
    onConfirm();
    return null;
  }

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(onConfirm, 500);
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30"
      >
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="text-sm font-medium text-green-600">
          Solving for: {answer || 'the answer'}
        </span>
      </motion.div>
    );
  }

  return (
    <Card className="border-2 border-primary/30 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-sm">Before you solve...</h4>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">
          Write down exactly what the question is asking for. This prevents interpretation errors.
        </p>

        <div className="flex gap-2">
          <Input
            placeholder="I am solving for..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConfirm();
            }}
          />
          <Button onClick={handleConfirm} size="sm">
            Confirm
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          💡 Tip: Circle the variable or value being asked for
        </p>
      </CardContent>
    </Card>
  );
};
