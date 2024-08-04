'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { color, gameType } from '@/constants/game-info'
import { cn } from '@/lib/utils'
import {
  gameGenerateSchema,
  type GameGenerateSchema
} from '@/schema/forms/game-generate-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function GameGenerateForm ({
  className,
  onSubmit
}: {
  onSubmit: (data: GameGenerateSchema) => void
  className?: string
}) {
  const form = useForm<GameGenerateSchema>({
    resolver: zodResolver(gameGenerateSchema)
  })
  return (
    <Form {...form}>
      <form
        className={cn('grid gap-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='gameType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Game Type' />
                  </SelectTrigger>
                  <SelectContent>
                    {gameType.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='playerColor'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Color' />
                  </SelectTrigger>
                  <SelectContent>
                    {color.map(color => (
                      <SelectItem key={color.id} value={color.id}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='flex justify-center items-center gap-2'
          type='submit'
        >
          {form.formState.isLoading && <Loader2 className='animate-spin' />}
          Generate
        </Button>
      </form>
    </Form>
  )
}
