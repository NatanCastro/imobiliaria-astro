import { Mail, Instagram, Facebook, LocationOn, Phone } from '@mui/icons-material'

export const Footer = () => {
  return (
    <div className='bg-dark-blue text-white flex flex-col items-start justify-evenly p-8 gap-4 md:flex-row'>
      <div className='flex flex-col flex-grow md:border-r md:border-white'>
        <div className='mx-auto'>
          <i>LOGO</i>
          <hr className='my-2 w-24' />
          <p className='flex items-center gap-2 font-light text-md'>
            <LocationOn className='text-gold-700 text-xl' /> Rua tal, 0000 - bairo <br />{' '}
            CEP 00000-000 Cidade-SP
          </p>
        </div>
      </div>
      <div className='flex flex-col flex-grow'>
        <div className='mx-auto'>
          <h4 className='text-xl font-bold'>Contato</h4>
          <hr className='my-2 w-24' />
          <p className='flex items-center gap-2'>
            <Mail className='text-gold-700 text-xl' />
            <a href='mailto:email@email.com'>mail@email.com</a>
          </p>
          <p className='flex items-center gap-2'>
            <Phone className='text-gold-700 text-xl' />
            <a href='tel:00000000'>(00) 00000-0000</a>
            <a href='https://api.whatsapp.com/send?phone=00000000000&text='>
              (00) 00000-0000
            </a>
          </p>

          <h4 className='text-xl mt-4 font-bold'>Redes socias</h4>
          <hr className='my-2 w-24' />
          <ul>
            <li>
              <a href='https://www.instagram.com' className='flex items-center gap-x-2'>
                <Instagram className='text-gold-700 text-xl' />
                instagram
              </a>
            </li>
            <li>
              <a href='https://www.facebook.com' className='flex items-center gap-x-2'>
                <Facebook className='text-gold-700 text-xl' />
                facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
