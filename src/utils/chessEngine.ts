// Lightweight chess engine for the Arcade
// Supports full legal move generation, check/checkmate, and adaptive AI

export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';
export type PieceColor = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  r: number;
  c: number;
}

export interface ChessMove {
  from: Square;
  to: Square;
  captured?: Piece;
}

export type Board = (Piece | null)[][];

export function createInitialBoard(): Board {
  const board: Board = Array.from({ length: 8 }, () => Array(8).fill(null));
  const backRow: PieceType[] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

  for (let c = 0; c < 8; c++) {
    board[0][c] = { type: backRow[c], color: 'black' };
    board[1][c] = { type: 'P', color: 'black' };
    board[6][c] = { type: 'P', color: 'white' };
    board[7][c] = { type: backRow[c], color: 'white' };
  }

  return board;
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

export function getPieceEmoji(piece: Piece): string {
  const white: Record<PieceType, string> = { K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙' };
  const black: Record<PieceType, string> = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };
  return piece.color === 'white' ? white[piece.type] : black[piece.type];
}

export function countPieces(board: Board, color: PieceColor): number {
  let count = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.color === color) count++;
  return count;
}

function generatePieceMoves(board: Board, r: number, c: number): ChessMove[] {
  const piece = board[r][c];
  if (!piece) return [];

  const moves: ChessMove[] = [];
  const color = piece.color;
  const enemy = color === 'white' ? 'black' : 'white';

  const tryAdd = (tr: number, tc: number): boolean => {
    if (!inBounds(tr, tc)) return false;
    const target = board[tr][tc];
    if (target?.color === color) return false;
    moves.push({ from: { r, c }, to: { r: tr, c: tc }, captured: target || undefined });
    return !target;
  };

  const slide = (dr: number, dc: number) => {
    let tr = r + dr, tc = c + dc;
    while (inBounds(tr, tc)) {
      const target = board[tr][tc];
      if (target) {
        if (target.color === enemy)
          moves.push({ from: { r, c }, to: { r: tr, c: tc }, captured: target });
        break;
      }
      moves.push({ from: { r, c }, to: { r: tr, c: tc } });
      tr += dr;
      tc += dc;
    }
  };

  switch (piece.type) {
    case 'P': {
      const dir = color === 'white' ? -1 : 1;
      const startRow = color === 'white' ? 6 : 1;
      if (inBounds(r + dir, c) && !board[r + dir][c]) {
        moves.push({ from: { r, c }, to: { r: r + dir, c } });
        if (r === startRow && !board[r + dir * 2][c])
          moves.push({ from: { r, c }, to: { r: r + dir * 2, c } });
      }
      for (const dc of [-1, 1]) {
        const tr = r + dir, tc = c + dc;
        if (inBounds(tr, tc) && board[tr][tc]?.color === enemy)
          moves.push({ from: { r, c }, to: { r: tr, c: tc }, captured: board[tr][tc]! });
      }
      break;
    }
    case 'N':
      for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])
        tryAdd(r + dr, c + dc);
      break;
    case 'B':
      for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) slide(dr, dc);
      break;
    case 'R':
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) slide(dr, dc);
      break;
    case 'Q':
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) slide(dr, dc);
      break;
    case 'K':
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]])
        tryAdd(r + dr, c + dc);
      break;
  }

  return moves;
}

export function applyMove(board: Board, move: ChessMove): Board {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[move.from.r][move.from.c]!;
  newBoard[move.to.r][move.to.c] = { ...piece };
  newBoard[move.from.r][move.from.c] = null;

  if (piece.type === 'P') {
    if ((piece.color === 'white' && move.to.r === 0) || (piece.color === 'black' && move.to.r === 7))
      newBoard[move.to.r][move.to.c] = { type: 'Q', color: piece.color };
  }

  return newBoard;
}

function findKing(board: Board, color: PieceColor): Square | null {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.type === 'K' && board[r][c]?.color === color)
        return { r, c };
  return null;
}

export function isInCheck(board: Board, color: PieceColor): boolean {
  const king = findKing(board, color);
  if (!king) return true;
  const enemy = color === 'white' ? 'black' : 'white';

  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.color === enemy) {
        const attacks = generatePieceMoves(board, r, c);
        if (attacks.some(m => m.to.r === king.r && m.to.c === king.c)) return true;
      }
  return false;
}

export function getLegalMoves(board: Board, color: PieceColor): ChessMove[] {
  const allMoves: ChessMove[] = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.color === color)
        allMoves.push(...generatePieceMoves(board, r, c));

  return allMoves.filter(move => {
    const newBoard = applyMove(board, move);
    return !isInCheck(newBoard, color);
  });
}

export function getMovesForSquare(board: Board, r: number, c: number): ChessMove[] {
  const piece = board[r][c];
  if (!piece) return [];
  const pieceMoves = generatePieceMoves(board, r, c);
  return pieceMoves.filter(move => {
    const newBoard = applyMove(board, move);
    return !isInCheck(newBoard, piece.color);
  });
}

export function isCheckmate(board: Board, color: PieceColor): boolean {
  return isInCheck(board, color) && getLegalMoves(board, color).length === 0;
}

export function isStalemate(board: Board, color: PieceColor): boolean {
  return !isInCheck(board, color) && getLegalMoves(board, color).length === 0;
}

const PIECE_VALUES: Record<PieceType, number> = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 0 };

const CENTER_BONUS = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, .1, .2, .2, .1, 0, 0],
  [0, 0, .2, .3, .3, .2, 0, 0],
  [0, 0, .2, .3, .3, .2, 0, 0],
  [0, 0, .1, .2, .2, .1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

function evaluateBoard(board: Board): number {
  let score = 0;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const val = PIECE_VALUES[p.type] + CENTER_BONUS[r][c];
      score += p.color === 'black' ? val : -val;
    }
  return score;
}

export function getAIMove(board: Board, difficulty: number): ChessMove | null {
  const moves = getLegalMoves(board, 'black');
  if (moves.length === 0) return null;

  if (difficulty <= 2) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (difficulty <= 5) {
    const captures = moves.filter(m => m.captured);
    if (captures.length > 0 && Math.random() < 0.5 + difficulty * 0.05) {
      captures.sort((a, b) => PIECE_VALUES[b.captured!.type] - PIECE_VALUES[a.captured!.type]);
      return captures[0];
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  const scored = moves.map(move => {
    const newBoard = applyMove(board, move);
    let s = evaluateBoard(newBoard);
    if (isInCheck(newBoard, 'white')) s += 0.5;
    if (move.captured) s += PIECE_VALUES[move.captured.type] * 0.3;
    return { move, score: s };
  });

  scored.sort((a, b) => b.score - a.score);
  const topN = Math.max(1, Math.ceil(scored.length * Math.max(0.1, 1 - difficulty / 12)));
  const candidates = scored.slice(0, topN);
  return candidates[Math.floor(Math.random() * candidates.length)].move;
}
