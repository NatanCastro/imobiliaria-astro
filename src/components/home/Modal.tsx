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
          <a className='flex gap-4' href='tel:000000000000'>
            <img className='' src='phone.svg' alt='telefone' width={16} height={16} />
            (00) 00000-0000
          </a>
          <a className='flex gap-4' href='https://wa.me/+0000000000000'>
            <img
              className=''
              src='whatsapp.svg'
              alt='whatsapp logo'
              width={16}
              height={16}
            />
            Whatsapp (00) 00000-0000
          </a>
        </div>
        <div className='flex gap-10'>
          <a href='https://facebook.com' target='_blank'>
            <img src='facebook.svg' alt='facebook logo' width={36} height={36} />
          </a>
          <a href=''>
            <img src='instagram.svg' alt='instagram logo' width={36} height={36} />
          </a>
        </div>
      </aside>
      <button className='absolute right-6 top-4' onClick={showFunc}>
        <img src='/close.svg' alt='fechar menu' width={48} height={48} />
      </button>
    </div>
  )
}
