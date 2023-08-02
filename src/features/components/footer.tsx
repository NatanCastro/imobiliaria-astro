import { Mail, Instagram, Facebook, LocationOn, Phone } from '@mui/icons-material'

export const Footer = () => {
  return (
    <>
      <div className='flex flex-col items-start justify-evenly gap-4 bg-dark-blue p-8 text-white md:flex-row'>
        <div className='flex flex-grow flex-col md:border-r md:border-white'>
          <div className='mx-auto'>
            <i>LOGO</i>
            <hr className='my-2 w-24' />
            <p className='text-md flex items-center gap-2 font-light'>
              <LocationOn className='text-xl text-gold-700' /> Rua tal, 0000 - bairo{' '}
              <br /> CEP 00000-000 Cidade-SP
            </p>
          </div>
        </div>
        <div className='flex flex-grow flex-col'>
          <div className='mx-auto'>
            <h4 className='text-xl font-bold'>Contato</h4>
            <hr className='my-2 w-24' />
            <p className='flex items-center gap-2'>
              <Mail className='text-xl text-gold-700' />
              <a href='mailto:votuimoveisbr@gmail.com'>votuimoveisbr@gmail.com</a>
            </p>
            <p className='flex items-center gap-2'>
              <Phone className='text-xl text-gold-700' />
              <a href='tel:00000000'>(00) 00000-0000</a>
              <a href='https://api.whatsapp.com/send?phone=00000000000&text='>
                (00) 00000-0000
              </a>
            </p>

            <h4 className='mt-4 text-xl font-bold'>Redes socias</h4>
            <hr className='my-2 w-24' />
            <ul>
              <li>
                <a href='https://www.instagram.com' className='flex items-center gap-x-2'>
                  <Instagram className='text-xl text-gold-700' />
                  instagram
                </a>
              </li>
              <li>
                <a
                  href='https://www.facebook.com/profile.php?id=100095529362969'
                  className='flex items-center gap-x-2'>
                  <Facebook className='text-xl text-gold-700' />
                  facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='bg-[#0D2438] py-2 text-center text-anti-flash-white'>
        site desenvolvido por{' '}
        <a
          href='https://www.linkedin.com/in/natan-gabriel-castro/'
          target='_blank'
          className='font-bold'>
          Natan Castro
        </a>
      </div>
    </>
  )
}
