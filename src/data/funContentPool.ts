import funData from "./funContent.json";
import { SAT_VOCAB_WORDS } from "./satVocab";
import { rapidFireFacts } from "./satFactsRapidFire";

export type FunItem =
  | { id: string; category: string; type: "multiple_choice"; prompt: string; options: string[]; answer: string }
  | { id: string; category: string; type: "true_false"; prompt: string; answer: boolean }
  | { id: string; category: string; type: "emoji_decode"; prompt: string; answer: string; hint: string };

export const funContentPool: FunItem[] = (funData as { funContentPool: FunItem[] }).funContentPool;

/** 70/30 mixer: with prob 0.7 draws from `fun`, else from `sat`. Falls back if either pool empty. */
export function pickMixed<F, S>(fun: F[], sat: S[]): { source: "fun"; item: F } | { source: "sat"; item: S } {
  const useFun = Math.random() < 0.7;
  if (useFun && fun.length) return { source: "fun", item: fun[Math.floor(Math.random() * fun.length)] };
  if (sat.length) return { source: "sat", item: sat[Math.floor(Math.random() * sat.length)] };
  return { source: "fun", item: fun[Math.floor(Math.random() * fun.length)] };
}

// ---------- Per-game filtered fun pools ----------

/** Word-guess games: fun items whose answer is a single alphabetic word ≥4 chars. */
export function funWordItems(minLen = 4, exactLen?: number) {
  return funContentPool
    .filter((i): i is Extract<FunItem, { type: "multiple_choice" | "emoji_decode" }> => i.type !== "true_false")
    .map((i) => ({
      word: i.answer.trim(),
      definition: i.type === "emoji_decode" ? `${i.hint} — ${i.prompt}` : i.prompt,
    }))
    .filter((w) => /^[A-Za-z]+$/.test(w.word) && (exactLen ? w.word.length === exactLen : w.word.length >= minLen));
}

/** Emoji-decode fun items shaped for the Emoji Decode game. */
export function funEmojiItems() {
  return funContentPool
    .filter((i): i is Extract<FunItem, { type: "emoji_decode" }> => i.type === "emoji_decode")
    .map((i) => ({ emoji: i.prompt, answer: i.answer.toLowerCase(), hint: i.hint }));
}

/** Rapid-fire true/false prompts sourced from fun content (MCQ + true_false unified). */
export type FunRapidPrompt = {
  id: string;
  text: string;
  isTrue: boolean;
  answer: string;
};

export function buildFunRapidPrompt(): FunRapidPrompt | null {
  const item = funContentPool[Math.floor(Math.random() * funContentPool.length)];
  if (!item) return null;
  if (item.type === "true_false") {
    return {
      id: `${item.id}-${Date.now()}-${Math.random()}`,
      text: item.prompt,
      isTrue: item.answer,
      answer: item.answer ? "True" : "False",
    };
  }
  if (item.type === "multiple_choice") {
    const showCorrect = Math.random() < 0.5;
    const wrongPool = item.options.filter((o) => o !== item.answer);
    const displayed = showCorrect
      ? item.answer
      : wrongPool[Math.floor(Math.random() * wrongPool.length)] ?? item.answer;
    return {
      id: `${item.id}-${Date.now()}-${Math.random()}`,
      text: `${item.prompt}  →  ${displayed}`,
      isTrue: displayed === item.answer,
      answer: item.answer,
    };
  }
  // emoji_decode
  return {
    id: `${item.id}-${Date.now()}-${Math.random()}`,
    text: `${item.prompt}  →  ${item.answer}`,
    isTrue: true,
    answer: item.answer,
  };
}

export { SAT_VOCAB_WORDS, rapidFireFacts };