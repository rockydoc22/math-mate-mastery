export type FlashcardRating = "again" | "hard" | "good" | "easy";

export type Flashcard = {
  id: string;
  term: string;
  definition: string;
  example?: string;
  subject?: string;
  deck?: string;
  nextReviewAt?: string;
  intervalDays?: number;
  easeFactor?: number;
  reviewCount?: number;
  lapses?: number;
  isLearning?: boolean;
};

export function isDue(card: Flashcard, now = new Date()): boolean {
  if (!card.nextReviewAt) return true;
  return new Date(card.nextReviewAt).getTime() <= now.getTime();
}

export function applyFlashcardReview(
  card: Flashcard,
  rating: FlashcardRating,
  now = new Date()
): Flashcard {
  const currentEase = card.easeFactor ?? 2.5;
  const currentInterval = card.intervalDays ?? 0;
  const reviewCount = (card.reviewCount ?? 0) + 1;
  const currentLapses = card.lapses ?? 0;

  let nextInterval = currentInterval;
  let nextEase = currentEase;
  let nextLapses = currentLapses;
  let nextLearning = card.isLearning ?? true;

  switch (rating) {
    case "again":
      nextInterval = 1;
      nextEase = Math.max(1.3, currentEase - 0.2);
      nextLapses = currentLapses + 1;
      nextLearning = true;
      break;
    case "hard":
      nextInterval = Math.max(2, Math.round((currentInterval || 1) * 1.2));
      nextEase = Math.max(1.3, currentEase - 0.1);
      break;
    case "good":
      nextInterval = currentInterval <= 1 ? 3 : Math.round(currentInterval * currentEase);
      nextEase = currentEase;
      if (nextInterval >= 3) nextLearning = false;
      break;
    case "easy":
      nextInterval = currentInterval <= 1 ? 5 : Math.round(currentInterval * (currentEase + 0.25));
      nextEase = currentEase + 0.05;
      nextLearning = false;
      break;
  }

  // Leech protection: if a card has lapsed 4+ times, cap interval to keep it reviewed often
  if (nextLapses >= 4) {
    nextInterval = Math.min(nextInterval, 4);
  }

  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + nextInterval);

  return {
    ...card,
    intervalDays: nextInterval,
    easeFactor: Number(nextEase.toFixed(2)),
    reviewCount,
    lapses: nextLapses,
    isLearning: nextLearning,
    nextReviewAt: nextReview.toISOString(),
  };
}

export function getDueCards(cards: Flashcard[], now = new Date()): Flashcard[] {
  return cards.filter((card) => isDue(card, now));
}
