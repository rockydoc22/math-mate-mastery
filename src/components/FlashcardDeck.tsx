import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flashcard, getDueCards, applyFlashcardReview, FlashcardRating } from "@/lib/flashcardScheduler";

export type FlashcardDeckProps = {
  cards: Flashcard[];
  onReview?: (updatedCard: Flashcard, rating: FlashcardRating) => void;
};

export default function FlashcardDeck({ cards, onReview }: FlashcardDeckProps) {
  const dueCards = useMemo(() => getDueCards(cards), [cards]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = dueCards[index];

  const handleReview = (rating: FlashcardRating) => {
    if (!currentCard) return;
    const updated = applyFlashcardReview(currentCard, rating);
    onReview?.(updated, rating);
    setShowAnswer(false);
    setIndex((prev) => prev + 1);
  };

  if (!currentCard) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground">Flashcards</h2>
        <p className="mt-3 text-muted-foreground">No cards due right now. Nice work.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Vocabulary Review</h2>
          <p className="mt-1 text-xs text-muted-foreground">Card {index + 1} of {dueCards.length}</p>
        </div>
        <Badge variant="outline">{currentCard.deck ?? currentCard.subject ?? "General"}</Badge>
      </div>

      <div className="mt-5 min-h-[200px] rounded-lg border bg-muted/30 p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Term</div>
        <div className="mt-3 text-2xl font-bold text-foreground">{currentCard.term}</div>

        {showAnswer ? (
          <>
            <div className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Definition</div>
            <div className="mt-2 text-base text-foreground">{currentCard.definition}</div>
            {currentCard.example && (
              <>
                <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Example</div>
                <div className="mt-2 text-sm text-muted-foreground">{currentCard.example}</div>
              </>
            )}
          </>
        ) : (
          <div className="mt-10 text-sm text-muted-foreground">Think of the meaning before revealing it.</div>
        )}
      </div>

      {!showAnswer ? (
        <div className="mt-5 flex justify-end">
          <Button onClick={() => setShowAnswer(true)}>Reveal Answer</Button>
        </div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {(["again", "hard", "good", "easy"] as FlashcardRating[]).map((rating) => (
            <Button key={rating} variant="outline" onClick={() => handleReview(rating)} className="capitalize">
              {rating}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
}
