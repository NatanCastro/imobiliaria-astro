import type { RealState } from './real-state-card.type'
import { SquareFoot, Bed, Bathtub, DirectionsCarFilled } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

export const RealStateCard = ({
  id,
  name,
  district,
  city,
  rentValue,
  purchaseValue,
  bedroomNumber,
  area,
  bathroomNumber,
  Image,
  parkingSpace
}: RealState) => {
  const urls =
    Image.length === 0
      ? ['/livingRoom.webp', '/livingRoom.webp', '/livingRoom.webp']
      : Image.map((i) => i.url)
  return (
    <div className='max-w-[18rem] overflow-hidden rounded-md bg-gray-200 shadow-md shadow-black/50'>
      <Swiper
        modules={[Navigation]}
        loop
        slidesPerView={1}
        height={11 * 16}
        className='max-h-44'
        autoplay={{ delay: 1500 }}
        navigation>
        {urls.map((url, i) => (
          <SwiperSlide key={i}>
            <img src={url} alt='' loading='lazy' />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='my-2 px-2'>
        <h3 className='mb-4 font-poppins text-xl'>{name}</h3>
        <p className='text-md text-gray-900'>
          cidade: {city}
          <br />
          bairro: {district}
        </p>
        <div className='my-4 flex items-center gap-x-4'>
          <div className='flex items-center'>
            <SquareFoot />
            <span>
              &nbsp;
              {area}m<sup>2</sup>
            </span>
          </div>
          <div className='flex items-center'>
            <Bed />
            <span>
              &nbsp;
              {bedroomNumber}
            </span>
          </div>
          <div className='flex items-center'>
            <Bathtub />
            <span>
              &nbsp;
              {bathroomNumber}
            </span>
          </div>
          <div className='flex items-center'>
            <DirectionsCarFilled />
            <span>
              &nbsp;
              {parkingSpace}
            </span>
          </div>
        </div>
        <div className='my-4 flex flex-row justify-evenly gap-2 text-base font-semibold text-dark-blue'>
          {purchaseValue && (
            <span>
              {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'brl' }).format(
                purchaseValue
              )}
            </span>
          )}
          {rentValue && (
            <span>
              {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'brl' }).format(
                rentValue
              )}
              /mês
            </span>
          )}
        </div>
      </div>
      <Link
        className='flex w-full items-center justify-center rounded-b-md bg-dark-blue py-2 text-white'
        to={`/imoveis/${id}`}>
        mais informações
      </Link>
    </div>
  )
}
