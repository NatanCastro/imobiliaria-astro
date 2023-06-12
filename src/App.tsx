import { Layout } from './components/Layout'
import { Router } from './routes'
import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
