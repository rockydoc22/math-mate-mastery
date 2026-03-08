import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Volume2, ChevronRight, CheckCircle2, XCircle, RefreshCw, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";

interface WordEntry {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  synonyms: string[];
  satTip?: string;
  difficulty: "common" | "moderate" | "advanced";
}

const WORD_BANK: WordEntry[] = [
  { word: "Ubiquitous", pronunciation: "yoo-BIK-wih-tus", partOfSpeech: "adjective", definition: "Present, appearing, or found everywhere", example: "Smartphones have become ubiquitous in modern society.", synonyms: ["omnipresent", "pervasive", "universal"], satTip: "Often used in science/tech passages about widespread phenomena.", difficulty: "moderate" },
  { word: "Pragmatic", pronunciation: "prag-MAT-ik", partOfSpeech: "adjective", definition: "Dealing with things sensibly and realistically", example: "She took a pragmatic approach to solving the budget crisis.", synonyms: ["practical", "realistic", "sensible"], satTip: "Contrasted with 'idealistic' in argumentative passages.", difficulty: "moderate" },
  { word: "Ephemeral", pronunciation: "ih-FEM-er-ul", partOfSpeech: "adjective", definition: "Lasting for a very short time", example: "The ephemeral beauty of cherry blossoms draws millions of visitors each spring.", synonyms: ["fleeting", "transient", "brief"], satTip: "Common in literary passages about time and change.", difficulty: "advanced" },
  { word: "Meticulous", pronunciation: "meh-TIK-yoo-lus", partOfSpeech: "adjective", definition: "Showing great attention to detail; very careful", example: "The scientist was meticulous in recording every observation.", synonyms: ["thorough", "precise", "painstaking"], difficulty: "common" },
  { word: "Ambivalent", pronunciation: "am-BIV-uh-lent", partOfSpeech: "adjective", definition: "Having mixed feelings or contradictory ideas", example: "She felt ambivalent about moving to a new city.", synonyms: ["uncertain", "conflicted", "torn"], satTip: "Watch for this as an answer choice for author's tone.", difficulty: "moderate" },
  { word: "Exacerbate", pronunciation: "ig-ZAS-er-bayt", partOfSpeech: "verb", definition: "To make a problem or situation worse", example: "The drought exacerbated the already dire food shortage.", synonyms: ["worsen", "aggravate", "intensify"], difficulty: "advanced" },
  { word: "Empirical", pronunciation: "em-PEER-ih-kul", partOfSpeech: "adjective", definition: "Based on observation or experience rather than theory", example: "The study provided empirical evidence for the new treatment.", synonyms: ["observed", "experimental", "factual"], satTip: "Frequently appears in science passages.", difficulty: "moderate" },
  { word: "Candid", pronunciation: "KAN-did", partOfSpeech: "adjective", definition: "Truthful and straightforward; frank", example: "The candidate gave a surprisingly candid interview about her mistakes.", synonyms: ["honest", "frank", "straightforward"], difficulty: "common" },
  { word: "Bolster", pronunciation: "BOWL-ster", partOfSpeech: "verb", definition: "To support, strengthen, or reinforce", example: "New data bolstered the researcher's hypothesis.", synonyms: ["strengthen", "support", "reinforce"], satTip: "Often used in paired passages about evidence.", difficulty: "common" },
  { word: "Nuance", pronunciation: "NOO-ahns", partOfSpeech: "noun", definition: "A subtle difference in meaning, expression, or sound", example: "The nuances of the poem were lost in translation.", synonyms: ["subtlety", "distinction", "shade"], satTip: "Key concept for reading comprehension — SAT loves testing subtle differences.", difficulty: "moderate" },
  { word: "Enumerate", pronunciation: "ih-NOO-meh-rayt", partOfSpeech: "verb", definition: "To mention things one by one; to list", example: "The report enumerated the key findings of the study.", synonyms: ["list", "itemize", "catalog"], difficulty: "moderate" },
  { word: "Benevolent", pronunciation: "beh-NEV-uh-lent", partOfSpeech: "adjective", definition: "Well-meaning and kindly; charitable", example: "The benevolent donor funded scholarships for underprivileged students.", synonyms: ["kind", "generous", "charitable"], difficulty: "common" },
  { word: "Unprecedented", pronunciation: "un-PRESS-ih-dent-ed", partOfSpeech: "adjective", definition: "Never done or known before", example: "The pandemic caused unprecedented disruption to global supply chains.", synonyms: ["unparalleled", "unmatched", "novel"], difficulty: "common" },
  { word: "Reticent", pronunciation: "RET-ih-sent", partOfSpeech: "adjective", definition: "Not revealing one's thoughts or feelings readily", example: "He was reticent about his childhood experiences.", synonyms: ["reserved", "restrained", "taciturn"], satTip: "Don't confuse with 'reluctant' — reticent is specifically about communication.", difficulty: "advanced" },
  { word: "Corroborate", pronunciation: "kuh-ROB-uh-rayt", partOfSpeech: "verb", definition: "To confirm or give support to a statement or theory", example: "Witnesses corroborated the defendant's alibi.", synonyms: ["confirm", "verify", "validate"], satTip: "Common in evidence-based question stems.", difficulty: "advanced" },
  { word: "Succinct", pronunciation: "suk-SINKT", partOfSpeech: "adjective", definition: "Briefly and clearly expressed", example: "Her succinct summary captured the essence of the 300-page report.", synonyms: ["concise", "brief", "terse"], difficulty: "moderate" },
  { word: "Catalyst", pronunciation: "KAT-uh-list", partOfSpeech: "noun", definition: "Something that causes an important change or event", example: "The protest served as a catalyst for social reform.", synonyms: ["trigger", "stimulus", "spark"], satTip: "Used both literally (chemistry) and figuratively on the SAT.", difficulty: "common" },
  { word: "Elusive", pronunciation: "ih-LOO-siv", partOfSpeech: "adjective", definition: "Difficult to find, catch, or achieve", example: "A cure for the common cold remains elusive.", synonyms: ["evasive", "slippery", "hard to pin down"], difficulty: "common" },
  { word: "Mitigate", pronunciation: "MIT-ih-gayt", partOfSpeech: "verb", definition: "To make less severe, serious, or painful", example: "Planting trees can mitigate the effects of climate change.", synonyms: ["alleviate", "reduce", "lessen"], satTip: "Often paired with 'exacerbate' as contrasting concepts.", difficulty: "moderate" },
  { word: "Prolific", pronunciation: "proh-LIF-ik", partOfSpeech: "adjective", definition: "Producing much fruit, foliage, or many offspring; highly productive", example: "The prolific author published over 50 novels in her career.", synonyms: ["productive", "fertile", "abundant"], difficulty: "moderate" },
  { word: "Disparity", pronunciation: "dih-SPAR-ih-tee", partOfSpeech: "noun", definition: "A great difference; inequality", example: "The disparity in income between rich and poor continues to grow.", synonyms: ["inequality", "gap", "difference"], satTip: "Common in social science passages about inequality.", difficulty: "moderate" },
];

