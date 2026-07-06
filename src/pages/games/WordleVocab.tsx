import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { SAT_VOCAB_WORDS } from "@/data/satVocab";

const WORD_LEN = 5;
const MAX_GUESSES = 6;

function pickWord() {
  const pool = SAT_VOCAB_WORDS.filter((w) => /^[A-Za-z]+$/.test(w.word) && w.word.length === WORD_LEN);
  const fallback = SAT_VOCAB_WORDS.filter((w) => /^[A-Za-z]+$/.test(w.word) && w.word.length === 6);
  const src = pool.length > 0 ? pool : fallback;
  return src[Math.floor(Math.random() * src.length)];
}

type Letter = { char: string; state: "correct" | "present" | "absent" | "empty" };

function scoreGuess(guess: string, answer: string): Letter[] {
  const result: Letter[] = guess.split("").map((c) => ({ char: c, state: "absent" }));
  const answerArr = answer.split("");
  const used = new Array(answer.length).fill(false);
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answerArr[i]) {
      result[i].state = "correct";
      used[i] = true;
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (result[i].state === "correct") continue;
    const idx = answerArr.findIndex((c, j) => c === guess[i] && !used[j]);
    if (idx >= 0) {
      result[i].state = "present";
      used[idx] = true;
    }
  }
  return result;
}

const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export default function WordleVocab() {
  const { stats, recordRound } = useGameZoneStats();
  const [word, setWord] = useState(() => pickWord());
  const answer = word.word.toUpperCase();
  const len = answer.length;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [finished, setFinished] = useState<null | { win: boolean; points: number }>(null);

  const submit = useCallback(() => {
    if (current.length !== len || finished) return;
    const nextGuesses = [...guesses, current];
    setGuesses(nextGuesses);
    setCurrent("");
    if (current === answer) {
      const points = Math.max(30, 150 - nextGuesses.length * 20);
      recordRound("wordle", points, 1, true);
      setFinished({ win: true, points });
    } else if (nextGuesses.length >= MAX_GUESSES) {
      recordRound("wordle", 0, 0, false);
      setFinished({ win: false, points: 0 });
    }
  }, [current, len, answer, guesses, finished, recordRound]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (finished) return;
      if (e.key === "Enter") return submit();
      if (e.key === "Backspace") return setCurrent((c) => c.slice(0, -1));
      if (/^[a-zA-Z]$/.test(e.key)) {
        setCurrent((c) => (c.length < len ? c + e.key.toUpperCase() : c));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [submit, len, finished]);

  const rows: Letter[][] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) rows.push(scoreGuess(guesses[i], answer));
    else if (i === guesses.length) {
      const row: Letter[] = [];
      for (let j = 0; j < len; j++) row.push({ char: current[j] ?? "", state: "empty" });
      rows.push(row);
    } else rows.push(new Array(len).fill(0).map(() => ({ char: "", state: "empty" as const })));
  }

  const keyStates = new Map<string, Letter["state"]>();
  guesses.forEach((g) => {
    scoreGuess(g, answer).forEach((l) => {
      const prev = keyStates.get(l.char);
      if (prev === "correct") return;
      if (prev === "present" && l.state === "absent") return;
      keyStates.set(l.char, l.state);
    });
  });

  const restart = () => {
    const w = pickWord();
    setWord(w);
    setGuesses([]);
    setCurrent("");
    setFinished(null);
  };

  const cellColor = (s: Letter["state"]) =>
    s === "correct" ? "bg-emerald-500 text-white border-emerald-500"
    : s === "present" ? "bg-amber-500 text-white border-amber-500"
    : s === "absent" ? "bg-muted text-muted-foreground border-muted" : "bg-card border-border";

  const keyPress = (k: string) => {
    if (finished) return;
    if (k === "ENTER") submit();
    else if (k === "BACK") setCurrent((c) => c.slice(0, -1));
    else setCurrent((c) => (c.length < len ? c + k : c));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <GameZoneHeader />
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold">🟩 Wordle Vocab</h1>
        </div>

        {finished ? (
          <GameResults
            title={finished.win ? "Nailed it!" : "So close!"}
            pointsEarned={finished.points}
            totalPoints={stats.totalPoints}
            detail={`Word: ${word.word} — ${word.definition}`}
            onPlayAgain={restart}
          />
        ) : (
          <>
            <div className="grid gap-1.5 justify-center">
              {rows.map((row, i) => (
                <div key={i} className="flex gap-1.5">
                  {row.map((l, j) => (
                    <div key={j} className={`w-11 h-11 sm:w-12 sm:h-12 border-2 flex items-center justify-center font-bold text-xl rounded ${cellColor(l.state)}`}>
                      {l.char}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              {KEY_ROWS.map((row, i) => (
                <div key={i} className="flex gap-1 justify-center">
                  {i === 2 && (
                    <button onClick={() => keyPress("ENTER")} className="px-2 h-11 rounded bg-primary text-primary-foreground font-semibold text-xs">ENTER</button>
                  )}
                  {row.split("").map((k) => {
                    const s = keyStates.get(k);
                    return (
                      <button key={k} onClick={() => keyPress(k)} className={`w-8 h-11 rounded font-bold text-sm ${cellColor(s ?? "empty")}`}>
                        {k}
                      </button>
                    );
                  })}
                  {i === 2 && (
                    <button onClick={() => keyPress("BACK")} className="px-2 h-11 rounded bg-muted font-semibold text-xs">⌫</button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}