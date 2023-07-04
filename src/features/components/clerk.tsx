import { ClerkProvider } from '@clerk/clerk-react'
import { ptBR } from '@clerk/localizations'
import { Outlet, useNavigate } from 'react-router-dom'

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY

export const Clerk = () => {
  const navigate = useNavigate()
  return (
    <ClerkProvider
      localization={ptBR}
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}>
      <Outlet />
    </ClerkProvider>
  )
}
