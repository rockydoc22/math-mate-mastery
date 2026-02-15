import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import { questions, Question } from "@/data/questions";
import { englishQuestions, EnglishQuestion } from "@/data/englishQuestions";
import { visualMathQuestions, visualEnglishQuestions, VisualQuestion, moreMathVisualQuestions, moreEnglishVisualQuestions } from "@/data/visualQuestions";
import { physicsQuestions, precalcQuestions, calculusQuestions } from "@/data/advancedSubjects";
import { importedSATMathQuestions, ImageQuestion } from "@/data/importedSATQuestions";
import { ArrowRight, ArrowLeft, Clock, Pause, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link, useSearchParams } from "react-router-dom";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useAuth } from "@/hooks/useAuth";
import { useGameStats } from "@/hooks/useGameStats";
import { useSkillRating } from "@/hooks/useSkillRating";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { DifficultyRange, filterByDifficulty, getDifficultyColor } from "@/utils/difficultyRating";
import { allTopics } from "@/data/topicCategories";
import { RatingChangePopup } from "@/components/RatingChangePopup";
import { SkillRatingCard } from "@/components/SkillRatingCard";
import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { DesmosCalculator } from "@/components/DesmosCalculator";
import { sampleProportionally } from "@/utils/proportionalSampling";

type CombinedQuestion = (Question | EnglishQuestion | VisualQuestion | ImageQuestion) & { type: "math" | "english"; difficultyRating?: number };

// Session storage key for tracking correctly answered questions
const CORRECT_ANSWERS_KEY = "sat_mastery_correct_answers";

