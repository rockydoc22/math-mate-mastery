import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArcadeChallenge, ArcadeSkill, generateArcadeChallenges, generateHardChallenge } from '@/data/arcadeChallenges';
import { useGameSounds } from '@/hooks/useGameSounds';
import { ExamType } from '@/utils/examConfig';
import {
  Board, ChessMove, Square,
  createInitialBoard, applyMove, getLegalMoves, getMovesForSquare,
  getAIMove, getPieceEmoji, isCheckmate, isStalemate, isInCheck, countPieces,
} from '@/utils/chessEngine';

interface ChessGameProps {
  skill: ArcadeSkill;
  examType: ExamType;
  onComplete: (results: { score: number; correct: number; total: number }) => void;
  onBack: () => void;
}

type Phase = 'answering' | 'grit-offer' | 'grit-answering' | 'selecting' | 'bonus-move' | 'ai-thinking' | 'game-over';

const TOTAL_QUESTIONS = 20;
const GRIT_STREAK_THRESHOLD = 5;

export function ChessGame({ skill, examType, onComplete, onBack }: ChessGameProps) {
  const [board, setBoard] = useState<Board>(createInitialBoard);
  const [challenges] = useState(() => generateArcadeChallenges(skill, TOTAL_QUESTIONS + 10, examType));
  const [questionIdx, setQuestionIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const streakRef = useRef(0);
  const [difficulty, setDifficulty] = useState(2);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<ChessMove[]>([]);
  const [lastMove, setLastMove] = useState<ChessMove | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect'>('correct');
  const [inCheck, setInCheck] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [gritChallenge, setGritChallenge] = useState<ArcadeChallenge | null>(null);
  const sounds = useGameSounds();

  const activeChallenge = phase === 'grit-answering' && gritChallenge ? gritChallenge : challenges[questionIdx];

  useEffect(() => {
    if (!activeChallenge) return;
    const answers = [activeChallenge.correctAnswer, ...activeChallenge.distractors.slice(0, 3)];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    setShuffledAnswers(answers);
  }, [questionIdx, activeChallenge, phase]);

  useEffect(() => {
    if (phase === 'game-over') return;
    const whiteCheckmate = isCheckmate(board, 'white');
    const blackCheckmate = isCheckmate(board, 'black');
    const stale = isStalemate(board, phase === 'selecting' || phase === 'bonus-move' ? 'white' : 'black');

    if (whiteCheckmate || blackCheckmate || stale) {
      setPhase('game-over');
      if (blackCheckmate) sounds.playVictory();
      else sounds.playDefeat();
      endGame();
    } else {
      setInCheck(isInCheck(board, phase === 'ai-thinking' ? 'black' : 'white'));
    }
  }, [board, phase]);

  const endGame = useCallback(() => {
    onComplete({ score, correct: correctCount, total: totalAnswered });
  }, [score, correctCount, totalAnswered, onComplete]);

  const handleAnswer = useCallback((answer: string) => {
    if (phase !== 'answering' && phase !== 'grit-answering') return;
    const isGrit = phase === 'grit-answering';
    const isCorrect = answer === activeChallenge?.correctAnswer;

    setTotalAnswered(prev => prev + 1);

    if (isCorrect) {
      sounds.playChessCapture();
      const newStreak = streak + 1;
      setStreak(newStreak);
      streakRef.current = newStreak;
      const points = isGrit ? 30 : 15 + Math.min(newStreak, 5) * 3;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      setDifficulty(prev => Math.min(10, prev + 0.3));

      if (newStreak >= 3) sounds.playCombo(newStreak);

      setFeedback(isGrit ? `🔥 GRIT BONUS! +${points}` : `+${points} ✓`);
      setFeedbackType('correct');

      setTimeout(() => {
        setFeedback(null);
        setQuestionIdx(prev => prev + 1);
        if (isGrit) {
          setStreak(0);
          streakRef.current = 0;
          setPhase('bonus-move');
        } else {
          setPhase('selecting');
        }
      }, 800);
    } else {
      sounds.playWrong();
      setStreak(0);
      streakRef.current = 0;
      setDifficulty(prev => Math.max(1, prev - 0.5));

      setFeedback(isGrit ? '✖ Grit failed — opponent moves!' : '✖ Wrong — opponent moves!');
      setFeedbackType('incorrect');

      setTimeout(() => {
        setFeedback(null);
        setQuestionIdx(prev => prev + 1);
        doAIMove(board);
      }, 1000);
    }
  }, [phase, activeChallenge, streak, sounds, board, difficulty]);

  const handleGritAccept = () => {
    setGritChallenge(generateHardChallenge(skill));
    setPhase('grit-answering');
  };
  const handleGritDecline = () => setPhase('selecting');

  const doAIMove = useCallback((currentBoard: Board) => {
    const aiMove = getAIMove(currentBoard, difficulty);
    if (!aiMove) {
      setPhase('game-over');
      sounds.playVictory();
      endGame();
      return;
    }

    const newBoard = applyMove(currentBoard, aiMove);
    setBoard(newBoard);
    setLastMove(aiMove);
    sounds.playChessMove();
    if (aiMove.captured) sounds.playChessCapture();

    if (isCheckmate(newBoard, 'white')) { setPhase('game-over'); sounds.playDefeat(); endGame(); return; }
    if (isStalemate(newBoard, 'white')) { setPhase('game-over'); endGame(); return; }
    if (questionIdx + 1 >= challenges.length) { setPhase('game-over'); endGame(); return; }

    if (streakRef.current >= GRIT_STREAK_THRESHOLD) setPhase('grit-offer');
    else setPhase('answering');
  }, [difficulty, sounds, endGame, questionIdx, challenges.length]);

  const handleSquareClick = useCallback((r: number, c: number) => {
    if (phase !== 'selecting' && phase !== 'bonus-move') return;

    const piece = board[r][c];

    if (selectedSquare && legalMoves.some(m => m.to.r === r && m.to.c === c)) {
      const move = legalMoves.find(m => m.to.r === r && m.to.c === c)!;

      if (phase === 'bonus-move') {
        const testBoard = applyMove(board, move);
        if (isInCheck(testBoard, 'black') || isCheckmate(testBoard, 'black')) {
          setFeedback('⚠️ Cannot check during bonus move!');
          setFeedbackType('incorrect');
          setTimeout(() => setFeedback(null), 1000);
          return;
        }
      }

      const newBoard = applyMove(board, move);
      setBoard(newBoard);
      setLastMove(move);
      setSelectedSquare(null);
      setLegalMoves([]);
      sounds.playChessMove();

      if (move.captured) { sounds.playChessCapture(); setScore(prev => prev + 5); }

      if (isCheckmate(newBoard, 'black')) { setPhase('game-over'); sounds.playVictory(); endGame(); return; }

      setPhase('ai-thinking');
      setTimeout(() => doAIMove(newBoard), 600);
      return;
    }

    if (piece?.color === 'white') {
      let moves = getMovesForSquare(board, r, c);
      if (phase === 'bonus-move') {
        moves = moves.filter(m => {
          const testBoard = applyMove(board, m);
          return !isInCheck(testBoard, 'black') && !isCheckmate(testBoard, 'black');
        });
      }
      if (moves.length > 0) {
        setSelectedSquare({ r, c });
        setLegalMoves(moves);
        sounds.playChessMove();
      }
      return;
    }

    setSelectedSquare(null);
    setLegalMoves([]);
  }, [phase, board, selectedSquare, legalMoves, sounds, endGame, doAIMove]);

  if (phase === 'game-over') {
    const percentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const whitePieces = countPieces(board, 'white');
    const blackPieces = countPieces(board, 'black');
    const playerWon = isCheckmate(board, 'black') || whitePieces > blackPieces;

    return (
      <div className="text-center py-6 animate-fade-in">
        <div className="text-6xl mb-3 animate-bounce">{playerWon ? '♔' : '♚'}</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {isCheckmate(board, 'black') ? 'Checkmate! You Win!' :
           isCheckmate(board, 'white') ? 'Checkmate! You Lose!' :
           isStalemate(board, 'white') || isStalemate(board, 'black') ? 'Stalemate!' : 'Game Over!'}
        </h2>
        <p className="text-muted-foreground mb-4">
          {correctCount}/{totalAnswered} questions correct • Difficulty: {Math.round(difficulty)}/10
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
            <div className="text-2xl font-bold text-foreground">{whitePieces}</div>
            <div className="text-xs text-muted-foreground">Pieces Left</div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={onBack} className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">← Back</button>
          <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">♔ Play Again</button>
        </div>
      </div>
    );
  }

  const isLegalTarget = (r: number, c: number) => legalMoves.some(m => m.to.r === r && m.to.c === c);
  const isLastMoveSquare = (r: number, c: number) =>
    lastMove && ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c));

  return (
    <div className="relative select-none">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">AI Lvl:</span>
          <span className="font-bold text-foreground">{Math.round(difficulty)}</span>
        </div>
        <span className="text-sm font-semibold text-foreground">Score: {score}</span>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Q:</span>
          <span className="text-foreground">{totalAnswered}/{TOTAL_QUESTIONS}</span>
        </div>
      </div>

      {streak >= 2 && (
        <div className="text-center mb-2 text-sm text-primary animate-pulse font-semibold">⚡ {streak} correct in a row!</div>
      )}

      {inCheck && (
        <div className="text-center mb-2 text-sm text-destructive font-bold animate-pulse">⚠️ CHECK!</div>
      )}

      {(phase === 'answering' || phase === 'grit-answering') && activeChallenge && (
        <div className="mb-3 p-3 bg-muted/50 rounded-lg border border-border animate-fade-in">
          {phase === 'grit-answering' && (
            <div className="text-xs font-bold text-primary mb-1">🔥 GRIT CHALLENGE — harder question!</div>
          )}
          <div className="text-xs text-muted-foreground mb-1">Answer correctly to move your piece:</div>
          <div className="text-base font-bold text-foreground mb-3">{activeChallenge.prompt}</div>
          <div className="grid grid-cols-2 gap-2">
            {shuffledAnswers.map((ans, i) => (
              <button
                key={`${questionIdx}-${i}`}
                onClick={() => handleAnswer(ans)}
                className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-primary/10 hover:border-primary/30 transition-all active:scale-95"
              >
                {ans}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'grit-offer' && (
        <div className="mb-3 p-4 bg-primary/5 rounded-lg border-2 border-primary/30 text-center animate-fade-in">
          <div className="text-2xl mb-2">🔥</div>
          <h3 className="font-bold text-foreground mb-1">Test Your Grit?</h3>
          <p className="text-xs text-muted-foreground mb-3">
            {streak} correct in a row! Take a harder question for a <span className="text-primary font-bold">bonus move</span>, or play it safe.
          </p>
          <div className="flex gap-2 justify-center">
            <button onClick={handleGritDecline} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-muted transition-colors">Play it Safe</button>
            <button onClick={handleGritAccept} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">🔥 Bring It On!</button>
          </div>
        </div>
      )}

      {(phase === 'selecting' || phase === 'bonus-move') && (
        <div className="text-center mb-2 text-sm text-muted-foreground animate-fade-in">
          {phase === 'bonus-move' && <span className="text-primary font-bold">🔥 BONUS MOVE! </span>}
          {phase === 'selecting' && 'Tap one of your pieces, then tap where to move.'}
        </div>
      )}

      {phase === 'ai-thinking' && (
        <div className="text-center mb-2 text-sm text-muted-foreground animate-pulse">🤔 Opponent is thinking...</div>
      )}

      <div className="relative mx-auto rounded-xl overflow-hidden border-2 border-border" style={{ maxWidth: '500px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => {
              const isLight = (r + c) % 2 === 0;
              const piece = board[r][c];
              const isSelected = selectedSquare?.r === r && selectedSquare?.c === c;
              const isTarget = isLegalTarget(r, c);
              const isLast = isLastMoveSquare(r, c);
              const isCapture = isTarget && piece !== null;

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleSquareClick(r, c)}
                  className={cn(
                    'aspect-square flex items-center justify-center cursor-pointer transition-all relative',
                    isLight ? 'bg-amber-100 dark:bg-amber-900/40' : 'bg-amber-800 dark:bg-amber-950/60',
                    isSelected && 'ring-2 ring-primary ring-inset bg-primary/20',
                    isLast && !isSelected && 'bg-yellow-300/20 dark:bg-yellow-500/10',
                    isTarget && !isCapture && 'hover:bg-primary/20',
                    isCapture && 'hover:bg-destructive/20',
                  )}
                >
                  {isTarget && !piece && <div className="absolute w-3 h-3 rounded-full bg-primary/40" />}
                  {isCapture && <div className="absolute inset-1 rounded-full border-2 border-destructive/50" />}
                  {piece && (
                    <span className={cn(
                      'text-4xl md:text-5xl leading-none transition-transform',
                      piece.color === 'white' && 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]',
                      isSelected && 'scale-110',
                    )}>
                      {getPieceEmoji(piece)}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {feedback && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className={cn(
              'text-xl font-bold px-5 py-3 rounded-xl animate-scale-in backdrop-blur-sm',
              feedbackType === 'correct' ? 'text-green-500 bg-green-500/20' : 'text-destructive bg-destructive/20',
            )}>
              {feedback}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between px-2 mt-2 text-xs text-muted-foreground">
        <span>♔ White: {countPieces(board, 'white')} pieces</span>
        <span>♚ Black: {countPieces(board, 'black')} pieces</span>
      </div>
    </div>
  );
}
