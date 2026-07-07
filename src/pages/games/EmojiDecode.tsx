import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { funEmojiItems, pickMixed } from "@/data/funContentPool";

interface Puzzle {
  emoji: string;
  answer: string;
  hint: string;
  /** Fuller dictionary-style definition, shown when the player is struggling. */
  definition?: string;
  breakdown?: string[];
}

// `breakdown` explains each emoji so the "aha" is obvious on reveal.
// If breakdown is missing (e.g. from the fun-content pool), we fall back to
// just showing the hint.
const PUZZLES: Puzzle[] = [
  { emoji: "🕰️⏳", answer: "ephemeral", hint: "Lasting for a very short time", definition: "Existing only briefly — over almost as soon as it begins.", breakdown: ["🕰️ = time", "⏳ = running out"] },
  { emoji: "🤐🗿", answer: "taciturn", hint: "Reserved, saying little", definition: "Habitually silent — someone who rarely speaks even when they could.", breakdown: ["🤐 = mouth zipped", "🗿 = stone-faced"] },
  { emoji: "🔨🗿", answer: "iconoclast", hint: "Attacks cherished beliefs", definition: "A person who challenges or tears down traditional ideas that others hold sacred.", breakdown: ["🔨 = smash", "🗿 = an idol / icon"] },
  { emoji: "☀️🙂", answer: "sanguine", hint: "Optimistic in tough times", definition: "Cheerful and confident about the future, even when things look grim.", breakdown: ["☀️ = sunny", "🙂 = cheerful outlook"] },
  { emoji: "🌫️❓", answer: "obfuscate", hint: "Make unclear", definition: "To deliberately confuse someone by making something harder to understand — the opposite of clarify.", breakdown: ["🌫️ = fog / haze", "❓ = confusion"] },
  { emoji: "⚡👥", answer: "galvanize", hint: "Shock into action", definition: "To suddenly stir a group into doing something — like an electric jolt of motivation.", breakdown: ["⚡ = electric jolt", "👥 = a group of people"] },
  { emoji: "🌱📣", answer: "harbinger", hint: "Announces what's coming", definition: "A person, event, or sign that signals something important is about to happen.", breakdown: ["🌱 = something new sprouting", "📣 = announcing it"] },
  { emoji: "🙅‍♂️😠", answer: "recalcitrant", hint: "Stubbornly uncooperative", definition: "Refusing to obey authority or follow along — defiantly resistant.", breakdown: ["🙅‍♂️ = refusing", "😠 = defiant"] },
  { emoji: "🗣️🎯", answer: "cogent", hint: "Clear and convincing", definition: "An argument so well-reasoned it hits home — logical and hard to disagree with.", breakdown: ["🗣️ = speaking", "🎯 = hits the target"] },
  { emoji: "🪞🪞", answer: "juxtapose", hint: "Place side by side", definition: "To place two things next to each other so their differences (or similarities) stand out.", breakdown: ["🪞🪞 = two things placed next to each other"] },
  { emoji: "🌊⬇️", answer: "abate", hint: "Become less intense", definition: "To die down — a storm, pain, or noise gradually decreasing in force.", breakdown: ["🌊 = a wave / storm", "⬇️ = dying down"] },
  { emoji: "🏗️💪", answer: "bolster", hint: "Support or strengthen", definition: "To prop something up or reinforce it — often confidence, a claim, or defenses.", breakdown: ["🏗️ = construction / support", "💪 = strength"] },
  { emoji: "😈📜", answer: "nefarious", hint: "Wicked", definition: "Extremely evil or criminal — usually describing a scheme or plot.", breakdown: ["😈 = evil", "📜 = a plot / scheme"] },
  { emoji: "🤔🌀", answer: "paradox", hint: "Contradictory but maybe true", definition: "A statement that seems to contradict itself, yet may actually be true when you think it through.", breakdown: ["🤔 = thinking hard", "🌀 = a twist / loop"] },
  { emoji: "🕳️🌪️", answer: "quagmire", hint: "Hazardous complex situation", definition: "A messy, dangerous situation that is hard to escape — literally a swamp, figuratively a bind.", breakdown: ["🕳️ = a pit you can't escape", "🌪️ = chaos"] },
  { emoji: "🌍🌎🌏", answer: "ubiquitous", hint: "Everywhere at once", definition: "Present, appearing, or found everywhere — impossible to avoid.", breakdown: ["🌍🌎🌏 = present all over the globe"] },
  { emoji: "💧🩹", answer: "mitigate", hint: "Make less severe", definition: "To reduce the harm, seriousness, or pain of something — soften the blow.", breakdown: ["💧 = wound / harm", "🩹 = patching it up"] },
  { emoji: "🎭😏", answer: "facetious", hint: "Inappropriately humorous", definition: "Treating a serious subject with deliberately silly or flippant humor.", breakdown: ["🎭 = putting on an act", "😏 = joking smirk"] },
  { emoji: "🐢🏃", answer: "tenacious", hint: "Persistent, doesn't quit", definition: "Holding on tightly and refusing to give up — determined and stubborn in a good way.", breakdown: ["🐢 = slow but steady", "🏃 = still moving"] },
  { emoji: "📖✂️", answer: "laconic", hint: "Very few words", definition: "Using extremely few words — brief to the point of seeming curt.", breakdown: ["📖 = a full text", "✂️ = trimmed down to almost nothing"] },
];

