import { useEffect, useState } from 'react'
import { House } from '../HouseCard/types'
import { dataHouses } from '../../assets/data/realState'
import { HouseCard } from '../HouseCard'

export const MoreHouses = () => {
  const [houses, setHouses] = useState<House[]>([])

  async function getHouses() {
    setHouses(dataHouses.slice(3, 6))
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
        <a className='italic text-dark-blue hover:underline' href='#'>
          Ver todos os imoveis
        </a>
      </div>
      <div className='mx-auto flex flex-wrap justify-center gap-8'>
        {houses.map((house) => {
          return <HouseCard key={house.id} {...house} />
        })}
      </div>
    </div>
  )
}
