import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Clock, Timer, Trophy, Target, Brain } from "lucide-react";
import { questions } from "@/data/questions";
import { visualMathQuestions, visualEnglishQuestions, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { additionalMathQuestions } from "@/data/additionalMathQuestions";
import { englishQuestions } from "@/data/englishQuestions";
import { hardEnglishQuestions } from "@/data/hardEnglishQuestions";
import { QuestionVisual } from "@/components/QuestionVisual";
import { AITutorExplanation } from "@/components/AITutorExplanation";
import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { sampleProportionally } from "@/utils/proportionalSampling";

interface TestQuestion {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  domain: string;
  skill: string;
  type: "math" | "english";
  visual?: any;
}

const MATH_TIME = 25 * 60; // 25 minutes for 20 hard math questions
const ENGLISH_TIME = 25 * 60; // 25 minutes for 20 hard english questions

const PracticeTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [testStarted, setTestStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<"math" | "english">("math");
  const [mathQuestionsList, setMathQuestionsList] = useState<TestQuestion[]>([]);
  const [englishQuestionsList, setEnglishQuestionsList] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(MATH_TIME);
  const [showResults, setShowResults] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [reviewQuestion, setReviewQuestion] = useState<TestQuestion | null>(null);

  // Generate test questions - 20 hard math + 20 hard english
  // Uses proportional sampling to match official SAT domain distributions
  const generateTest = useCallback(() => {
    // Get hard math questions (difficulty rating >= 7)
    const allMath = [
      ...questions.map(q => ({ ...q, type: "math" as const })),
      ...visualMathQuestions.map(q => ({ ...q, type: "math" as const })),
      ...moreMathVisualQuestions.map(q => ({ ...q, type: "math" as const })),
      ...additionalMathQuestions.map(q => ({ ...q, type: "math" as const })),
    ];
    const hardMath = allMath.filter(q => (q.difficultyRating || 5) >= 7);
    
    // Get hard english questions (difficulty rating >= 7)
    const allEnglish = [
      ...englishQuestions.map(q => ({ ...q, type: "english" as const })),
      ...hardEnglishQuestions.map(q => ({ ...q, type: "english" as const })),
      ...visualEnglishQuestions.map(q => ({ ...q, type: "english" as const })),
      ...moreEnglishVisualQuestions.map(q => ({ ...q, type: "english" as const })),
    ];
    const hardEnglish = allEnglish.filter(q => (q.difficultyRating || 5) >= 7);

    // Select 20 hard questions from each using proportional sampling
    // Math: 35% Linear Algebra, 35% Advanced Math, 15% Data Analysis, 15% Geometry/Trig
    // English: 28% Craft & Structure, 26% Info & Ideas, 26% Standard English, 20% Expression
    const mathPool = hardMath.length >= 20 ? hardMath : allMath;
    const englishPool = hardEnglish.length >= 20 ? hardEnglish : allEnglish;
    
    const shuffledMath = shuffleAllQuestionOptions(sampleProportionally(mathPool, 20, 'math'));
    const shuffledEnglish = shuffleAllQuestionOptions(sampleProportionally(englishPool, 20, 'english'));

    setMathQuestionsList(shuffledMath);
    setEnglishQuestionsList(shuffledEnglish);
  }, []);

  useEffect(() => {
    generateTest();
  }, [generateTest]);

  // Timer
  useEffect(() => {
    if (!testStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up for current section
          if (currentSection === "math") {
            setCurrentSection("english");
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            return ENGLISH_TIME;
          } else {
            finishTest();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, showResults, currentSection]);

  const currentQuestions = currentSection === "math" ? mathQuestionsList : englishQuestionsList;
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (letter: string) => {
    if (!currentQuestion) return;
    setSelectedAnswer(letter);
    setAnswers(prev => ({
      ...prev,
      [`${currentSection}-${currentQuestionIndex}`]: letter,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answers[`${currentSection}-${currentQuestionIndex + 1}`] || null);
    } else if (currentSection === "math") {
      setCurrentSection("english");
      setCurrentQuestionIndex(0);
      setTimeRemaining(ENGLISH_TIME);
      setSelectedAnswer(answers["english-0"] || null);
    } else {
      finishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[`${currentSection}-${currentQuestionIndex - 1}`] || null);
    }
  };

  const finishTest = async () => {
    setShowResults(true);

    // Calculate scores
    let mathCorrect = 0;
    let englishCorrect = 0;

    mathQuestionsList.forEach((q, i) => {
      if (answers[`math-${i}`] === q.correctAnswer) mathCorrect++;
    });
    englishQuestionsList.forEach((q, i) => {
      if (answers[`english-${i}`] === q.correctAnswer) englishCorrect++;
    });

    // Prediction scoring: Start at 800, lose 30 points per wrong answer per section
    const mathWrong = mathQuestionsList.length - mathCorrect;
    const englishWrong = englishQuestionsList.length - englishCorrect;
    const mathScaled = Math.max(200, 800 - (mathWrong * 30));
    const englishScaled = Math.max(200, 800 - (englishWrong * 30));
    const totalScore = mathScaled + englishScaled;

    // Save to database
    if (user) {
      // Save practice test result
      await supabase.from("practice_tests").insert({
        user_id: user.id,
        test_type: "full",
        math_score: mathScaled,
        english_score: englishScaled,
        total_score: totalScore,
      });

      // Save individual question attempts for analysis
      const attempts = [
        ...mathQuestionsList.map((q, i) => ({
          user_id: user.id,
          question_id: q.id,
          question_type: "math",
          domain: q.domain,
          skill: q.skill,
          is_correct: answers[`math-${i}`] === q.correctAnswer,
        })),
        ...englishQuestionsList.map((q, i) => ({
          user_id: user.id,
          question_id: q.id,
          question_type: "english",
          domain: q.domain,
          skill: q.skill,
          is_correct: answers[`english-${i}`] === q.correctAnswer,
        })),
      ];

      await supabase.from("question_attempts").insert(attempts);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Calculate results with prediction scoring
  const mathCorrect = mathQuestionsList.filter((q, i) => answers[`math-${i}`] === q.correctAnswer).length;
  const englishCorrect = englishQuestionsList.filter((q, i) => answers[`english-${i}`] === q.correctAnswer).length;
  const mathWrong = mathQuestionsList.length - mathCorrect;
  const englishWrong = englishQuestionsList.length - englishCorrect;
  const mathScaled = Math.max(200, 800 - (mathWrong * 30));
  const englishScaled = Math.max(200, 800 - (englishWrong * 30));

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
              <h1 className="text-4xl font-bold">(20+20)² SAT Prediction</h1>
            </div>
            <p className="text-muted-foreground">Abbreviated test with hard questions to predict your score</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-500">20</div>
                  <div className="text-sm text-muted-foreground">Hard Math</div>
                  <div className="text-xs text-muted-foreground mt-1">25 minutes</div>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500">20</div>
                  <div className="text-sm text-muted-foreground">Hard English</div>
                  <div className="text-xs text-muted-foreground mt-1">25 minutes</div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Prediction Scoring</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All correct = Predicted 1600</li>
                  <li>• Each wrong answer = -30 points in that section</li>
                  <li>• Example: 1 wrong in math = 770 Math + 800 English = 1570</li>
                  <li>• Math section first, then English</li>
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

  if (showResults) {
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
                <div className="text-6xl font-bold text-primary mb-2">{mathScaled + englishScaled}</div>
                <div className="text-muted-foreground">Predicted SAT Score</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-blue-500/10">
                  <div className="text-3xl font-bold text-blue-500">{mathScaled}</div>
                  <div className="text-sm text-muted-foreground">Math ({mathCorrect}/20 correct, {mathWrong} wrong)</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-500/10">
                  <div className="text-3xl font-bold text-green-500">{englishScaled}</div>
                  <div className="text-sm text-muted-foreground">English ({englishCorrect}/20 correct, {englishWrong} wrong)</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Review Missed Questions</h3>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {[...mathQuestionsList, ...englishQuestionsList].map((q, i) => {
                    const section = i < mathQuestionsList.length ? "math" : "english";
                    const idx = section === "math" ? i : i - mathQuestionsList.length;
                    const userAnswer = answers[`${section}-${idx}`];
                    const isCorrect = userAnswer === q.correctAnswer;
                    
                    if (isCorrect) return null;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setReviewQuestion(q);
                          setShowAITutor(true);
                        }}
                        className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate flex-1">{q.question.slice(0, 80)}...</span>
                          <span className={`text-xs px-2 py-1 rounded ${section === "math" ? "bg-blue-500/20 text-blue-500" : "bg-green-500/20 text-green-500"}`}>
                            {section}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {showAITutor && reviewQuestion && (
            <AITutorExplanation
              question={reviewQuestion.question}
              options={reviewQuestion.options}
              correctAnswer={reviewQuestion.correctAnswer}
              userAnswer={answers[`${reviewQuestion.type}-${(reviewQuestion.type === "math" ? mathQuestionsList : englishQuestionsList).findIndex(q => q.id === reviewQuestion.id)}`] || ""}
              explanation={reviewQuestion.explanation}
              onClose={() => {
                setShowAITutor(false);
                setReviewQuestion(null);
              }}
            />
          )}

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentSection === "math" ? "bg-blue-500/20 text-blue-500" : "bg-green-500/20 text-green-500"
            }`}>
              {currentSection === "math" ? "Math" : "English"}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} of {currentQuestions.length}
            </span>
          </div>
          <div className={`flex items-center gap-2 font-mono text-lg ${timeRemaining < 300 ? "text-destructive" : ""}`}>
            <Timer className="w-5 h-5" />
            {formatTime(timeRemaining)}
          </div>
        </div>

        <Progress 
          value={(currentQuestionIndex / currentQuestions.length) * 100} 
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
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 && currentSection === "math"}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentQuestionIndex === currentQuestions.length - 1 && currentSection === "english" 
              ? "Finish Test" 
              : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
