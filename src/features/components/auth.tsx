import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom'

export const Auth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useUser()
  return allowedRoles.some(
    (role) => (user?.publicMetadata['role'] as string) === role
  ) ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  )
}
