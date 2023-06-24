import { useEffect, useState } from 'react'
import { HouseCard } from '../../components/house-card'
import { House } from '../../components/house-card.type'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export const MoreHouses = () => {
  const [houses, setHouses] = useState<House[]>([])

  async function getHouses() {
    const { data } = await axios.post<House[]>(
      'real-state',
      { take: 3, skip: 3 },
      { baseURL: import.meta.env.VITE_BACKEND_URL }
    )
    setHouses(data)
  }

  useEffect(() => {
    getHouses()
  }, [])

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
        {houses.map((house) => {
          return <HouseCard key={house.id} {...house} />
        })}
      </div>
    </div>
  )
}
