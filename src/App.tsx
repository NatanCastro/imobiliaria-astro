import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import Router from './routes'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
