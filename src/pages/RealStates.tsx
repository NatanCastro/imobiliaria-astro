import { useEffect, useState } from 'react'
import { House } from '../components/HouseCard/types'
import { dataHouses } from '../assets/data/realState'
import { HouseCard } from '../components/HouseCard'

const RealStates = () => {
  const [houses, setHouses] = useState<House[]>([])

  async function getHouses() {
    setHouses(dataHouses)
  }

  useEffect(() => {
    getHouses()
  }, [])

  return (
    <section>
      <div className='flex flex-wrap items-center justify-center gap-6'>
        {houses.map((house) => (
          <HouseCard key={house.id} {...house} />
        ))}
      </div>
    </section>
  )
}

export default RealStates
