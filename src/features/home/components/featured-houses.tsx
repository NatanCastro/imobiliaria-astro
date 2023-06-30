import { useEffect, useState } from 'react'
import { HouseCard } from '../../components/house-card'
import { House } from '../../components/house-card.type'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { FindRealState } from '../../../types/find-real-state.params'

export const FeaturedHouses = () => {
  const [houses, setHouses] = useState<House[]>([])

  async function getHouses() {
    const params: FindRealState = { take: 3 }
    const { data } = await axios.get<House[]>('real-state', {
      baseURL: import.meta.env.VITE_BACKEND_URL,
      params
    })
    setHouses(data)
  }

  useEffect(() => {
    getHouses()
  }, [])

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
        {houses.map((house) => {
          return <HouseCard key={house.id} {...house} />
        })}
      </div>
    </div>
  )
}