function pick(exclude?: string) {
  const satPool = PUZZLES.filter((p) => p.answer !== exclude);
  const funPool = funEmojiItems().filter((p) => p.answer !== exclude);
  const picked = pickMixed(funPool, satPool);
  return picked.item as Puzzle;
}

export default function EmojiDecode() {
  const { stats, recordRound } = useGameZoneStats();
  const [showHelp, setShowHelp] = useState(() => {
    try { return localStorage.getItem("aoEmojiSeenHelp") !== "1"; } catch { return true; }
  });
  const dismissHelp = () => {
    setShowHelp(false);
    try { localStorage.setItem("aoEmojiSeenHelp", "1"); } catch {}
  };
  const [puzzle, setPuzzle] = useState<Puzzle>(() => pick());
  const [guess, setGuess] = useState("");
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "won" | "lost">("idle");
  const [points, setPoints] = useState(0);

  // Number of letters unlocked as clues after each wrong guess.
  // 3 lives → 0 letters, 2 lives → 1 letter, 1 life → 2 letters.
  const lettersRevealed = Math.max(0, 3 - lives);
  const answerLen = puzzle.answer.length;
  const masked = puzzle.answer
    .split("")
    .map((ch, i) => (i < lettersRevealed ? ch.toUpperCase() : "_"))
    .join(" ");

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
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setShowHelp((v) => !v)} aria-label="How to play">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>

        {showHelp && (
          <Card className="p-4 space-y-2 text-sm bg-primary/5 border-primary/30">
            <p className="font-semibold">How to play Emoji Decode</p>
            <p className="text-muted-foreground">
              A word or name is hidden inside a string of emojis. Read each emoji as a <em>clue</em>, put them together, and type your answer.
            </p>
            <p className="text-xs text-muted-foreground">
              Example: 👑🏀🍟 → each emoji is a clue: 👑 "king of", 🏀 basketball, 🍟 played in Miami → <strong>LeBron James</strong>.
            </p>
            <p className="text-xs text-muted-foreground">
              You have 3 lives. Wrong guess = lose a life. On reveal, we'll show what each emoji meant.
            </p>
            <Button size="sm" className="w-full" onClick={dismissHelp}>Got it — start decoding</Button>
          </Card>
        )}

        {feedback === "lost" ? (
          <div className="space-y-3">
            <Card className="p-4 space-y-2 text-center">
              <div className="text-5xl">{puzzle.emoji}</div>
              <p className="text-sm">Answer: <strong className="capitalize">{puzzle.answer}</strong></p>
              <p className="text-xs text-muted-foreground italic">{puzzle.hint}</p>
              {puzzle.breakdown && (
                <ul className="text-xs text-left text-muted-foreground space-y-0.5 pt-2 border-t">
                  {puzzle.breakdown.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </Card>
            <GameResults
              title="Out of lives"
              pointsEarned={points}
              totalPoints={stats.totalPoints}
              detail={`Answer: ${puzzle.answer}`}
              onPlayAgain={restart}
            />
          </div>
        ) : feedback === "won" ? (
          <Card className="p-6 text-center space-y-3">
            <div className="text-6xl animate-scale-in">{puzzle.emoji}</div>
            <div className="text-4xl">🎉</div>
            <div className="text-xl font-bold">Correct — {puzzle.answer}</div>
            <p className="text-sm text-muted-foreground">{puzzle.hint}</p>
            {puzzle.breakdown && (
              <ul className="text-xs text-left text-muted-foreground space-y-0.5 pt-2 border-t">
                {puzzle.breakdown.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
            <div className="text-sm">Round points: <span className="font-bold text-primary">{points}</span></div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={nextPuzzle}>Next Puzzle</Button>
              <Button variant="outline" className="flex-1" onClick={restart}>Restart</Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 space-y-4 text-center">
            <div className="text-6xl sm:text-7xl animate-fade-in" key={puzzle.answer}>{puzzle.emoji}</div>
            <p className="text-sm text-muted-foreground italic">{puzzle.hint}</p>
            {lives <= 2 && puzzle.definition && (
              <p className="text-xs text-foreground/80 bg-accent/10 border border-accent/30 rounded-md px-3 py-2 animate-fade-in">
                <span className="font-semibold">Definition:</span> {puzzle.definition}
              </p>
            )}
            {/* Word length is always visible; letters unlock as lives drop */}
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {answerLen} letters{lettersRevealed > 0 && ` · ${lettersRevealed} revealed`}
              </div>
              <div className="font-mono text-lg tracking-[0.35em] font-bold text-primary">{masked}</div>
            </div>
            {lives === 1 && puzzle.breakdown && puzzle.breakdown[0] && (
              <p className="text-xs text-muted-foreground animate-fade-in">
                💡 Emoji clue: {puzzle.breakdown[0]}
              </p>
            )}
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