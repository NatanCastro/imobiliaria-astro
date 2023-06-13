import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/primereact.min.css'
import { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'

const Layout = lazy(() => import('./components/Layout'))
const Router = lazy(() => import('./routes'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Layout>
          <Router />
        </Layout>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
