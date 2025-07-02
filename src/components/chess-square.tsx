'use client';

import { cn } from '@/lib/utils';
import { Piece, PieceType } from '@/lib/chess-logic';
import ChessPiece from './chess-piece';

interface ChessSquareProps {
  isLight: boolean;
  piece: Piece | null;
  isSelected: boolean;
  isPossibleMove: boolean;
  onClick: () => void;
  animationSpeedClass: string;
  effect?: {
    name: string;
    pieceType?: PieceType;
  };
}

const EffectContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">{children}</div>
);

const PawnCaptureEffect = () => ( <EffectContainer><div className="w-8 h-8 rounded-full bg-accent/80 animate-pawn-poof" /></EffectContainer> );
const KnightCaptureEffect = () => ( <EffectContainer><svg viewBox="0 0 100 100" className="w-full h-full text-accent/80 animate-knight-slash"><path d="M10 10 L90 90 M10 90 L90 10" stroke="currentColor" strokeWidth="8" strokeLinecap="round" /></svg></EffectContainer> );
const BishopCaptureEffect = () => ( <EffectContainer><div className="w-4 h-full bg-gradient-to-t from-transparent via-accent/80 to-transparent animate-bishop-beam" /></EffectContainer> );
const RookCaptureEffect = () => ( <EffectContainer><div className="w-12 h-12 border-4 border-accent/80 animate-rook-smash" /></EffectContainer> );
const QueenCaptureEffect = () => ( <EffectContainer><div className="w-16 h-16 rounded-full bg-radial-accent animate-queen-blast" /></EffectContainer> );

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
        isLight ? 'bg-card/80' : 'bg-primary/5',
        'backdrop-blur-[1px]',
        'hover:bg-accent/20',
        isSelected && 'bg-accent/40 ring-2 ring-accent ring-inset',
        effect?.name === 'checkmate' && 'animate-king-in-danger rounded-md'
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.02))`
      }}
    >
      {effect?.name === 'capture' && (
        <>
          {effect.pieceType === 'pawn' && <PawnCaptureEffect />}
          {effect.pieceType === 'knight' && <KnightCaptureEffect />}
          {effect.pieceType === 'bishop' && <BishopCaptureEffect />}
          {effect.pieceType === 'rook' && <RookCaptureEffect />}
          {effect.pieceType === 'queen' && <QueenCaptureEffect />}
        </>
      )}

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
              'w-1/3 h-1/3 rounded-full bg-accent/70 transition-transform duration-300 ease-in-out animate-pulse-bright',
              piece
                ? 'bg-accent/50 scale-125 ring-4 ring-background/50'
                : 'scale-100'
            )}
          ></div>
        </div>
      )}
    </div>
  );
}