const WordOfTheDay = () => {
  const navigate = useNavigate();
  const [todayWord, setTodayWord] = useState<WordEntry | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizWords, setQuizWords] = useState<WordEntry[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  useEffect(() => {
    // Deterministic word of the day based on date
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const wordIndex = dayOfYear % WORD_BANK.length;
    setTodayWord(WORD_BANK[wordIndex]);

    const saved = localStorage.getItem("learned-words");
    if (saved) setLearnedWords(JSON.parse(saved));
  }, []);

  const markLearned = (word: string) => {
    const updated = learnedWords.includes(word) ? learnedWords.filter(w => w !== word) : [...learnedWords, word];
    setLearnedWords(updated);
    localStorage.setItem("learned-words", JSON.stringify(updated));
  };

  const startQuiz = () => {
    const shuffled = [...WORD_BANK].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuizWords(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizDone(false);
    setQuizAnswer(null);
    generateOptions(shuffled, 0);
    setQuizMode(true);
  };

  const generateOptions = (words: WordEntry[], index: number) => {
    const correct = words[index].definition;
    const others = WORD_BANK
      .filter(w => w.word !== words[index].word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.definition);
    const options = [correct, ...others].sort(() => Math.random() - 0.5);
    setQuizOptions(options);
  };

  const handleQuizAnswer = (optIndex: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(optIndex);
    const isCorrect = quizOptions[optIndex] === quizWords[quizIndex].definition;
    if (isCorrect) setQuizScore(prev => prev + 1);

    setTimeout(() => {
      if (quizIndex + 1 >= quizWords.length) {
        setQuizDone(true);
      } else {
        const next = quizIndex + 1;
        setQuizIndex(next);
        setQuizAnswer(null);
        generateOptions(quizWords, next);
      }
    }, 1500);
  };

  const getDifficultyColor = (d: string) => {
    if (d === "common") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    if (d === "moderate") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  if (quizMode) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setQuizMode(false)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Vocab Quiz</h1>
            <p className="text-xs text-muted-foreground">{quizDone ? "Results" : `Question ${quizIndex + 1}/${quizWords.length}`}</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto p-4">
          {quizDone ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <Sparkles className="w-10 h-10 mx-auto text-primary mb-3" />
                <p className="text-4xl font-black text-foreground">{quizScore}/{quizWords.length}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {quizScore === quizWords.length ? "🔥 Perfect!" : quizScore >= 3 ? "⭐ Nice work!" : "💪 Keep studying!"}
                </p>
              </Card>
              <Button className="w-full" onClick={startQuiz}><RefreshCw className="w-4 h-4 mr-2" /> Try Again</Button>
              <Button variant="outline" className="w-full" onClick={() => setQuizMode(false)}>Back to Words</Button>
            </motion.div>
          ) : (
            <motion.div key={quizIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <Card className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase mb-1">What does this word mean?</p>
                <p className="text-2xl font-black text-foreground">{quizWords[quizIndex].word}</p>
                <p className="text-xs text-muted-foreground italic mt-1">({quizWords[quizIndex].partOfSpeech})</p>
              </Card>

              <div className="space-y-2">
                {quizOptions.map((opt, i) => {
                  const isCorrect = opt === quizWords[quizIndex].definition;
                  const isSelected = quizAnswer === i;
                  let borderClass = "border-border";
                  if (quizAnswer !== null) {
                    if (isCorrect) borderClass = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10";
                    else if (isSelected) borderClass = "border-destructive bg-red-50/50 dark:bg-red-900/10";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(i)}
                      disabled={quizAnswer !== null}
                      className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${borderClass} ${
                        quizAnswer === null ? "hover:border-primary/50 hover:bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {quizAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                        {quizAnswer !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />}
                        <span className="text-foreground">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Word of the Day</h1>
          <p className="text-xs text-muted-foreground">Build your SAT vocabulary</p>
        </div>
        <Button size="sm" variant="outline" onClick={startQuiz}>Quiz Me</Button>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Today's Word */}
        {todayWord && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Today's Word</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${getDifficultyColor(todayWord.difficulty)}`}>
                  {todayWord.difficulty}
                </span>
              </div>
              <h2 className="text-2xl font-black text-foreground">{todayWord.word}</h2>
              <p className="text-xs text-muted-foreground italic">/{todayWord.pronunciation}/ • {todayWord.partOfSpeech}</p>

              <p className="text-sm text-foreground mt-3 font-medium">{todayWord.definition}</p>
              <p className="text-xs text-muted-foreground mt-2 italic">"{todayWord.example}"</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {todayWord.synonyms.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{s}</span>
                ))}
              </div>

              {todayWord.satTip && (
                <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                  <p className="text-xs text-primary font-medium">💡 SAT Tip: {todayWord.satTip}</p>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Progress */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-foreground text-sm">Words Learned</h3>
            <span className="text-xs text-primary font-bold">{learnedWords.length}/{WORD_BANK.length}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(learnedWords.length / WORD_BANK.length) * 100}%` }} />
          </div>
        </Card>

        {/* Word List */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-2">All Words</h3>
          <div className="space-y-1.5">
            {WORD_BANK.map((w, i) => {
              const learned = learnedWords.includes(w.word);
              return (
                <motion.div key={w.word} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                  <Card className={`p-3 ${learned ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30" : ""}`}>
                    <div className="flex items-center gap-3">
                      <button onClick={() => markLearned(w.word)} className="shrink-0">
                        {learned ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-bold ${learned ? "text-muted-foreground line-through" : "text-foreground"}`}>{w.word}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${getDifficultyColor(w.difficulty)}`}>{w.difficulty}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">{w.definition}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default WordOfTheDay;
