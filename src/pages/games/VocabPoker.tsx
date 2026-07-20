import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, HelpCircle, Coins, Sparkles } from "lucide-react";
import { GameZoneHeader } from "@/components/games/GameZoneHeader";
import { GameResults } from "@/components/games/GameResults";
import { useGameZoneStats } from "@/hooks/useGameZoneStats";
import { useGameCreditGate } from "@/hooks/useGameCreditGate";
import { OutOfCreditsCard } from "@/components/games/OutOfCreditsCard";
import { DailyCreditsBadge } from "@/components/games/DailyCreditsBadge";
import { useGameSounds } from "@/hooks/useGameSounds";
import { SAT_VOCAB_WORDS } from "@/data/satVocab";

/**
 * Vocab Poker — a card-game reframing of vocabulary practice.
 *
 * Loop:
 *  - You're dealt a hand of 5 word cards.
 *  - Each round a definition prompt appears. It matches ONE card in your
 *    hand (about 65% of rounds) or NO card (a bluff round, ~35%).
 *  - You either PLAY a card or FOLD. Payouts:
 *      correct card played -> +25 chips, streak++
 *      wrong card played   -> -20 chips, streak = 0
 *      fold on bluff       -> +10 chips (good read), streak++
 *      fold on match round -> -15 chips (missed the read)
 *  - Played/folded cards are replaced from the deck.
 *  - Win at >= 300 chips, bust at <= 0.
 */

type VocabCard = { id: string; word: string; definition: string };

const HAND_SIZE = 5;
const START_CHIPS = 100;
const WIN_CHIPS = 300;

// Payouts
const PAYOUT = {
  correctPlay: 25,
  wrongPlay: -20,
  correctFold: 10,
  wrongFold: -15,
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): VocabCard[] {
  return shuffle(
    SAT_VOCAB_WORDS.map((v) => ({ id: v.id, word: v.word, definition: v.definition }))
  );
}

type Feedback = {
  kind: "correctPlay" | "wrongPlay" | "correctFold" | "wrongFold";
  delta: number;
  message: string;
  revealedWord?: string;
} | null;

