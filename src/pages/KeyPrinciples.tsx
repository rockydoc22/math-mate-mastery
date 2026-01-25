import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Calculator, PenTool, Search, Lightbulb, 
  AlertTriangle, Target, Crown, ChevronDown, ChevronUp,
  Bookmark, BookmarkCheck, Shuffle, CheckCircle, XCircle,
  RotateCcw, Brain, Sparkles
} from "lucide-react";
import { mathKeyConcepts, englishKeyConcepts, KeyConcept } from "@/data/satKeyConcepts";
import { Progress } from "@/components/ui/progress";

// LocalStorage key for bookmarks
const BOOKMARKS_KEY = "sat-concept-bookmarks";

// Quiz question types
type QuizQuestionType = "insight" | "tip" | "trap" | "level1600";

interface QuizQuestion {
  concept: KeyConcept;
  questionType: QuizQuestionType;
  question: string;
  correctAnswer: string;
  options: string[];
}

const KeyPrinciples = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());
  const [bookmarkedConcepts, setBookmarkedConcepts] = useState<Set<string>>(new Set());
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("math");
  
  // Quiz state
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizSubject, setQuizSubject] = useState<"math" | "english" | "both">("both");

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    if (saved) {
      try {
        setBookmarkedConcepts(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to load bookmarks:", e);
      }
    }
  }, []);

  // Save bookmarks to localStorage
  const saveBookmarks = (bookmarks: Set<string>) => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...bookmarks]));
  };

  const toggleBookmark = (skill: string) => {
    const newBookmarks = new Set(bookmarkedConcepts);
    if (newBookmarks.has(skill)) {
      newBookmarks.delete(skill);
    } else {
      newBookmarks.add(skill);
    }
    setBookmarkedConcepts(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  const toggleExpand = (skill: string) => {
    const newExpanded = new Set(expandedConcepts);
    if (newExpanded.has(skill)) {
      newExpanded.delete(skill);
    } else {
      newExpanded.add(skill);
    }
    setExpandedConcepts(newExpanded);
  };

  const filterConcepts = (concepts: KeyConcept[]) => {
    let filtered = concepts;
    
    if (showBookmarkedOnly) {
      filtered = filtered.filter(c => bookmarkedConcepts.has(c.skill));
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.skill.toLowerCase().includes(query) ||
        c.domain.toLowerCase().includes(query) ||
        c.keyInsight.toLowerCase().includes(query) ||
        c.satTip.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  // Generate quiz questions
  const generateQuizQuestions = (subject: "math" | "english" | "both") => {
    let concepts: KeyConcept[] = [];
    
    if (subject === "math" || subject === "both") {
      concepts = [...concepts, ...mathKeyConcepts];
    }
    if (subject === "english" || subject === "both") {
      concepts = [...concepts, ...englishKeyConcepts];
    }
    
    // Shuffle and take 10 concepts
    const shuffled = [...concepts].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    
    const questions: QuizQuestion[] = selected.map(concept => {
      // Randomly choose question type based on available data
      const types: QuizQuestionType[] = ["insight", "tip"];
      if (concept.advancedTrap) types.push("trap");
      if (concept.level1600Insight) types.push("level1600");
      
      const questionType = types[Math.floor(Math.random() * types.length)];
      
      let question = "";
      let correctAnswer = "";
      
      switch (questionType) {
        case "insight":
          question = `What is the key insight for "${concept.skill}"?`;
          correctAnswer = concept.keyInsight;
          break;
        case "tip":
          question = `What is the SAT tip for "${concept.skill}"?`;
          correctAnswer = concept.satTip;
          break;
        case "trap":
          question = `What is the advanced trap for "${concept.skill}"?`;
          correctAnswer = concept.advancedTrap || "";
          break;
        case "level1600":
          question = `What is the Level 1600 insight for "${concept.skill}"?`;
          correctAnswer = concept.level1600Insight || "";
          break;
      }
      
      // Generate wrong options from other concepts
      const otherConcepts = concepts.filter(c => c.skill !== concept.skill);
      const shuffledOthers = [...otherConcepts].sort(() => Math.random() - 0.5);
      
      const wrongOptions = shuffledOthers.slice(0, 3).map(c => {
        switch (questionType) {
          case "insight": return c.keyInsight;
          case "tip": return c.satTip;
          case "trap": return c.advancedTrap || c.satTip;
          case "level1600": return c.level1600Insight || c.keyInsight;
          default: return c.keyInsight;
        }
      });
      
      // Shuffle options
      const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        concept,
        questionType,
        question,
        correctAnswer,
        options
      };
    });
    
    return questions;
  };

  const startQuiz = (subject: "math" | "english" | "both") => {
    setQuizSubject(subject);
    const questions = generateQuizQuestions(subject);
    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuizScore(0);
    setQuizComplete(false);
    setQuizMode(true);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    setShowAnswer(true);
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizComplete(true);
    }
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setQuizComplete(false);
  };

  const ConceptCard = ({ concept }: { concept: KeyConcept }) => {
    const isExpanded = expandedConcepts.has(concept.skill);
    const isBookmarked = bookmarkedConcepts.has(concept.skill);
    
    return (
      <Card className="p-4 border-2 hover:border-primary/30 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => toggleExpand(concept.skill)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {concept.domain}
              </span>
            </div>
            <h3 className="font-semibold text-foreground">{concept.skill}</h3>
            <p className="text-sm text-muted-foreground mt-1">{concept.keyInsight}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(concept.skill);
              }}
              className={isBookmarked ? "text-amber-500" : "text-muted-foreground"}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0"
              onClick={() => toggleExpand(concept.skill)}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            {/* SAT Tip */}
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 h-fit">
                <Lightbulb className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">SAT Tip</p>
                <p className="text-sm">{concept.satTip}</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-destructive/10 h-fit">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-xs font-semibold text-destructive mb-1">Common Mistakes</p>
                <ul className="text-sm space-y-1">
                  {concept.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advanced Trap */}
            {concept.advancedTrap && (
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10 h-fit">
                  <Target className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">Advanced Trap</p>
                  <p className="text-sm">{concept.advancedTrap}</p>
                </div>
              </div>
            )}

            {/* Level 1600 Insight */}
            {concept.level1600Insight && (
              <div className="flex gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="p-2 rounded-lg bg-amber-500/20 h-fit">
                  <Crown className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">🏆 Level 1600 Insight</p>
                  <p className="text-sm font-medium">{concept.level1600Insight}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  };

  const filteredMath = filterConcepts(mathKeyConcepts);
  const filteredEnglish = filterConcepts(englishKeyConcepts);
  const bookmarkCount = bookmarkedConcepts.size;

  // Quiz Mode UI
  if (quizMode) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    if (quizComplete) {
      const percentage = Math.round((quizScore / quizQuestions.length) * 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <div className="mb-6">
                {percentage >= 80 ? (
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <Crown className="w-10 h-10 text-emerald-500" />
                  </div>
                ) : percentage >= 60 ? (
                  <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                    <Brain className="w-10 h-10 text-amber-500" />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-4xl font-bold text-primary mb-2">{quizScore}/{quizQuestions.length}</p>
              <p className="text-muted-foreground mb-6">{percentage}% correct</p>
              
              {percentage >= 80 && (
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-6">
                  🏆 Excellent! You're mastering these concepts!
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-amber-600 dark:text-amber-400 font-medium mb-6">
                  💪 Good job! Keep reviewing to solidify your knowledge.
                </p>
              )}
              {percentage < 60 && (
                <p className="text-primary font-medium mb-6">
                  📚 Review the concepts and try again to improve!
                </p>
              )}
              
              <div className="flex flex-col gap-3">
                <Button onClick={() => startQuiz(quizSubject)} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={exitQuiz}>
                  Back to Concepts
                </Button>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Quiz Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={exitQuiz}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
              <p className="text-xs text-muted-foreground">Score: {quizScore}</p>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="mb-6 h-2" />

          {/* Question Card */}
          <Card className="p-6 mb-4">
            <div className="mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {currentQuestion.concept.domain}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isCorrect = option === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === option;
                
                let buttonClass = "w-full text-left p-4 h-auto justify-start";
                if (showAnswer) {
                  if (isCorrect) {
                    buttonClass += " bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += " bg-destructive/20 border-destructive text-destructive";
                  }
                }
                
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showAnswer}
                  >
                    <div className="flex items-start gap-3 w-full">
                      {showAnswer && isCorrect && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                      {showAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                      <span className="text-sm leading-relaxed">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Next Button */}
          {showAnswer && (
            <Button onClick={nextQuestion} className="w-full" size="lg">
              {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Normal Browse Mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Key SAT Principles</h1>
            <p className="text-sm text-muted-foreground">High-yield concepts for 1600</p>
          </div>
        </div>

        {/* Quiz Start Card */}
        <Card className="p-4 mb-6 border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Brain className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold">Concept Quiz</h3>
              <p className="text-xs text-muted-foreground">Test your knowledge of key principles</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => startQuiz("math")}
              className="gap-1"
            >
              <Calculator className="w-4 h-4" />
              Math
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => startQuiz("english")}
              className="gap-1"
            >
              <PenTool className="w-4 h-4" />
              English
            </Button>
            <Button 
              size="sm" 
              onClick={() => startQuiz("both")}
              className="gap-1 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Shuffle className="w-4 h-4" />
              Both
            </Button>
          </div>
        </Card>

        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showBookmarkedOnly ? "default" : "outline"}
            size="icon"
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className="flex-shrink-0"
          >
            <BookmarkCheck className="w-4 h-4" />
          </Button>
        </div>

        {/* Bookmark Count */}
        {bookmarkCount > 0 && (
          <p className="text-xs text-muted-foreground mb-4">
            {bookmarkCount} concept{bookmarkCount !== 1 ? "s" : ""} bookmarked
          </p>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="math" className="gap-2">
              <Calculator className="w-4 h-4" />
              Math ({filteredMath.length})
            </TabsTrigger>
            <TabsTrigger value="english" className="gap-2">
              <PenTool className="w-4 h-4" />
              English ({filteredEnglish.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="math" className="space-y-3">
            {filteredMath.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {showBookmarkedOnly ? "No bookmarked Math concepts" : "No concepts match your search"}
              </p>
            ) : (
              filteredMath.map((concept) => (
                <ConceptCard key={concept.skill} concept={concept} />
              ))
            )}
          </TabsContent>

          <TabsContent value="english" className="space-y-3">
            {filteredEnglish.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {showBookmarkedOnly ? "No bookmarked English concepts" : "No concepts match your search"}
              </p>
            ) : (
              filteredEnglish.map((concept) => (
                <ConceptCard key={concept.skill} concept={concept} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KeyPrinciples;
