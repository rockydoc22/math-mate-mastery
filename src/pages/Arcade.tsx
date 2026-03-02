import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Gamepad2, Crosshair, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExamType } from '@/hooks/useExamType';
import { EXAM_CONFIGS } from '@/utils/examConfig';
import { ArcadeSkill } from '@/data/arcadeChallenges';
import { ZalagaGame } from '@/components/games/ZalagaGame';
import { HangmanGame } from '@/components/games/HangmanGame';
import { ChessGame } from '@/components/games/ChessGame';

type GameType = 'zalaga' | 'hangman' | 'chess';

const games: { id: GameType; emoji: string; name: string; desc: string; color: string; iconColor: string }[] = [
  { id: 'zalaga', emoji: '🚀', name: 'Zalaga', desc: 'Shoot the correct answer before it reaches Earth!', color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400' },
  { id: 'hangman', emoji: '🪢', name: 'Hangman', desc: 'Guess the answer letter by letter', color: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
  { id: 'chess', emoji: '♟️', name: 'Chess', desc: 'Answer questions to earn moves against the AI', color: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
];

const skills: { id: ArcadeSkill; label: string; emoji: string }[] = [
  { id: 'math', label: 'Math', emoji: '📐' },
  { id: 'english', label: 'English', emoji: '📝' },
  { id: 'mixed', label: 'Both', emoji: '🎯' },
];

export default function Arcade() {
  const { examType } = useExamType();
  const examConfig = EXAM_CONFIGS[examType];
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<ArcadeSkill | null>(null);
  const [playing, setPlaying] = useState(false);

  const handleComplete = (results: { score: number; correct: number; total: number }) => {
    // Could save to DB here in future
    console.log('Game complete:', results);
  };

  const handleBack = () => {
    setPlaying(false);
    setSelectedSkill(null);
  };

  const startGame = (skill: ArcadeSkill) => {
    setSelectedSkill(skill);
    setPlaying(true);
  };

  // Playing a game
  if (playing && selectedGame && selectedSkill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">
              {games.find(g => g.id === selectedGame)?.emoji} {games.find(g => g.id === selectedGame)?.name} • {examConfig.shortName}
            </h1>
          </div>

          {selectedGame === 'zalaga' && (
            <ZalagaGame skill={selectedSkill} examType={examType} onComplete={handleComplete} onBack={handleBack} />
          )}
          {selectedGame === 'hangman' && (
            <HangmanGame skill={selectedSkill} examType={examType} onComplete={handleComplete} onBack={handleBack} />
          )}
          {selectedGame === 'chess' && (
            <ChessGame skill={selectedSkill} examType={examType} onComplete={handleComplete} onBack={handleBack} />
          )}
        </div>
      </div>
    );
  }

  // Skill selection
  if (selectedGame && !playing) {
    const game = games.find(g => g.id === selectedGame)!;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedGame(null)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">{game.emoji} {game.name}</h1>
          </div>

          <p className="text-muted-foreground mb-6 text-center">{game.desc}</p>

          <h2 className="text-lg font-semibold text-center mb-4">Choose your subject for {examConfig.shortName}</h2>

          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {skills.map(s => (
              <button
                key={s.id}
                onClick={() => startGame(s.id)}
                className="flex flex-col items-center gap-2 p-6 rounded-xl border border-border bg-card hover:bg-primary/10 hover:border-primary/30 transition-all hover:scale-105"
              >
                <span className="text-3xl">{s.emoji}</span>
                <span className="font-semibold text-foreground">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-indigo-500" />
              Arcade
            </h1>
            <p className="text-sm text-muted-foreground">Learn {examConfig.shortName} through games</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="text-left"
            >
              <Card className={`p-6 ${game.color} border border-border/50 hover:scale-[1.02] transition-all cursor-pointer`}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{game.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{game.name}</h3>
                    <p className="text-sm text-muted-foreground">{game.desc}</p>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
