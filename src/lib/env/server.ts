import { createEnv } from '@t3-oss/env-nextjs'

import { z } from 'zod'

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    DATABASE_NAME: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string()
  },
  experimental__runtimeEnv: process.env
})
