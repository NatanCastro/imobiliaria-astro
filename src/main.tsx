import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/tailwind-light/theme.css'
import 'primeicons/primeicons.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'swiper/css'
import 'swiper/css/navigation'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
