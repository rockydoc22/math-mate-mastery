// Anagram word lists per difficulty tier. Kept short & family-friendly.
// Each entry has a canonical `word` plus any real-word anagrams the player
// might legitimately land on (e.g. EMILS → smile OR miles OR limes OR slime).
// The game accepts any of these as a correct answer.
export type AnagramDifficulty = "easy" | "medium" | "hard";

export interface AnagramEntry {
  word: string;
  alts?: string[];
}

export const ANAGRAM_WORDS: Record<AnagramDifficulty, AnagramEntry[]> = {
  easy: [
    { word: "apple" },
    { word: "chair" },
    { word: "plant" },
    { word: "smile", alts: ["miles", "limes", "slime"] },
    { word: "brave" },
    { word: "grape", alts: ["gaper", "pager", "parge"] },
    { word: "sunny" },
    { word: "flame", alts: ["fleam"] },
    { word: "cloud", alts: ["could"] },
    { word: "river" },
    { word: "stone", alts: ["notes", "onset", "seton", "tones", "steno"] },
    { word: "green", alts: ["genre"] },
    { word: "quiet", alts: ["quite"] },
    { word: "spark", alts: ["parks"] },
    { word: "trust", alts: ["strut"] },
    { word: "dance", alts: ["caned", "acned"] },
    { word: "peach", alts: ["cheap"] },
    { word: "beach" },
    { word: "candy" },
    { word: "happy" },
    { word: "eagle" },
    { word: "money" },
    { word: "movie" },
    { word: "night", alts: ["thing"] },
  ],
  medium: [
    { word: "puzzle" },
    { word: "planet", alts: ["platen"] },
    { word: "silver", alts: ["sliver", "livers", "livres"] },
    { word: "market" },
    { word: "orange", alts: ["onager", "genoa"] },
    { word: "friend", alts: ["finder", "redfin"] },
    { word: "guitar" },
    { word: "wonder" },
    { word: "castle", alts: ["cleats", "eclats"] },
    { word: "temple", alts: ["pelmet"] },
    { word: "salmon" },
    { word: "forest", alts: ["foster", "softer"] },
    { word: "gentle" },
    { word: "coffee" },
    { word: "shadow" },
    { word: "island" },
    { word: "modern", alts: ["dormer"] },
    { word: "record", alts: ["corder"] },
    { word: "wisdom" },
    { word: "yellow" },
    { word: "junior" },
    { word: "purple" },
    { word: "square" },
    { word: "winter", alts: ["twiner"] },
  ],
  hard: [
    { word: "adventure" },
    { word: "brilliant" },
    { word: "curiosity" },
    { word: "discovery" },
    { word: "education", alts: ["auctioned", "cautioned"] },
    { word: "festival" },
    { word: "gravitate" },
    { word: "harmonize" },
    { word: "important" },
    { word: "knowledge" },
    { word: "landscape" },
    { word: "melodious" },
    { word: "necessary" },
    { word: "objective" },
    { word: "peaceful" },
    { word: "quicksand" },
    { word: "resonate", alts: ["senorate"] },
    { word: "spectrum" },
    { word: "tremendous" },
    { word: "universal" },
    { word: "vibration" },
    { word: "wonderful" },
    { word: "expertise" },
    { word: "hurricane" },
  ],
};

/** Fisher–Yates shuffle of characters, guaranteed different from the input. */
export function scramble(word: string): string {
  const arr = word.split("");
  for (let attempt = 0; attempt < 8; attempt++) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (arr.join("") !== word) return arr.join("");
  }
  return arr.reverse().join("");
}

/** True when `guess` is either the canonical word or a listed alternate. */
export function isAcceptedAnagram(entry: AnagramEntry, guess: string): boolean {
  const g = guess.trim().toLowerCase();
  if (!g) return false;
  if (g === entry.word.toLowerCase()) return true;
  return (entry.alts ?? []).some((a) => a.toLowerCase() === g);
}