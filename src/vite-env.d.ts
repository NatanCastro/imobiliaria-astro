/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BACKEND_URL: string
  VITE_REACT_APP_CLERK_PUBLISHABLE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
