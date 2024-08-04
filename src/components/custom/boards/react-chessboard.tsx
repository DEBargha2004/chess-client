'use client'

import { Chessboard } from 'react-chessboard'
import { ActionOnMove } from '../game-rendering-api'
import { Square } from 'chess.js'

export default function ReactChessboard ({
  fen,
  actionOnMove,
  arePiecesDraggable = true
}: {
  fen: string
  actionOnMove: ActionOnMove
  arePiecesDraggable?: boolean
}) {
  const handleDrop = (sourceSquare: Square, targetSquare: Square) => {
    actionOnMove({ from: sourceSquare, to: targetSquare })
    return true
  }
  return (
    <Chessboard
      position={fen}
      onPieceDrop={handleDrop}
      arePiecesDraggable={arePiecesDraggable}
    />
  )
}
