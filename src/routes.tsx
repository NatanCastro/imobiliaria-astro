import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'

const Home = lazy(() => import('./pages/Home'))

const Router = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
          index
        />
      </Route>
    </Routes>
  )
}

export default Router
