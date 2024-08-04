'use server'

import { initialFen } from '@/constants/fen'
import { db } from '@/lib/db'
import { game } from '@/schema/drizzle/schema'
import {
  gameGenerateSchema,
  GameGenerateSchema
} from '@/schema/forms/game-generate-schema'
import { ServerActionResponse } from '@/types/server-action'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function createGame (
  data: GameGenerateSchema
): Promise<ServerActionResponse<{ gameId: string }>> {
  try {
    // check if user is logged in
    const session = auth()
    if (!session.userId) throw new Error('Not logged in')

    // validate data server side
    const { error } = gameGenerateSchema.safeParse(data)
    if (error) throw new Error(error.message)

    // generate game id
    const gameId = nanoid()

    await db.insert(game).values({
      gameId,
      choosenColor: data.playerColor,
      fen: initialFen,
      type: data.gameType,
      creatorId: session.userId
    })
    return {
      status: 'success',
      message: {
        gameId: gameId
      }
    }
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong. Please try again.')
  }
}

export async function getGame (gameId: string) {
  // check if user is logged in
  const session = auth()
  if (!session.userId) throw new Error('Not logged in')

  // return the game
  return (await db.select().from(game).where(eq(game.gameId, gameId)))[0]
}
