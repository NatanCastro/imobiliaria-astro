import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import { AddSuspense } from './features/components/add-suspense'
import Layout from './features/components/layout'
import { RealState } from './features/real-state/pages/real-state'
import { getCities } from './utils/get-cities'
import { Login } from './features/pages/login'
import { Signup } from './features/pages/signup'
import { Clerk } from './features/components/clerk'

const Home = lazy(() => import('./features/home/pages/home'))
const RealStates = lazy(() => import('./features/real-state/pages/real-states'))
const NotFound = lazy(() => import('./features/pages/404'))
const NewRealState = lazy(() => import('./features/real-state/pages/new-real-state'))

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Clerk />,
    children: [
      {
        path: '/',
        element: <Layout />,
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
                element: (
                  <>
                    {/* <SignedIn> */}
                    <AddSuspense component={<NewRealState />} />
                    {/* </SignedIn> */}
                    {/* <SignedOut> */}
                    {/* <RedirectToSignIn /> */}
                    {/* </SignedOut> */}
                  </>
                ),
                path: 'novo'
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
        path: '/login',
        element: <AddSuspense component={<Login />} />
      },
      {
        path: '/signup',
        element: <AddSuspense component={<Signup />} />
      },
      {
        path: '*',
        element: <AddSuspense component={<NotFound />} />
      }
    ]
  }
])
export const Router = () => <RouterProvider router={routes} />
