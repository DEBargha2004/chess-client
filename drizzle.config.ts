import { serverEnv } from '@/lib/env/server'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './src/schema/drizzle/schema.ts',
  dialect: 'mysql',
  out: './drizzle',
  dbCredentials: {
    database: serverEnv.DATABASE_NAME,
    host: serverEnv.DATABASE_HOST,
    port: Number(serverEnv.DATABASE_PORT),
    user: serverEnv.DATABASE_USER,
    password: serverEnv.DATABASE_PASSWORD
  }
})
