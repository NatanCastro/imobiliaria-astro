import { useState } from 'react'
import { Modal } from './Modal'

export const Header = () => {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal((prev) => !prev)
  }

  return (
    <header className='flex w-full flex-row items-center justify-between bg-gray-100 px-7 py-3 text-xl'>
      <h1 className='text-3xl'>LOGO</h1>
      <div className='flex items-center gap-14'>
        <ul className='flex items-center gap-4 text-2xl max-md:hidden'>
          <a className='flex gap-4' href='https://wa.me/+0000000000000' target='_blank'>
            <img
              className=''
              src='whatsapp.svg'
              alt='whatsapp logo'
              width={24}
              height={24}
            />
            (00) 00000-0000
          </a>
          <a className='flex gap-4' href='tel:000000000000' target='_blank'>
            <img className='' src='phone.svg' alt='telefone' width={24} height={24} />
            (00) 00000-0000
          </a>
        </ul>
        <a
          className='rounded-xl border-[3px] border-darkBlue px-3 py-2 capitalize transition
          hover:bg-darkBlue hover:text-white'
          href='/'>
          entrar
        </a>
        <button onClick={toggleModal}>
          <img src='menu.svg' alt='abrir menu' width={48} height={48} />
        </button>
      </div>
      <Modal isShow={modal} showFunc={toggleModal} />
    </header>
  )
}
