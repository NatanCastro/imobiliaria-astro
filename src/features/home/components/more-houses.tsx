import { HouseCard } from '../../components/house-card'
import { NavLink } from 'react-router-dom'
import type { FindRealState } from '../../../types/find-real-state.params'
import { useQuery } from '@tanstack/react-query'
import { getHouses } from '../../../utils/get-houses'

export const MoreHouses = () => {
  const params: FindRealState = { take: 3, skip: 3 }

  const { data } = useQuery({
    queryKey: ['houses', params],
    queryFn: () => getHouses(params)
  })

  return (
    <div className='mx-auto my-24 max-w-5xl px-4'>
      <div className='my-8 flex flex-col items-start justify-between gap-y-2 lg:flex-row lg:items-center'>
        <h2 className='font-poppins text-3xl text-dark-blue'>
          Outros imoveis que podem te interessar
        </h2>
        <NavLink className='text-xl italic text-dark-blue hover:underline' to='imoveis'>
          Veja mais
        </NavLink>
      </div>
      <div className='mx-auto flex flex-wrap justify-center gap-8'>
        {data?.map((house) => {
          return <HouseCard key={house.id} {...house} />
        })}
      </div>
    </div>
  )
}
