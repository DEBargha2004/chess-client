import { drizzle } from 'drizzle-orm/mysql2'
import { serverEnv } from './env/server'
import mysql from 'mysql2'

// for query purposes
const pool = mysql.createPool({
  host: serverEnv.DATABASE_HOST,
  port: Number(serverEnv.DATABASE_PORT),
  user: serverEnv.DATABASE_USER,
  password: serverEnv.DATABASE_PASSWORD,
  database: serverEnv.DATABASE_NAME
})
export const db = drizzle(pool)
