import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, BookOpen, TrendingUp } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const SENTENCES = [
  { id: 1, text: "The scientist's theory was so _____ that even her colleagues struggled to understand it.", options: ["abstruse", "transparent", "mundane", "trivial"], answer: "abstruse", explanation: "'Abstruse' means difficult to understand; obscure. The context clue is 'struggled to understand.'", vocabDef: "Abstruse: difficult to understand; obscure." },
  { id: 2, text: "Despite the _____ of evidence against him, the defendant maintained his innocence.", options: ["paucity", "plethora", "absence", "dearth"], answer: "plethora", explanation: "'Plethora' means an excess or overabundance. 'Despite' signals contrast — lots of evidence, yet he maintained innocence.", vocabDef: "Plethora: an excess or overabundance." },
  { id: 3, text: "The diplomat's _____ remarks helped ease tensions between the two nations.", options: ["conciliatory", "inflammatory", "belligerent", "caustic"], answer: "conciliatory", explanation: "'Conciliatory' means intended to placate or pacify, fitting the context of easing tensions.", vocabDef: "Conciliatory: intended to placate or pacify." },
  { id: 4, text: "Her _____ nature made her the perfect mediator, as she could see merit in both sides of any argument.", options: ["impartial", "biased", "dogmatic", "obstinate"], answer: "impartial", explanation: "'Impartial' means fair and not favoring one side, essential for a mediator who sees merit in both perspectives.", vocabDef: "Impartial: treating all rivals or disputants equally; fair." },
  { id: 5, text: "The old mansion's _____ appearance belied the warmth and comfort that awaited visitors inside.", options: ["forbidding", "inviting", "cheerful", "pristine"], answer: "forbidding", explanation: "'Forbidding' means unfriendly or threatening. 'Belied' means contradicted — the scary exterior hid a warm interior.", vocabDef: "Forbidding: unfriendly or threatening in appearance." },
  { id: 6, text: "The author's writing style is notably _____, using simple words to convey complex ideas.", options: ["lucid", "convoluted", "verbose", "ornate"], answer: "lucid", explanation: "'Lucid' means clear and easy to understand, matching the description of using simple words effectively.", vocabDef: "Lucid: expressed clearly; easy to understand." },
  { id: 7, text: "Years of _____ living had left him with very little savings despite his generous salary.", options: ["profligate", "frugal", "austere", "modest"], answer: "profligate", explanation: "'Profligate' means recklessly extravagant or wasteful, explaining why he had little savings despite good earnings.", vocabDef: "Profligate: recklessly extravagant or wasteful." },
  { id: 8, text: "The committee reached a _____ decision, with every member voting in favor of the proposal.", options: ["unanimous", "contentious", "divisive", "controversial"], answer: "unanimous", explanation: "'Unanimous' means fully in agreement. Every member voting in favor indicates complete consensus.", vocabDef: "Unanimous: fully in agreement." },
  { id: 9, text: "The professor's lectures were so _____ that students often fell asleep.", options: ["soporific", "riveting", "stimulating", "provocative"], answer: "soporific", explanation: "'Soporific' means tending to induce drowsiness or sleep, matching students falling asleep.", vocabDef: "Soporific: tending to induce drowsiness or sleep." },
  { id: 10, text: "The politician's _____ promises won votes but ultimately led to public disillusionment.", options: ["grandiose", "modest", "realistic", "humble"], answer: "grandiose", explanation: "'Grandiose' means impressive or magnificent but often unrealistically so, fitting promises that led to disillusionment.", vocabDef: "Grandiose: extravagantly or pretentiously imposing." },
  { id: 11, text: "The detective found the witness's testimony _____, as it contradicted the physical evidence.", options: ["dubious", "credible", "reliable", "convincing"], answer: "dubious", explanation: "'Dubious' means doubtful or suspect. Contradicting physical evidence makes the testimony questionable.", vocabDef: "Dubious: hesitating or doubting; questionable." },
  { id: 12, text: "After years of drought, the _____ rainfall was a welcome relief for the farmers.", options: ["copious", "negligible", "sporadic", "meager"], answer: "copious", explanation: "'Copious' means abundant. After drought, abundant rainfall would provide welcome relief.", vocabDef: "Copious: abundant in supply or quantity." },
  { id: 13, text: "The artist's _____ use of color created a sense of unease in viewers.", options: ["discordant", "harmonious", "subtle", "muted"], answer: "discordant", explanation: "'Discordant' means lacking harmony, creating tension or unease through clashing elements.", vocabDef: "Discordant: disagreeing or incongruous." },
  { id: 14, text: "The new employee showed _____ for learning, mastering complex tasks within weeks.", options: ["aptitude", "apathy", "antipathy", "aversion"], answer: "aptitude", explanation: "'Aptitude' means natural ability or talent for something, shown by quickly mastering complex tasks.", vocabDef: "Aptitude: a natural ability to do something." },
  { id: 15, text: "The philosopher argued that true happiness requires _____ from material possessions.", options: ["detachment", "accumulation", "obsession", "pursuit"], answer: "detachment", explanation: "'Detachment' means emotional separation. Many philosophical traditions argue freeing oneself from material desires leads to happiness.", vocabDef: "Detachment: the state of being objective or aloof." },
];

