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

import { shuffleAllQuestionOptions } from "@/utils/optionShuffler";
import { DesmosCalculator } from "@/components/DesmosCalculator";
import { sampleProportionally } from "@/utils/proportionalSampling";
import { usePerfectStreak } from "@/hooks/usePerfectStreak";
import { useMysteryBox } from "@/hooks/useMysteryBox";
import { MysteryBoxPopup } from "@/components/MysteryBoxPopup";
import { PerfectStreakDisplay } from "@/components/PerfectStreakDisplay";
import { useMomentum } from "@/hooks/useMomentum";
import { useMistakeCoach } from "@/hooks/useMistakeCoach";
import { MomentumMeter } from "@/components/MomentumMeter";
import { MistakeCoachCard } from "@/components/MistakeCoachCard";
import ExplainBack from "@/components/learning/ExplainBack";
import { WrongAnswerCoach } from "@/components/WrongAnswerCoach";
import { recordAttempt } from "@/lib/recordAttempt";
import { useExamType } from "@/hooks/useExamType";
import { useProgressiveHints } from "@/hooks/useProgressiveHints";
import { ProgressiveHintPanel } from "@/components/ProgressiveHintPanel";
import { ConceptHelpDrawer } from "@/components/ConceptHelpDrawer";
import { EXAM_CONFIGS } from "@/utils/examConfig";
import { actScienceQuestions } from "@/data/actScienceQuestions";
import { interleaveQuestions } from "@/utils/questionInterleaver";
import { SEO } from "@/components/SEO";
import {
  saveQuizResume,
  loadQuizResume,
  clearQuizResume,
  currentQuizUrl,
} from "@/lib/quizResume";

type CombinedQuestion = (Question | EnglishQuestion | VisualQuestion | ImageQuestion) & { type: "math" | "english" | "science"; difficultyRating?: number };

