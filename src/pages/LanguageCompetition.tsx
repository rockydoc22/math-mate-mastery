import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ChevronRight, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

interface LangQuestion {
  id: string;
  question: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

interface LangConfig {
  name: string;
  flag: string;
  categories: { id: string; label: string; icon: string }[];
  questions: LangQuestion[];
}

const LANG_CONFIGS: Record<string, LangConfig> = {
  spanish: {
    name: 'Spanish Competition', flag: '🇪🇸',
    categories: [
      { id: 'grammar', label: 'Grammar', icon: '📝' },
      { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
      { id: 'culture', label: 'Culture & History', icon: '🏛️' },
      { id: 'reading', label: 'Reading Comprehension', icon: '📖' },
      { id: 'conversation', label: 'Conversation', icon: '💬' },
    ],
    questions: [
      { id: 'es1', question: 'Choose the correct form: "Yo ___ al cine ayer."', options: [{ letter: 'A', text: 'voy' }, { letter: 'B', text: 'fui' }, { letter: 'C', text: 'iba' }, { letter: 'D', text: 'iré' }], correctAnswer: 'B', explanation: '"Fui" is the preterite (past tense) of "ir" for yo. "Ayer" indicates a completed past action.', category: 'grammar' },
      { id: 'es2', question: 'What does "madrugada" mean?', options: [{ letter: 'A', text: 'Afternoon' }, { letter: 'B', text: 'Dawn / early morning' }, { letter: 'C', text: 'Midnight' }, { letter: 'D', text: 'Dusk' }], correctAnswer: 'B', explanation: '"Madrugada" refers to the early morning hours, typically before dawn.', category: 'vocabulary' },
      { id: 'es3', question: 'Which country celebrates "Día de los Muertos" on November 1-2?', options: [{ letter: 'A', text: 'Spain' }, { letter: 'B', text: 'Argentina' }, { letter: 'C', text: 'Mexico' }, { letter: 'D', text: 'Colombia' }], correctAnswer: 'C', explanation: 'Día de los Muertos is a Mexican holiday honoring deceased loved ones.', category: 'culture' },
      { id: 'es4', question: '"Ella habría venido si ___."', options: [{ letter: 'A', text: 'la invitaron' }, { letter: 'B', text: 'la invitarían' }, { letter: 'C', text: 'la hubieran invitado' }, { letter: 'D', text: 'la inviten' }], correctAnswer: 'C', explanation: 'This is a past contrary-to-fact conditional requiring the pluperfect subjunctive.', category: 'grammar' },
      { id: 'es5', question: 'Who painted "Guernica"?', options: [{ letter: 'A', text: 'Salvador Dalí' }, { letter: 'B', text: 'Pablo Picasso' }, { letter: 'C', text: 'Diego Velázquez' }, { letter: 'D', text: 'Francisco Goya' }], correctAnswer: 'B', explanation: 'Picasso painted Guernica in 1937 in response to the bombing of the Basque town.', category: 'culture' },
      { id: 'es6', question: 'Choose: "Es importante que tú ___ la tarea."', options: [{ letter: 'A', text: 'haces' }, { letter: 'B', text: 'hagas' }, { letter: 'C', text: 'harás' }, { letter: 'D', text: 'hiciste' }], correctAnswer: 'B', explanation: '"Es importante que" triggers the subjunctive mood → "hagas."', category: 'grammar' },
      { id: 'es7', question: 'What is the capital of Peru?', options: [{ letter: 'A', text: 'Bogotá' }, { letter: 'B', text: 'Lima' }, { letter: 'C', text: 'Quito' }, { letter: 'D', text: 'Santiago' }], correctAnswer: 'B', explanation: 'Lima is the capital and largest city of Peru.', category: 'culture' },
      { id: 'es8', question: '"No creo que él ___ la verdad."', options: [{ letter: 'A', text: 'dice' }, { letter: 'B', text: 'diga' }, { letter: 'C', text: 'dirá' }, { letter: 'D', text: 'dijo' }], correctAnswer: 'B', explanation: '"No creo que" expresses doubt and requires the subjunctive → "diga."', category: 'grammar' },
      { id: 'es9', question: 'What does "entrañable" mean?', options: [{ letter: 'A', text: 'Painful' }, { letter: 'B', text: 'Dear / endearing' }, { letter: 'C', text: 'Strange' }, { letter: 'D', text: 'Entrance' }], correctAnswer: 'B', explanation: '"Entrañable" means deeply felt, endearing, or beloved.', category: 'vocabulary' },
      { id: 'es10', question: 'Which verb form completes: "Cuando ___ a casa, llamaré."', options: [{ letter: 'A', text: 'llego' }, { letter: 'B', text: 'llegue' }, { letter: 'C', text: 'llegaré' }, { letter: 'D', text: 'llegaba' }], correctAnswer: 'B', explanation: '"Cuando" with a future main clause requires the subjunctive for the subordinate clause.', category: 'grammar' },
    ],
  },
  german: {
    name: 'German Competition', flag: '🇩🇪',
    categories: [
      { id: 'grammar', label: 'Grammar', icon: '📝' },
      { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
      { id: 'culture', label: 'Culture & History', icon: '🏛️' },
      { id: 'reading', label: 'Reading Comprehension', icon: '📖' },
    ],
    questions: [
      { id: 'de1', question: 'Which article is correct? "___ Haus ist groß."', options: [{ letter: 'A', text: 'Der' }, { letter: 'B', text: 'Die' }, { letter: 'C', text: 'Das' }, { letter: 'D', text: 'Den' }], correctAnswer: 'C', explanation: '"Haus" is a neuter noun (das Haus).', category: 'grammar' },
      { id: 'de2', question: 'What does "Gemütlichkeit" mean?', options: [{ letter: 'A', text: 'Anger' }, { letter: 'B', text: 'Coziness / warmth' }, { letter: 'C', text: 'Sadness' }, { letter: 'D', text: 'Speed' }], correctAnswer: 'B', explanation: '"Gemütlichkeit" describes a state of warmth, friendliness, and coziness.', category: 'vocabulary' },
      { id: 'de3', question: 'Who composed "The Magic Flute" (Die Zauberflöte)?', options: [{ letter: 'A', text: 'Beethoven' }, { letter: 'B', text: 'Bach' }, { letter: 'C', text: 'Mozart' }, { letter: 'D', text: 'Wagner' }], correctAnswer: 'C', explanation: 'Mozart composed Die Zauberflöte in 1791.', category: 'culture' },
      { id: 'de4', question: '"Ich habe das Buch ___." Choose the correct past participle of "lesen."', options: [{ letter: 'A', text: 'gelest' }, { letter: 'B', text: 'gelesen' }, { letter: 'C', text: 'geliest' }, { letter: 'D', text: 'lesengt' }], correctAnswer: 'B', explanation: '"Lesen" is a strong verb; its past participle is "gelesen."', category: 'grammar' },
      { id: 'de5', question: 'What is the Dative form of "der Mann"?', options: [{ letter: 'A', text: 'dem Mann' }, { letter: 'B', text: 'den Mann' }, { letter: 'C', text: 'des Mannes' }, { letter: 'D', text: 'der Mann' }], correctAnswer: 'A', explanation: 'Masculine nouns in the dative case use "dem."', category: 'grammar' },
      { id: 'de6', question: 'Which city is known as the financial capital of Germany?', options: [{ letter: 'A', text: 'Berlin' }, { letter: 'B', text: 'Munich' }, { letter: 'C', text: 'Frankfurt' }, { letter: 'D', text: 'Hamburg' }], correctAnswer: 'C', explanation: 'Frankfurt is home to the European Central Bank and the Frankfurt Stock Exchange.', category: 'culture' },
      { id: 'de7', question: '"Wenn ich reich ___,  würde ich reisen." Choose correctly.', options: [{ letter: 'A', text: 'bin' }, { letter: 'B', text: 'wäre' }, { letter: 'C', text: 'sei' }, { letter: 'D', text: 'war' }], correctAnswer: 'B', explanation: 'The Konjunktiv II form of "sein" for "ich" is "wäre" (subjunctive/conditional).', category: 'grammar' },
      { id: 'de8', question: 'What does "Schadenfreude" mean?', options: [{ letter: 'A', text: 'Deep sadness' }, { letter: 'B', text: 'Pleasure from others\' misfortune' }, { letter: 'C', text: 'Fear of damage' }, { letter: 'D', text: 'Repair joy' }], correctAnswer: 'B', explanation: '"Schadenfreude" literally means "damage-joy" — pleasure derived from others\' misfortune.', category: 'vocabulary' },
    ],
  },
  italian: {
    name: 'Italian Competition', flag: '🇮🇹',
    categories: [
      { id: 'grammar', label: 'Grammar', icon: '📝' },
      { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
      { id: 'culture', label: 'Culture & Arts', icon: '🎨' },
      { id: 'literature', label: 'Literature', icon: '📖' },
    ],
    questions: [
      { id: 'it1', question: '"Io ___ al mercato ieri."', options: [{ letter: 'A', text: 'vado' }, { letter: 'B', text: 'sono andato' }, { letter: 'C', text: 'andrò' }, { letter: 'D', text: 'andavo' }], correctAnswer: 'B', explanation: '"Andare" uses "essere" as its auxiliary: "sono andato" (passato prossimo).', category: 'grammar' },
      { id: 'it2', question: 'What does "bellissimo" mean?', options: [{ letter: 'A', text: 'Very ugly' }, { letter: 'B', text: 'Very beautiful' }, { letter: 'C', text: 'Very tall' }, { letter: 'D', text: 'Very fast' }], correctAnswer: 'B', explanation: '"Bellissimo" is the absolute superlative of "bello" (beautiful).', category: 'vocabulary' },
      { id: 'it3', question: 'Who wrote "The Divine Comedy"?', options: [{ letter: 'A', text: 'Petrarch' }, { letter: 'B', text: 'Boccaccio' }, { letter: 'C', text: 'Dante Alighieri' }, { letter: 'D', text: 'Machiavelli' }], correctAnswer: 'C', explanation: 'Dante Alighieri wrote La Divina Commedia in the early 14th century.', category: 'literature' },
      { id: 'it4', question: '"Se io ___ ricco, viaggerei."', options: [{ letter: 'A', text: 'sono' }, { letter: 'B', text: 'fossi' }, { letter: 'C', text: 'sarò' }, { letter: 'D', text: 'ero' }], correctAnswer: 'B', explanation: 'The imperfect subjunctive "fossi" is used for hypothetical conditions.', category: 'grammar' },
      { id: 'it5', question: 'Which Italian city is famous for its canals?', options: [{ letter: 'A', text: 'Rome' }, { letter: 'B', text: 'Florence' }, { letter: 'C', text: 'Venice' }, { letter: 'D', text: 'Naples' }], correctAnswer: 'C', explanation: 'Venice (Venezia) is world-famous for its intricate canal system.', category: 'culture' },
      { id: 'it6', question: 'Choose the correct pronoun: "___ piace la pizza."', options: [{ letter: 'A', text: 'Mi' }, { letter: 'B', text: 'Io' }, { letter: 'C', text: 'Me' }, { letter: 'D', text: 'Mio' }], correctAnswer: 'A', explanation: '"Piacere" requires indirect object pronouns: "Mi piace" = "I like."', category: 'grammar' },
      { id: 'it7', question: 'Who painted the ceiling of the Sistine Chapel?', options: [{ letter: 'A', text: 'Leonardo da Vinci' }, { letter: 'B', text: 'Raphael' }, { letter: 'C', text: 'Michelangelo' }, { letter: 'D', text: 'Caravaggio' }], correctAnswer: 'C', explanation: 'Michelangelo painted the Sistine Chapel ceiling between 1508-1512.', category: 'culture' },
      { id: 'it8', question: 'What does "squisito" mean?', options: [{ letter: 'A', text: 'Disgusting' }, { letter: 'B', text: 'Exquisite / delicious' }, { letter: 'C', text: 'Squeezed' }, { letter: 'D', text: 'Quiet' }], correctAnswer: 'B', explanation: '"Squisito" means exquisite or delicious — a false friend with English "squeezed."', category: 'vocabulary' },
    ],
  },
  latin: {
    name: 'Latin Competition', flag: '🏛️',
    categories: [
      { id: 'grammar', label: 'Grammar & Syntax', icon: '📝' },
      { id: 'vocabulary', label: 'Vocabulary', icon: '📚' },
      { id: 'mythology', label: 'Mythology', icon: '⚡' },
      { id: 'culture', label: 'Roman Culture', icon: '🏛️' },
      { id: 'translation', label: 'Translation', icon: '🔄' },
    ],
    questions: [
      { id: 'la1', question: 'What case is used for the direct object in Latin?', options: [{ letter: 'A', text: 'Nominative' }, { letter: 'B', text: 'Genitive' }, { letter: 'C', text: 'Accusative' }, { letter: 'D', text: 'Ablative' }], correctAnswer: 'C', explanation: 'The accusative case marks the direct object of a verb.', category: 'grammar' },
      { id: 'la2', question: 'What does "carpe diem" mean?', options: [{ letter: 'A', text: 'Seize the fish' }, { letter: 'B', text: 'Seize the day' }, { letter: 'C', text: 'Catch the thief' }, { letter: 'D', text: 'Hold the line' }], correctAnswer: 'B', explanation: '"Carpe diem" — "seize the day" — comes from Horace\'s Odes.', category: 'vocabulary' },
      { id: 'la3', question: 'Who was the king of the Roman gods?', options: [{ letter: 'A', text: 'Mars' }, { letter: 'B', text: 'Neptune' }, { letter: 'C', text: 'Jupiter' }, { letter: 'D', text: 'Apollo' }], correctAnswer: 'C', explanation: 'Jupiter (Greek: Zeus) was the supreme deity and king of the gods.', category: 'mythology' },
      { id: 'la4', question: 'Translate: "Puella rosam amat."', options: [{ letter: 'A', text: 'The rose loves the girl' }, { letter: 'B', text: 'The girl loves the rose' }, { letter: 'C', text: 'The girl is a rose' }, { letter: 'D', text: 'The roses love girls' }], correctAnswer: 'B', explanation: '"Puella" (nom.) = the girl; "rosam" (acc.) = the rose; "amat" = loves.', category: 'translation' },
      { id: 'la5', question: 'Which conjugation does "amare" belong to?', options: [{ letter: 'A', text: 'First (ā)' }, { letter: 'B', text: 'Second (ē)' }, { letter: 'C', text: 'Third (ĕ)' }, { letter: 'D', text: 'Fourth (ī)' }], correctAnswer: 'A', explanation: '"Amāre" has a long ā before -re, making it first conjugation.', category: 'grammar' },
      { id: 'la6', question: 'What was the Roman Senate called?', options: [{ letter: 'A', text: 'Forum' }, { letter: 'B', text: 'Senatus' }, { letter: 'C', text: 'Comitia' }, { letter: 'D', text: 'Curia' }], correctAnswer: 'B', explanation: 'The "Senatus" was the governing and advisory assembly of the Roman Republic and Empire. "Curia" was the building where they met.', category: 'culture' },
      { id: 'la7', question: 'Who wrote the "Aeneid"?', options: [{ letter: 'A', text: 'Ovid' }, { letter: 'B', text: 'Cicero' }, { letter: 'C', text: 'Virgil' }, { letter: 'D', text: 'Horace' }], correctAnswer: 'C', explanation: 'Virgil (Publius Vergilius Maro) wrote the Aeneid, the epic of Rome\'s founding.', category: 'culture' },
      { id: 'la8', question: 'What does "veni, vidi, vici" mean?', options: [{ letter: 'A', text: 'I ate, I drank, I slept' }, { letter: 'B', text: 'I came, I saw, I conquered' }, { letter: 'C', text: 'I lived, I loved, I lost' }, { letter: 'D', text: 'I ran, I hid, I fought' }], correctAnswer: 'B', explanation: 'Julius Caesar\'s famous declaration after his swift victory at the Battle of Zela.', category: 'vocabulary' },
      { id: 'la9', question: 'What is the ablative singular of "puella, puellae" (1st declension)?', options: [{ letter: 'A', text: 'puellam' }, { letter: 'B', text: 'puellae' }, { letter: 'C', text: 'puellā' }, { letter: 'D', text: 'puellis' }], correctAnswer: 'C', explanation: 'First declension ablative singular ends in long -ā.', category: 'grammar' },
      { id: 'la10', question: 'Which mythological hero killed the Minotaur?', options: [{ letter: 'A', text: 'Perseus' }, { letter: 'B', text: 'Hercules' }, { letter: 'C', text: 'Theseus' }, { letter: 'D', text: 'Odysseus' }], correctAnswer: 'C', explanation: 'Theseus navigated the labyrinth on Crete and slew the Minotaur.', category: 'mythology' },
    ],
  },
};

type Phase = 'categories' | 'quiz' | 'results';

const LanguageCompetition = () => {
  const { langId } = useParams<{ langId: string }>();
  const config = langId ? LANG_CONFIGS[langId] : null;
  const [phase, setPhase] = useState<Phase>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<LangQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-6 text-center space-y-3">
          <p className="font-bold">Language not found</p>
          <Link to="/competitions"><Button>Back to Competitions</Button></Link>
        </Card>
      </div>
    );
  }

  const startCategory = (catId: string) => {
    const qs = config.questions.filter(q => q.category === catId).sort(() => Math.random() - 0.5);
    if (qs.length === 0) return;
    setSelectedCategory(catId);
    setQuestions(qs);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setPhase('quiz');
  };

  const startAll = () => {
    const qs = [...config.questions].sort(() => Math.random() - 0.5);
    setSelectedCategory('all');
    setQuestions(qs);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setPhase('quiz');
  };

  const handleAnswer = (letter: string) => {
    if (showResult) return;
    setSelectedAnswer(letter);
  };

  const confirm = () => {
    if (!selectedAnswer) return;
    const correct = selectedAnswer === questions[currentIndex].correctAnswer;
    if (correct) setScore(s => s + 1);
    setShowResult(true);
  };

  const next = () => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('results');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const currentQ = questions[currentIndex];

  if (phase === 'categories') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center gap-3">
            <Link to="/competitions"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">{config.flag} {config.name}</h1>
              <p className="text-sm text-muted-foreground">{config.questions.length} questions across {config.categories.length} categories</p>
            </div>
          </div>

          <Card className="p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={startAll}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                <h3 className="font-bold">Practice All Categories</h3>
                <p className="text-xs text-muted-foreground">{config.questions.length} questions mixed</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          {config.categories.map(cat => {
            const count = config.questions.filter(q => q.category === cat.id).length;
            return (
              <Card key={cat.id} className="p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => startCategory(cat.id)}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold">{cat.label}</h3>
                    <p className="text-xs text-muted-foreground">{count} questions</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            );
          })}
        </div>
        <BottomNav />
      </div>
    );
  }

