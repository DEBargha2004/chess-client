'use client'

import Link from 'next/link'
import { Button, ButtonProps } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { createGame } from '@/actions/game'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { GameGenerateForm } from './forms'
import { useForm } from 'react-hook-form'
import {
  gameGenerateSchema,
  type GameGenerateSchema
} from '@/schema/forms/game-generate-schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function GameGeneratorButton ({
  children,
  className,
  onClick,
  ...props
}: {} & ButtonProps) {
  const { toast } = useToast()

  const handleSubmit = async (data: GameGenerateSchema) => {
    try {
      const res = await createGame({
        gameType: data.gameType,
        playerColor: data.playerColor
      })
      if (res.status === 'success') {
        toast({
          title: 'Game created',
          action: (
            <Link href={`/play/${res.message.gameId}`}>
              <Button variant='ghost'>Join</Button>
            </Link>
          )
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      })
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <GameGenerateForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
