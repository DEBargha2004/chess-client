import { ReactChessboard } from '@/components/custom/boards'
import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

export type ActionOnMove = ({}: { from: string; to: string }) => void

export default function GameRenderingApi ({
  actionOnMove,
  fen,
  className,
  arePiecesDraggable,
  ...props
}: {
  fen: string
  actionOnMove: ActionOnMove
  arePiecesDraggable?: boolean
} & HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      <ReactChessboard
        fen={fen}
        actionOnMove={actionOnMove}
        arePiecesDraggable={arePiecesDraggable}
      />
    </div>
  )
}
