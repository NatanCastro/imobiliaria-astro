import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import { AddSuspense } from './components/AddSuspense'

const Layout = lazy(() => import('./components/Layout'))
const Home = lazy(() => import('./pages/Home'))
const RealStates = lazy(() => import('./pages/RealStates'))
const NotFound = lazy(() => import('./pages/404'))

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AddSuspense component={<Layout />} />,
    errorElement: <AddSuspense component={<NotFound />} />,
    children: [
      {
        element: <AddSuspense component={<Home />} />,
        index: true
      },
      {
        path: 'imoveis',
        children: [
          {
            element: <AddSuspense component={<RealStates />} />,
            index: true
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <AddSuspense component={<NotFound />} />
  }
])

export const Router = () => <RouterProvider router={routes} />
