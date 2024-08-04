import { GameType } from '@/types/game'
import { Color } from 'chess.js'

export const gameType: { id: GameType; label: string }[] = [
  {
    id: 'p2p',
    label: 'P2P'
  },
  {
    id: 'p2p-with-ai',
    label: 'P2P with AI'
  },
  {
    id: 'p2p-with-ai-with-ai',
    label: 'P2P with AI with AI'
  },
  {
    id: 'p2p-with-ai-with-ai-with-spectator',
    label: 'P2P with AI with AI with spectator'
  },
  {
    id: 'p2p-with-ai-with-spectator',
    label: 'P2P with AI with spectator'
  },
  {
    id: 'p2p-with-spectator',
    label: 'P2P with spectator'
  }
]

export const color: { id: Color; label: string }[] = [
  {
    id: 'w',
    label: 'White'
  },
  {
    id: 'b',
    label: 'Black'
  }
]