import { applyRotation, markQuestionCorrect } from "@/utils/questionRotation";

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
  const { streak: perfectStreak, recordAnswer: recordPerfectAnswer } = usePerfectStreak();
  const { pendingReward, recordQuestion, dismissReward, questionsUntilBox } = useMysteryBox();
  const { examType } = useExamType();
  const examConfig = EXAM_CONFIGS[examType];
  const momentum = useMomentum();
  const mistakeCoach = useMistakeCoach();
  
  // Define isAdvancedSubject early so it can be used in useMemo
  const isAdvancedSubject = subject === "physics" || subject === "precalc" || subject === "calculus";

  const [quizQuestions, setQuizQuestions] = useState<CombinedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Resume snapshot (read once on mount, keyed by URL so /quiz?subject=math&count=10 etc. are distinct).
  const resumeUrl = currentQuizUrl();
  const [resumeSnapshot] = useState(() => loadQuizResume(resumeUrl));

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
        // Include science questions for ACT mode
        if (examType === 'act' && (subject === "both" || subject === "science")) {
          pool = [...pool, ...actScienceQuestions.map((q) => ({ ...q, type: "science" as const }))];
        }
        // Science-only mode: skip proportional sampling, use simple shuffle
        if (subject === "science") {
          // handled below in the general path
        }
      }

      // Cap difficulty for exam type (e.g., PSAT maxes at 8)
      const maxDiff = examConfig.maxDifficulty ?? 10;
      pool = pool.filter(q => (q.difficultyRating || 5) <= maxDiff);

      const seenIds = new Set<string>();
      const dedupedPool = pool.filter((q) => {
        if (seenIds.has(q.id)) return false;
        seenIds.add(q.id);
        return true;
      });

      // Use persistent localStorage rotation so correctly answered questions
      // are not repeated until the entire pool is exhausted
      const prioritizedPool = applyRotation(dedupedPool, count, "quiz");

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
          if (examType === 'act') {
            // ACT: split evenly across math, english, science
            const sciencePool = filtered.filter(q => q.type === "science");
            const perSubject = Math.floor(count / 3);
            const remainder = count - perSubject * 3;
            
            const mathSelected = perSubject <= 2
              ? shuffleArray(mathPool).slice(0, perSubject)
              : sampleProportionally(mathPool, perSubject, 'math');
            const englishSelected = perSubject <= 2
              ? shuffleArray(englishPool).slice(0, perSubject)
              : sampleProportionally(englishPool, perSubject, 'english');
            const scienceSelected = shuffleArray(sciencePool).slice(0, perSubject + remainder);
            
            selected = [...mathSelected, ...englishSelected, ...scienceSelected];
          } else {
            // SAT/PSAT: split 50/50 between math and english
            const mathCount = Math.ceil(count / 2);
            const englishCount = count - mathCount;
            const mathSelected = mathCount <= 2
              ? shuffleArray(mathPool).slice(0, mathCount)
              : sampleProportionally(mathPool, mathCount, 'math');
            const englishSelected = englishCount <= 2
              ? shuffleArray(englishPool).slice(0, englishCount)
              : sampleProportionally(englishPool, englishCount, 'english');
            selected = [...mathSelected, ...englishSelected];
          }
        } else if (subject === "math") {
          selected = count <= 2
            ? shuffleArray(mathPool).slice(0, count)
            : sampleProportionally(mathPool, count, 'math');
        } else if (subject === "english") {
          selected = count <= 2
            ? shuffleArray(englishPool).slice(0, count)
            : sampleProportionally(englishPool, count, 'english');
        } else if (subject === "science") {
          const sciencePool = filtered.filter(q => q.type === "science");
          selected = shuffleArray(sciencePool).slice(0, count);
        }
        
        // GUARANTEE exact count: backfill from full filtered pool, then dedupedPool as fallback
        if (selected.length < count) {
          console.warn(`[Quiz] Only selected ${selected.length}/${count} questions initially, backfilling...`);
          const selectedIds = new Set(selected.map(q => q.id));
          const backfill = shuffleArray(filtered.filter(q => !selectedIds.has(q.id)));
          selected = [...selected, ...backfill.slice(0, count - selected.length)];
        }
        if (selected.length < count) {
          // Ultimate fallback: use entire deduped pool
          const selectedIds = new Set(selected.map(q => q.id));
          const fallback = shuffleArray(dedupedPool.filter(q => !selectedIds.has(q.id)));
          selected = [...selected, ...fallback.slice(0, count - selected.length)];
        }
        
        console.log(`[Quiz] Final question count: ${Math.min(selected.length, count)}/${count} (${examType} ${subject})`);
        setQuizQuestions(shuffleAllQuestionOptions(interleaveQuestions(selected.slice(0, count))));
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
      setQuizQuestions(shuffleAllQuestionOptions(interleaveQuestions(combined.slice(0, count))));
      setIsLoading(false);
    }, 50); // Small delay to let the UI render first
    return () => clearTimeout(timer);
  }, [subject, count, difficulty, topicId, isAdvancedSubject, examType]);

  // isAdvancedSubject is now defined at the top of the component

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    resumeSnapshot?.questionIndex ?? 0
  );
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
    pause: pauseTimer,
    resume, 
  } = useQuizTimer({
    questionCount: quizQuestions.length,
    enabled: timerEnabled && !isAdvancedSubject,
    onTimeUp: () => { setQuizEndTime(Date.now()); setFinished(true); },
    initialTimeRemaining: resumeSnapshot?.timeRemaining,
  });

  // Read timeRemaining separately so we can persist it without changing the destructure shape above.
  const timerState = useQuizTimer; // type only; we access timeRemaining via a second call below if needed

  // Pause timer when showing results
  useEffect(() => {
    if (showResult && isRunning) {
      pauseTimer();
    }
  }, [showResult, isRunning, pauseTimer]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const hints = useProgressiveHints({
    questionKey: currentQuestion?.id,
    subject: currentQuestion?.type,
    difficulty: currentQuestion?.difficultyRating,
    skillId: (currentQuestion as any)?.skill,
    question: currentQuestion?.question,
    options: currentQuestion?.options as any,
    correctAnswer: currentQuestion ? String(currentQuestion.correctAnswer) : undefined,
    explanation: (currentQuestion as any)?.explanation,
  });

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer || showResult) return;
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      playCorrect();
      markQuestionCorrect(currentQuestion.id, "quiz");
    } else {
      playWrong();
    }
    // Track perfect streak, mystery box, momentum & mistake coach
    recordPerfectAnswer(isCorrect);
    recordQuestion();
    momentum.recordAnswer(isCorrect);
    if (!isCorrect) {
      const domain = currentQuestion.type === "english" ? "english" : currentQuestion.type === "science" ? "science" : "math";
      mistakeCoach.onIncorrectAnswer(
        (currentQuestion as any).skill || domain,
        domain,
        currentQuestion.question,
      );
    } else {
      mistakeCoach.clearFeedback();
    }

    // Update skill rating
    if (user && currentQuestion.difficultyRating) {
      // Unified attempt write — feeds skill graph + spaced repetition.
      recordAttempt({
        userId: user.id,
        questionId: String(currentQuestion.id),
        isCorrect,
        difficulty: currentQuestion.difficultyRating,
        domain: currentQuestion.type,
        skill: (currentQuestion as any).skill,
        source: "quiz",
      });
      const ratingType: "math" | "english" = currentQuestion.type === "english" ? "english" : "math";
      const result = await updateRating(
        ratingType,
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
      // Resume timer for next question (it was paused on showResult)
      if (timerEnabled && !isAdvancedSubject && !isTimeUp) {
        resume();
      }
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
    momentum.reset();
    mistakeCoach.clearFeedback();
    clearQuizResume(resumeUrl);
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
    if (subject === "science") return "Science";
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
          {perfectStreak.best > 0 && (
            <PerfectStreakDisplay current={perfectStreak.current} best={perfectStreak.best} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8 pb-28 sm:pb-8">
      <SEO
        title="Adaptive Practice Quiz"
        description="Mixed Math, Reading & Writing practice that adapts to your level. Free, untimed, with instant explanations."
        path="/quiz"
      />
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-primary leading-tight">
              {isAdvancedSubject ? getSubjectLabel() : `${examConfig.shortName} ${getSubjectLabel()}`} Practice
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
                    : currentQuestion.type === "science"
                    ? "bg-cyan-500/10 text-cyan-500"
                    : "bg-secondary/10 text-secondary"
                }`}>
                  {currentQuestion.type === "math" ? "Math" : currentQuestion.type === "science" ? "Science" : "English"}
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

          {/* Momentum Meter */}
          {momentum.answerCount >= 3 && (
            <MomentumMeter
              mode={momentum.mode}
              score={momentum.score}
              label={momentum.label}
              message={momentum.message}
            />
          )}
        </div>

        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          showResult={showResult}
          questionType={currentQuestion.type === "science" ? "math" : currentQuestion.type}
        />

        {!showResult && (
          <div className="flex flex-wrap items-center gap-2">
            <ProgressiveHintPanel
              hints={hints.hints}
              revealedCount={hints.revealedCount}
              allShown={hints.allShown}
              onRevealNext={hints.revealNext}
              loading={hints.loading}
              compact
            />
            <ConceptHelpDrawer
              question={currentQuestion.question}
              skill={(currentQuestion as any).skill}
              domain={currentQuestion.type}
            />
          </div>
        )}

        {/* Mistake Coach feedback after wrong answer */}
        {showResult && mistakeCoach.lastFeedback && (
          <MistakeCoachCard
            feedback={mistakeCoach.lastFeedback}
            onDismiss={mistakeCoach.clearFeedback}
          />
        )}
        {showResult && selectedAnswer !== currentQuestion.correctAnswer && (
          <ExplainBack
            question={currentQuestion.question}
            correctAnswer={String(currentQuestion.correctAnswer)}
            userAnswer={String(selectedAnswer ?? "")}
            domain={currentQuestion.type}
            skill={(currentQuestion as any).skill}
          />
        )}
        {showResult && selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
          <WrongAnswerCoach
            question={currentQuestion.question}
            options={((currentQuestion.options as any[]) || []).map((t, i) => ({
              letter: String.fromCharCode(65 + i),
              text: typeof t === "string" ? t : (t?.text ?? String(t)),
            }))}
            correctAnswer={String(currentQuestion.correctAnswer)}
            studentAnswer={String(selectedAnswer)}
            skill={(currentQuestion as any).skill}
            domain={currentQuestion.type}
            difficulty={(currentQuestion as any).difficulty}
          />
        )}
        <div className="flex gap-3">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full"
              aria-disabled={!selectedAnswer}
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

      {/* Mystery Box Popup */}
      <MysteryBoxPopup reward={pendingReward} onDismiss={dismissReward} />
    </div>
  );
};

export default Quiz;
