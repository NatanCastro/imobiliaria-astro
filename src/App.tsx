import { Analytics } from '@vercel/analytics/react'
import 'primereact/resources/primereact.min.css'
import { Router } from './routes'

function App() {
  return (
    <>
      <Router />
      <Analytics />
    </>
  )
}

export default App
