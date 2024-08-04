import { color, gameType } from '@/constants/game-info'
import { GameType } from '@/types/game'
import { Color } from 'chess.js'
import * as z from 'zod'

export const gameGenerateSchema = z.object({
  gameType: z.enum(gameType.map(type => type.id) as [GameType, ...GameType[]]),
  playerColor: z.enum(color.map(color => color.id) as [Color, ...Color[]])
})

export type GameGenerateSchema = z.infer<typeof gameGenerateSchema>
