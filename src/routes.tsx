import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import { AddSuspense } from './features/components/add-suspense'

const Layout = lazy(() => import('./features/components/layout'))
const Home = lazy(() => import('./features/home/pages/home'))
const RealStates = lazy(() => import('./features/real-state/pages/real-states'))
const NotFound = lazy(() => import('./features/pages/404'))

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
