import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='grid h-screen place-items-center bg-dark-blue px-10 py-16'>
      <div>
        <h1 className='text-7xl text-gold-700'>404</h1>
        <div className='my-10 text-4xl leading-relaxed text-white'>
          <p>A pagina que você procura não existe</p>
          <p>clique aqui para voltar para pagina inicial</p>
        </div>
        <NavLink
          className='rounded-full border-2 border-white px-2 py-3 text-white transition-colors hover:bg-white hover:text-black'
          to='/'>
          Pagina Inicial
        </NavLink>
      </div>
    </section>
  )
}

export default NotFound
