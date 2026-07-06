import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { SAT_VOCAB_WORDS } from "@/data/satVocab";
import { funWordItems, pickMixed } from "@/data/funContentPool";

const MAX_WRONG = 6;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function pickWord() {
  const satPool = SAT_VOCAB_WORDS.filter((w) => /^[A-Za-z]+$/.test(w.word) && w.word.length >= 4);
  const funPool = funWordItems(4);
  const picked = pickMixed(funPool, satPool);
  return picked.item as { word: string; definition: string };
}

export default function Hangman() {
  const { stats, recordRound } = useGameZoneStats();
  const [word, setWord] = useState(() => pickWord());
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState<null | { win: boolean; points: number }>(null);

  const upper = word.word.toUpperCase();
  const wrong = Array.from(guessed).filter((l) => !upper.includes(l));
  const revealed = upper.split("").every((l) => guessed.has(l));

  const guess = useCallback(
    (letter: string) => {
      if (finished || guessed.has(letter)) return;
      const next = new Set(guessed);
      next.add(letter);
      setGuessed(next);
      const nextWrong = Array.from(next).filter((l) => !upper.includes(l)).length;
      const nowRevealed = upper.split("").every((l) => next.has(l));
      if (nowRevealed) {
        const points = Math.max(20, 100 - nextWrong * 12);
        recordRound("hangman", points, 1, true);
        setFinished({ win: true, points });
      } else if (nextWrong >= MAX_WRONG) {
        recordRound("hangman", 0, 0, false);
        setFinished({ win: false, points: 0 });
      }
    },
    [finished, guessed, upper, recordRound]
  );

  const restart = () => {
    setWord(pickWord());
    setGuessed(new Set());
    setFinished(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <GameZoneHeader />
      <main className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold">🪢 Word Hangman</h1>
        </div>

        {finished ? (
          <GameResults
            title={finished.win ? "You got it!" : "Out of guesses"}
            pointsEarned={finished.points}
            totalPoints={stats.totalPoints}
            detail={`Word: ${word.word} — ${word.definition}`}
            onPlayAgain={restart}
          />
        ) : (
          <>
            <Card className="p-6 text-center space-y-4">
              <p className="text-sm text-muted-foreground italic">Hint: {word.definition}</p>
              <div className="text-3xl sm:text-4xl font-mono font-bold tracking-[0.4em]">
                {upper.split("").map((l, i) => (
                  <span key={i} className="inline-block w-8 border-b-2 border-foreground mx-0.5">
                    {guessed.has(l) ? l : " "}
                  </span>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Wrong: <span className="text-destructive font-semibold">{wrong.length}</span> / {MAX_WRONG}
                {wrong.length > 0 && <span className="ml-2">({wrong.join(", ")})</span>}
              </div>
            </Card>

            <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5">
              {LETTERS.map((l) => {
                const used = guessed.has(l);
                const inWord = upper.includes(l);
                return (
                  <button
                    key={l}
                    onClick={() => guess(l)}
                    disabled={used}
                    className={`aspect-square rounded font-bold text-sm transition-colors ${
                      used
                        ? inWord
                          ? "bg-emerald-500 text-white"
                          : "bg-muted text-muted-foreground line-through"
                        : "bg-card hover:bg-primary/10 border border-border"
                    }`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}