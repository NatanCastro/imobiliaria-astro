import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import { AddSuspense } from './features/components/add-suspense'
import Layout from './features/components/layout'
import { RealState } from './features/real-state/pages/real-state'
import { getCities } from './utils/get-cities'

const Home = lazy(() => import('./features/home/pages/home'))
const RealStates = lazy(() => import('./features/real-state/pages/real-states'))
const NotFound = lazy(() => import('./features/pages/404'))

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <AddSuspense component={<NotFound />} />,
    children: [
      {
        element: <AddSuspense component={<Home />} />,
        index: true,
        loader: getCities
      },
      {
        path: 'imoveis',
        children: [
          {
            element: <AddSuspense component={<RealStates />} />,
            index: true,
            loader: getCities
          },
          {
            element: <AddSuspense component={<RealState />} />,
            path: ':guid'
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
