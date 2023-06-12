import { useEffect, useState } from 'react'
import { HouseCard } from '../HouseCard/'
import { House } from '../HouseCard/types'
import { dataHouses } from '../../assets/data/realState'

export const FeaturedHouses = () => {
  const [houses, setHouses] = useState<House[]>([])

  async function getHouses() {
    setHouses(dataHouses.slice(0, 3))
  }

  useEffect(() => {
    getHouses()
  }, [])

  return (
    <div className='mx-auto my-32 max-w-5xl px-4'>
      <div className='flex flex-col items-start justify-between gap-y-2 lg:flex-row lg:items-center'>
        <h2 className='font-poppins text-4xl text-dark-blue'>Imoveis em alta</h2>
        <a className='text-dark-blue hover:underline' href='#'>
          Ver todos os imoveis
        </a>
      </div>
      <p className='text-md my-8'>Veja os imoveis mais relevantes do momento</p>
      <div className='mx-auto flex flex-wrap justify-center gap-8'>
        {houses.map(({ id, ...rest }) => {
          return <HouseCard key={id} {...rest} />
        })}
      </div>
    </div>
  )
}
