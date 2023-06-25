import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import { AddSuspense } from './features/components/add-suspense'
import Layout from './features/components/layout'
import { RealState } from './features/real-state/pages/real-state'
import axios from 'axios'

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
        index: true
      },
      {
        path: 'imoveis',
        children: [
          {
            element: <AddSuspense component={<RealStates />} />,
            index: true,
            loader: async () => {
              const { data } = await axios.get<{ city: string }[]>('real-state/cities', {
                baseURL: import.meta.env.VITE_BACKEND_URL
              })
              return data.map((d) => d.city)
            }
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
