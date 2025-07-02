'use client';

import { Board, Position } from '@/lib/chess-logic';
import ChessSquare from './chess-square';

interface ChessBoardProps {
  board: Board;
  onSquareClick: (row: number, col: number) => void;
  selectedPiece: Position | null;
  possibleMoves: Position[];
  animationSpeedClass: string;
  effects: Record<string, string>;
}

export default function ChessBoard({
  board,
  onSquareClick,
  selectedPiece,
  possibleMoves,
  animationSpeedClass,
  effects,
}: ChessBoardProps) {
  return (
    <div
      className="p-4 bg-primary/10 rounded-lg shadow-2xl border-4 border-primary/50"
      style={{
        backgroundImage:
          'conic-gradient(from var(--gradient-angle) at 50% 50%, hsl(var(--secondary)), hsl(var(--background)), hsl(var(--secondary)))',
        animation: 'gradient-spin 15s linear infinite',
      }}
    >
      <div className="grid grid-cols-8 grid-rows-8 aspect-square w-full max-w-[calc(100vh-12rem)] min-w-[300px] mx-auto border-2 border-accent/50 shadow-lg rounded-md overflow-hidden">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 !== 0;
            const isSelected =
              selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
            const isPossibleMove = possibleMoves.some(
              (p) => p.row === rowIndex && p.col === colIndex
            );
            const key = `${rowIndex},${colIndex}`;

            return (
              <ChessSquare
                key={`${rowIndex}-${colIndex}`}
                isLight={isLight}
                piece={piece}
                isSelected={isSelected}
                isPossibleMove={isPossibleMove}
                onClick={() => onSquareClick(rowIndex, colIndex)}
                animationSpeedClass={animationSpeedClass}
                effect={effects[key]}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
