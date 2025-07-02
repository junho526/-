export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type Player = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: Player;
}

export type Board = (Piece | null)[][];
export interface Position {
  row: number;
  col: number;
}

const createPiece = (type: PieceType, color: Player): Piece => ({ type, color });

export const initialBoard: Board = [
  [
    createPiece('rook', 'black'),
    createPiece('knight', 'black'),
    createPiece('bishop', 'black'),
    createPiece('queen', 'black'),
    createPiece('king', 'black'),
    createPiece('bishop', 'black'),
    createPiece('knight', 'black'),
    createPiece('rook', 'black'),
  ],
  Array(8).fill(createPiece('pawn', 'black')),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(createPiece('pawn', 'white')),
  [
    createPiece('rook', 'white'),
    createPiece('knight', 'white'),
    createPiece('bishop', 'white'),
    createPiece('queen', 'white'),
    createPiece('king', 'white'),
    createPiece('bishop', 'white'),
    createPiece('knight', 'white'),
    createPiece('rook', 'white'),
  ],
];

function isWithinBounds(row: number, col: number) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function calculatePossibleMoves(board: Board, piece: Piece, r: number, c: number): Position[] {
  const moves: Position[] = [];
  const color = piece.color;
  const opponentColor = color === 'white' ? 'black' : 'white';

  const addMove = (row: number, col: number) => {
    if (isWithinBounds(row, col)) {
        const targetPiece = board[row][col];
        if (targetPiece === null || targetPiece.color === opponentColor) {
            moves.push({ row, col });
        }
    }
  };
  
  const addMoveLine = (dr: number, dc: number) => {
    for (let i = 1; i < 8; i++) {
        const row = r + i * dr;
        const col = c + i * dc;
        if (!isWithinBounds(row, col)) break;
        const targetPiece = board[row][col];
        if (targetPiece === null) {
            moves.push({ row, col });
        } else {
            if (targetPiece.color === opponentColor) {
                moves.push({ row, col });
            }
            break;
        }
    }
  }

  switch (piece.type) {
    case 'pawn':
      const direction = color === 'white' ? -1 : 1;
      const startRow = color === 'white' ? 6 : 1;
      // Forward 1
      if (isWithinBounds(r + direction, c) && board[r + direction][c] === null) {
        moves.push({ row: r + direction, col: c });
        // Forward 2 from start
        if (r === startRow && board[r + 2 * direction][c] === null) {
          moves.push({ row: r + 2 * direction, col: c });
        }
      }
      // Capture
      [-1, 1].forEach(dc => {
        if (isWithinBounds(r + direction, c + dc)) {
            const target = board[r + direction][c + dc];
            if(target && target.color === opponentColor) {
                moves.push({ row: r + direction, col: c + dc });
            }
        }
      });
      break;

    case 'rook':
        addMoveLine(1, 0);
        addMoveLine(-1, 0);
        addMoveLine(0, 1);
        addMoveLine(0, -1);
      break;

    case 'knight':
        const knightMoves = [
            [1, 2], [1, -2], [-1, 2], [-1, -2],
            [2, 1], [2, -1], [-2, 1], [-2, -1]
        ];
        knightMoves.forEach(([dr, dc]) => addMove(r + dr, c + dc));
      break;

    case 'bishop':
        addMoveLine(1, 1);
        addMoveLine(1, -1);
        addMoveLine(-1, 1);
        addMoveLine(-1, -1);
      break;

    case 'queen':
        addMoveLine(1, 0);
        addMoveLine(-1, 0);
        addMoveLine(0, 1);
        addMoveLine(0, -1);
        addMoveLine(1, 1);
        addMoveLine(1, -1);
        addMoveLine(-1, 1);
        addMoveLine(-1, -1);
      break;
      
    case 'king':
        const kingMoves = [
            [1,0], [-1,0], [0,1], [0,-1],
            [1,1], [1,-1], [-1,1], [-1,-1]
        ];
        kingMoves.forEach(([dr, dc]) => addMove(r + dr, c + dc));
      break;
  }

  return moves;
}
