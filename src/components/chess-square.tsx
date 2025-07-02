'use client';

import { cn } from '@/lib/utils';
import { Piece } from '@/lib/chess-logic';
import ChessPiece from './chess-piece';

interface ChessSquareProps {
  isLight: boolean;
  piece: Piece | null;
  isSelected: boolean;
  isPossibleMove: boolean;
  onClick: () => void;
  animationSpeedClass: string;
}

export default function ChessSquare({
  isLight,
  piece,
  isSelected,
  isPossibleMove,
  onClick,
  animationSpeedClass,
}: ChessSquareProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full h-full flex items-center justify-center cursor-pointer transition-colors duration-200 relative',
        isLight ? 'bg-card' : 'bg-primary/20',
        isSelected && 'bg-accent/50',
      )}
    >
      {piece && <ChessPiece piece={piece} animationSpeedClass={animationSpeedClass} />}
      {isPossibleMove && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            'w-1/3 h-1/3 rounded-full bg-accent/50 transition-transform duration-300 ease-in-out',
            piece ? 'bg-accent/40 scale-125 ring-4 ring-background' : 'scale-100'
          )}></div>
        </div>
      )}
    </div>
  );
}
