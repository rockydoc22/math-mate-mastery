import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { funWordItems, pickMixed } from "@/data/funContentPool";
import { getGameVocabPool, FOCUS_LABEL, GameVocabWord } from "@/data/gameVocabPools";
import { useLearnerContext } from "@/hooks/useLearnerContext";

const MAX_WRONG = 6;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Gallows({ wrong }: { wrong: number }) {
  const stroke = "hsl(var(--foreground))";
  const rope = "hsl(var(--muted-foreground))";
  return (
    <svg viewBox="0 0 160 180" className="w-40 h-44 mx-auto" aria-label={`Hangman: ${wrong} of ${MAX_WRONG} wrong`}>
      {/* Gallows structure — always visible */}
      <line x1="10" y1="170" x2="150" y2="170" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="170" x2="40" y2="10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="10" x2="110" y2="10" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="110" y1="10" x2="110" y2="30" stroke={rope} strokeWidth="2" strokeLinecap="round" />
      {/* Body parts appear as wrong guesses accumulate */}
      {wrong >= 1 && <circle cx="110" cy="45" r="14" fill="none" stroke={stroke} strokeWidth="3" />}
      {wrong >= 2 && <line x1="110" y1="59" x2="110" y2="110" stroke={stroke} strokeWidth="3" strokeLinecap="round" />}
      {wrong >= 3 && <line x1="110" y1="72" x2="88" y2="95" stroke={stroke} strokeWidth="3" strokeLinecap="round" />}
      {wrong >= 4 && <line x1="110" y1="72" x2="132" y2="95" stroke={stroke} strokeWidth="3" strokeLinecap="round" />}
      {wrong >= 5 && <line x1="110" y1="110" x2="90" y2="140" stroke={stroke} strokeWidth="3" strokeLinecap="round" />}
      {wrong >= 6 && (
        <>
          <line x1="110" y1="110" x2="130" y2="140" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          {/* X eyes on defeat */}
          <line x1="104" y1="41" x2="109" y2="46" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="109" y1="41" x2="104" y2="46" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="111" y1="41" x2="116" y2="46" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="116" y1="41" x2="111" y2="46" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function pickWord(studyPool: GameVocabWord[]): GameVocabWord {
  const funPool = funWordItems(4);
  const picked = pickMixed(funPool, studyPool);
  return picked.item as GameVocabWord;
}

export default function Hangman() {
  const { stats, recordRound } = useGameZoneStats();
  const { examType, dateOfBirth } = useLearnerContext();
  const { focus, words: studyPool } = useMemo(
    () => getGameVocabPool({ examType, dateOfBirth, minLength: 4 }),
    [examType, dateOfBirth]
  );
  const [word, setWord] = useState<GameVocabWord>(() => pickWord(studyPool));
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
    setWord(pickWord(studyPool));
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
          <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {FOCUS_LABEL[focus]} words
          </span>
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
              <Gallows wrong={wrong.length} />
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