import { HouseCard } from '../../components/house-card'
import { NavLink } from 'react-router-dom'
import type { FindRealState } from '../../../types/find-real-state.params'
import { useQuery } from '@tanstack/react-query'
import { getHouses } from '../../../utils/get-houses'

export const FeaturedHouses = () => {
  const params: FindRealState = { take: 3 }
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['houses', params],
    queryFn: () => getHouses(params)
  })

  if (isLoading) return <h1>loading...</h1>
  if (isError) return <h1>Error: {error as string}</h1>

  return (
    <div className='mx-auto my-24 max-w-5xl px-4'>
      <div className='flex flex-col items-start justify-between gap-y-2 lg:flex-row lg:items-center'>
        <h2 className='font-poppins text-4xl text-dark-blue'>Imoveis em alta</h2>
        <NavLink className='text-xl italic text-dark-blue hover:underline' to='imoveis'>
          Veja mais
        </NavLink>
      </div>
      <p className='text-md my-8'>Veja os imoveis mais relevantes do momento</p>
      <div className='mx-auto flex flex-wrap justify-center gap-8'>
        {data?.map((house) => {
          return <HouseCard key={house.id} {...house} />
        })}
      </div>
    </div>
  )
}
