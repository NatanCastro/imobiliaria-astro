import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/edge'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    analytics: true
  }),
  integrations: [tailwind(), react()]
})
