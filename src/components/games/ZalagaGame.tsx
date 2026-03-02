import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArcadeChallenge, ArcadeSkill, generateArcadeChallenges } from '@/data/arcadeChallenges';
import { useGameSounds } from '@/hooks/useGameSounds';
import { ExamType } from '@/utils/examConfig';

interface ZalagaGameProps {
  skill: ArcadeSkill;
  examType: ExamType;
  onComplete: (results: { score: number; correct: number; total: number }) => void;
  onBack: () => void;
}

interface Invader {
  id: number;
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  alive: boolean;
  speed: number;
}

const TOTAL_ROUNDS = 15;
const INVADER_BASE_SPEED = 0.12; // Slower than language version for reading time

export function ZalagaGame({ skill, examType, onComplete, onBack }: ZalagaGameProps) {
  const [challenges] = useState(() => generateArcadeChallenges(skill, TOTAL_ROUNDS, examType));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; type: 'correct' | 'incorrect' | 'missed' } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [showMilestone, setShowMilestone] = useState<string | null>(null);
  const [shipAngle, setShipAngle] = useState(0);
  const animRef = useRef<number>();
  const invadersRef = useRef<Invader[]>([]);
  const gameOverRef = useRef(false);
  const roundRef = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const sounds = useGameSounds();

  const MILESTONES: Record<number, string> = {
    3: '🔥 ON FIRE!',
    5: '🚀 UNSTOPPABLE!',
    8: '⚡ SHARPSHOOTER!',
    12: '👑 SPACE MASTER!',
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameAreaRef.current) return;
      const rect = gameAreaRef.current.getBoundingClientRect();
      const shipX = rect.left + rect.width / 2;
      const shipY = rect.bottom - 20;
      const dx = e.clientX - shipX;
      const dy = e.clientY - shipY;
      const angle = Math.atan2(dx, -dy) * (180 / Math.PI);
      setShipAngle(Math.max(-60, Math.min(60, angle)));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const setupRound = useCallback((idx: number) => {
    if (idx >= challenges.length) {
      setGameOver(true);
      gameOverRef.current = true;
      sounds.playVictory();
      onComplete({ score, correct: correctCount, total: challenges.length });
      return;
    }

    const challenge = challenges[idx];
    setCurrentPrompt(challenge.prompt);

    const allAnswers = [challenge.correctAnswer, ...challenge.distractors.slice(0, 3)];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }

    const spacing = 100 / (allAnswers.length + 1);
    const newInvaders: Invader[] = allAnswers.map((text, i) => ({
      id: idx * 100 + i,
      text,
      isCorrect: text === challenge.correctAnswer,
      x: spacing * (i + 1) - 10 + Math.random() * 5,
      y: -5 - Math.random() * 15,
      alive: true,
      speed: INVADER_BASE_SPEED + Math.random() * 0.04 + idx * 0.003,
    }));

    setInvaders(newInvaders);
    invadersRef.current = newInvaders;
  }, [challenges, score, correctCount, onComplete, sounds]);

  useEffect(() => {
    setupRound(0);
    roundRef.current = 0;
  }, []);

  useEffect(() => {
    const tick = () => {
      if (gameOverRef.current) return;

      invadersRef.current = invadersRef.current.map(inv => {
        if (!inv.alive) return inv;
        return { ...inv, y: inv.y + inv.speed };
      });

      const missed = invadersRef.current.find(inv => inv.alive && inv.isCorrect && inv.y >= 90);
      if (missed) {
        invadersRef.current = invadersRef.current.map(inv => ({ ...inv, alive: false }));
        setInvaders([...invadersRef.current]);
        setCombo(0);
        sounds.playMiss();
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameOver(true);
            gameOverRef.current = true;
            sounds.playDefeat();
            return 0;
          }
          return newLives;
        });
        setFeedback({ text: 'Missed! ☄️', type: 'missed' });
        setTimeout(() => {
          setFeedback(null);
          const nextRound = roundRef.current + 1;
          roundRef.current = nextRound;
          setRound(nextRound);
          setupRound(nextRound);
        }, 1000);
      } else {
        setInvaders([...invadersRef.current]);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [setupRound, sounds]);

  const handleShoot = useCallback((invader: Invader) => {
    if (!invader.alive || gameOverRef.current) return;

    sounds.playLaser();

    if (invader.isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      const comboBonus = Math.min(newCombo, 5);
      const points = 10 + comboBonus * 5;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);

      invadersRef.current = invadersRef.current.map(inv => ({ ...inv, alive: false }));
      setInvaders([...invadersRef.current]);

      setTimeout(() => sounds.playExplosion(), 50);
      if (newCombo >= 3) sounds.playCombo(newCombo);
      if (MILESTONES[newCombo]) {
        setShowMilestone(MILESTONES[newCombo]);
        setTimeout(() => setShowMilestone(null), 1200);
      }

      setFeedback({ text: `+${points} 🎯`, type: 'correct' });
      setTimeout(() => {
        setFeedback(null);
        const nextRound = roundRef.current + 1;
        roundRef.current = nextRound;
        setRound(nextRound);
        setupRound(nextRound);
      }, 800);
    } else {
      setCombo(0);
      sounds.playWrong();
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          gameOverRef.current = true;
          sounds.playDefeat();
          return 0;
        }
        return newLives;
      });

      invadersRef.current = invadersRef.current.map(inv =>
        inv.id === invader.id ? { ...inv, alive: false } : inv
      );
      setInvaders([...invadersRef.current]);
      setFeedback({ text: 'Wrong target! 💥', type: 'incorrect' });
      setTimeout(() => setFeedback(null), 800);
    }
  }, [combo, setupRound, sounds]);

  if (gameOver) {
    const percentage = challenges.length > 0 ? Math.round((correctCount / Math.min(round + 1, challenges.length)) * 100) : 0;
    const grade = percentage >= 90 ? '🌟' : percentage >= 70 ? '⭐' : percentage >= 50 ? '🚀' : '📚';

    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce">{lives <= 0 ? '💥' : grade}</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {lives <= 0 ? 'Game Over!' : 'Mission Complete!'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {correctCount} hits out of {Math.min(round + 1, challenges.length)} targets
        </p>
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-6">
          <div className="bg-muted rounded-lg p-3">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-2xl font-bold text-foreground">{percentage}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="text-2xl font-bold text-foreground">{'❤️'.repeat(lives)}</div>
            <div className="text-xs text-muted-foreground">Lives Left</div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={onBack} className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">← Back</button>
          <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">🚀 Play Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative select-none">
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-sm">{'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}</span>
        <div className="text-sm font-semibold text-foreground">Score: {score}</div>
        <div className="text-sm text-muted-foreground">{round + 1}/{TOTAL_ROUNDS}</div>
      </div>

      <div className="text-center mb-3 p-3 bg-muted/50 rounded-lg border border-border">
        <div className="text-xs text-muted-foreground mb-1">Shoot the correct answer:</div>
        <div className="text-lg font-bold text-foreground">{currentPrompt}</div>
      </div>

      {combo >= 2 && (
        <div className="text-center mb-2 text-sm text-primary animate-pulse font-semibold">
          ⚡ {combo}x COMBO
        </div>
      )}

      <div
        ref={gameAreaRef}
        className="relative w-full h-[350px] bg-gradient-to-b from-background to-muted/30 rounded-xl border-2 border-border overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-foreground rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {invaders.map(inv => (
          <button
            key={inv.id}
            onClick={() => handleShoot(inv)}
            disabled={!inv.alive}
            className={cn(
              'absolute px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-100 transform',
              inv.alive
                ? 'bg-destructive/90 text-destructive-foreground hover:scale-110 cursor-crosshair border border-destructive shadow-lg'
                : 'opacity-0 scale-150',
            )}
            style={{
              left: `${Math.max(2, Math.min(inv.x, 78))}%`,
              top: `${Math.max(0, Math.min(inv.y, 90))}%`,
              transition: inv.alive ? 'opacity 0.2s' : 'all 0.3s',
            }}
          >
            <span className="mr-1">👾</span>
            {inv.text}
          </button>
        ))}

        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl transition-transform duration-75"
          style={{ transform: `translateX(-50%) rotate(${shipAngle}deg)` }}
        >
          🚀
        </div>

        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className={cn(
              'text-3xl font-bold px-6 py-3 rounded-xl animate-scale-in',
              feedback.type === 'correct' && 'text-green-500 bg-green-500/10',
              feedback.type === 'incorrect' && 'text-destructive bg-destructive/10',
              feedback.type === 'missed' && 'text-accent bg-accent/10',
            )}>
              {feedback.text}
            </div>
          </div>
        )}

        {showMilestone && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="text-4xl font-bold text-primary animate-bounce bg-background/80 px-6 py-3 rounded-xl backdrop-blur-sm">
              {showMilestone}
            </div>
          </div>
        )}
      </div>

      <div className="h-1 bg-destructive/30 rounded mt-1">
        <div className="h-full bg-destructive rounded" style={{ width: `${(lives / 3) * 100}%` }} />
      </div>
    </div>
  );
}
