import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { useGameCreditGate } from "@/hooks/useGameCreditGate";
import { OutOfCreditsCard } from "@/components/games/OutOfCreditsCard";
import { DailyCreditsBadge } from "@/components/games/DailyCreditsBadge";
import { funWordItems, pickMixed } from "@/data/funContentPool";
import { getGameVocabPool, FOCUS_LABEL, GameVocabWord } from "@/data/gameVocabPools";
import { useLearnerContext } from "@/hooks/useLearnerContext";
import { useGameSounds } from "@/hooks/useGameSounds";
import hangmanLostPng from "@/assets/hangman-lost.png";

const MAX_WRONG = 6;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Cartoon-styled gallows with a colored character. Fixed illustration colors
// (not semantic tokens) are intentional here — this is a scene, like an icon.
function Gallows({ wrong, dying }: { wrong: number; dying: boolean }) {
  const wood = "hsl(28 45% 38%)";
  const woodDark = "hsl(24 55% 24%)";
  const rope = "hsl(38 55% 55%)";
  const skin = "hsl(30 55% 70%)";
  const mask = "hsl(0 0% 8%)";           // black ski mask
  const stripeDark = "hsl(0 0% 12%)";    // prisoner-stripe dark
  const stripeLight = "hsl(40 15% 92%)"; // prisoner-stripe light
  const pants = "hsl(0 0% 15%)";
  const shoe = "hsl(0 0% 5%)";
  const grass = "hsl(140 45% 55%)";
  const sky1 = "hsl(205 90% 82%)";
  const sky2 = "hsl(200 90% 92%)";
  const angry = "hsl(0 70% 40%)";

  const face = !dying ? (
    <>
      {/* angry eyebrows */}
      <path d="M101 41 L107 43" stroke={angry} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M119 41 L113 43" stroke={angry} strokeWidth="1.6" strokeLinecap="round" />
      {/* mean squinting eyes */}
      <circle cx="105" cy="46" r="1.5" fill="white" />
      <circle cx="115" cy="46" r="1.5" fill="white" />
      <circle cx="105" cy="46" r="0.9" fill={woodDark} />
      <circle cx="115" cy="46" r="0.9" fill={woodDark} />
      {/* scowl mouth */}
      <path d="M105 53 Q110 51 115 53" stroke={woodDark} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </>
  ) : (
    <>
      {/* Xs over closed eyes */}
      <line x1="102" y1="43" x2="108" y2="49" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="108" y1="43" x2="102" y2="49" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="112" y1="43" x2="118" y2="49" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="118" y1="43" x2="112" y2="49" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* limp tongue */}
      <line x1="106" y1="54" x2="114" y2="54" stroke={woodDark} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M109 54 Q111 58 113 54 Z" fill="hsl(0 65% 55%)" stroke={woodDark} strokeWidth="0.6" />
    </>
  );

  return (
    <svg
      viewBox="0 0 160 180"
      className="w-48 h-52 mx-auto"
      role="img"
      aria-label={`Hangman: ${wrong} of ${MAX_WRONG} wrong guesses`}
    >
      <defs>
        <linearGradient id="hm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky1} />
          <stop offset="100%" stopColor={sky2} />
        </linearGradient>
        <style>{`
          @keyframes hangman-sway { 0%,100%{transform:rotate(-6deg);} 50%{transform:rotate(6deg);} }
          @keyframes hangman-drop {
            0%   { transform: translateY(-14px); }
            60%  { transform: translateY(4px); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </defs>
      <rect x="0" y="0" width="160" height="160" fill="url(#hm-sky)" rx="6" />
      <rect x="0" y="158" width="160" height="22" fill={grass} />
      <circle cx="24" cy="26" r="8" fill="hsl(48 95% 65%)" />
      <rect x="14" y="156" width="60" height="6" fill={woodDark} rx="1" />
      <rect x="38" y="10" width="6" height="150" fill={wood} stroke={woodDark} strokeWidth="0.8" />
      <rect x="38" y="10" width="76" height="6" fill={wood} stroke={woodDark} strokeWidth="0.8" />
      <path d="M44 22 L58 10" stroke={woodDark} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="110" y1="16" x2="110" y2="24" stroke={rope} strokeWidth="2" strokeLinecap="round" />
      <g
        style={{
          transformOrigin: "110px 12px",
          // Two-phase animation on defeat: first drop (trap door), then sway.
          animation: dying
            ? "hangman-drop 0.35s cubic-bezier(0.22,1.4,0.36,1) 0s 1 both, hangman-sway 1.4s ease-in-out 0.35s infinite"
            : undefined,
        }}
      >
        {wrong >= 1 && (
          <>
            <line x1="110" y1="10" x2="110" y2="32" stroke={rope} strokeWidth="2.5" strokeLinecap="round" />
            {/* Head (skin) */}
            <circle cx="110" cy="46" r="13" fill={skin} stroke={woodDark} strokeWidth="1.5" />
            {/* Noose knot */}
            <circle cx="110" cy="34" r="3" fill={rope} stroke={woodDark} strokeWidth="0.8" />
            {/* Black ski mask covering the top half of the head + a wide slit for the face */}
            <path
              d="M97 46 Q97 33 110 33 Q123 33 123 46 L123 49 Q118 48 110 48 Q102 48 97 49 Z"
              fill={mask}
              stroke={woodDark}
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Mask lower flap under mouth */}
            <path
              d="M99 55 Q110 58 121 55 L121 58 Q110 60 99 58 Z"
              fill={mask}
              stroke={woodDark}
              strokeWidth="0.6"
            />
            {/* Slight ear stubs */}
            <ellipse cx="97" cy="46" rx="1.4" ry="2.2" fill={skin} stroke={woodDark} strokeWidth="0.6" />
            <ellipse cx="123" cy="46" rx="1.4" ry="2.2" fill={skin} stroke={woodDark} strokeWidth="0.6" />
            {face}
          </>
        )}
        {wrong >= 2 && (
          <>
            {/* Prisoner-stripe torso: light base + dark horizontal stripes clipped to the shirt shape */}
            <clipPath id="hm-torso">
              <path d="M100 60 L120 60 L124 105 L96 105 Z" />
            </clipPath>
            <path d="M100 60 L120 60 L124 105 L96 105 Z" fill={stripeLight} stroke={woodDark} strokeWidth="1.2" strokeLinejoin="round" />
            <g clipPath="url(#hm-torso)">
              <rect x="94" y="64" width="32" height="4" fill={stripeDark} />
              <rect x="94" y="74" width="32" height="4" fill={stripeDark} />
              <rect x="94" y="84" width="32" height="4" fill={stripeDark} />
              <rect x="94" y="94" width="32" height="4" fill={stripeDark} />
            </g>
          </>
        )}
        {wrong >= 3 && (
          <>
            <path d="M100 64 Q86 78 84 96" stroke={stripeLight} strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M100 64 Q86 78 84 96" stroke={stripeDark} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
          </>
        )}
        {wrong >= 4 && (
          <>
            <path d="M120 64 Q134 78 136 96" stroke={stripeLight} strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M120 64 Q134 78 136 96" stroke={stripeDark} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
          </>
        )}
        {wrong >= 5 && (
          <>
            <path d="M104 105 L94 140" stroke={pants} strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="92" cy="143" rx="6" ry="3" fill={shoe} />
          </>
        )}
        {wrong >= 6 && (
          <>
            <path d="M116 105 L126 140" stroke={pants} strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="128" cy="143" rx="6" ry="3" fill={shoe} />
          </>
        )}
      </g>
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
  const { playCorrect, playWrong, playVictory, playDefeat } = useGameSounds();
  const { blocked, spendForRestart, spendOnce } = useGameCreditGate();
  const { focus, words: studyPool } = useMemo(
    () => getGameVocabPool({ examType, dateOfBirth, minLength: 4 }),
    [examType, dateOfBirth]
  );
  const [word, setWord] = useState<GameVocabWord>(() => pickWord(studyPool));
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState<null | { win: boolean; points: number }>(null);
  // While `dying` is true we keep the drawn scene on screen (with sway) before
  // swapping to results — gives the loss visual room to breathe.
  const [dying, setDying] = useState(false);
  const dyingTimer = useRef<number | null>(null);

  const upper = word.word.toUpperCase();
  const wrong = Array.from(guessed).filter((l) => !upper.includes(l));
  const revealed = upper.split("").every((l) => guessed.has(l));

  const guess = useCallback(
    (letter: string) => {
      if (finished || dying || guessed.has(letter)) return;
      // Spend the 1 daily play on the first guess — never on mount.
      if (!spendOnce()) return;
      const next = new Set(guessed);
      next.add(letter);
      setGuessed(next);
      const nextWrong = Array.from(next).filter((l) => !upper.includes(l)).length;
      const nowRevealed = upper.split("").every((l) => next.has(l));
      const wasHit = upper.includes(letter);
      if (nowRevealed) {
        const points = Math.max(20, 100 - nextWrong * 12);
        recordRound("hangman", points, 1, true);
        playVictory();
        setFinished({ win: true, points });
      } else if (nextWrong >= MAX_WRONG) {
        recordRound("hangman", 0, 0, false);
        playDefeat();
        setDying(true);
        dyingTimer.current = window.setTimeout(() => {
          setDying(false);
          setFinished({ win: false, points: 0 });
        }, 1800);
      } else if (wasHit) {
        playCorrect();
      } else {
        playWrong();
      }
    },
    [finished, dying, guessed, upper, recordRound, playCorrect, playWrong, playVictory, playDefeat, spendOnce]
  );

  useEffect(() => () => {
    if (dyingTimer.current) window.clearTimeout(dyingTimer.current);
  }, []);

  const restart = () => {
    if (!spendForRestart()) return;
    if (dyingTimer.current) { window.clearTimeout(dyingTimer.current); dyingTimer.current = null; }
    setDying(false);
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
          <div className="ml-auto flex items-center gap-2">
            <DailyCreditsBadge />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {FOCUS_LABEL[focus]} words
            </span>
          </div>
        </div>

        {blocked ? (
          <OutOfCreditsCard />
        ) : finished && !dying ? (
          <div className="space-y-3">
            {!finished.win && (
              <div className="rounded-xl overflow-hidden bg-gradient-to-b from-sky-200 to-sky-50 flex justify-center">
                <img
                  src={hangmanLostPng}
                  alt="Cartoon burglar caught behind bars"
                  width={768}
                  height={768}
                  loading="lazy"
                  className="w-56 h-56 object-contain animate-fade-in"
                />
              </div>
            )}
            <GameResults
              title={finished.win ? "You got it!" : "Out of guesses"}
              pointsEarned={finished.points}
              totalPoints={stats.totalPoints}
              detail={`Word: ${word.word} — ${word.definition}`}
              onPlayAgain={restart}
            />
          </div>
        ) : (
          <>
            <Card className="p-6 text-center space-y-4">
              <Gallows wrong={wrong.length} dying={dying} />
              {dying && (
                <p className="text-sm font-semibold text-destructive animate-pulse">
                  💀 Out of guesses…
                </p>
              )}
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
                    disabled={used || dying}
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