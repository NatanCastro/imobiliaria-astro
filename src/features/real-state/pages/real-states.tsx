import { useSearchParams } from 'react-router-dom'
import { FilterForm, filterData } from '../components/filter-form'
import axios from 'axios'
import { useState } from 'react'
import { HouseCard } from '../../components/house-card'
import { HouseSkeleton } from '../components/house-skeleton'
import { DataView } from 'primereact/dataview'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import { FindRealState } from '../../../types/find-real-state.params'
import { useQuery } from '@tanstack/react-query'
import { getHouses } from '../../../utils/get-houses'

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
  const [openSidebarFilter, setOpenSidebarFilter] = useState<boolean>(false)
  const [selectedCity, setSelectedCity] = useState<string>(searchParams.get('city') || '')

  const { data: districts } = useQuery({
    queryKey: ['districts', selectedCity],
    queryFn: async () => {
      if (!selectedCity) return
      const { data } = await axios.get<{ district: string }[]>(
        `real-state/cities/${selectedCity}`,
        {
          baseURL: import.meta.env.VITE_BACKEND_URL
        }
      )
      return data.map((d) => d.district)
    },
    enabled: selectedCity !== ''
  })

  const getParam = getParams(searchParams)
  const sellType = getParam('sellType') ? (getParam('sellType') as string).split(',') : []
  const params: FindRealState = {
    city: getParam('city') as string,
    district: getParam('district') as string,
    minArea: getParam('minArea') as number,
    maxArea: getParam('maxArea') as number,
    bedroomNumber: getParam('numberOfBedroom') as number,
    bathroomNumber: getParam('numberOfBathroom') as number,
    minPValue: getParam('minPurchacePrice') as number,
    maxPValue: getParam('maxPurchacePrice') as number,
    notPValue: sellType.some((s) => s === 'comprar') ? null : undefined,
    minRValue: getParam('minRentPrice') as number,
    maxRValue: getParam('maxRentPrice') as number,
    notRValue: sellType.some((s) => s === 'alugar') ? null : undefined
  }

  const { data: houses } = useQuery({
    queryKey: ['houses', params],
    queryFn: () => getHouses(params)
  })

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
          <FilterForm
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setSelectedCity={setSelectedCity}
            districts={districts}
          />
        </Sidebar>
      </div>
      {houses ? (
        <DataView
          value={houses}
          itemTemplate={HouseCard}
          layout='grid'
          paginator
          rows={30}
        />
      ) : (
        <DataView
          value={Array<React.ReactElement>().fill(<HouseSkeleton />, 0, 6)}
          itemTemplate={HouseCard}
          layout='grid'
          rows={30}
        />
      )}
    </section>
  )
}

export default RealStates
