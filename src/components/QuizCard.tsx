import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from "@/data/questions";
import { VisualQuestion } from "@/data/visualQuestions";
import { ImageQuestion } from "@/data/importedSATQuestions";
import { CheckCircle2, XCircle, Flag, Lightbulb, AlertTriangle, Route } from "lucide-react";
import { FlagQuestionModal } from "./FlagQuestionModal";
import { QuestionVisual } from "./QuestionVisual";
import { MathText } from "./MathText";
import { ClickableText } from "./ClickableText";
import { findKeyConcept, KeyConcept } from "@/data/satKeyConcepts";
import { SolutionPathAnalysis } from "./SolutionPathAnalysis";
import { shuffleQuestionOptions } from "@/utils/optionShuffler";

interface QuizCardProps {
  question: Question | VisualQuestion | ImageQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  showResult: boolean;
  questionType?: 'math' | 'english';
  onFlagged?: () => void;
}

export const QuizCard = ({ question: rawQuestion, selectedAnswer, onSelectAnswer, showResult, questionType = 'math', onFlagged }: QuizCardProps) => {
  // Deterministically shuffle MCQ options for display ONLY so the correct
  // letter is balanced across the bank. Parents continue to receive the
  // ORIGINAL letter via onSelectAnswer and compare against the ORIGINAL
  // correctAnswer — they don't need to change.
  const { question, origToShuffled, shuffledToOrig } = useMemo(() => {
    const shuffled = shuffleQuestionOptions(rawQuestion as any) as typeof rawQuestion;
    const o2s: Record<string, string> = {};
    const s2o: Record<string, string> = {};
    if (Array.isArray((rawQuestion as any).options) && Array.isArray(shuffled.options)) {
      (rawQuestion as any).options.forEach((origOpt: any) => {
        const match = shuffled.options.find(s => s.text === origOpt.text);
        if (match) { o2s[origOpt.letter] = match.letter; s2o[match.letter] = origOpt.letter; }
      });
    }
    return { question: shuffled, origToShuffled: o2s, shuffledToOrig: s2o };
  }, [rawQuestion]);
  const displaySelected = selectedAnswer ? (origToShuffled[selectedAnswer] ?? selectedAnswer) : null;
  const handleSelect = (shuffledLetter: string) => onSelectAnswer(shuffledToOrig[shuffledLetter] ?? shuffledLetter);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [showKeyConcept, setShowKeyConcept] = useState(false);
  const [showPathAnalysis, setShowPathAnalysis] = useState(false);
  const visualQuestion = question as VisualQuestion;
  const imageQuestion = question as ImageQuestion;

  // Reset UI state when question changes
  useEffect(() => {
    setShowKeyConcept(false);
    setShowPathAnalysis(false);
  }, [question.id]);

  // Find the relevant key concept for this question
  const keyConcept = useMemo(() => {
    return findKeyConcept(question.skill, question.domain, questionType);
  }, [question.skill, question.domain, questionType]);

  return (
    <>
      <Card className="p-4 sm:p-6 md:p-8 shadow-xl border-2">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide truncate">
                {question.domain} • {question.skill}
              </p>
              <h2 className="text-base sm:text-lg md:text-xl font-bold leading-relaxed whitespace-pre-wrap break-words">
                {questionType === 'math' ? <MathText text={question.question} /> : <ClickableText text={question.question} />}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFlagModalOpen(true)}
              className="text-muted-foreground hover:text-destructive flex-shrink-0"
              title="Report an issue with this question"
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>

          {/* Render question image if present */}
          {imageQuestion.imageUrl && (
            <div className="rounded-lg overflow-hidden border">
              <img 
                src={imageQuestion.imageUrl} 
                alt="Question visual" 
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Render visual chart if present - but skip redundant "Equation" tables that just repeat the question */}
          {visualQuestion.visual && !imageQuestion.imageUrl && (
            (() => {
              // Skip rendering if it's just a table with "Equation" header repeating what's in the question
              const visual = visualQuestion.visual;
              if (visual?.type === 'table' && visual?.data?.headers) {
                const headers = visual.data.headers as string[];
                // Skip if headers are just "Equation" or similar redundant single-column tables
                if (headers.length === 1 && ['Equation', 'Inequality'].includes(headers[0])) {
                  return null;
                }
                // Skip if it's "Equation 1" / "Equation 2" for systems already in question text
                if (headers.length === 2 && headers[0] === 'Equation 1' && headers[1] === 'Equation 2') {
                  return null;
                }
              }
              return <QuestionVisual visual={visual} />;
            })()
          )}

          <div className="space-y-2 sm:space-y-3">
            {question.options.map((option) => {
              const isSelected = displaySelected === option.letter;
              const isCorrect = option.letter === question.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={`${question.id}-${option.letter}`}
                  onClick={(e) => {
                    if (showResult) return;
                    handleSelect(option.letter);
                    (e.currentTarget as HTMLButtonElement).blur();
                  }}
                  disabled={showResult}
                  className={`
                    w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all
                    ${!showResult && !isSelected ? 'border-border hover:border-primary hover:bg-primary/5' : ''}
                    ${!showResult && isSelected ? 'border-primary bg-primary/10' : ''}
                    ${showCorrect ? 'border-success bg-success/10' : ''}
                    ${showWrong ? 'border-destructive bg-destructive/10' : ''}
                    ${showResult ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className={`
                      font-bold text-base sm:text-lg min-w-[1.5rem] sm:min-w-[2rem]
                      ${showCorrect ? 'text-success' : ''}
                      ${showWrong ? 'text-destructive' : ''}
                      ${!showResult && isSelected ? 'text-primary' : ''}
                    `}>
                      {option.letter}.
                    </span>
                    <span className="flex-1 text-sm sm:text-base break-words">
                      {questionType === 'math' ? <MathText text={option.text} /> : <ClickableText text={option.text} />}
                    </span>
                    {showCorrect && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />}
                    {showWrong && <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-4 sm:mt-6 space-y-3">
              {/* Main Explanation */}
              <div className="p-3 sm:p-4 bg-muted rounded-lg">
                <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-foreground">Explanation:</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                  {questionType === 'math' ? <MathText text={question.explanation} /> : <ClickableText text={question.explanation} />}
                </p>
              </div>

              {/* Key Concept Section */}
              {keyConcept && (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowKeyConcept(!showKeyConcept)}
                    className="w-full justify-start gap-2 text-xs sm:text-sm"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    {showKeyConcept ? 'Hide' : 'Show'} SAT Key Concept
                  </Button>

                  {showKeyConcept && (
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800 rounded-lg space-y-3">
                      {/* Key Insight */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                          <span className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300">Key Insight</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                          {keyConcept.keyInsight}
                        </p>
                      </div>

                      {/* SAT Tip */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs sm:text-sm font-semibold text-primary">💡 SAT Tip</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {keyConcept.satTip}
                        </p>
                      </div>

                      {/* Common Mistakes */}
                      {keyConcept.commonMistakes.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                            <span className="text-xs sm:text-sm font-semibold text-orange-700 dark:text-orange-400">Watch Out For</span>
                          </div>
                          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            {keyConcept.commonMistakes.map((mistake, i) => (
                              <li key={i}>{mistake}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Advanced Trap - 1600 Level */}
                      {keyConcept.advancedTrap && (
                        <div className="pt-2 border-t border-amber-200 dark:border-amber-700">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400">⚠️ 1600-Level Trap</span>
                          </div>
                          <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed font-medium">
                            {keyConcept.advancedTrap}
                          </p>
                        </div>
                      )}

                      {/* 1600 Insight */}
                      {keyConcept.level1600Insight && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400">🎯 Master This for 800</span>
                          </div>
                          <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-200 leading-relaxed">
                            {keyConcept.level1600Insight}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Solution Path Analysis */}
              {!showPathAnalysis ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPathAnalysis(true)}
                  className="w-full justify-start gap-2 text-xs sm:text-sm"
                >
                  <Route className="w-4 h-4 text-accent-foreground" />
                  Analyze My Solution Path
                </Button>
              ) : (
                <SolutionPathAnalysis
                  question={question.question}
                  questionId={question.id}
                  questionType={questionType}
                  options={question.options.map(o => ({ letter: o.letter, text: o.text }))}
                  correctAnswer={question.correctAnswer}
                  competitionType={questionType === 'math' ? 'SAT Math' : questionType === 'english' ? 'SAT English' : 'Academic'}
                  onClose={() => setShowPathAnalysis(false)}
                />
              )}
            </div>
          )}
        </div>
      </Card>

      <FlagQuestionModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        questionId={question.id}
        questionType={questionType}
        onFlagged={onFlagged}
      />
    </>
  );
};
