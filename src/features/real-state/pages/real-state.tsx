import axios from 'axios'
import { useParams } from 'react-router-dom'
import { House } from '../../components/house-card.type'
import { Tooltip } from 'primereact/tooltip'
import { Bathtub, Bed, SquareFoot, DirectionsCarFilled } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

const RealState = () => {
  const { guid } = useParams()

  const getHouseData = async () => {
    const { data } = await axios.get<House>(`real-state/${guid}`, {
      baseURL: import.meta.env.VITE_BACKEND_URL
    })
    return data
  }
  const {
    data: house,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['houses', guid],
    queryFn: getHouseData
  })

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Error</h1>

  const urls =
    house.Image.length === 0
      ? ['/livingRoom.webp', '/livingRoom.webp', '/livingRoom.webp']
      : house.Image.map((i) => i.url)
  return (
    <section className='mx-auto my-16 flex max-w-6xl flex-col gap-x-6 gap-y-4 px-4 max-lg:px-2'>
      <div>
        <Swiper
          modules={[Navigation]}
          loop
          slidesPerView={1}
          autoplay={{ delay: 1500 }}
          navigation
          className='max-h-[40rem]'>
          {urls.map((url, i) => (
            <SwiperSlide key={i}>
              <img src={url} alt='' loading='lazy' />
            </SwiperSlide>
          ))}
        </Swiper>
        <h1 className='mb-2 mt-8 text-5xl'>{house.name}</h1>
        <p className='text-gray-800'>
          {house.street}, {house.district}, Votuporanga, SP
        </p>
        <div className='my-6 flex flex-wrap items-center gap-x-4 gap-y-2'>
          <Tooltip target='#mq' position='bottom' />
          <div
            id='mq'
            className='flex items-center rounded-full bg-black/20 px-3 py-2 text-dark-blue'
            data-pr-tooltip={`${house.area} metros quadrados`}>
            <SquareFoot />
            &nbsp;&nbsp;
            <span>
              {house.area}m<sup>2</sup>
            </span>
          </div>
          <Tooltip target='#quartos' position='bottom' />
          <div
            id='quartos'
            className='flex items-center rounded-full bg-black/20 px-3 py-2 text-dark-blue'
            data-pr-tooltip={`${house.bedroomNumber} ${
              house.bedroomNumber === 1 ? 'quarto' : 'quartos'
            }${
              house.suiteNumber &&
              ` e ${house.suiteNumber} ${house.suiteNumber === 1 ? 'suite' : 'suites'}`
            }`}>
            <Bed />
            &nbsp;&nbsp;
            <p>
              {house.bedroomNumber} {house.bedroomNumber === 1 ? 'quarto' : 'quartos'}{' '}
              {house.suiteNumber !== 0 && (
                <>
                  e {house.suiteNumber} {house.suiteNumber === 1 ? 'suite' : 'suites'}
                </>
              )}
            </p>
          </div>
          <Tooltip target='#banheiros' position='bottom' />
          <div
            id='banheiros'
            className='flex items-center rounded-full bg-black/20 px-3 py-2 text-dark-blue'
            data-pr-tooltip={`${house.bathroomNumber} banheiros`}>
            <Bathtub />
            &nbsp;&nbsp;
            <span>{house.bathroomNumber}</span>
          </div>
          <Tooltip target='#garagem' position='bottom' />
          <div
            id='garagem'
            className='flex items-center rounded-full bg-black/20 px-3 py-2 text-dark-blue'
            data-pr-tooltip={`${house.parkingSpace} vagas de garagem`}>
            <DirectionsCarFilled />
            &nbsp;&nbsp;
            <span>{house.parkingSpace}</span>
          </div>
        </div>
        <div>
          <h2 className='mb-4 text-2xl'>descrição</h2>
          <p className='leading-7'>
            {house.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Assumenda libero eos delectus provident nulla sapiente totam, alias
            consectetur ullam velit explicabo autem nobis dolore nemo, error sunt aut ab
            accusamus. Deserunt iste minus est dolorem velit nihil sint hic delectus
            nesciunt? Doloribus a aliquid saepe explicabo obcaecati perspiciatis adipisci
            maxime quasi, illo beatae, ea tempora voluptatum dolorum nostrum eveniet hic?
            Tempore nam hic expedita voluptatum voluptatibus consectetur unde quibusdam.
            Saepe at, omnis rerum maiores amet voluptatibus aliquid, doloremque fugit unde
            velit eum quas aut error quaerat dolores corrupti aspernatur quibusdam.
          </p>
        </div>
      </div>
      <div className='flex flex-wrap gap-x-4 gap-y-2 text-lg'>
        {house.purchaseValue && (
          <div className='flex'>
            <p>
              venda:{' '}
              <span className='font-semibold text-dark-blue'>
                {Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(house.purchaseValue)}
              </span>
            </p>
          </div>
        )}
        {house.rentValue && (
          <div className='flex'>
            <p>
              aluguel:{' '}
              <span className='font-semibold text-dark-blue'>
                {Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(house.rentValue)}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default RealState
