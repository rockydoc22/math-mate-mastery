import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Brain, ChevronRight, CheckCircle2, XCircle, Sparkles, Flag } from "lucide-react";
import { FlagQuestionModal } from "@/components/FlagQuestionModal";
import { getAPSubject } from "@/utils/apConfig";
import { AP_CHEM_UNITS, apChemQuestionsByUnit, loadAPChemQuestions, type APChemUnit } from "@/data/apChemistryQuestions";
import { AP_USH_UNITS, apUSHQuestionsByUnit, loadAPUSHQuestions } from "@/data/apUSHistoryQuestions";
import { AP_LIT_UNITS, apLitQuestionsByUnit, loadAPLitQuestions } from "@/data/apEnglishLitQuestions";
import { AP_CALC_BC_UNITS, apCalcBCQuestionsByUnit, loadAPCalcBCQuestions } from "@/data/apCalculusBCQuestions";
import { AP_LANG_UNITS, apLangQuestionsByUnit, loadAPLangQuestions } from "@/data/apEnglishLangQuestions";
import { AP_CALC_AB_UNITS, apCalcABQuestionsByUnit, loadAPCalcABQuestions } from "@/data/apCalculusABQuestions";
import { AP_STATS_UNITS, apStatsQuestionsByUnit, loadAPStatsQuestions } from "@/data/apStatisticsQuestions";
import { AP_EURO_UNITS, apEuroQuestionsByUnit, loadAPEuroQuestions } from "@/data/apEuropeanHistoryQuestions";
import { AP_HUG_UNITS, apHuGQuestionsByUnit, loadAPHuGQuestions } from "@/data/apHumanGeoQuestions";
import { AP_ES_UNITS, apESQuestionsByUnit, loadAPESQuestions } from "@/data/apEnvironmentalScienceQuestions";
import { AP_CSP_UNITS, apCSPQuestionsByUnit, loadAPCSPQuestions } from "@/data/apCSPQuestions";
import { AP_PHYS2_UNITS, apPhys2QuestionsByUnit, loadAPPhys2Questions } from "@/data/apPhysics2Questions";
import { AP_BIO_UNITS, apBioQuestionsByUnit, loadAPBioQuestions } from "@/data/apBiologyQuestions";
import { AP_PHYS1_UNITS, apPhys1QuestionsByUnit, loadAPPhys1Questions } from "@/data/apPhysics1Questions";
import { AP_USGOV_UNITS, apUSGovQuestionsByUnit, loadAPUSGovQuestions } from "@/data/apUSGovQuestions";
import { AP_MACRO_UNITS, apMacroQuestionsByUnit, loadAPMacroQuestions } from "@/data/apMacroQuestions";
import { AP_MICRO_UNITS, apMicroQuestionsByUnit, loadAPMicroQuestions } from "@/data/apMicroQuestions";
import { AP_GERMAN_UNITS, apGermanQuestionsByUnit, loadAPGermanQuestions } from "@/data/apGermanQuestions";
import { AP_ITALIAN_UNITS, apItalianQuestionsByUnit, loadAPItalianQuestions } from "@/data/apItalianQuestions";
import { AP_FRENCH_LANG_UNITS, apFrenchLangQuestionsByUnit, loadAPFrenchLangQuestions } from "@/data/apFrenchLangQuestions";
import { AP_SPANISH_LIT_UNITS, apSpanishLitQuestionsByUnit, loadAPSpanishLitQuestions } from "@/data/apSpanishLitQuestions";
import { Question } from "@/data/questions";
import { MathText } from "@/components/MathText";
import { AITutorExplanation } from "@/components/AITutorExplanation";
import { FRQ_SUBJECT_MAP } from "@/data/frqDataLoaders";
import { PenLine } from "lucide-react";
import { useProgressiveHints } from "@/hooks/useProgressiveHints";
import { ProgressiveHintPanel } from "@/components/ProgressiveHintPanel";

type ViewState =
  | { mode: 'units' }
  | { mode: 'quiz'; unit: APChemUnit; questions: Question[]; currentIndex: number; selectedAnswer: string | null; showResult: boolean; score: number; answered: number }
  | { mode: 'results'; unit: APChemUnit; score: number; total: number };

