import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'

const Layout = lazy(() => import('./components/Layout'))
const Home = lazy(() => import('./pages/Home'))
const RealStates = lazy(() => import('./pages/RealStates'))
const NotFound = lazy(() => import('./pages/404'))

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<Loading />}>
            <Layout />
          </Suspense>
        }
        errorElement={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }>
        <Route
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
          index
        />
        <Route path='real-state'>
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <RealStates />
              </Suspense>
            }
            index
          />
        </Route>
      </Route>
      <Route
        path='*'
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default Router
