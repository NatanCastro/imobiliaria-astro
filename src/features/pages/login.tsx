import { SignIn } from '@clerk/clerk-react'
import { Header } from '../components/header'

export const Login = () => {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <div className='mt-16 self-center'>
        <SignIn routing='path' path='/login' />
      </div>
    </div>
  )
}
