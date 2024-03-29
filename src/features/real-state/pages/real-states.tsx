import { Link, useSearchParams } from 'react-router-dom'
import { FilterForm, filterData } from '../components/filter-form'
import axios from 'axios'
import { useState } from 'react'
import { RealStateCard } from '../../components/real-state-card'
import { DataView } from 'primereact/dataview'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import { FindRealState } from '../../../types/find-real-state.params'
import { useQuery } from '@tanstack/react-query'
import { getRealStates } from '../../../utils/get-real-states'
import { useUser } from '@clerk/clerk-react'
import { Helmet } from 'react-helmet'

function getParams<T>(searchParams: URLSearchParams) {
  return (searchParam: keyof T) => {
    let value: string | number | null = searchParams.get(searchParam as string)
    if (!isNaN(Number(value))) {
      value = Number(value)
      return value !== 0 ? value : undefined
    }
    return value
  }
}

const RealStates = () => {
  const { user } = useUser()
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

  const getParam = getParams<filterData>(searchParams)
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
    queryFn: () => getRealStates(params)
  })

  return (
    <>
      <Helmet>
        <title>Votu Imóveis - imóveis</title>
      </Helmet>
      <section className='flex flex-col justify-center gap-y-8 overflow-hidden py-16'>
        <div className='flex flex-col items-start justify-between px-4 py-2 md:flex-row md:items-center lg:justify-evenly'>
          <h1 className='text-2xl md:text-4xl'>
            foram encontrados {houses?.length || '0'}{' '}
            {houses?.length === 1 ? 'imóvel' : 'imóveis'}
          </h1>
          <div className='flex gap-4'>
            {user?.publicMetadata['role'] === 'admin' && (
              <Button>
                <Link to='novo'>criar</Link>
              </Button>
            )}
            <Button
              label='filtros'
              onClick={() => setOpenSidebarFilter(true)}
              aria-controls={openSidebarFilter ? 'sidebar' : undefined}
              aria-expanded={openSidebarFilter}
              className='self-end'
            />
          </div>
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
        <DataView
          value={houses}
          itemTemplate={RealStateCard}
          layout='grid'
          paginator
          rows={30}
        />
      </section>
    </>
  )
}

export default RealStates
