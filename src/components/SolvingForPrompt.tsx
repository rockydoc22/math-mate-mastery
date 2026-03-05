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
    <Card className="border border-primary/30 bg-primary/5">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-xs">Before you solve — what are you solving for?</h4>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="I am solving for..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="text-sm h-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConfirm();
            }}
          />
          <Button onClick={handleConfirm} size="sm" className="h-8">
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
