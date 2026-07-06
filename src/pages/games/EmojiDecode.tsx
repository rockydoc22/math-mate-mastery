import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { funEmojiItems, pickMixed } from "@/data/funContentPool";

interface Puzzle { emoji: string; answer: string; hint: string; }

const PUZZLES: Puzzle[] = [
  { emoji: "🕰️⏳", answer: "ephemeral", hint: "Lasting for a very short time" },
  { emoji: "🤐🗿", answer: "taciturn", hint: "Reserved, saying little" },
  { emoji: "🔨🗿", answer: "iconoclast", hint: "Attacks cherished beliefs" },
  { emoji: "☀️🙂", answer: "sanguine", hint: "Optimistic in tough times" },
  { emoji: "🌫️❓", answer: "obfuscate", hint: "Make unclear" },
  { emoji: "⚡👥", answer: "galvanize", hint: "Shock into action" },
  { emoji: "🌱📣", answer: "harbinger", hint: "Announces what's coming" },
  { emoji: "🙅‍♂️😠", answer: "recalcitrant", hint: "Stubbornly uncooperative" },
  { emoji: "🗣️🎯", answer: "cogent", hint: "Clear and convincing" },
  { emoji: "🪞🪞", answer: "juxtapose", hint: "Place side by side" },
  { emoji: "🌊⬇️", answer: "abate", hint: "Become less intense" },
  { emoji: "🏗️💪", answer: "bolster", hint: "Support or strengthen" },
  { emoji: "😈📜", answer: "nefarious", hint: "Wicked" },
  { emoji: "🤔🌀", answer: "paradox", hint: "Contradictory but maybe true" },
  { emoji: "🕳️🌪️", answer: "quagmire", hint: "Hazardous complex situation" },
  { emoji: "🌍🌎🌏", answer: "ubiquitous", hint: "Everywhere at once" },
  { emoji: "💧🩹", answer: "mitigate", hint: "Make less severe" },
  { emoji: "🎭😏", answer: "facetious", hint: "Inappropriately humorous" },
  { emoji: "🐢🏃", answer: "tenacious", hint: "Persistent, doesn't quit" },
  { emoji: "📖✂️", answer: "laconic", hint: "Very few words" },
];

function pick(exclude?: string) {
  const satPool = PUZZLES.filter((p) => p.answer !== exclude);
  const funPool = funEmojiItems().filter((p) => p.answer !== exclude);
  const picked = pickMixed(funPool, satPool);
  return picked.item as Puzzle;
}

export default function EmojiDecode() {
  const { stats, recordRound } = useGameZoneStats();
  const [puzzle, setPuzzle] = useState<Puzzle>(() => pick());
  const [guess, setGuess] = useState("");
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "won" | "lost">("idle");
  const [points, setPoints] = useState(0);

  const submit = useCallback(() => {
    if (feedback === "won" || feedback === "lost") return;
    const norm = guess.trim().toLowerCase();
    if (!norm) return;
    if (norm === puzzle.answer) {
      const earn = 20 + lives * 10;
      const total = points + earn;
      setPoints(total);
      recordRound("emoji", earn, 1, true);
      setFeedback("won");
    } else {
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        recordRound("emoji", 0, 0, false);
        setFeedback("lost");
      } else {
        setFeedback("wrong");
        setTimeout(() => setFeedback("idle"), 400);
      }
      setGuess("");
    }
  }, [guess, puzzle, lives, feedback, points, recordRound]);

  const nextPuzzle = () => {
    setPuzzle(pick(puzzle.answer));
    setGuess("");
    setLives(3);
    setFeedback("idle");
  };

  const restart = () => {
    setPuzzle(pick());
    setGuess("");
    setLives(3);
    setFeedback("idle");
    setPoints(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <GameZoneHeader />
      <main className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <h1 className="text-xl font-bold">🧩 Emoji Decode</h1>
        </div>

        {feedback === "lost" ? (
          <GameResults
            title="Out of lives"
            pointsEarned={points}
            totalPoints={stats.totalPoints}
            detail={`Answer: ${puzzle.answer}`}
            onPlayAgain={restart}
          />
        ) : feedback === "won" ? (
          <Card className="p-6 text-center space-y-3">
            <div className="text-5xl">🎉</div>
            <div className="text-xl font-bold">Correct — {puzzle.answer}</div>
            <p className="text-sm text-muted-foreground">{puzzle.hint}</p>
            <div className="text-sm">Round points: <span className="font-bold text-primary">{points}</span></div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={nextPuzzle}>Next Puzzle</Button>
              <Button variant="outline" className="flex-1" onClick={restart}>Restart</Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 space-y-4 text-center">
            <div className="text-6xl sm:text-7xl">{puzzle.emoji}</div>
            <p className="text-sm text-muted-foreground italic">{puzzle.hint}</p>
            <Input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Type your answer"
              className={`text-center text-lg ${feedback === "wrong" ? "border-destructive animate-pulse" : ""}`}
              autoFocus
            />
            <div className="flex items-center justify-between text-sm">
              <span>Lives: {"❤️".repeat(lives)}{"🖤".repeat(3 - lives)}</span>
              <span>Round pts: <strong>{points}</strong></span>
            </div>
            <Button className="w-full" onClick={submit} disabled={!guess.trim()}>Submit</Button>
          </Card>
        )}
      </main>
    </div>
  );
}