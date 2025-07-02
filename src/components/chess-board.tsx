'use client';

import { Board, Position, PieceType, Piece } from '@/lib/chess-logic';
import ChessSquare from './chess-square';
import ChessPiece from './chess-piece';
import { cn } from '@/lib/utils';

interface ChessBoardProps {
  board: Board;
  onSquareClick: (row: number, col: number) => void;
  selectedPiece: Position | null;
  possibleMoves: Position[];
  animationSpeedClass: string;
  effects: Record<string, { name: string; pieceType?: PieceType }>;
  dyingPieces: { piece: Piece; position: Position; id: number }[];
  isShaking: boolean;
}

export default function ChessBoard({
  board,
  onSquareClick,
  selectedPiece,
  possibleMoves,
  animationSpeedClass,
  effects,
  dyingPieces,
  isShaking,
}: ChessBoardProps) {
  return (
    <div
      className={cn(
        "relative p-4 bg-background rounded-lg shadow-2xl border-4 border-primary/20",
        isShaking && 'animate-board-shake'
      )}
      style={{
        backgroundImage: `
          radial-gradient(ellipse at center, hsl(var(--secondary)) 0%, hsl(var(--background)) 75%)
        `,
        boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.6)',
      }}
    >
      <div className="grid grid-cols-8 grid-rows-8 aspect-square w-full max-w-[calc(100vh-12rem)] min-w-[300px] mx-auto border-2 border-accent/20 shadow-lg rounded-md overflow-hidden">
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
      {dyingPieces.map(({ piece, position, id }) => (
        <div
          key={id}
          className="absolute flex items-center justify-center w-[12.5%] h-[12.5%] pointer-events-none z-20"
          style={{
            top: `${position.row * 12.5}%`,
            left: `${position.col * 12.5}%`,
          }}
        >
          <ChessPiece
            piece={piece}
            animationSpeedClass={animationSpeedClass}
            isSelected={false}
            isDying={true}
          />
        </div>
      ))}
    </div>
  );
}
