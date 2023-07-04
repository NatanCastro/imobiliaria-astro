import { SignUp } from '@clerk/clerk-react'
import { Header } from '../components/header'

export const Signup = () => {
  return (
    <div className='grid h-screen'>
      <Header />
      <div className='place-self-center'>
        <SignUp routing='path' path='/login' />
      </div>
    </div>
  )
}
