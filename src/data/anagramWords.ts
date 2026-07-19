// Anagram word lists per difficulty tier. Kept short & family-friendly.
export type AnagramDifficulty = "easy" | "medium" | "hard";

export const ANAGRAM_WORDS: Record<AnagramDifficulty, string[]> = {
  easy: [
    "apple", "chair", "plant", "smile", "brave", "grape", "sunny", "flame",
    "cloud", "river", "stone", "green", "quiet", "spark", "trust", "dance",
    "peach", "beach", "candy", "happy", "eagle", "money", "movie", "night",
  ],
  medium: [
    "puzzle", "planet", "silver", "market", "orange", "friend", "guitar",
    "wonder", "castle", "temple", "salmon", "forest", "gentle", "coffee",
    "shadow", "island", "modern", "record", "wisdom", "yellow", "junior",
    "purple", "square", "winter",
  ],
  hard: [
    "adventure", "brilliant", "curiosity", "discovery", "education", "festival",
    "gravitate", "harmonize", "important", "knowledge", "landscape", "melodious",
    "necessary", "objective", "peaceful", "quicksand", "resonate", "spectrum",
    "tremendous", "universal", "vibration", "wonderful", "expertise", "hurricane",
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