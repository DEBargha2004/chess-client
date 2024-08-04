'use client'

import { GameRenderingApi } from '@/components/custom'
import { useState } from 'react'
import { Chess, Color } from 'chess.js'
import { ActionOnMove } from '@/components/custom/game-rendering-api'
import useSocket from '@/hooks/use-socket'
import { UserRole } from '@/types/game'

export default function GameInstance ({
  id,
  role,
  color
}: {
  id: string
  role: UserRole
  color?: Color
}) {
  const [game] = useState(new Chess())
  const [fen, setFen] = useState(game.fen())
  const { socket } = useSocket({
    roomid: id,
    role,
    color
  })

  const handleLogic: ActionOnMove = e => {
    // perform game logic
    try {
      game.move({
        from: e.from,
        to: e.to,
        promotion: 'q'
      })
    } catch (error) {}
  }

  const handleChange: ActionOnMove = e => {
    handlePassDataToSocket(e)

    handleLogic(e)

    setFen(game.fen())
  }

  const handleDataFromSocket: ActionOnMove = e => {
    handleLogic(e)

    setFen(game.fen())
  }

  const handlePassDataToSocket: ActionOnMove = e => {
    // send through socket
  }

  return (
    <div className='h-full w-full grid grid-cols-3'>
      <GameRenderingApi
        fen={fen}
        actionOnMove={handleChange}
        className='col-start-2 col-span-1 w-full my-auto'
      />
    </div>
  )
}