const SentenceCompletion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [wordsLearned, setWordsLearned] = useState<string[]>([]);

  const current = SENTENCES[currentIndex];

  const handleSelect = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === current.answer) {
      setScore(s => s + 1);
      setWordsLearned(prev => [...prev, current.answer]);
    }
  };

  const handleNext = () => {
    if (currentIndex < SENTENCES.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/iq-personality">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Vocabulary Builder
            </h1>
            <p className="text-xs text-muted-foreground">{currentIndex + 1} / {SENTENCES.length}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {!completed && currentIndex === 0 && !selectedAnswer && (
          <Card className="p-4 mb-4 border-primary/20 bg-primary/5">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Why This Matters
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Strong vocabulary improves reading comprehension, test scores (SAT, GRE), and communication skills.
              Each question teaches you a high-value word through context — the way your brain naturally learns best.
            </p>
          </Card>
        )}

        {completed ? (
          <Card className="p-6 text-center space-y-4">
            <span className="text-5xl">📚</span>
            <h2 className="text-2xl font-bold text-foreground">Session Complete!</h2>
            <p className="text-lg text-foreground">Score: {score} / {SENTENCES.length} ({Math.round(score / SENTENCES.length * 100)}%)</p>
            
            {wordsLearned.length > 0 && (
              <div className="text-left space-y-2 mt-4">
                <h3 className="font-bold text-sm text-foreground">📖 Words You Learned ({wordsLearned.length})</h3>
                {wordsLearned.map(word => {
                  const sentence = SENTENCES.find(s => s.answer === word);
                  return (
                    <div key={word} className="text-sm p-2 rounded-lg bg-muted/50">
                      <span className="font-bold text-foreground capitalize">{word}</span>
                      <span className="text-muted-foreground"> — {sentence?.vocabDef?.split(": ")[1]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <Button onClick={() => { setCurrentIndex(0); setScore(0); setCompleted(false); setSelectedAnswer(null); setWordsLearned([]); }}>
              Practice Again
            </Button>
          </Card>
        ) : (
          <Card className="p-5 space-y-4">
            <p className="text-base font-medium leading-relaxed text-foreground">{current.text}</p>
            <div className="grid gap-2">
              {current.options.map(opt => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === current.answer;
                const showResult = selectedAnswer !== null;
                return (
                  <Button
                    key={opt}
                    variant="outline"
                    className={`justify-start text-left h-auto py-3 ${
                      showResult && isCorrect ? 'border-emerald-500 bg-emerald-500/10' : ''
                    } ${showResult && isSelected && !isCorrect ? 'border-destructive bg-destructive/10' : ''}`}
                    onClick={() => handleSelect(opt)}
                    disabled={showResult}
                  >
                    {opt}
                    {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-500" />}
                  </Button>
                );
              })}
            </div>
            {selectedAnswer && (
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">{current.explanation}</p>
                  <p className="text-sm font-medium text-foreground mt-2">📝 {current.vocabDef}</p>
                </div>
                <Button onClick={handleNext} className="w-full">
                  {currentIndex < SENTENCES.length - 1 ? 'Next Word' : 'See Results'}
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default SentenceCompletion;
