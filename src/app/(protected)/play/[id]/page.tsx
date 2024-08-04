import { getGame } from '@/actions/game'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import GameInstance from './_components/game-instance'
import { UserRole } from '@/types/game'
import { auth } from '@clerk/nextjs/server'
import { Color } from 'chess.js'

export default async function Page ({
  params: { id }
}: {
  params: { id: string }
}) {
  const resp = await getGame(id)
  const session = auth()

  if (!resp?.gameId) {
    return (
      <div className='w-full h-full grid place-content-center'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Game not found</AlertTitle>
          <AlertDescription>No game found with id: {id}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const role: UserRole = [resp.creatorId, resp.opponentId].includes(
    session.userId
  )
    ? 'player'
    : 'spectator'

  //@ts-ignore
  const color: Color =
    resp.creatorId === session.userId
      ? resp.choosenColor
      : resp.choosenColor === 'w'
      ? 'b'
      : 'w'

  return <GameInstance id={id} role={role} color={color} />
}
