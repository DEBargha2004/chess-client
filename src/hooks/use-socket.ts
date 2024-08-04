'use client'

import { UserRole } from '@/types/game'
import { useAuth } from '@clerk/nextjs'
import { Color } from 'chess.js'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function useSocket ({
  roomid,
  url,
  role,
  color
}: {
  url?: string
  roomid: string
  role: UserRole
  color?: Color
}) {
  const socket = useRef<Socket | null>(null)
  const session = useAuth()

  useEffect(() => {
    if (!session.userId || !url) return

    const connection = io(url, {
      auth: {
        userId: session.userId,
        roomId: roomid
      }
    })

    socket.current = connection

    return () => {
      socket.current?.disconnect()
    }
  }, [url, session])

  return { socket }
}
