import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ArcadeSkill, generateArcadeChallenges } from '@/data/arcadeChallenges';
import { useGameSounds } from '@/hooks/useGameSounds';
import { Button } from '@/components/ui/button';
import { ExamType } from '@/utils/examConfig';

interface HangmanGameProps {
  skill: ArcadeSkill;
  examType: ExamType;
  onComplete: (results: { score: number; correct: number; total: number }) => void;
  onBack: () => void;
}

const TOTAL_ROUNDS = 10;

function getMaxWrong(round: number): number {
  if (round < 3) return 6;
  if (round < 6) return 5;
  if (round < 8) return 4;
  return 3;
}

const DIFFICULTY_LABELS: Record<number, string> = {
  6: 'Easy', 5: 'Medium', 4: 'Hard', 3: 'Expert',
};

const KEYBOARD_ROWS = [
  'ABCDEFGHIJKLM'.split(''),
  'NOPQRSTUVWXYZ'.split(''),
];

function HangmanDrawing({ wrongCount }: { wrongCount: number }) {
  return (
    <svg viewBox="0 0 200 220" className="w-full max-w-[180px] mx-auto">
      <line x1="20" y1="210" x2="180" y2="210" stroke="currentColor" strokeWidth="3" className="text-muted-foreground" />
      <line x1="60" y1="210" x2="60" y2="20" stroke="currentColor" strokeWidth="3" className="text-muted-foreground" />
      <line x1="60" y1="20" x2="130" y2="20" stroke="currentColor" strokeWidth="3" className="text-muted-foreground" />
      <line x1="130" y1="20" x2="130" y2="45" stroke="currentColor" strokeWidth="3" className="text-muted-foreground" />
      {wrongCount >= 1 && <circle cx="130" cy="60" r="15" stroke="hsl(var(--destructive))" strokeWidth="3" fill="none" />}
      {wrongCount >= 2 && <line x1="130" y1="75" x2="130" y2="130" stroke="hsl(var(--destructive))" strokeWidth="3" />}
      {wrongCount >= 3 && <line x1="130" y1="90" x2="105" y2="115" stroke="hsl(var(--destructive))" strokeWidth="3" />}
      {wrongCount >= 4 && <line x1="130" y1="90" x2="155" y2="115" stroke="hsl(var(--destructive))" strokeWidth="3" />}
      {wrongCount >= 5 && <line x1="130" y1="130" x2="105" y2="165" stroke="hsl(var(--destructive))" strokeWidth="3" />}
      {wrongCount >= 6 && <line x1="130" y1="130" x2="155" y2="165" stroke="hsl(var(--destructive))" strokeWidth="3" />}
      {wrongCount >= 6 && (
        <>
          <line x1="123" y1="55" x2="128" y2="60" stroke="hsl(var(--destructive))" strokeWidth="2" />
          <line x1="128" y1="55" x2="123" y2="60" stroke="hsl(var(--destructive))" strokeWidth="2" />
          <line x1="132" y1="55" x2="137" y2="60" stroke="hsl(var(--destructive))" strokeWidth="2" />
          <line x1="137" y1="55" x2="132" y2="60" stroke="hsl(var(--destructive))" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

export function HangmanGame({ skill, examType, onComplete, onBack }: HangmanGameProps) {
  const [challenges] = useState(() => generateArcadeChallenges(skill, TOTAL_ROUNDS, examType));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const sounds = useGameSounds();

  const currentChallenge = challenges[round];
  const answer = currentChallenge?.correctAnswer.toUpperCase() || '';
  const prompt = currentChallenge?.prompt || '';
  const maxWrong = getMaxWrong(round);

  const isWordComplete = answer.split('').every(
    ch => !/[A-Z]/.test(ch) || guessedLetters.has(ch)
  );

  useEffect(() => {
    if (!roundOver && isWordComplete && answer) {
      setRoundOver(true);
      setWon(true);
      const bonus = Math.max(0, maxWrong - wrongCount) * 10 + 50;
      setScore(s => s + bonus);
      setCorrectRounds(c => c + 1);
      sounds.playCorrect();
    }
  }, [isWordComplete, roundOver, answer]);

  useEffect(() => {
    if (!roundOver && wrongCount >= maxWrong) {
      setRoundOver(true);
      setWon(false);
      sounds.playWrong();
    }
  }, [wrongCount, roundOver]);

  const handleGuess = useCallback((letter: string) => {
    if (roundOver || guessedLetters.has(letter)) return;
    const next = new Set(guessedLetters);
    next.add(letter);
    setGuessedLetters(next);

    if (!answer.includes(letter)) {
      setWrongCount(w => w + 1);
      sounds.playWrong();
    } else {
      sounds.playCorrect();
    }
  }, [answer, guessedLetters, roundOver, sounds]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) handleGuess(key);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleGuess]);

  const nextRound = () => {
    const nextIdx = round + 1;
    if (nextIdx >= challenges.length) {
      setGameOver(true);
      onComplete({ score, correct: correctRounds, total: challenges.length });
    } else {
      setRound(nextIdx);
      setGuessedLetters(new Set());
      setWrongCount(0);
      setRoundOver(false);
      setWon(false);
    }
  };

  if (gameOver) {
    const accuracy = challenges.length > 0 ? Math.round((correctRounds / challenges.length) * 100) : 0;
    return (
      <div className="text-center space-y-4 animate-fade-in">
        <div className="text-6xl mb-2">{accuracy >= 70 ? '🏆' : accuracy >= 40 ? '👍' : '💪'}</div>
        <h2 className="text-2xl font-bold text-foreground">Game Over!</h2>
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xl font-bold text-primary">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xl font-bold text-primary">{correctRounds}/{challenges.length}</div>
            <div className="text-xs text-muted-foreground">Words</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-xl font-bold text-primary">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={() => window.location.reload()}>Play Again</Button>
        </div>
      </div>
    );
  }

  const wordDisplay = answer.split('').map((ch, i) => {
    const isLetter = /[A-Z]/.test(ch);
    const revealed = !isLetter || guessedLetters.has(ch) || (roundOver && !won);
    return (
      <span
        key={i}
        className={cn(
          'inline-block w-8 h-10 mx-0.5 text-center text-xl font-bold border-b-2 leading-10',
          !isLetter ? 'border-transparent' : 'border-primary/40',
          revealed && isLetter && !guessedLetters.has(ch) && 'text-destructive',
          revealed && isLetter && guessedLetters.has(ch) && 'text-primary',
        )}
      >
        {revealed ? ch : '\u00A0'}
      </span>
    );
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Round {round + 1}/{challenges.length}</div>
        <div className="text-sm font-bold text-primary">Score: {score}</div>
      </div>

      <div className="text-center bg-muted/50 rounded-lg p-3">
        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{currentChallenge?.category}</div>
        <div className="text-lg font-semibold text-foreground">{prompt}</div>
      </div>

      <HangmanDrawing wrongCount={wrongCount} />

      <div className="flex flex-wrap justify-center gap-y-2 px-2">{wordDisplay}</div>

      <div className="text-center text-xs text-muted-foreground">
        {maxWrong - wrongCount} guesses remaining · <span className="font-medium text-foreground/70">{DIFFICULTY_LABELS[maxWrong]}</span>
      </div>

      {roundOver && (
        <div className={cn(
          'text-center p-3 rounded-lg animate-fade-in',
          won ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
        )}>
          <div className="text-lg font-bold">{won ? '✅ Correct!' : '❌ The answer was:'}</div>
          {!won && <div className="text-base font-semibold mt-1">{currentChallenge?.correctAnswer}</div>}
          <Button size="sm" className="mt-3" onClick={nextRound}>
            {round + 1 >= challenges.length ? 'See Results' : 'Next Word →'}
          </Button>
        </div>
      )}

      {!roundOver && (
        <div className="space-y-1.5">
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex flex-wrap justify-center gap-1">
              {row.map(letter => {
                const used = guessedLetters.has(letter);
                const inWord = answer.includes(letter);
                return (
                  <button
                    key={letter}
                    disabled={used}
                    onClick={() => handleGuess(letter)}
                    className={cn(
                      'w-8 h-10 rounded font-bold text-sm transition-all',
                      used && inWord && 'bg-primary/20 text-primary',
                      used && !inWord && 'bg-muted text-muted-foreground/30',
                      !used && 'bg-card border border-border hover:bg-primary/10 hover:border-primary/30 text-foreground',
                    )}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
