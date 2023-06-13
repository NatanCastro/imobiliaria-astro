import { useState } from 'react'
import { Modal } from './Modal'
import { Menu } from '@mui/icons-material'
import { Phone, WhatsApp } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal((prev) => !prev)
  }

  return (
    <header className='flex w-full flex-row items-center justify-between bg-gray-100 px-7 py-3 text-xl max-sm:px-3'>
      <NavLink to='/'>
        <h1 className='text-3xl'>LOGO</h1>
      </NavLink>
      <div className='flex items-center gap-14 max-sm:gap-6'>
        <ul className='flex items-center gap-4 text-xl max-md:hidden'>
          <a
            className='flex items-center gap-4'
            href='https://wa.me/+0000000000000'
            target='_blank'>
            <WhatsApp className='text-2xl' />
            (00) 00000-0000
          </a>
          <a
            className='flex items-center gap-4 max-[769px]:hidden'
            href='tel:000000000000'
            target='_blank'>
            <Phone className='text-2xl' />
            (00) 00000-0000
          </a>
        </ul>
        <a
          className='rounded-xl border-[3px] border-dark-blue px-3 py-2 capitalize transition
          hover:bg-dark-blue hover:text-white'
          href='/'>
          entrar
        </a>
        <button onClick={toggleModal} className='text-5xl'>
          <Menu className='text-dark-blue' fontSize='inherit' />
        </button>
      </div>
      <Modal isShow={modal} showFunc={toggleModal} />
    </header>
  )
}
