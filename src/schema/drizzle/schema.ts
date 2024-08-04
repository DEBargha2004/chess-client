import { timestamp, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique()
})

export const game = mysqlTable('game', {
  gameId: varchar('gameId', { length: 255 }).primaryKey(),
  type: varchar('type', { length: 255 }).notNull(),
  creatorId: varchar('creatorId', { length: 255 })
    .notNull()
    .references(() => users.id, {
      onDelete: 'no action'
    }),
  choosenColor: varchar('choosenColor', { length: 255 }).notNull(),
  fen: varchar('fen', { length: 255 }).notNull(),
  opponentId: varchar('opponentId', { length: 255 }),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  startedAt: timestamp('startedAt', { mode: 'date' }),
  endedAt: timestamp('endedAt', { mode: 'date' }),
  winnerId: varchar('winnerId', { length: 255 })
})
