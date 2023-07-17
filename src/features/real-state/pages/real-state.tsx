import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { RealState } from '../../components/real-state-card.type'
import { Tooltip } from 'primereact/tooltip'
import { Bathtub, Bed, SquareFoot, DirectionsCarFilled } from '@mui/icons-material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useUser } from '@clerk/clerk-react'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useRef } from 'react'
import { Loading } from '../../components/loading'

const RealState = () => {
  const toast = useRef<Toast>(null)

  const { user } = useUser()

  const { guid } = useParams()

  const getHouseData = async () => {
    const { data } = await axios.get<RealState>(`real-state/${guid}`, {
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

  const deleteRealStateMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete('real-state', {
        baseURL: import.meta.env.VITE_BACKEND_URL
      })
      return data
    },
    onSuccess: () => {
      toast.current?.show({
        severity: 'info',
        summary: 'Confirmado',
        detail: 'O imóvel foi deletado',
        life: 3000
      })
    }
  })

  const confirmDelete = () => {
    confirmDialog({
      message: 'Deseja mesmo apagar esse imóvel?',
      header: 'Apagar imóvel',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'sim',
      rejectLabel: 'não',
      accept: deleteRealStateMutation.mutate
    })
  }

  if (isLoading) return <Loading />
  if (isError) return <h1>Error</h1>
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <section className='mx-auto my-16 flex max-w-6xl flex-col gap-x-6 gap-y-4 px-4 max-lg:px-2'>
        <div>
          <Swiper
            modules={[Navigation]}
            loop
            slidesPerView={1}
            autoplay={{ delay: 1500 }}
            navigation
            className='max-h-[40rem]'>
            {house.Image.map(({ url }, i) => (
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
            <p className='leading-7'>{house.description}</p>
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
        {user?.publicMetadata['role'] === 'admin' && (
          <div className='flex gap-6'>
            <Link to='editar'>
              <Button>editar</Button>
            </Link>
            <Button onClick={confirmDelete}>apagar</Button>
          </div>
        )}
      </section>
    </>
  )
}

export default RealState
