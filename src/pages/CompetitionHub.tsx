import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, XCircle, Lightbulb, Trophy, Clock, Users, BookOpen } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { SolutionPathAnalysis } from "@/components/SolutionPathAnalysis";
import { STEM_COMPETITION_CATEGORIES, type Competition, type SampleQuestion } from "@/data/stem_competitions";

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Intermediate: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  Advanced: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  Elite: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

const Q_DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  Hard: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

const CompetitionHub = () => {
  const { competitionId } = useParams<{ competitionId: string }>();
  const [showTips, setShowTips] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [showPathAnalysis, setShowPathAnalysis] = useState<Set<string>>(new Set());

  // Find the competition
  let competition: Competition | null = null;
  let categoryName = '';
  for (const cat of STEM_COMPETITION_CATEGORIES) {
    const found = cat.competitions.find(c => c.id === competitionId);
    if (found) {
      competition = found;
      categoryName = cat.name;
      break;
    }
  }

  if (!competition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Competition not found</h1>
          <Link to="/competitions"><Button variant="outline">Back to Competitions</Button></Link>
        </div>
      </div>
    );
  }

  const handleSelectAnswer = (qId: string, answer: string) => {
    if (revealedAnswers.has(qId)) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const handleReveal = (qId: string) => {
    setRevealedAnswers(prev => new Set(prev).add(qId));
  };

  const renderQuestion = (q: SampleQuestion) => {
    const isRevealed = revealedAnswers.has(q.id);
    const selected = selectedAnswers[q.id];
    const isCorrect = selected === q.answer;

    return (
      <Card key={q.id} className="p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${Q_DIFFICULTY_COLORS[q.difficulty]}`}>
            {q.difficulty}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
            {q.topic}
          </span>
        </div>
        <p className="text-sm font-medium text-foreground leading-relaxed">{q.question}</p>

        {q.options && (
          <div className="grid gap-2">
            {q.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              const isSelected = selected === opt;
              const isAnswer = opt === q.answer;
              let optClass = 'border border-border bg-background hover:bg-muted/50 cursor-pointer';
              if (isRevealed) {
                if (isAnswer) optClass = 'border-2 border-green-500 bg-green-500/10';
                else if (isSelected && !isAnswer) optClass = 'border-2 border-red-500 bg-red-500/10';
                else optClass = 'border border-border bg-background opacity-50';
              } else if (isSelected) {
                optClass = 'border-2 border-primary bg-primary/10';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelectAnswer(q.id, opt)}
                  className={`text-left p-3 rounded-lg text-sm transition-all ${optClass}`}
                  disabled={isRevealed}
                >
                  <span className="font-bold mr-2 text-muted-foreground">{letter}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {selected && !isRevealed && (
          <Button size="sm" onClick={() => handleReveal(q.id)} className="w-full">
            Check Answer
          </Button>
        )}

        {isRevealed && (
          <div className={`p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
            <div className="flex items-center gap-2 mb-1 font-bold">
              {isCorrect ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
              {isCorrect ? 'Correct!' : `Incorrect — Answer: ${q.answer}`}
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">{q.explanation}</p>
            {!showPathAnalysis.has(q.id) && (
              <Button
                size="sm"
                variant="outline"
                className="mt-2 gap-2 text-xs"
                onClick={() => setShowPathAnalysis(prev => new Set(prev).add(q.id))}
              >
                <Lightbulb className="w-3 h-3" />
                Analyze My Solution Path
              </Button>
            )}
          </div>
        )}

        {isRevealed && showPathAnalysis.has(q.id) && (
          <SolutionPathAnalysis
            question={q.question}
            options={q.options?.map((opt, i) => ({ letter: String.fromCharCode(65 + i), text: opt }))}
            correctAnswer={q.answer}
            competitionType={competition?.name || 'academic competition'}
            onClose={() => setShowPathAnalysis(prev => { const n = new Set(prev); n.delete(q.id); return n; })}
          />
        )}
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/competitions">
            <Button variant="ghost" size="icon" className="shrink-0"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold flex items-center gap-2 truncate">
              {competition.icon} {competition.name}
            </h1>
            <p className="text-xs text-muted-foreground">{categoryName}</p>
          </div>
          <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${DIFFICULTY_COLORS[competition.difficulty]}`}>
            {competition.difficulty}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-5">
        {/* Overview Card */}
        <Card className="p-5 space-y-3">
          <p className="text-sm text-foreground leading-relaxed">{competition.description}</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{competition.format.split('.')[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 shrink-0" />
              <span>{competition.teamSize}</span>
            </div>
          </div>
        </Card>

        {/* Format Details */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm">Competition Format</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{competition.format}</p>
        </Card>

        {/* Tips */}
        <Card className="p-4">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <h3 className="font-bold text-sm">Preparation Tips</h3>
            </div>
            {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showTips && (
            <ul className="mt-3 space-y-2">
              {competition.tips.map((tip, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Sample Practice */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Sample Practice</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
              {competition.sampleQuestions.length} questions
            </span>
          </div>
          <div className="space-y-3">
            {competition.sampleQuestions.map(q => renderQuestion(q))}
          </div>
        </div>

        {/* Score Summary */}
        {revealedAnswers.size > 0 && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Practice Score</h3>
                <p className="text-xs text-muted-foreground">
                  {competition.sampleQuestions.filter(q => revealedAnswers.has(q.id) && selectedAnswers[q.id] === q.answer).length} / {revealedAnswers.size} correct
                </p>
              </div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(
                  (competition.sampleQuestions.filter(q => revealedAnswers.has(q.id) && selectedAnswers[q.id] === q.answer).length / revealedAnswers.size) * 100
                )}%
              </div>
            </div>
          </Card>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CompetitionHub;