const APStudy = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const subject = subjectId ? getAPSubject(subjectId) : undefined;
  const [view, setView] = useState<ViewState>({ mode: 'units' });
  const [showAITutor, setShowAITutor] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [chemQuestions, setChemQuestions] = useState<Record<string, Question[]>>(apChemQuestionsByUnit);
  const [ushQuestions, setUshQuestions] = useState<Record<string, Question[]>>(apUSHQuestionsByUnit);
  const [litQuestions, setLitQuestions] = useState<Record<string, Question[]>>(apLitQuestionsByUnit);
  const [calcBCQuestions, setCalcBCQuestions] = useState<Record<string, Question[]>>(apCalcBCQuestionsByUnit);
  const [langQuestions, setLangQuestions] = useState<Record<string, Question[]>>(apLangQuestionsByUnit);
  const [calcABQuestions, setCalcABQuestions] = useState<Record<string, Question[]>>(apCalcABQuestionsByUnit);
  const [statsQuestions, setStatsQuestions] = useState<Record<string, Question[]>>(apStatsQuestionsByUnit);
  const [euroQuestions, setEuroQuestions] = useState<Record<string, Question[]>>(apEuroQuestionsByUnit);
  const [hugQuestions, setHugQuestions] = useState<Record<string, Question[]>>(apHuGQuestionsByUnit);
  const [esQuestions, setEsQuestions] = useState<Record<string, Question[]>>(apESQuestionsByUnit);
  const [cspQuestions, setCspQuestions] = useState<Record<string, Question[]>>(apCSPQuestionsByUnit);
  const [phys2Questions, setPhys2Questions] = useState<Record<string, Question[]>>(apPhys2QuestionsByUnit);
  const [bioQuestions, setBioQuestions] = useState<Record<string, Question[]>>(apBioQuestionsByUnit);
  const [phys1Questions, setPhys1Questions] = useState<Record<string, Question[]>>(apPhys1QuestionsByUnit);
  const [usgovQuestions, setUsgovQuestions] = useState<Record<string, Question[]>>(apUSGovQuestionsByUnit);
  const [macroQuestions, setMacroQuestions] = useState<Record<string, Question[]>>(apMacroQuestionsByUnit);
  const [microQuestions, setMicroQuestions] = useState<Record<string, Question[]>>(apMicroQuestionsByUnit);
  const [germanQuestions, setGermanQuestions] = useState<Record<string, Question[]>>(apGermanQuestionsByUnit);
  const [italianQuestions, setItalianQuestions] = useState<Record<string, Question[]>>(apItalianQuestionsByUnit);
  const [frenchLangQuestions, setFrenchLangQuestions] = useState<Record<string, Question[]>>(apFrenchLangQuestionsByUnit);
  const [spanishLitQuestions, setSpanishLitQuestions] = useState<Record<string, Question[]>>(apSpanishLitQuestionsByUnit);

  useEffect(() => {
    const loaders: Record<string, () => Promise<Record<string, Question[]>>> = {
      'ap-chemistry': loadAPChemQuestions,
      'ap-us-history': loadAPUSHQuestions,
      'ap-english-lit': loadAPLitQuestions,
      'ap-calculus-bc': loadAPCalcBCQuestions,
      'ap-lang': loadAPLangQuestions,
      'ap-calculus-ab': loadAPCalcABQuestions,
      'ap-statistics': loadAPStatsQuestions,
      'ap-euro-history': loadAPEuroQuestions,
      'ap-human-geo': loadAPHuGQuestions,
      'ap-environmental-science': loadAPESQuestions,
      'ap-csp': loadAPCSPQuestions,
      'ap-physics-2': loadAPPhys2Questions,
      'ap-biology': loadAPBioQuestions,
      'ap-physics-1': loadAPPhys1Questions,
      'ap-us-gov': loadAPUSGovQuestions,
      'ap-macro': loadAPMacroQuestions,
      'ap-micro': loadAPMicroQuestions,
      'ap-german': loadAPGermanQuestions,
      'ap-italian': loadAPItalianQuestions,
      'ap-french': loadAPFrenchLangQuestions,
      'ap-spanish-lit': loadAPSpanishLitQuestions,
    };
    const setters: Record<string, (v: Record<string, Question[]>) => void> = {
      'ap-chemistry': setChemQuestions,
      'ap-us-history': setUshQuestions,
      'ap-english-lit': setLitQuestions,
      'ap-calculus-bc': setCalcBCQuestions,
      'ap-lang': setLangQuestions,
      'ap-calculus-ab': setCalcABQuestions,
      'ap-statistics': setStatsQuestions,
      'ap-euro-history': setEuroQuestions,
      'ap-human-geo': setHugQuestions,
      'ap-environmental-science': setEsQuestions,
      'ap-csp': setCspQuestions,
      'ap-physics-2': setPhys2Questions,
      'ap-biology': setBioQuestions,
      'ap-physics-1': setPhys1Questions,
      'ap-us-gov': setUsgovQuestions,
      'ap-macro': setMacroQuestions,
      'ap-micro': setMicroQuestions,
      'ap-german': setGermanQuestions,
      'ap-italian': setItalianQuestions,
      'ap-french': setFrenchLangQuestions,
      'ap-spanish-lit': setSpanishLitQuestions,
    };
    if (subjectId && loaders[subjectId]) {
      loaders[subjectId]().then(setters[subjectId]);
    }
  }, [subjectId]);

  // Progressive hints — derived from current quiz question (if any). Hook must run unconditionally.
  const activeQ = view.mode === 'quiz' ? view.questions[view.currentIndex] : undefined;
  const hintSubject = subject?.name?.includes('Math') || subject?.name?.includes('Calc') || subject?.name?.includes('Stat') || subject?.name?.includes('Phys') || subject?.name?.includes('Chem') || subject?.name?.includes('Bio')
    ? 'Math'
    : 'Reading';
  const hints = useProgressiveHints({
    questionKey: activeQ?.id,
    subject: hintSubject,
    difficulty: (activeQ as any)?.difficultyRating,
    skillId: activeQ?.skill,
  });

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center space-y-4 max-w-sm">
          <h2 className="text-xl font-bold">Subject Not Found</h2>
          <p className="text-muted-foreground text-sm">This AP subject doesn't exist or hasn't been added yet.</p>
          <Button onClick={() => navigate("/ap-tests")}>Back to AP Tests</Button>
        </Card>
      </div>
    );
  }

  // Determine which units config to use based on subject
  const subjectMap: Record<string, { units: any[]; questions: Record<string, Question[]> }> = {
    'ap-chemistry': { units: AP_CHEM_UNITS, questions: chemQuestions },
    'ap-us-history': { units: AP_USH_UNITS, questions: ushQuestions },
    'ap-english-lit': { units: AP_LIT_UNITS, questions: litQuestions },
    'ap-calculus-bc': { units: AP_CALC_BC_UNITS, questions: calcBCQuestions },
    'ap-lang': { units: AP_LANG_UNITS, questions: langQuestions },
    'ap-calculus-ab': { units: AP_CALC_AB_UNITS, questions: calcABQuestions },
    'ap-statistics': { units: AP_STATS_UNITS, questions: statsQuestions },
    'ap-euro-history': { units: AP_EURO_UNITS, questions: euroQuestions },
    'ap-human-geo': { units: AP_HUG_UNITS, questions: hugQuestions },
    'ap-environmental-science': { units: AP_ES_UNITS, questions: esQuestions },
    'ap-csp': { units: AP_CSP_UNITS, questions: cspQuestions },
    'ap-physics-2': { units: AP_PHYS2_UNITS, questions: phys2Questions },
    'ap-biology': { units: AP_BIO_UNITS, questions: bioQuestions },
    'ap-physics-1': { units: AP_PHYS1_UNITS, questions: phys1Questions },
    'ap-us-gov': { units: AP_USGOV_UNITS, questions: usgovQuestions },
    'ap-macro': { units: AP_MACRO_UNITS, questions: macroQuestions },
    'ap-micro': { units: AP_MICRO_UNITS, questions: microQuestions },
    'ap-german': { units: AP_GERMAN_UNITS, questions: germanQuestions },
    'ap-italian': { units: AP_ITALIAN_UNITS, questions: italianQuestions },
    'ap-french': { units: AP_FRENCH_LANG_UNITS, questions: frenchLangQuestions },
    'ap-spanish-lit': { units: AP_SPANISH_LIT_UNITS, questions: spanishLitQuestions },
  };
  const current = subjectMap[subjectId || ''] || { units: [], questions: {} };
  const units = current.units;
  const questionsByUnit = current.questions;

  const startQuiz = (unit: APChemUnit) => {
    const questions = questionsByUnit[unit.id] || [];
    if (questions.length === 0) return;
    setView({ mode: 'quiz', unit, questions, currentIndex: 0, selectedAnswer: null, showResult: false, score: 0, answered: 0 });
    setShowAITutor(false);
  };

  const handleSelectAnswer = (letter: string) => {
    if (view.mode !== 'quiz' || view.showResult) return;
    setView({ ...view, selectedAnswer: letter });
  };

  const handleConfirm = () => {
    if (view.mode !== 'quiz' || !view.selectedAnswer) return;
    const isCorrect = view.selectedAnswer === view.questions[view.currentIndex].correctAnswer;
    setView({
      ...view,
      showResult: true,
      score: view.score + (isCorrect ? 1 : 0),
      answered: view.answered + 1,
    });
    setShowAITutor(false);
  };

  const handleNext = () => {
    if (view.mode !== 'quiz') return;
    const nextIndex = view.currentIndex + 1;
    if (nextIndex >= view.questions.length) {
      setView({ mode: 'results', unit: view.unit, score: view.score, total: view.questions.length });
    } else {
      setView({ ...view, currentIndex: nextIndex, selectedAnswer: null, showResult: false });
      setShowAITutor(false);
    }
  };

  // ─── Units list view ───
  if (view.mode === 'units') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/ap-tests")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-2xl">{subject.icon}</span>
                {subject.name}
              </h1>
              <p className="text-sm text-muted-foreground">{subject.description}</p>
            </div>
          </div>

          {/* Essay grader CTA for writing-heavy subjects */}
          {(subjectId === 'ap-us-history' || subjectId === 'ap-lang') && (
            <Card
              className="p-4 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md border-primary/30 bg-primary/5"
              onClick={() => navigate(subjectId === 'ap-us-history' ? '/essay-grader?rubric=apush_dbq' : '/essay-grader')}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">
                    {subjectId === 'ap-us-history' ? '✍️ AI DBQ Grader' : '✍️ AI Essay Grader'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {subjectId === 'ap-us-history'
                      ? 'Paste your DBQ essay → get 7-point rubric scores + feedback'
                      : 'Grade Rhetorical Analysis, Synthesis, or Argument essays (6-point rubric)'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Card>
          )}

          {/* FRQ Practice CTA */}
          {subjectId && FRQ_SUBJECT_MAP[subjectId] && (
            <Card
              className="p-4 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md border-accent/30 bg-accent/5"
              onClick={() => navigate(`/ap-frq/${subjectId}`)}
            >
              <div className="flex items-center gap-3">
                <PenLine className="w-6 h-6 text-accent-foreground" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">📝 FRQ Practice</h3>
                  <p className="text-xs text-muted-foreground">
                    {FRQ_SUBJECT_MAP[subjectId].types.map(t => t.toUpperCase()).join(' • ')} with AI grading
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Card>
          )}

          {units.length > 0 ? (
            <div className="grid gap-3">
              {units.map(unit => {
                const questions = questionsByUnit[unit.id] || [];
                const count = questions.length;
                return (
                  <Card
                    key={unit.id}
                    className={`p-4 transition-all ${count > 0 ? 'cursor-pointer hover:scale-[1.01] hover:shadow-md hover:border-primary/40' : 'opacity-50 cursor-not-allowed border-dashed'}`}
                    onClick={() => count > 0 && startQuiz(unit)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{unit.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">Unit {unit.unitNumber}: {unit.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{unit.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground">{count} Q{count !== 1 ? 's' : ''}</span>
                        {count > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Questions Coming Soon!</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                We're building the {subject.name} question bank.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>Score range: {subject.scoreRange.min}–{subject.scoreRange.max}</span>
              </div>
              <Button variant="outline" onClick={() => navigate("/ap-tests")}>
                ← Browse Other AP Subjects
              </Button>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // ─── Results view ───
  if (view.mode === 'results') {
    const pct = Math.round((view.score / view.total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-lg mx-auto space-y-6 pt-8">
          <Card className="p-8 text-center space-y-4">
            <div className="text-5xl">{pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚'}</div>
            <h2 className="text-2xl font-bold">Unit {view.unit.unitNumber} Complete!</h2>
            <p className="text-lg font-semibold text-primary">{view.score} / {view.total} correct ({pct}%)</p>
            <p className="text-sm text-muted-foreground">{view.unit.name}</p>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={() => setView({ mode: 'units' })}>Back to Units</Button>
              <Button onClick={() => startQuiz(view.unit)}>Retry Unit</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ─── Quiz view ───
  const q = view.questions[view.currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setView({ mode: 'units' })} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Units
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            Unit {view.unit.unitNumber} • Q{view.currentIndex + 1}/{view.questions.length}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-primary">
              {view.score}/{view.answered}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setIsFlagModalOpen(true)} title="Report issue">
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((view.currentIndex + (view.showResult ? 1 : 0)) / view.questions.length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <Card className="p-5 sm:p-6 shadow-xl border-2 space-y-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">
            {q.domain} • {q.skill}
          </p>
          <h2 className="text-base sm:text-lg font-bold leading-relaxed whitespace-pre-wrap">
            <MathText text={q.question} />
          </h2>

          <div className="space-y-2">
            {q.options.map(option => {
              const isSelected = view.selectedAnswer === option.letter;
              const isCorrect = option.letter === q.correctAnswer;
              const showCorrect = view.showResult && isCorrect;
              const showWrong = view.showResult && isSelected && !isCorrect;

              return (
                <button
                  key={option.letter}
                  onClick={() => handleSelectAnswer(option.letter)}
                  disabled={view.showResult}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    !view.showResult && !isSelected ? 'border-border hover:border-primary hover:bg-primary/5' : ''
                  } ${!view.showResult && isSelected ? 'border-primary bg-primary/10' : ''} ${
                    showCorrect ? 'border-green-500 bg-green-500/10' : ''
                  } ${showWrong ? 'border-destructive bg-destructive/10' : ''} ${
                    view.showResult ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold text-base min-w-[1.5rem] ${showCorrect ? 'text-green-600' : ''} ${showWrong ? 'text-destructive' : ''} ${!view.showResult && isSelected ? 'text-primary' : ''}`}>
                      {option.letter}.
                    </span>
                    <span className="flex-1 text-sm"><MathText text={option.text} /></span>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                    {showWrong && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {view.showResult && (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-semibold mb-1 text-foreground">Explanation:</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <MathText text={q.explanation} />
                </p>
              </div>

              {/* AI Tutor button */}
              {!showAITutor && (
                <Button variant="outline" size="sm" onClick={() => setShowAITutor(true)} className="gap-2 w-full">
                  <Sparkles className="w-4 h-4" /> Ask AI Tutor for deeper explanation
                </Button>
              )}
            </div>
          )}
        </Card>

        {!view.showResult && (
          <ProgressiveHintPanel
            hints={hints.hints}
            revealedCount={hints.revealedCount}
            allShown={hints.allShown}
            onRevealNext={hints.revealNext}
            compact
          />
        )}

        {/* AI Tutor */}
        {showAITutor && view.showResult && (
          <AITutorExplanation
            question={q.question}
            options={q.options}
            correctAnswer={q.correctAnswer}
            userAnswer={view.selectedAnswer || ''}
            explanation={q.explanation}
            onClose={() => setShowAITutor(false)}
          />
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          {!view.showResult ? (
            <Button onClick={handleConfirm} disabled={!view.selectedAnswer} className="min-w-[120px]">
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="min-w-[120px]">
              {view.currentIndex + 1 >= view.questions.length ? 'See Results' : 'Next →'}
            </Button>
          )}
        </div>
        {view.mode === 'quiz' && (
          <FlagQuestionModal
            isOpen={isFlagModalOpen}
            onClose={() => setIsFlagModalOpen(false)}
            questionId={q.id}
            questionType="science"
            questionData={{ question: q.question, options: q.options, correctAnswer: q.correctAnswer, explanation: q.explanation }}
          />
        )}
      </div>
    </div>
  );
};

export default APStudy;
