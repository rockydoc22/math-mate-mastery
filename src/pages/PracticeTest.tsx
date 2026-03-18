import { useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Clock, Timer, Trophy, Target, Brain, Flag, ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import { questions } from "@/data/questions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { additionalMathQuestions } from "@/data/additionalMathQuestions";
import { englishQuestions } from "@/data/englishQuestions";
import { hardEnglishQuestions } from "@/data/hardEnglishQuestions";
import { actScienceQuestions } from "@/data/actScienceQuestions";
import { QuestionVisual } from "@/components/QuestionVisual";
import { AITutorExplanation } from "@/components/AITutorExplanation";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";
import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { sampleProportionally } from "@/utils/proportionalSampling";
import { DesmosCalculator } from "@/components/DesmosCalculator";
import { useExamType } from "@/hooks/useExamType";
import { EXAM_CONFIGS } from "@/utils/examConfig";

interface TestQuestion {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  domain: string;
  skill: string;
  type: "math" | "english" | "science";
  visual?: any;
}

const PracticeTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { examType } = useExamType();
  const examConfig = EXAM_CONFIGS[examType];
  const ptConfig = examConfig.predictionTest;
  
  const [testStarted, setTestStarted] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [sectionQuestions, setSectionQuestions] = useState<Record<string, TestQuestion[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(ptConfig.sections[0].timeMinutes * 60);
  const [showResults, setShowResults] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [reviewQuestion, setReviewQuestion] = useState<TestQuestion | null>(null);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [flagQuestionData, setFlagQuestionData] = useState<{ id: string; type: 'math' | 'english' | 'science' } | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const currentSection = ptConfig.sections[currentSectionIdx];
  const minDifficulty = examType === 'psat' ? 6 : 7;

  // Generate test questions based on exam config
  const generateTest = useCallback(() => {
    const result: Record<string, TestQuestion[]> = {};

    for (const section of ptConfig.sections) {
      const count = section.questionsCount;

      if (section.key === 'math') {
        const allMath = [
          ...questions.map(q => ({ ...q, type: "math" as const })),
          ...visualMathQuestions.map(q => ({ ...q, type: "math" as const })),
          ...moreMathVisualQuestions.map(q => ({ ...q, type: "math" as const })),
          ...additionalMathQuestions.map(q => ({ ...q, type: "math" as const })),
        ];
        const hardMath = allMath.filter(q => (q.difficultyRating || 5) >= minDifficulty);
        const pool = hardMath.length >= count ? hardMath : allMath;
        result[section.key] = shuffleAllQuestionOptions(sampleProportionally(pool, count, 'math'));
      } else if (section.key === 'english') {
        const allEnglish = [
          ...englishQuestions.map(q => ({ ...q, type: "english" as const })),
          ...hardEnglishQuestions.map(q => ({ ...q, type: "english" as const })),
          ...visualEnglishQuestions.map(q => ({ ...q, type: "english" as const })),
          ...moreEnglishVisualQuestions.map(q => ({ ...q, type: "english" as const })),
        ];
        const hardEnglish = allEnglish.filter(q => (q.difficultyRating || 5) >= minDifficulty);
        const pool = hardEnglish.length >= count ? hardEnglish : allEnglish;
        result[section.key] = shuffleAllQuestionOptions(sampleProportionally(pool, count, 'english'));
      } else if (section.key === 'science') {
        const allScience = actScienceQuestions.map(q => ({ ...q, type: "science" as const }));
        const hardScience = allScience.filter(q => (q.difficultyRating || 5) >= minDifficulty);
        const pool = hardScience.length >= count ? hardScience : allScience;
        // Shuffle and pick
        const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
        result[section.key] = shuffleAllQuestionOptions(shuffled);
      }
    }

    setSectionQuestions(result);
  }, [ptConfig, minDifficulty]);

  useEffect(() => {
    generateTest();
  }, [generateTest]);

  // Timer
  useEffect(() => {
    if (!testStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (currentSectionIdx < ptConfig.sections.length - 1) {
            const nextIdx = currentSectionIdx + 1;
            setCurrentSectionIdx(nextIdx);
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            return ptConfig.sections[nextIdx].timeMinutes * 60;
          } else {
            finishTest();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, showResults, currentSectionIdx]);

  const currentQuestionsList = sectionQuestions[currentSection?.key] || [];
  const currentQuestion = currentQuestionsList[currentQuestionIndex];

  const handleAnswer = (letter: string) => {
    if (!currentQuestion) return;
    setSelectedAnswer(letter);
    setAnswers(prev => ({
      ...prev,
      [`${currentSection.key}-${currentQuestionIndex}`]: letter,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestionsList.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answers[`${currentSection.key}-${currentQuestionIndex + 1}`] || null);
    } else if (currentSectionIdx < ptConfig.sections.length - 1) {
      const nextIdx = currentSectionIdx + 1;
      setCurrentSectionIdx(nextIdx);
      setCurrentQuestionIndex(0);
      setTimeRemaining(ptConfig.sections[nextIdx].timeMinutes * 60);
      setSelectedAnswer(answers[`${ptConfig.sections[nextIdx].key}-0`] || null);
    } else {
      finishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[`${currentSection.key}-${currentQuestionIndex - 1}`] || null);
    }
  };

  // Calculate scores per section
  const getSectionResults = () => {
    return ptConfig.sections.map(section => {
      const qs = sectionQuestions[section.key] || [];
      const correct = qs.filter((q, i) => answers[`${section.key}-${i}`] === q.correctAnswer).length;
      const wrong = qs.length - correct;
      const scaled = Math.max(ptConfig.minSectionScore, ptConfig.maxSectionScore - (wrong * ptConfig.penaltyPerWrong));
      return { section, correct, wrong, scaled, total: qs.length };
    });
  };

  const finishTest = async () => {
    setShowResults(true);
    const results = getSectionResults();
    const totalScore = results.reduce((sum, r) => sum + r.scaled, 0);
    const mathResult = results.find(r => r.section.key === 'math');
    const englishResult = results.find(r => r.section.key === 'english');

    if (user) {
      await supabase.from("practice_tests").insert({
        user_id: user.id,
        test_type: "full",
        math_score: mathResult?.scaled || 0,
        english_score: englishResult?.scaled || 0,
        total_score: totalScore,
      });

      const kidId = sessionStorage.getItem(`kid_selected_${user.id}`);
      const attempts = ptConfig.sections.flatMap(section => {
        const qs = sectionQuestions[section.key] || [];
        return qs.map((q, i) => ({
          user_id: user.id,
          question_id: q.id,
          question_type: section.key === 'science' ? 'math' : section.key,
          domain: q.domain,
          skill: q.skill,
          is_correct: answers[`${section.key}-${i}`] === q.correctAnswer,
          kid_profile_id: kidId && kidId !== 'parent' ? kidId : null,
        }));
      });

      await supabase.from("question_attempts").insert(attempts as any);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const results = getSectionResults();
  const totalScore = results.reduce((sum, r) => sum + r.scaled, 0);
  const totalWrong = results.reduce((sum, r) => sum + r.wrong, 0);

  // Pre-test screen
  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <Target className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">{ptConfig.testName}</h1>
            </div>
            <p className="text-muted-foreground">
              {examType === 'act' 
                ? '3!×2 Science + 3!×2 Math + 3!×2 English — predict your ACT score' 
                : `Abbreviated ${examConfig.shortName} test with hard questions to predict your score`}
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className={`grid grid-cols-${ptConfig.sections.length} gap-4 text-center`}>
                {ptConfig.sections.map(section => (
                  <div key={section.key} className={`p-4 rounded-lg bg-${section.color}/10 border border-${section.color}/20`}>
                    <div className={`text-2xl font-bold text-${section.color}`}>{section.questionsCount}</div>
                    <div className="text-sm text-muted-foreground">{section.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{section.timeMinutes} minutes</div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Prediction Scoring</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {ptConfig.scoringExamples.map((ex, i) => (
                    <li key={i}>• {ex}</li>
                  ))}
                </ul>
              </div>

              <Button onClick={() => setTestStarted(true)} className="w-full" size="lg">
                <Clock className="w-5 h-5 mr-2" />
                Start Prediction Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const allQuestions = ptConfig.sections.flatMap(section => 
      (sectionQuestions[section.key] || []).map(q => ({ ...q, sectionKey: section.key }))
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Prediction Complete!</h1>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-primary mb-2">{totalScore}</div>
                <div className="text-muted-foreground">Predicted {examConfig.shortName} Score</div>
              </div>

              <div className={`grid grid-cols-${ptConfig.sections.length} gap-4 mb-6`}>
                {results.map(r => (
                  <div key={r.section.key} className={`text-center p-4 rounded-lg bg-${r.section.color}/10`}>
                    <div className={`text-3xl font-bold text-${r.section.color}`}>{r.scaled}</div>
                    <div className="text-sm text-muted-foreground">
                      {r.section.label.replace('Hard ', '')} ({r.correct}/{r.total} correct, {r.wrong} wrong)
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Review Missed Questions ({totalWrong})</h3>
                <div className="space-y-3">
                  {allQuestions.map((q) => {
                    const sectionKey = q.sectionKey;
                    const sectionQs = sectionQuestions[sectionKey] || [];
                    const idx = sectionQs.findIndex(sq => sq.id === q.id);
                    const userAnswer = answers[`${sectionKey}-${idx}`];
                    const isCorrect = userAnswer === q.correctAnswer;
                    
                    if (isCorrect) return null;

                    const isExpanded = expandedQuestions.has(q.id);
                    const toggleExpand = () => {
                      setExpandedQuestions(prev => {
                        const next = new Set(prev);
                        if (next.has(q.id)) next.delete(q.id);
                        else next.add(q.id);
                        return next;
                      });
                    };
                    
                    return (
                      <div key={q.id} className="rounded-lg border border-border overflow-hidden">
                        <button
                          onClick={toggleExpand}
                          className="w-full text-left p-3 sm:p-4 hover:bg-muted/50 transition-colors flex items-center gap-3"
                        >
                          <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm line-clamp-2">{q.question}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-xs px-2 py-1 rounded bg-${ptConfig.sections.find(s => s.key === sectionKey)?.color || 'primary'}/20 text-${ptConfig.sections.find(s => s.key === sectionKey)?.color || 'primary'}`}>
                              {sectionKey}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFlagQuestionData({ id: q.id, type: sectionKey as any });
                                setIsFlagModalOpen(true);
                              }}
                              className="h-7 w-7 p-0"
                              title="Flag this question"
                            >
                              <Flag className="w-3 h-3 text-muted-foreground hover:text-orange-500" />
                            </Button>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-border p-3 sm:p-4 space-y-3 bg-muted/30">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">{q.domain} • {q.skill}</p>
                              <p className="text-sm sm:text-base">{q.question}</p>
                            </div>

                            {q.visual && (
                              <div className="rounded-lg overflow-hidden border">
                                <QuestionVisual visual={q.visual} />
                              </div>
                            )}

                            <div className="space-y-2">
                              {q.options.map((option) => {
                                const isUserAnswer = option.letter === userAnswer;
                                const isCorrectAnswer = option.letter === q.correctAnswer;
                                return (
                                  <div
                                    key={option.letter}
                                    className={`p-3 rounded-lg border-2 text-sm flex items-start gap-2 ${
                                      isCorrectAnswer ? 'border-success bg-success/10' : 
                                      isUserAnswer ? 'border-destructive bg-destructive/10' : 
                                      'border-border'
                                    }`}
                                  >
                                    <span className={`font-bold min-w-[1.5rem] ${
                                      isCorrectAnswer ? 'text-success' : isUserAnswer ? 'text-destructive' : ''
                                    }`}>
                                      {option.letter}.
                                    </span>
                                    <span className="flex-1">{option.text}</span>
                                    {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />}
                                    {isUserAnswer && !isCorrectAnswer && <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="p-3 bg-muted rounded-lg">
                              <p className="text-xs font-semibold mb-1 text-foreground">Explanation:</p>
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => {
                                setReviewQuestion(q);
                                setShowAITutor(true);
                              }}
                            >
                              <Brain className="w-4 h-4" />
                              Get AI Explanation
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {totalWrong === 0 && (
                    <div className="text-center p-6 text-muted-foreground">
                      <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-2" />
                      <p className="font-medium">Perfect score! No missed questions.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {showAITutor && reviewQuestion && (
            <AITutorExplanation
              question={reviewQuestion.question}
              options={reviewQuestion.options}
              correctAnswer={reviewQuestion.correctAnswer}
              userAnswer={(() => {
                const sectionKey = reviewQuestion.type;
                const qs = sectionQuestions[sectionKey] || [];
                const idx = qs.findIndex(q => q.id === reviewQuestion.id);
                return answers[`${sectionKey}-${idx}`] || "";
              })()}
              explanation={reviewQuestion.explanation}
              onClose={() => {
                setShowAITutor(false);
                setReviewQuestion(null);
              }}
            />
          )}

          <FlagQuestionModal
            isOpen={isFlagModalOpen}
            onClose={() => {
              setIsFlagModalOpen(false);
              setFlagQuestionData(null);
            }}
            questionId={flagQuestionData?.id || ''}
            questionType={flagQuestionData?.type || 'math'}
          />

          <div className="flex gap-4 justify-center">
            <Link to="/insights">
              <Button variant="outline">
                <Brain className="w-4 h-4 mr-2" />
                View Analysis
              </Button>
            </Link>
            <Link to="/">
              <Button>Back Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Test in progress
  const isLastSection = currentSectionIdx === ptConfig.sections.length - 1;
  const isLastQuestion = currentQuestionIndex === currentQuestionsList.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 pb-28 sm:pb-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${currentSection.color}/20 text-${currentSection.color}`}>
              {currentSection.label.replace('Hard ', '')}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} of {currentQuestionsList.length}
            </span>
          </div>
          <div className={`flex items-center gap-2 font-mono text-lg ${timeRemaining < 300 ? "text-destructive" : ""}`}>
            <Timer className="w-5 h-5" />
            {formatTime(timeRemaining)}
          </div>
        </div>

        <Progress 
          value={(currentQuestionIndex / currentQuestionsList.length) * 100} 
          className="mb-6"
        />

        {/* Question */}
        {currentQuestion && (
          <Card className="mb-6">
            <CardContent className="p-6">
              {currentQuestion.visual && (
                <div className="mb-4">
                  <QuestionVisual visual={currentQuestion.visual} />
                </div>
              )}
              <p className="text-lg mb-6">{currentQuestion.question}</p>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.letter}
                    onClick={() => handleAnswer(option.letter)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswer === option.letter
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <span className="font-medium mr-2">{option.letter}.</span>
                    {option.text}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex flex-wrap justify-between items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 && currentSectionIdx === 0}
          >
            Previous
          </Button>
          
          {currentQuestion && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFlagQuestionData({ id: currentQuestion.id, type: currentSection.key as any });
                setIsFlagModalOpen(true);
              }}
              className="text-muted-foreground hover:text-orange-500"
              title="Flag this question"
            >
              <Flag className="w-4 h-4 mr-1" />
              Flag
            </Button>
          )}
          
          <Button onClick={handleNext}>
            {isLastQuestion && isLastSection ? "Finish Test" : "Next"}
          </Button>
        </div>

        <FlagQuestionModal
          isOpen={isFlagModalOpen}
          onClose={() => {
            setIsFlagModalOpen(false);
            setFlagQuestionData(null);
          }}
          questionId={flagQuestionData?.id || ''}
          questionType={flagQuestionData?.type || 'math'}
        />

        <DesmosCalculator />
      </div>
    </div>
  );
};

export default PracticeTest;
