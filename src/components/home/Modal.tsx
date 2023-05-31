import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

interface IModal {
  isShow: boolean
  showFunc: () => void
}

export const Modal = ({ isShow, showFunc }: IModal) => {
  const hideShowTag = isShow ? 'grid opacity-100' : 'hidden opacity-0'

  return (
    <div
      className={`modal fixed inset-0 bg-gray-100 ${hideShowTag} z-50 transition-opacity`}>
      <aside className='relative flex h-full flex-col  justify-end bg-gray-300 p-4'>
        <h3 className='text mb-6 text-2xl font-bold text-darkBlue'>
          Lorem ipsum dolor sit.
        </h3>
        <div className='mb-4 text-lg font-extralight'>
          <a className='flex gap-4 items-center' href='tel:000000000000'>
            <FaPhone width={16} height={16} />
            (00) 00000-0000
          </a>
          <a className='flex gap-4 items-center' href='https://wa.me/+0000000000000'>
            <FaWhatsapp width={16} height={16} />
            Whatsapp (00) 00000-0000
          </a>
        </div>
        <div className='flex gap-10'>
          <a href='https://facebook.com' target='_blank'>
            <FaFacebook width={36} height={36} />
          </a>
          <a href=''>
            <FaInstagram width={36} height={36} />
          </a>
        </div>
      </aside>
      <button className='absolute right-6 top-4 w-12 h-12' onClick={showFunc}>
        <IoClose width={48} height={48} />
      </button>
    </div>
  )
}