  if (phase === 'results') {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-lg mx-auto px-4 py-12 text-center space-y-4">
          <CheckCircle2 className={`w-16 h-16 mx-auto ${pct >= 70 ? 'text-green-500' : 'text-amber-500'}`} />
          <h2 className="text-2xl font-bold">{pct >= 90 ? 'Excellent!' : pct >= 70 ? 'Great Job!' : 'Keep Practicing!'}</h2>
          <p className="text-4xl font-black text-primary">{score}/{questions.length}</p>
          <p className="text-muted-foreground">{pct}% accuracy</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => setPhase('categories')}><ArrowLeft className="w-4 h-4 mr-1" /> Categories</Button>
            <Button onClick={() => { setCurrentIndex(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setPhase('quiz'); }}>
              <RotateCcw className="w-4 h-4 mr-1" /> Try Again
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setPhase('categories')}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
          <Badge variant="outline">Q {currentIndex + 1}/{questions.length}</Badge>
        </div>
        <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2" />

        <Card className="p-5 space-y-4">
          <p className="font-medium text-lg">{currentQ.question}</p>
          <div className="space-y-2">
            {currentQ.options.map(opt => {
              let cls = "border-border hover:border-primary/50";
              if (showResult) {
                if (opt.letter === currentQ.correctAnswer) cls = "border-green-500 bg-green-500/10";
                else if (opt.letter === selectedAnswer) cls = "border-destructive bg-destructive/10";
              } else if (opt.letter === selectedAnswer) {
                cls = "border-primary bg-primary/10";
              }
              return (
                <button key={opt.letter} onClick={() => handleAnswer(opt.letter)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${cls}`}
                >
                  <span className="font-mono font-bold mr-2">{opt.letter}.</span>{opt.text}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`p-3 rounded-lg text-sm ${selectedAnswer === currentQ.correctAnswer ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-destructive/10 text-destructive'}`}>
              {selectedAnswer === currentQ.correctAnswer ? <CheckCircle2 className="w-4 h-4 inline mr-1" /> : <XCircle className="w-4 h-4 inline mr-1" />}
              {currentQ.explanation}
            </div>
          )}

          <div className="flex justify-end">
            {!showResult ? (
              <Button onClick={confirm} disabled={!selectedAnswer}>Confirm</Button>
            ) : (
              <Button onClick={next}>{currentIndex + 1 >= questions.length ? 'See Results' : 'Next'} <ChevronRight className="w-4 h-4 ml-1" /></Button>
            )}
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
};

export default LanguageCompetition;
