import { useSearchParams } from 'react-router-dom'
import { FilterForm, filterData } from '../components/filter-form'
import axios from 'axios'
import { House } from '../../components/house-card.type'
import { useCallback, useEffect, useState } from 'react'
import { HouseCard } from '../../components/house-card'
import { DataView } from 'primereact/dataview'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'

const getParams = (searchParams: URLSearchParams) => {
  return (searchParam: keyof filterData) => {
    let value: string | number | null = searchParams.get(searchParam)
    if (!isNaN(Number(value))) {
      value = Number(value)
      return value !== 0 ? value : undefined
    }
    return value
  }
}

const RealStates = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [houses, setHouses] = useState<House[]>()
  const [openSidebarFilter, setOpenSidebarFilter] = useState<boolean>(false)

  const getHouses = async () => {
    const getParam = getParams(searchParams)
    const sellType = getParam('sellType')
      ? (getParam('sellType') as string).split(',')
      : []

    const { data } = await axios.post<House[]>(
      'real-state',
      {
        where: {
          area: {
            gte: getParam('maxArea'),
            lte: getParam('minArea')
          },
          purchaseValue: {
            gte: getParam('minPurchacePrice'),
            lte: getParam('maxPurchacePrice'),
            not: sellType.some((s) => s === 'comprar') ? null : undefined
          },
          rentValue: {
            gte: getParam('minRentPrice'),
            lte: getParam('maxRentPrice'),
            not: sellType.some((s) => s === 'alugar') ? null : undefined
          }
        }
      },
      { baseURL: import.meta.env.VITE_BACKEND_URL }
    )
    setHouses(data)
  }
  const callbackGetHouses = useCallback(getHouses, [searchParams])

  useEffect(() => {
    callbackGetHouses()
  }, [callbackGetHouses])

  return (
    <section className='flex flex-col justify-center gap-y-8 overflow-hidden py-16'>
      <div className='flex flex-col items-start justify-between px-4 py-2 md:flex-row md:items-center lg:justify-evenly'>
        <h1 className='text-2xl md:text-4xl'>
          foram encontrados {houses?.length || '0'}{' '}
          {houses?.length === 1 ? 'imóvel' : 'imóveis'}
        </h1>
        <Button
          label='filtros'
          onClick={() => setOpenSidebarFilter(true)}
          aria-controls={openSidebarFilter ? 'sidebar' : undefined}
          aria-expanded={openSidebarFilter}
          className='self-end'
        />
        <Sidebar
          id='sidebar'
          visible={openSidebarFilter}
          onHide={() => setOpenSidebarFilter(false)}
          position='right'
          className='w-full md:w-fit'>
          <FilterForm searchParams={searchParams} setSearchParams={setSearchParams} />
        </Sidebar>
      </div>
      <DataView
        value={houses}
        itemTemplate={HouseCard}
        layout='grid'
        paginator
        rows={30}
      />
    </section>
  )
}

export default RealStates
