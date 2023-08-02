import { Facebook, Instagram, Phone, WhatsApp } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export const Modal = () => {
  return (
    <div className='grid h-full grid-cols-6'>
      <aside className='relative flex flex-col justify-end'>
        <h3 className='text mb-6 text-2xl font-bold text-dark-blue'>
          Lorem ipsum dolor sit.
        </h3>
        <div className='mb-4 text-lg font-extralight'>
          <a className='flex items-center gap-4' href='tel:000000000000'>
            <Phone className='text-xl text-dark-blue' />
            (00) 00000-0000
          </a>
          <a className='flex items-center gap-4' href='https://wa.me/+0000000000000'>
            <WhatsApp className='text-xl text-dark-blue' />
            Whatsapp (00) 00000-0000
          </a>
        </div>
        <div className='flex gap-10'>
          <a
            href='https://www.facebook.com/profile.php?id=100095529362969'
            target='_blank'>
            <Facebook className='text-2xl text-dark-blue' />
          </a>
          <a href='https://instagram.com' target='_blank'>
            <Instagram className='text-2xl text-dark-blue' />
          </a>
        </div>
      </aside>
      <div className='col-span-5 text-xl text-dark-blue'>
        <ul className='flex flex-col gap-2'>
          <li>
            <Link to='/imoveis?sellType=venda'>Veja imoveis a venda</Link>
          </li>
          <li>
            <Link to='/imoveis?sellType=aluguel'>Veja imoveis para alugar</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
