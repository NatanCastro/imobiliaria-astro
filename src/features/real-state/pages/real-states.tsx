import { useSearchParams } from 'react-router-dom'
import { FilterForm } from '../components/filter-form'

const RealStates = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <section className='grid grid-cols-4'>
      <FilterForm searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className='col-span-3 bg-red-400'></div>
    </section>
  )
}

export default RealStates