// Get correctly answered question IDs from session storage
function getCorrectlyAnsweredIds(): Set<string> {
  try {
    const stored = sessionStorage.getItem(CORRECT_ANSWERS_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

// Save correctly answered question ID to session storage
function markQuestionCorrect(questionId: string): void {
  try {
    const current = getCorrectlyAnsweredIds();
    current.add(questionId);
    sessionStorage.setItem(CORRECT_ANSWERS_KEY, JSON.stringify([...current]));
  } catch {
    // Ignore storage errors
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "math";
  const count = Number(searchParams.get("count")) || 10;
  const difficulty = (searchParams.get("difficulty") || "all") as DifficultyRange;
  const topicId = searchParams.get("topic");
  const timerEnabled = searchParams.get("timer") !== "false";
  const { playCorrect, playWrong } = useSoundEffects();
  const { user } = useAuth();
  const { recordScore } = useGameStats();
  const { ratings, updateRating } = useSkillRating();
  
  // Define isAdvancedSubject early so it can be used in useMemo
  const isAdvancedSubject = subject === "physics" || subject === "precalc" || subject === "calculus";

  const [quizQuestions, setQuizQuestions] = useState<CombinedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Defer heavy computation to avoid blocking the main thread on iPhone
    setIsLoading(true);
    const timer = setTimeout(() => {
      let pool: CombinedQuestion[] = [];

      if (subject === "physics") {
        pool = physicsQuestions.map((q) => ({ ...q, type: "math" as const }));
      } else if (subject === "precalc") {
        pool = precalcQuestions.map((q) => ({ ...q, type: "math" as const }));
      } else if (subject === "calculus") {
        pool = calculusQuestions.map((q) => ({ ...q, type: "math" as const }));
      } else {
        if (subject === "math" || subject === "both") {
          pool = [...pool, ...questions.map((q) => ({ ...q, type: "math" as const }))];
          pool = [...pool, ...visualMathQuestions.filter(q => (q.difficultyRating || 5) >= 3).map((q) => ({ ...q, type: "math" as const }))];
          pool = [...pool, ...moreMathVisualQuestions.filter(q => (q.difficultyRating || 5) >= 3).map((q) => ({ ...q, type: "math" as const }))];
          pool = [...pool, ...importedSATMathQuestions.filter(q => (q.difficultyRating || 5) >= 3).map((q) => ({ ...q, type: "math" as const }))];
        }
        if (subject === "english" || subject === "both") {
          pool = [...pool, ...englishQuestions.map((q) => ({ ...q, type: "english" as const }))];
          pool = [...pool, ...visualEnglishQuestions.filter(q => (q.difficultyRating || 5) >= 3).map((q) => ({ ...q, type: "english" as const }))];
          pool = [...pool, ...moreEnglishVisualQuestions.filter(q => (q.difficultyRating || 5) >= 3).map((q) => ({ ...q, type: "english" as const }))];
        }
      }

      const seenIds = new Set<string>();
      const dedupedPool = pool.filter((q) => {
        if (seenIds.has(q.id)) return false;
        seenIds.add(q.id);
        return true;
      });

      const correctlyAnsweredIds = getCorrectlyAnsweredIds();
      const unansweredQuestions = dedupedPool.filter(q => !correctlyAnsweredIds.has(q.id));
      const answeredQuestions = dedupedPool.filter(q => correctlyAnsweredIds.has(q.id));
      const prioritizedPool = unansweredQuestions.length >= count 
        ? unansweredQuestions 
        : unansweredQuestions.length > 0 
          ? [...unansweredQuestions, ...shuffleArray(answeredQuestions)]
          : dedupedPool;

      let topicFiltered = prioritizedPool;
      if (topicId) {
        const topic = allTopics.find(t => t.id === topicId);
        if (topic) {
          topicFiltered = prioritizedPool.filter(q => {
            const searchText = `${q.domain} ${q.skill} ${q.question}`.toLowerCase();
            return topic.keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
          });
        }
      }

      const filtered = subject === "physics" || subject === "precalc" || subject === "calculus"
        ? topicFiltered
        : filterByDifficulty(topicFiltered, difficulty);
      
      if (!isAdvancedSubject && !topicId) {
        const mathPool = filtered.filter(q => q.type === "math");
        const englishPool = filtered.filter(q => q.type === "english");
        let selected: CombinedQuestion[] = [];
        
        if (subject === "both") {
          const mathCount = Math.ceil(count / 2);
          const englishCount = count - mathCount;
          selected = [...sampleProportionally(mathPool, mathCount, 'math'), ...sampleProportionally(englishPool, englishCount, 'english')];
        } else if (subject === "math") {
          selected = sampleProportionally(mathPool, count, 'math');
        } else if (subject === "english") {
          selected = sampleProportionally(englishPool, count, 'english');
        }
        setQuizQuestions(shuffleAllQuestionOptions(shuffleArray(selected)));
        setIsLoading(false);
        return;
      }
      
      const easyQuestions = filtered.filter(q => (q.difficultyRating || 5) <= 4);
      const mediumQuestions = filtered.filter(q => (q.difficultyRating || 5) >= 5 && (q.difficultyRating || 5) <= 7);
      const hardQuestions = filtered.filter(q => (q.difficultyRating || 5) >= 8);
      const targetPerBand = Math.ceil(count / 3);
      const selectedEasy = shuffleArray(easyQuestions).slice(0, Math.min(targetPerBand, easyQuestions.length));
      const selectedMedium = shuffleArray(mediumQuestions).slice(0, Math.min(targetPerBand, mediumQuestions.length));
      const selectedHard = shuffleArray(hardQuestions).slice(0, Math.min(targetPerBand, hardQuestions.length));
      let combined = [...selectedEasy, ...selectedMedium, ...selectedHard];
      if (combined.length < count) {
        const usedIds = new Set(combined.map(q => q.id));
        const remaining = shuffleArray(filtered.filter(q => !usedIds.has(q.id)));
        combined = [...combined, ...remaining.slice(0, count - combined.length)];
      }
      setQuizQuestions(shuffleAllQuestionOptions(shuffleArray(combined.slice(0, count))));
      setIsLoading(false);
    }, 50); // Small delay to let the UI render first
    return () => clearTimeout(timer);
  }, [subject, count, difficulty, topicId, isAdvancedSubject]);

  // isAdvancedSubject is now defined at the top of the component

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [scoreRecorded, setScoreRecorded] = useState(false);
  const [quizStartTime] = useState(() => Date.now());
  const [quizEndTime, setQuizEndTime] = useState<number | null>(null);
  const [ratingChange, setRatingChange] = useState<{ show: boolean; change: number; newRating: number }>({
    show: false,
    change: 0,
    newRating: 0,
  });

  // Timer for SAT-paced practice
  const {
    formattedTime, 
    isRunning, 
    isTimeUp, 
    timeStatus, 
    toggle: toggleTimer,
    pause: pauseTimer 
  } = useQuizTimer({
    questionCount: quizQuestions.length,
    enabled: timerEnabled && !isAdvancedSubject,
    onTimeUp: () => { setQuizEndTime(Date.now()); setFinished(true); },
  });

  // Pause timer when showing results
  useEffect(() => {
    if (showResult && isRunning) {
      pauseTimer();
    }
  }, [showResult, isRunning, pauseTimer]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
      // Mark question as correctly answered for this session
      markQuestionCorrect(currentQuestion.id);
    } else {
      playWrong();
    }

    // Update skill rating
    if (user && currentQuestion.difficultyRating) {
      const result = await updateRating(
        currentQuestion.type,
        currentQuestion.difficultyRating,
        isCorrect,
        currentQuestion.id
      );
      if (result) {
        setRatingChange({
          show: true,
          change: result.change,
          newRating: result.newRating,
        });
        // Hide popup after 2 seconds
        setTimeout(() => {
          setRatingChange(prev => ({ ...prev, show: false }));
        }, 2000);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizEndTime(Date.now());
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setScoreRecorded(false);
  };

  // Record score when quiz finishes
  useEffect(() => {
    if (finished && user && !scoreRecorded) {
      recordScore(subject, score, quizQuestions.length);
      setScoreRecorded(true);
    }
  }, [finished, user, scoreRecorded, recordScore, subject, score, quizQuestions.length]);

  const getSubjectLabel = () => {
    if (subject === "both") return "Mixed";
    if (subject === "english") return "English";
    if (subject === "physics") return "Physics";
    if (subject === "precalc") return "Pre-Calc";
    if (subject === "calculus") return "Calculus";
    return "Math";
  };

  // Show loading state while questions are being prepared
  if (isLoading || quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <div className="w-full max-w-xl text-center space-y-4">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Preparing questions...</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-foreground">No questions available</h2>
              <p className="text-muted-foreground">Try refreshing the page or adjusting your filters.</p>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <div className="w-full max-w-xl space-y-6">
          <QuizResults
            score={score}
            totalQuestions={quizQuestions.length}
            onRestart={handleRestart}
            subject={getSubjectLabel()}
            timeTakenMs={quizEndTime ? quizEndTime - quizStartTime : undefined}
          />
          {ratings && (
            <SkillRatingCard
              mathRating={ratings.mathRating}
              englishRating={ratings.englishRating}
              overallRating={ratings.overallRating}
              compact
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">
              {isAdvancedSubject ? getSubjectLabel() : `SAT ${getSubjectLabel()}`} Practice
            </h1>
          </div>
          
          {/* Timer Display */}
          {timerEnabled && !isAdvancedSubject && (
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold transition-colors ${
                timeStatus === 'critical' ? 'bg-red-500/20 text-red-500 animate-pulse' :
                timeStatus === 'warning' ? 'bg-orange-500/20 text-orange-500' :
                'bg-primary/10 text-primary'
              }`}
              title={isRunning ? 'Click to pause' : 'Click to resume'}
            >
              <Clock className="w-5 h-5" />
              {formattedTime}
              {isRunning ? (
                <Pause className="w-4 h-4 opacity-50" />
              ) : (
                <Play className="w-4 h-4 opacity-50" />
              )}
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </h2>
              {subject === "both" && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currentQuestion.type === "math" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary/10 text-secondary"
                }`}>
                  {currentQuestion.type === "math" ? "Math" : "English"}
                </span>
              )}
              {currentQuestion.difficultyRating && (
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getDifficultyColor(currentQuestion.difficultyRating)}`}>
                  {currentQuestion.difficultyRating}/10
                </span>
              )}
            </div>
            <span className="text-sm font-medium px-4 py-2 bg-primary/10 text-primary rounded-full">
              Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          showResult={showResult}
          questionType={currentQuestion.type}
        />

        <div className="flex gap-3">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              size="lg"
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              ) : (
                "View Results"
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Rating Change Popup */}
      <RatingChangePopup
        show={ratingChange.show}
        change={ratingChange.change}
        newRating={ratingChange.newRating}
      />

      {/* Desmos Calculator - show for math questions */}
      {(subject === "math" || subject === "both") && <DesmosCalculator />}
    </div>
  );
};

export default Quiz;
