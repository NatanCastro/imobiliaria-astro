import { SignUp } from '@clerk/clerk-react'
import { Header } from '../components/header'

const Signup = () => {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <div className='mt-8 self-center'>
        <SignUp routing='path' path='/signup' />
      </div>
    </div>
  )
}

export default Signup
