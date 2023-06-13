import { SearchForm } from '../forms'

export const SearchArea = () => {
  return (
    <section className='relative z-10 mb-8 grid h-[32rem] place-items-center overflow-hidden'>
      <div className='absolute -z-10 h-[120%] w-[120%] bg-[url(/livingRoom.webp)] bg-center blur-sm'></div>
      <div className='flex flex-col justify-around gap-6'>
        <h1 className='text-center font-poppins text-4xl max-md:text-3xl'>
          Venha mudar seu futuro
        </h1>
        <SearchForm />
      </div>
    </section>
  )
}
