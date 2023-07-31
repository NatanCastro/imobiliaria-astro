import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import { AddSuspense } from './features/components/add-suspense'
import Layout from './features/components/layout'
import { getCities } from './utils/get-cities'
import { Clerk } from './features/components/clerk'
import { Auth } from './features/components/auth'

const Home = lazy(() => import('./features/home/pages/home'))
const RealStates = lazy(() => import('./features/real-state/pages/real-states'))
const RealState = lazy(() => import('./features/real-state/pages/real-state'))
const NewRealState = lazy(() => import('./features/real-state/pages/new-real-state'))
const EditRealState = lazy(() => import('./features/real-state/pages/edit-real-state'))
const ChooseRole = lazy(() => import('./features/user/pages/choose-role'))
const Login = lazy(() => import('./features/pages/login'))
const Signup = lazy(() => import('./features/pages/signup'))
const NotFound = lazy(() => import('./features/pages/404'))

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
                element: <Auth allowedRoles={['admin']} />,
                children: [
                  {
                    element: <AddSuspense component={<NewRealState />} />,
                    path: 'novo'
                  }
                ]
              },
              {
                path: ':guid/editar',
                element: <AddSuspense component={<EditRealState />} />
              },
              {
                element: <AddSuspense component={<RealState />} />,
                path: ':guid'
              }
            ]
          },
          {
            path: 'usuario',
            children: [
              {
                element: <AddSuspense component={<ChooseRole />} />,
                path: 'escolher-cargo'
              }
            ]
          }
        ]
      },
      {
        path: '/login/*',
        element: <AddSuspense component={<Login />} />
      },
      {
        path: '/signup/*',
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
