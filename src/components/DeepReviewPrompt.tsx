import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Brain, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeepReviewPromptProps {
  options: { letter: string; text: string }[];
  correctAnswer: string;
  userAnswer: string;
  onComplete: () => void;
}

export const DeepReviewPrompt = ({
  options,
  correctAnswer,
  userAnswer,
  onComplete,
}: DeepReviewPromptProps) => {
  const wrongOptions = options.filter(
    opt => opt.letter !== correctAnswer && opt.letter !== userAnswer
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [showingAnswer, setShowingAnswer] = useState(false);

  const currentOption = wrongOptions[currentIndex];
  const isLastOption = currentIndex === wrongOptions.length - 1;

  const handleExplanationChange = (value: string) => {
    setExplanations(prev => ({
      ...prev,
      [currentOption.letter]: value,
    }));
  };

  const handleNext = () => {
    if (isLastOption) {
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowingAnswer(false);
    }
  };

  const handleSkip = () => {
    setShowingAnswer(true);
  };

  return (
    <Card className="border-2 border-purple-500/30 bg-purple-500/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-purple-500" />
          <h4 className="font-semibold text-sm">
            Deep Review: Why are the other answers wrong?
          </h4>
          <span className="ml-auto text-xs text-muted-foreground">
            {currentIndex + 1} of {wrongOptions.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentOption.letter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium">{currentOption.letter}.</span>{' '}
                  <span className="text-sm">{currentOption.text}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                Why is this answer wrong?
              </label>
              <Textarea
                placeholder="Explain why this answer is incorrect..."
                value={explanations[currentOption.letter] || ''}
                onChange={(e) => handleExplanationChange(e.target.value)}
                className="h-20 text-sm resize-none"
              />
            </div>

            {showingAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-green-500/10 border border-green-500/30"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-medium text-green-600">Correct elimination reasoning:</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentOption.letter === 'A' && "Often too extreme or absolute"}
                  {currentOption.letter === 'B' && "May contain partial truth but misses key point"}
                  {currentOption.letter === 'C' && "Could be a common misconception trap"}
                  {currentOption.letter === 'D' && "May be true generally but not supported by the passage"}
                </p>
              </motion.div>
            )}

            <div className="flex gap-2">
              {!showingAnswer && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkip}
                  className="text-xs"
                >
                  Show Hint
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNext}
                className="ml-auto gap-1"
              >
                {isLastOption ? 'Complete Review' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
