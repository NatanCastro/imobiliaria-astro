import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import Router from './routes'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <BrowserRouter>
      <Router />
      <Analytics />
    </BrowserRouter>
  )
}

export default App
