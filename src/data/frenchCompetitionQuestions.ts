import { Question } from "@/data/questions";

export interface FrenchCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const FRENCH_CATEGORIES: FrenchCategory[] = [
  { id: "grammar", name: "Grammar", icon: "📝", description: "Articles, verb forms, connectors & agreement" },
  { id: "culture", name: "Culture", icon: "🎭", description: "Francophone culture, history & arts" },
  { id: "listening", name: "Listening Comprehension", icon: "🎧", description: "Comprehension & inference questions" },
  { id: "dictee", name: "Dictée", icon: "✍️", description: "Spelling, accents & written accuracy" },
  { id: "phrases", name: "Elite Phrases", icon: "💬", description: "Competition-level speaking connectors" },
];

interface RawMCQ {
  id: string;
  type: string;
  category: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
}

interface RawPhrase {
  id: string;
  type: string;
  phrase: string;
  connector: string;
  tip: string;
}

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle options and remap correctAnswer letter
function shuffleOptions(
  options: { letter: string; text: string }[],
  correctAnswer: string
): { options: { letter: string; text: string }[]; correctAnswer: string } {
  const correctText = options.find(o => o.letter === correctAnswer)?.text;
  const shuffled = shuffle(options);
  const letters = ["A", "B", "C", "D"];
  const remapped = shuffled.map((o, i) => ({ letter: letters[i], text: o.text }));
  const newCorrect = remapped.find(o => o.text === correctText)?.letter || "A";
  return { options: remapped, correctAnswer: newCorrect };
}

function convertMCQ(raw: RawMCQ): Question {
  const letters = Object.keys(raw.choices).sort();
  const rawOptions = letters.map(l => ({ letter: l, text: raw.choices[l] }));
  const { options, correctAnswer } = shuffleOptions(rawOptions, raw.answer);
  return {
    id: raw.id,
    question: raw.question,
    options,
    correctAnswer,
    explanation: raw.explanation,
    difficulty: "5",
    domain: "French",
    skill: raw.category.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
  };
}

// Pool of distractor connectors for phrase questions
const DISTRACTOR_CONNECTORS = [
  "En effet", "Par conséquent", "Néanmoins", "Autrement dit",
  "En revanche", "De plus", "Ainsi", "Pourtant",
  "D'ailleurs", "Certes", "Or", "Malgré tout",
  "En outre", "Bref", "Somme toute", "Quant à",
];

function convertPhrase(raw: RawPhrase): Question {
  // Pick 3 random distractors that aren't the correct connector
  const available = DISTRACTOR_CONNECTORS.filter(
    d => d.toLowerCase() !== raw.connector.toLowerCase()
  );
  const distractors = shuffle(available).slice(0, 3);

  const rawOptions = [
    { letter: "A", text: raw.connector },
    { letter: "B", text: distractors[0] },
    { letter: "C", text: distractors[1] },
    { letter: "D", text: distractors[2] },
  ];
  const { options, correctAnswer } = shuffleOptions(rawOptions, "A");

  return {
    id: raw.id,
    question: `Which connector is used in: "${raw.phrase}"?`,
    options,
    correctAnswer,
    explanation: raw.tip,
    difficulty: "6",
    domain: "French",
    skill: "Elite Phrases",
  };
}

// Category mapping from raw module keys to our categories
const MODULE_TO_CATEGORY: Record<string, string> = {
  grammar_mcq: "grammar",
  rapid_grammar: "grammar",
  culture_mcq: "culture",
  culture_challenge: "culture",
  listening_mcq: "listening",
  listening_comprehension: "listening",
  dictee: "dictee",
  dictee_sprint: "dictee",
  elite_phrases: "phrases",
};

let cached: Record<string, Question[]> | null = null;

export async function loadFrenchQuestions(): Promise<Record<string, Question[]>> {
  if (cached) return cached;

  const [practiceRes, winningRes, phrasesRes] = await Promise.all([
    import("@/data/ccff_french_competition_practice.json"),
    import("@/data/ccff_winning_pack.json"),
    import("@/data/ccff_elite_french_phrases_pack.json"),
  ]);

  const result: Record<string, Question[]> = {
    grammar: [],
    culture: [],
    listening: [],
    dictee: [],
    phrases: [],
  };

  // Global dedup by question text (since IDs are recycled across files with shuffled answers)
  const seenText = new Set<string>();

  const addMCQs = (modules: Record<string, RawMCQ[]>) => {
    for (const [moduleKey, questions] of Object.entries(modules)) {
      const cat = MODULE_TO_CATEGORY[moduleKey];
      if (!cat || !result[cat]) continue;
      for (const raw of questions as RawMCQ[]) {
        if (!raw.question || !raw.choices || !raw.answer) continue;
        const textKey = raw.question.toLowerCase().trim();
        if (seenText.has(textKey)) continue;
        seenText.add(textKey);
        result[cat].push(convertMCQ(raw));
      }
    }
  };

  addMCQs((practiceRes.default as any).modules || {});
  addMCQs((winningRes.default as any).modules || {});

  // Phrases
  const phraseModules = (phrasesRes.default as any).modules || {};
  const rawPhrases: RawPhrase[] = phraseModules.elite_phrases || [];
  for (const raw of rawPhrases) {
    if (!raw.phrase || !raw.connector) continue;
    const textKey = raw.phrase.toLowerCase().trim();
    if (seenText.has(textKey)) continue;
    seenText.add(textKey);
    result.phrases.push(convertPhrase(raw));
  }

  cached = result;
  return result;
}

// Initial empty state for SSR/first render
export const frenchQuestionsByCategory: Record<string, Question[]> = {
  grammar: [],
  culture: [],
  listening: [],
  dictee: [],
  phrases: [],
};
