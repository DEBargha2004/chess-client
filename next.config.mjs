import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'
const jiti = createJiti(fileURLToPath(import.meta.url))

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/lib/env/client.ts')
jiti('./src/lib/env/server.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