export default function VocabPoker() {
  const { stats, recordRound } = useGameZoneStats();
  const { playCorrect, playWrong, playVictory, playDefeat } = useGameSounds();
  const { blocked, spendForRestart, spendOnce } = useGameCreditGate();

  const [showHelp, setShowHelp] = useState(() => {
    try {
      return localStorage.getItem("aoPokerSeenHelp") !== "1";
    } catch {
      return true;
    }
  });
  const dismissHelp = () => {
    setShowHelp(false);
    try {
      localStorage.setItem("aoPokerSeenHelp", "1");
    } catch {}
  };

  const [deck, setDeck] = useState<VocabCard[]>(() => buildDeck());
  const [hand, setHand] = useState<VocabCard[]>([]);
  const [promptCard, setPromptCard] = useState<VocabCard | null>(null);
  // True when promptCard's definition matches a card actually in `hand`.
  const [isMatch, setIsMatch] = useState(false);
  const [chips, setChips] = useState(START_CHIPS);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [wins, setWins] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [finished, setFinished] = useState<null | { win: boolean; points: number }>(null);

  // Draw initial hand + first prompt once.
  useEffect(() => {
    dealFreshRound(buildDeck(), []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawTo(currentHand: VocabCard[], currentDeck: VocabCard[]): { hand: VocabCard[]; deck: VocabCard[] } {
    let d = currentDeck;
    let h = [...currentHand];
    while (h.length < HAND_SIZE) {
      if (d.length === 0) d = buildDeck();
      h.push(d[0]);
      d = d.slice(1);
    }
    return { hand: h, deck: d };
  }

  function pickPrompt(currentHand: VocabCard[], currentDeck: VocabCard[]): { promptCard: VocabCard; isMatch: boolean; deck: VocabCard[] } {
    // 65% match, 35% bluff. Guarantee variety by pulling bluffs from the deck.
    const wantMatch = Math.random() < 0.65 && currentHand.length > 0;
    if (wantMatch) {
      const c = currentHand[Math.floor(Math.random() * currentHand.length)];
      return { promptCard: c, isMatch: true, deck: currentDeck };
    }
    // Bluff: pull a card from deck whose word is NOT in hand.
    const handIds = new Set(currentHand.map((c) => c.id));
    let d = currentDeck;
    let idx = d.findIndex((c) => !handIds.has(c.id));
    if (idx < 0) {
      d = buildDeck();
      idx = d.findIndex((c) => !handIds.has(c.id));
    }
    const c = d[idx];
    const nextDeck = [...d.slice(0, idx), ...d.slice(idx + 1)];
    return { promptCard: c, isMatch: false, deck: nextDeck };
  }

  function dealFreshRound(startDeck: VocabCard[], startHand: VocabCard[]) {
    const drawn = drawTo(startHand, startDeck);
    const p = pickPrompt(drawn.hand, drawn.deck);
    setHand(drawn.hand);
    setDeck(p.deck);
    setPromptCard(p.promptCard);
    setIsMatch(p.isMatch);
    setFeedback(null);
  }

  const endGame = useCallback(
    (didWin: boolean, finalChips: number) => {
      // Score = chips earned above starting bank, plus a streak bonus.
      const points = Math.max(0, finalChips - START_CHIPS) + bestStreak * 5;
      recordRound("poker", points, wins, didWin);
      if (didWin) playVictory();
      else playDefeat();
      setFinished({ win: didWin, points });
    },
    [bestStreak, wins, recordRound, playVictory, playDefeat]
  );

  const applyOutcome = useCallback(
    (kind: Exclude<Feedback, null>["kind"], removeCardId: string | null) => {
      const delta = PAYOUT[kind];
      const nextChips = chips + delta;
      const won = kind === "correctPlay" || kind === "correctFold";
      const message = won
        ? kind === "correctPlay"
          ? `Nice play. +${delta} chips`
          : `Great read — bluff called. +${delta} chips`
        : kind === "wrongPlay"
        ? `That wasn't it. ${delta} chips`
        : `You had it. ${delta} chips`;
      const revealedWord = promptCard?.word;

      setChips(nextChips);
      setRounds((r) => r + 1);
      if (won) {
        setWins((w) => w + 1);
        setStreak((s) => {
          const ns = s + 1;
          setBestStreak((b) => Math.max(b, ns));
          return ns;
        });
        playCorrect();
      } else {
        setStreak(0);
        playWrong();
      }
      setFeedback({ kind, delta, message, revealedWord });

      // Terminal states are checked here so the flash still shows briefly.
      if (nextChips <= 0) {
        window.setTimeout(() => endGame(false, nextChips), 900);
        return;
      }
      if (nextChips >= WIN_CHIPS) {
        window.setTimeout(() => endGame(true, nextChips), 900);
        return;
      }

      // Next round after brief reveal.
      window.setTimeout(() => {
        const newHand = removeCardId ? hand.filter((c) => c.id !== removeCardId) : hand;
        dealFreshRound(deck, newHand);
      }, 1100);
    },
    [chips, hand, deck, promptCard, playCorrect, playWrong, endGame]
  );

  const playCard = (card: VocabCard) => {
    if (!promptCard || feedback || finished) return;
    if (!spendOnce()) return;
    const correct = isMatch && card.id === promptCard.id;
    applyOutcome(correct ? "correctPlay" : "wrongPlay", card.id);
  };

  const fold = () => {
    if (!promptCard || feedback || finished) return;
    if (!spendOnce()) return;
    applyOutcome(isMatch ? "wrongFold" : "correctFold", null);
  };

  const restart = () => {
    if (!spendForRestart()) return;
    setDeck(buildDeck());
    setHand([]);
    setPromptCard(null);
    setChips(START_CHIPS);
    setStreak(0);
    setBestStreak(0);
    setRounds(0);
    setWins(0);
    setFeedback(null);
    setFinished(null);
    dealFreshRound(buildDeck(), []);
  };

  const chipsColor =
    chips >= 250 ? "text-emerald-500" : chips >= 150 ? "text-amber-500" : chips <= 40 ? "text-destructive" : "text-primary";

  const progressPct = useMemo(() => Math.min(100, Math.max(0, (chips / WIN_CHIPS) * 100)), [chips]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <GameZoneHeader />
      <main className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/games">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">🃏 Vocab Poker</h1>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => setShowHelp((v) => !v)}
            aria-label="How to play"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
          <DailyCreditsBadge />
        </div>

        {blocked ? (
          <OutOfCreditsCard />
        ) : (
          <>
        {showHelp && (
          <Card className="p-4 space-y-2 text-sm bg-primary/5 border-primary/30">
            <p className="font-semibold">How to play Vocab Poker</p>
            <p className="text-muted-foreground">
              You get a <strong>hand of 5 vocabulary cards</strong>. Each round a definition appears on the table.
              Play the card in your hand whose word matches — but watch out: sometimes the definition matches{" "}
              <em>no</em> card in your hand. That's a bluff round — fold it.
            </p>
            <ul className="text-xs text-muted-foreground space-y-0.5 pl-4 list-disc">
              <li>Right card played: <strong className="text-emerald-500">+25 chips</strong></li>
              <li>Wrong card played: <strong className="text-destructive">-20 chips</strong></li>
              <li>Fold a bluff (no match in hand): <strong className="text-emerald-500">+10 chips</strong></li>
              <li>Fold when you had the match: <strong className="text-destructive">-15 chips</strong></li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Start with 100 chips. Reach <strong>300</strong> to win the pot. Hit <strong>0</strong> and you bust.
            </p>
            <Button size="sm" className="w-full" onClick={dismissHelp}>
              Got it — deal me in
            </Button>
          </Card>
        )}

        {finished ? (
          <GameResults
            title={finished.win ? "You won the pot!" : "Busted"}
            pointsEarned={finished.points}
            totalPoints={stats.totalPoints}
            detail={`${wins} correct reads in ${rounds} rounds · best streak ${bestStreak}`}
            onPlayAgain={restart}
          />
        ) : (
          <>
            {/* Chip bank + progress rail */}
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Coins className={`w-4 h-4 ${chipsColor}`} />
                  <span className={`font-bold text-lg tabular-nums ${chipsColor}`}>{chips}</span>
                  <span className="text-muted-foreground">/ {WIN_CHIPS}</span>
                </span>
                <span className="flex items-center gap-3">
                  {streak >= 2 && (
                    <span className="text-orange-500 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {streak}
                    </span>
                  )}
                  <span className="text-muted-foreground">Rounds {rounds}</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </Card>

            {/* Definition prompt (the pot) */}
            <Card
              className={`p-6 min-h-[140px] flex flex-col items-center justify-center text-center gap-2 transition-all animate-fade-in ${
                feedback?.kind === "correctPlay" || feedback?.kind === "correctFold"
                  ? "bg-emerald-500/15 border-emerald-500/40"
                  : feedback?.kind
                  ? "bg-destructive/15 border-destructive/40"
                  : "bg-card"
              }`}
              key={promptCard?.id ?? "loading"}
            >
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                On the table
              </span>
              {feedback ? (
                <div className="space-y-1.5">
                  <p className="text-lg font-bold">{feedback.message}</p>
                  {feedback.revealedWord && (
                    <p className="text-sm text-muted-foreground">
                      Word was: <strong className="capitalize text-foreground">{feedback.revealedWord}</strong>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-base sm:text-lg font-medium">{promptCard?.definition ?? "…"}</p>
              )}
            </Card>

            {/* Hand */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {hand.map((c) => (
                <button
                  key={c.id}
                  disabled={!!feedback}
                  onClick={() => playCard(c)}
                  className="group aspect-[3/4] rounded-lg border-2 border-border bg-gradient-to-b from-card to-muted/40 p-2 flex flex-col justify-between text-left transition-all hover:border-primary hover:-translate-y-1 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:border-border"
                >
                  <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Card
                  </span>
                  <span className="text-sm sm:text-base font-bold text-foreground leading-tight break-words">
                    {c.word}
                  </span>
                  <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    Tap to play
                  </span>
                </button>
              ))}
            </div>

            <Button variant="outline" className="w-full" onClick={fold} disabled={!!feedback}>
              Fold — no card in my hand matches
            </Button>

            <p className="text-[11px] text-center text-muted-foreground">
              Not every definition matches your hand. Reading a bluff pays off.
            </p>
          </>
        )}
          </>
        )}
      </main>
    </div>
  );
}