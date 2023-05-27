import { useEffect, useState } from 'react'
import { HouseCard } from '../HouseCard/'
import { House } from '../HouseCard/types'

export const FeaturedHouses = () => {
  const [houses, setHouses] = useState<House[]>([])

  async function getHouses() {
    setHouses([
      {
        url: '/livingRoom.webp',
        title: 'casa',
        price: {
          type: 'aluguel',
          value: '1500,00'
        },
        properties: [{ value: '104', description: 'area' }]
      },
      {
        url: '/livingRoom.webp',
        title: 'casa',
        price: {
          type: 'aluguel',
          value: '1500,00'
        },
        properties: [
          { value: '104', description: 'area' },
          { value: '3', description: 'quartos' }
        ]
      },
      {
        url: '/livingRoom.webp',
        title: 'casa',
        price: {
          type: 'aluguel',
          value: '1500,00'
        },
        properties: [
          { value: '104', description: 'area' },
          { value: '2', description: 'banheiros' }
        ]
      },
      {
        url: '/livingRoom.webp',
        title: 'casa',
        price: {
          type: 'aluguel',
          value: '1500,00'
        },
        properties: [{ value: '104', description: 'area' }]
      },
      {
        url: '/livingRoom.webp',
        title: 'casa',
        price: {
          type: 'aluguel',
          value: '1500,00'
        },
        properties: [{ value: '104', description: 'area' }]
      },
      {
        url: '/livingRoom.webp',
        title: 'casa',
        price: {
          type: 'aluguel',
          value: '1500,00'
        },
        properties: [{ value: '104', description: 'area' }]
      }
    ])
  }

  useEffect(() => {
    getHouses()
  }, [])

  return (
    <>
      <h2 className='text-2xl text-center mb-8 font-poppins'>Casas em alta</h2>
      <div className='flex flex-wrap justify-center gap-4'>
        {houses.map(({ url, title, price, properties }, index) => {
          return (
            <HouseCard
              key={index}
              url={url}
              title={title}
              price={price}
              properties={properties}
            />
          )
        })}
      </div>
    </>
  )
}
