import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { serializeFormQuery } from '../../../utils/serializeFormQuery'

import '../css/search-form.css'
import { SelectButton } from 'primereact/selectbutton'
import { SelectItemOptionsType } from 'primereact/selectitem'

const sellOptions: SelectItemOptionsType = [
  { label: 'comprar', value: 'comprar' },
  { label: 'alugar', value: 'alugar' }
]

const schema = z.object({
  sellType: z.array(z.string()).optional(),
  city: z.string(),
  district: z.string().optional(),
  numberOfBedroom: z.coerce.number().optional()
})
export type FormData = z.infer<typeof schema>

export const SearchForm = () => {
  const cities = useLoaderData() as string[]
  const [selectedCity, SetSelectedCity] = useState<string>()
  const [districts, setDistricts] = useState<string[]>()
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const params = serializeFormQuery(data)
    navigate(`imoveis?${params}`)
  }

  const getDistricts = useCallback(async () => {
    if (!selectedCity) return
    const { data } = await axios.get<{ district: string }[]>(
      `real-state/cities/${selectedCity}`,
      {
        baseURL: import.meta.env.VITE_BACKEND_URL
      }
    )
    setDistricts(data.map((d) => d.district))
  }, [selectedCity])

  useEffect(() => {
    getDistricts()
  }, [getDistricts])

  return (
    <form
      className='grid place-items-stretch gap-4 rounded-md bg-gray-100 p-4 max-md:mx-2 md:grid-cols-3'
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='sellType'
        control={control}
        render={({ field: f }) => (
          <div className='place-self-center md:col-span-3'>
            <label htmlFor={f.name} id='modVenda' className='sr-only'>
              modalidade de compra:
            </label>
            <SelectButton
              id={f.name}
              aria-labelledby='modVenda'
              options={sellOptions}
              {...f}
              multiple
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name='city'
        render={({ field: f }) => (
          <div className='p-float-label flex justify-stretch'>
            <Dropdown
              id={f.name}
              {...f}
              aria-labelledby='lbl-city'
              options={cities}
              onChange={(e) => {
                f.onChange(e.value)
                SetSelectedCity(e.target.value)
              }}
              onBlur={() => f.onBlur()}
            />
            <label htmlFor={f.name} id='lbl-city'>
              cidade
            </label>
          </div>
        )}
      />
      <Controller
        control={control}
        name='district'
        render={({ field: f }) => (
          <div className='p-float-label flex justify-stretch'>
            <Dropdown
              id={f.name}
              {...f}
              aria-labelledby='lbl-district'
              options={districts}
              onChange={(e) => f.onChange(e.value)}
              onBlur={() => f.onBlur()}
              disabled={!districts}
            />
            <label htmlFor={f.name} id='lbl-district'>
              bairro
            </label>
          </div>
        )}
      />
      <Controller
        control={control}
        name='numberOfBedroom'
        render={({ field: f }) => (
          <div className='p-float-label flex justify-stretch'>
            <Dropdown
              id={f.name}
              {...f}
              aria-labelledby='lbl-bedroom'
              options={[1, 2, 3, 4, 5]}
              onChange={(e) => f.onChange(e.value)}
              onBlur={() => f.onBlur()}
            />
            <label htmlFor={f.name} id='lbl-bedroom'>
              quartos
            </label>
          </div>
        )}
      />
      <Button label='enviar' className='md:col-span-3' />
    </form>
  )
}
