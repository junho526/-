import { Piece } from '@/lib/chess-logic';
import { cn } from '@/lib/utils';
import React from 'react';

// SVG components for each chess piece
const King: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 45 45" className={color}><g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M22.5 11.63V6M20 8h5" stroke="currentColor" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5 3-3 3s-3-3-3-3c-1.5 3 3 10.5 3 10.5" stroke="currentColor" fill="currentColor" /><path d="M12.5 37c5.5-8 5.5-6.5 10-6.5s4.5-1.5 10 6.5" stroke="currentColor" fill="currentColor" /><path d="M12.5 37c5.5-8 5.5-6.5 10-6.5s4.5-1.5 10 6.5H12.5z" stroke="currentColor" /><path d="M11.5 14.5c-1.5 2.5-3 2.5-3 2.5-1.5-2-1-3.5 1-5 .5-1 1.5-1 1.5-1" stroke="currentColor" fill="currentColor" /><path d="M33.5 14.5c1.5 2.5 3 2.5 3 2.5 1.5-2 1-3.5-1-5-.5-1-1.5-1-1.5-1" stroke="currentColor" fill="currentColor" transform="matrix(-1 0 0 1 65 0)" /><path d="M11.5 24.5c-1.5 2.5-3 2.5-3 2.5-1.5-2-1-3.5 1-5 .5-1 1.5-1 1.5-1" stroke="currentColor" fill="currentColor" /><path d="M33.5 24.5c1.5 2.5 3 2.5 3 2.5 1.5-2 1-3.5-1-5-.5-1-1.5-1-1.5-1" stroke="currentColor" fill="currentColor" transform="matrix(-1 0 0 1 65 0)" /></g></svg>
);
const Queen: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 45 45" className={color}><g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M13 12.5s2-4 9.5-4 9.5 4 9.5 4-2-4-9.5-4-9.5 4-9.5 4z" stroke="currentColor" fill="currentColor" /><path d="M13 12.5s2-1.5 9.5-1.5 9.5 1.5 9.5 1.5" stroke="currentColor" /><circle cx="6" cy="10" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="4" cy="18" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="9.5" cy="14.5" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="15" cy="10" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="22.5" cy="8" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="30" cy="10" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="35.5" cy="14.5" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="41" cy="18" r="1.5" stroke="currentColor" fill="currentColor" /><circle cx="39" cy="10" r="1.5" stroke="currentColor" fill="currentColor" /><path d="M12.5 37c5.5-8 5.5-6.5 10-6.5s4.5-1.5 10 6.5H12.5z" stroke="currentColor" fill="currentColor" /><path d="M11.5 14.5c-1.5 2.5-3 2.5-3 2.5-1.5-2-1-3.5 1-5 .5-1 1.5-1 1.5-1" stroke="currentColor" fill="currentColor" /><path d="M33.5 14.5c1.5 2.5 3 2.5 3 2.5 1.5-2 1-3.5-1-5-.5-1-1.5-1-1.5-1" stroke="currentColor" fill="currentColor" transform="matrix(-1 0 0 1 65 0)" /></g></svg>
);
const Rook: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 45 45" className={color}><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" fill="currentColor" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5H14V17" fill="currentColor" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M14 17h17" /><path d="M11 14h23" /></g></svg>
);
const Bishop: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 45 45" className={color}><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M9 36h27v-2H9v2zm3-2s6-4 6-11.5c0-4-2-7-2.5-8-1-1.5-1-1.5-2.5-1-1.5.5-2 2.5-2 2.5-1.5-1-2.5-1.5-2.5-3 0-1.5.5-2 1.5-2.5 1-.5 2 0 2.5 1s1 1.5 1 2.5c0-1 .5-2 1.5-2.5s2.5-.5 3.5.5c1 1 1.5 2 1.5 3.5 0 2-1.5 4-1.5 4s1.5-2 2.5-3c1-.5 2-.5 3 0s1.5 1.5 1.5 2.5c0 1-1 1.5-1 1.5s0 1.5 2.5 2.5c1.5 1.5 2 2.5 2 4.5 0 4.5-3.5 8-5 10" /><path d="M14.5 34c2-2 4-4.5 4-8.5-1-2.5-2-4-2.5-4.5-1.5-1-1.5-2-1.5-2.5.5-1 1.5-1.5 1.5-2 0-.5-1-1-1.5-.5-.5.5-.5 1.5-.5 1.5s-1.5-1.5-1.5-3.5c0-1.5.5-2.5 1-2.5.5 0 1.5 1 1.5 2s-1.5 2.5-1.5 2.5" /><path d="M25 8.5c-1.5 1-2.5 2-4 3.5" fill="currentColor" /><path d="M25 8.5c1.5 1 2.5 2 4 3.5" fill="currentColor" /><path d="M22.5 12.5L25 8.5l-2.5-1-2.5 1z" fill="currentColor" /><path d="M22.5 24.5c4.5-5 4-7.5 4-7.5-1-1.5-2-2.5-2.5-3-1-1.5-1.5-1-1.5-1s-1.5 1-2.5 3c-.5.5-1 1.5-1 1.5s-.5 2.5 4 7.5z" fill="currentColor" /></g></svg>
);
const Knight: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 45 45" className={color}><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M9.5 24.5C14.5 29 16.5 32 16.5 34.5s-1.5 4.5-4.5 4.5-5-2-5-4.5c0-2.5 2.5-5.5 4.5-7.5zM22.5 39H9.5" /><path d="M19 14.5c-1-2-3.5-3.5-3.5-3.5-1.5-1-2.5-1-3.5 0-1.5 1-1.5 2.5-1.5 2.5s-1.5-1.5-3-1.5c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5c1.5 0 3-1.5 3-1.5s1.5 1.5 3 1.5c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5c-.5 0-1 .5-1 .5" /><path d="M19 14.5s0-2.5 2.5-4c2-1 4.5-1 5.5 1s.5 4.5-1 5c-1 1-2.5 1-2.5 1" fill="currentColor" /><path d="M26 15.5c-2.5 2.5-5 3.5-5 3.5-1.5 2-1.5 4.5 0 6 1.5 1.5 3.5 1.5 5 0s2-3.5 2-3.5" fill="currentColor" /><path d="M26 18s-1.5-1-1.5-2.5c0-1 .5-2 1.5-2.5s2.5 0 2.5 1.5c0 1.5-1 2.5-2.5 3.5z" /><path d="M25 39c-5-5-5.5-12.5-6-16.5-2-2-4.5-4-4.5-4s1-2.5 3.5-4.5c2-1.5 4.5-2.5 4.5-2.5s2.5 1 5 3.5c2.5 2.5 4 5 4 5s-2.5 2-4.5 4c-.5 4-1 11.5-6 16.5z" fill="currentColor" /><path d="M25 39c-.5-5-1-11-1.5-14" /><path d="M14.5 14.5c1.5-1 2.5-2 2.5-3 .5-1.5 0-2.5-1-2.5s-1.5 1.5-1.5 3" /><path d="M15.5 21.5c-1-1-2.5-2-2.5-3s0-1.5 1-2c1-.5 1.5 0 1.5 1" /></g></svg>
);
const Pawn: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 45 45" className={color}><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M22.5 9.5c2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4z" fill="currentColor" /><path d="M22.5 13.5s-4-2.5-4-5c0-1.5 1-2.5 1.5-2.5 1 0 1.5 1.5 1.5 1.5s-1.5-1.5-1.5-2.5c0-1 .5-1.5 1-1.5s1 1 1 2.5c0 2.5-4 5-4 5" /><path d="M22.5 13.5s4-2.5 4-5c0-1.5-1-2.5-1.5-2.5-1 0-1.5 1.5-1.5 1.5s1.5-1.5 1.5-2.5c0-1-.5-1.5-1-1.5s-1 1-1 2.5c0 2.5 4 5 4 5" /><path d="M13.5 39.5h18v-2h-18v2zM15.5 37.5v-7h14v7zM15.5 25.5h14" /><path d="M15.5 30.5c-3-2-4-4-4-5.5 0-1.5.5-3 2.5-3s4.5 1 4.5 1" fill="currentColor" /><path d="M30.5 30.5c3-2 4-4 4-5.5 0-1.5-.5-3-2.5-3s-4.5 1-4.5 1" fill="currentColor" /></g></svg>
);


const pieceComponents: Record<string, React.FC<{ color: string }>> = {
  king: King,
  queen: Queen,
  rook: Rook,
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
};

interface ChessPieceProps {
  piece: Piece;
  animationSpeedClass: string;
}

export default function ChessPiece({ piece, animationSpeedClass }: ChessPieceProps) {
  const PieceComponent = pieceComponents[piece.type];
  const colorClass = piece.color === 'white' ? 'text-primary-foreground fill-primary-foreground stroke-primary' : 'text-primary fill-primary stroke-primary-foreground';

  return (
    <div
      className={cn('w-[85%] h-[85%] z-10 transition-transform transform will-change-transform', animationSpeedClass)}
    >
      {PieceComponent && <PieceComponent color={colorClass} />}
    </div>
  );
}
