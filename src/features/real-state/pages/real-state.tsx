import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { House } from '../../components/house-card.type'
import { Galleria } from 'primereact/galleria'
import { Bathtub, Bed, SquareFoot } from '@mui/icons-material'

export const RealState = () => {
  const [house, setHouse] = useState<House>()
  const { guid } = useParams()

  const getHouseData = useCallback(async () => {
    const { data } = await axios.get<House>(`real-state/${guid}`, {
      baseURL: import.meta.env.VITE_BACKEND_URL
    })
    setHouse(data)
  }, [guid])

  useEffect(() => {
    getHouseData()
  }, [getHouseData])

  const images = ['/livingRoom.webp', '/livingRoom.webp', '/livingRoom.webp']
  const imageTemplate = (image: string) => {
    return <img className='block w-full' src={image} alt='' loading='lazy' />
  }

  if (!house) return 'loading'

  return (
    <div className='mx-auto mt-8 grid max-w-6xl grid-cols-6 max-lg:px-2'>
      <div className='col-span-4'>
        <Galleria
          value={images}
          item={imageTemplate}
          circular
          showThumbnails={false}
          showItemNavigators
          showItemNavigatorsOnHover
        />
        <h1 className='my-4 text-5xl'>{house.name}</h1>
        <div className='my-2 flex items-center gap-x-4'>
          <div className='flex items-center'>
            <SquareFoot />
            <span>
              &nbsp;
              {house.area}m<sup>2</sup>
            </span>
          </div>
          <div className='flex items-center'>
            <Bed />
            <span>
              &nbsp;
              {house.bedroomNumber}
            </span>
          </div>
          <div className='flex items-center'>
            <Bathtub />
            <span>
              &nbsp;
              {house.bathroomNumber}
            </span>
          </div>
        </div>
        <p className='leading-7'>
          {house.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Assumenda libero eos delectus provident nulla sapiente totam, alias consectetur
          ullam velit explicabo autem nobis dolore nemo, error sunt aut ab accusamus.
          Deserunt iste minus est dolorem velit nihil sint hic delectus nesciunt?
          Doloribus a aliquid saepe explicabo obcaecati perspiciatis adipisci maxime
          quasi, illo beatae, ea tempora voluptatum dolorum nostrum eveniet hic? Tempore
          nam hic expedita voluptatum voluptatibus consectetur unde quibusdam. Saepe at,
          omnis rerum maiores amet voluptatibus aliquid, doloremque fugit unde velit eum
          quas aut error quaerat dolores corrupti aspernatur quibusdam.
        </p>
      </div>
    </div>
  )
}
