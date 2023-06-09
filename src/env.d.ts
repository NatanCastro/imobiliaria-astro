/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_VERCEL_ANALYTICS_ID: string
  readonly PUBLIC_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
