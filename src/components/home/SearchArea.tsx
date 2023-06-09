'use client'
import { SearchForm } from '../forms'

export const SearchArea = () => {
  return (
    <section className='relative grid h-[32rem] place-items-center mb-8 overflow-hidden z-10'>
      <div className='-z-10 absolute h-[120%] w-[120%] bg-center blur-sm bg-[url(/livingRoom.webp)]'></div>
      <div className='flex flex-col justify-around gap-6'>
        <h1 className='text-center text-4xl font-poppins max-md:text-3xl'>
          Venha mudar seu futuro
        </h1>
        <SearchForm />
      </div>
    </section>
  )
}
