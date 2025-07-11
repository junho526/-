'use client';

import { useState, useEffect, useCallback } from 'react';
import ChessBoard from './chess-board';
import MatchInfo from './match-info';
import {
  initialBoard,
  calculatePossibleMoves,
  type Piece,
  type Board,
  type Position,
  type PieceType,
} from '@/lib/chess-logic';
import { useSettings } from '@/hooks/use-settings';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';

export type Player = 'white' | 'black';

export default function ChessGame() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [turn, setTurn] = useState<Player>('white');
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
  const [moveCount, setMoveCount] = useState(0);
  const [timers, setTimers] = useState({ white: 600, black: 600 });
  const [gameOver, setGameOver] = useState<{ winner: Player | null, reason: string } | null>(null);
  const [effects, setEffects] = useState<Record<string, { name: string; pieceType?: PieceType }>>({});
  const [dyingPieces, setDyingPieces] = useState<{ piece: Piece; position: Position; id: number }[]>([]);
  const [isShaking, setIsShaking] = useState(false);

  const { settings } = useSettings();
  const animationSpeedClass = `duration-${settings.animationSpeed}`;

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimers((prev) => {
        const newTime = prev[turn] - 1;
        if (newTime <= 0) {
          setGameOver({ winner: turn === 'white' ? 'black' : 'white', reason: 'Timeout' });
          return { ...prev, [turn]: 0 };
        }
        return { ...prev, [turn]: newTime };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [turn, gameOver]);

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      if (gameOver) return;

      if (selectedPiece) {
        const isPossibleMove = possibleMoves.some(
          (p) => p.row === row && p.col === col
        );
        if (isPossibleMove) {
          const newBoard = board.map((r) => [...r]);
          const pieceToMove = newBoard[selectedPiece.row][selectedPiece.col];

          const capturedPiece = newBoard[row][col];
          if (capturedPiece) {
            const capturedPieceId = Date.now() + Math.random();

            if (capturedPiece.type !== 'pawn' && capturedPiece.type !== 'king') {
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 500);
            }

            if (capturedPiece.type === 'king') {
                setGameOver({ winner: turn, reason: 'Checkmate!' });
                const key = `${row},${col}`;
                setEffects(prev => ({ ...prev, [key]: { name: 'checkmate' } }));
                setDyingPieces(prev => [...prev, { piece: capturedPiece, position: { row, col }, id: capturedPieceId }]);
                 setTimeout(() => {
                    setDyingPieces(prev => prev.filter(p => p.id !== capturedPieceId));
                }, 1000);
            } else {
                setDyingPieces(prev => [...prev, { piece: capturedPiece, position: { row, col }, id: capturedPieceId }]);
                setTimeout(() => {
                    setDyingPieces(prev => prev.filter(p => p.id !== capturedPieceId));
                }, 1000); // Remove after animation

                const key = `${row},${col}`;
                setEffects(prev => ({ ...prev, [key]: { name: 'capture', pieceType: capturedPiece.type } }));
                setTimeout(() => {
                    setEffects(prev => {
                        const newEffects = { ...prev };
                        delete newEffects[key];
                        return newEffects;
                    });
                }, 1000);
            }
          }

          newBoard[row][col] = pieceToMove;
          newBoard[selectedPiece.row][selectedPiece.col] = null;
          
          setBoard(newBoard);
          setTurn(turn === 'white' ? 'black' : 'white');
          setMoveCount(moveCount + 1);
          setSelectedPiece(null);
          setPossibleMoves([]);

        } else {
          setSelectedPiece(null);
          setPossibleMoves([]);
        }
      } else {
        const piece = board[row][col];
        if (piece && piece.color === turn) {
          setSelectedPiece({ row, col });
          setPossibleMoves(calculatePossibleMoves(board, piece, row, col));
        }
      }
    },
    [board, selectedPiece, possibleMoves, turn, moveCount, gameOver]
  );
  
  const resetGame = () => {
    setBoard(initialBoard);
    setTurn('white');
    setSelectedPiece(null);
    setPossibleMoves([]);
    setMoveCount(0);
    setTimers({ white: 600, black: 600 });
    setGameOver(null);
    setEffects({});
    setDyingPieces([]);
    setIsShaking(false);
  };


  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
      <MatchInfo
        turn={turn}
        timers={timers}
        moveCount={moveCount}
        onReset={resetGame}
      />
      <div className="relative">
         <ChessBoard
            board={board}
            onSquareClick={handleSquareClick}
            selectedPiece={selectedPiece}
            possibleMoves={possibleMoves}
            animationSpeedClass={animationSpeedClass}
            effects={effects}
            dyingPieces={dyingPieces}
            isShaking={isShaking}
         />
      </div>
      <AlertDialog open={!!gameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-3xl text-center">
              {gameOver?.reason === 'Checkmate!' ? 'Checkmate!' : 'Game Over'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              {gameOver?.winner ? `Player ${gameOver.winner} wins by ${gameOver.reason.toLowerCase()}!` : "It's a draw!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={resetGame} className="w-full">Play Again</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
