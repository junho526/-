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
  effect?: string;
}

const CaptureEffect = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
    <svg
      viewBox="0 0 100 100"
      className="w-[150%] h-[150%] animate-sparkle text-accent/80"
    >
      <path
        d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L79.4 100 L50 76.4 L20.6 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

export default function ChessSquare({
  isLight,
  piece,
  isSelected,
  isPossibleMove,
  onClick,
  animationSpeedClass,
  effect,
}: ChessSquareProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full h-full flex items-center justify-center cursor-pointer transition-colors duration-200 relative',
        isLight ? 'bg-card' : 'bg-primary/20',
        isSelected && 'bg-accent/50 ring-2 ring-accent ring-inset',
        effect === 'checkmate' && 'animate-king-in-danger rounded-md'
      )}
    >
      {effect === 'capture' && <CaptureEffect />}

      {piece && (
        <ChessPiece
          piece={piece}
          animationSpeedClass={animationSpeedClass}
          isSelected={isSelected}
        />
      )}

      {isPossibleMove && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              'w-1/3 h-1/3 rounded-full bg-accent transition-transform duration-300 ease-in-out animate-pulse-bright',
              piece
                ? 'bg-accent/70 scale-125 ring-4 ring-background/50'
                : 'scale-100'
            )}
          ></div>
        </div>
      )}
    </div>
  );
}
