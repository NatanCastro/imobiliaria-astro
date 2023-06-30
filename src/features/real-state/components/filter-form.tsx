import { zodResolver } from '@hookform/resolvers/zod'
import { SelectItemOptionsType } from 'primereact/selectitem'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { serializeFormQuery } from '../../../utils/serialize-form-query'
import { InputNumber } from 'primereact/inputnumber'
import { SelectButton } from 'primereact/selectbutton'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { SetURLSearchParams, useLoaderData } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'

const filterSchema = z.object({
  city: z.string().optional(),
  district: z.string().optional(),
  sellType: z.array(z.string()).optional(),
  minPurchacePrice: z.coerce.number().gte(0).optional(),
  maxPurchacePrice: z.coerce.number().gte(0).optional(),
  minRentPrice: z.coerce.number().gte(0).optional(),
  maxRentPrice: z.coerce.number().gte(0).optional(),
  minArea: z.coerce.number().gte(0).optional(),
  maxArea: z.coerce.number().gte(0).optional(),
  numberOfBedroom: z.coerce.number().gte(1).default(1),
  numberOfBathroom: z.coerce.number().gte(1).default(1)
})

const numberOfBathroomOrBedroomOption: SelectItemOptionsType = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5+', value: 5 }
]

const sellOptions: SelectItemOptionsType = [
  { label: 'comprar', value: 'comprar' },
  { label: 'alugar', value: 'alugar' }
]

export type filterData = z.infer<typeof filterSchema>

type Props = {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  setSelectedCity: Dispatch<SetStateAction<string>>
  districts?: string[]
}

export const FilterForm: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  setSelectedCity,
  districts
}) => {
  const data = useLoaderData() as string[]
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<filterData>({
    resolver: zodResolver(filterSchema),
    mode: 'onChange'
  })

  const onSubmit = handleSubmit((d) => {
    const params = serializeFormQuery(d)
    setSearchParams(params)
  })

  const getFormErrorMessage = (name: keyof filterData) => {
    return errors[name] ? (
      <small className='p-error'>{errors[name]?.message}</small>
    ) : (
      <small className='p-error'>&nbsp;</small>
    )
  }

  return (
    <div className='flex flex-col items-center justify-start py-2'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col items-start justify-center gap-y-6 rounded bg-white px-2 py-4'>
        <Controller
          defaultValue={searchParams.get('city') ?? undefined}
          name='city'
          control={control}
          render={({ field: f }) => (
            <div className='flex flex-col'>
              <label htmlFor={f.name}>cidades</label>
              <Dropdown
                id={f.name}
                {...f}
                options={data}
                onChange={(e) => {
                  f.onChange(e.value)
                  setSelectedCity(e.value)
                }}
                onBlur={() => f.onBlur()}
                placeholder='cidade'
              />
            </div>
          )}
        />
        <Controller
          defaultValue={searchParams.get('district') ?? undefined}
          name='district'
          control={control}
          render={({ field: f }) => (
            <div className='flex flex-col'>
              <label htmlFor={f.name}>bairro</label>
              <Dropdown
                id={f.name}
                {...f}
                options={districts}
                onChange={(e) => f.onChange(e.value)}
                onBlur={() => f.onBlur()}
                disabled={!districts}
                placeholder='bairro'
              />
            </div>
          )}
        />
        <Controller
          defaultValue={searchParams.get('sellType')?.split(',')}
          name='sellType'
          control={control}
          render={({ field: f }) => (
            <div className='flex flex-col'>
              <label htmlFor={f.name} id='modVenda'>
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
        <div>
          <h3 className='mb-2 text-center text-xl'>valor de venda</h3>
          <div className='flex flex-wrap gap-5'>
            <Controller
              defaultValue={Number(searchParams.get('minPurchacePrice'))}
              name='minPurchacePrice'
              control={control}
              render={({ field: f }) => (
                <div className='flex flex-col'>
                  <label className='mb-2' htmlFor={f.name}>
                    minimo:
                  </label>
                  <InputNumber
                    id={f.name}
                    ref={f.ref}
                    value={f.value}
                    onBlur={f.onBlur}
                    onValueChange={(e) => f.onChange(e)}
                    mode='decimal'
                    locale='pt-BR'
                    maxFractionDigits={2}
                    min={0}
                    placeholder='min'
                    prefix='R$'
                  />
                  {getFormErrorMessage(f.name)}
                </div>
              )}
            />
            <Controller
              defaultValue={Number(searchParams.get('maxPurchacePrice'))}
              name='maxPurchacePrice'
              control={control}
              render={({ field: f }) => (
                <div className='flex flex-col'>
                  <label className='mb-2' htmlFor={f.name}>
                    maximo:
                  </label>
                  <InputNumber
                    id={f.name}
                    ref={f.ref}
                    value={f.value}
                    onBlur={f.onBlur}
                    onValueChange={(e) => f.onChange(e)}
                    mode='decimal'
                    locale='pt-BR'
                    maxFractionDigits={2}
                    min={0}
                    placeholder='max'
                    prefix='R$'
                  />
                  {getFormErrorMessage(f.name)}
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <h3 className='mb-2 text-center text-xl'>valor do aluguel</h3>
          <div className='flex gap-5'>
            <Controller
              defaultValue={Number(searchParams.get('minPrice'))}
              name='minRentPrice'
              control={control}
              render={({ field: f }) => (
                <div className='flex flex-col'>
                  <label className='mb-2' htmlFor={f.name}>
                    minimo:
                  </label>
                  <InputNumber
                    id={f.name}
                    ref={f.ref}
                    value={f.value}
                    onBlur={f.onBlur}
                    onValueChange={(e) => f.onChange(e)}
                    mode='decimal'
                    locale='pt-BR'
                    maxFractionDigits={2}
                    min={0}
                    placeholder='min'
                    prefix='R$'
                  />
                  {getFormErrorMessage(f.name)}
                </div>
              )}
            />
            <Controller
              defaultValue={Number(searchParams.get('maxPrice'))}
              name='maxRentPrice'
              control={control}
              render={({ field: f }) => (
                <div className='flex flex-col'>
                  <label className='mb-2' htmlFor={f.name}>
                    maximo:
                  </label>
                  <InputNumber
                    id={f.name}
                    ref={f.ref}
                    value={f.value}
                    onBlur={f.onBlur}
                    onValueChange={(e) => f.onChange(e)}
                    mode='decimal'
                    locale='pt-BR'
                    maxFractionDigits={2}
                    min={0}
                    placeholder='max'
                    prefix='R$'
                  />
                  {getFormErrorMessage(f.name)}
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <h3 className='text-center text-xl'>area</h3>
          <div className='flex gap-5'>
            <Controller
              defaultValue={Number(searchParams.get('minArea'))}
              name='minArea'
              control={control}
              render={({ field: f }) => (
                <div className='flex flex-col'>
                  <label className='mb-2' htmlFor={f.name}>
                    minima:
                  </label>
                  <InputNumber
                    id={f.name}
                    ref={f.ref}
                    value={f.value}
                    onBlur={f.onBlur}
                    onValueChange={(e) => f.onChange(e)}
                    mode='decimal'
                    locale='pt-BR'
                    min={0}
                    placeholder='min'
                    suffix='m²'
                  />
                  {getFormErrorMessage(f.name)}
                </div>
              )}
            />
            <Controller
              defaultValue={Number(searchParams.get('maxArea'))}
              name='maxArea'
              control={control}
              render={({ field: f }) => (
                <div className='flex flex-col'>
                  <label className='mb-2' htmlFor={f.name}>
                    maxima:
                  </label>
                  <InputNumber
                    id={f.name}
                    ref={f.ref}
                    value={f.value}
                    onBlur={f.onBlur}
                    onValueChange={(e) => f.onChange(e)}
                    mode='decimal'
                    locale='pt-BR'
                    min={0}
                    placeholder='max'
                    suffix='m²'
                  />
                  {getFormErrorMessage(f.name)}
                </div>
              )}
            />
          </div>
        </div>
        <Controller
          defaultValue={Number(searchParams.get('numberOfBedroom')) || 1}
          name='numberOfBedroom'
          control={control}
          render={({ field: f }) => (
            <div>
              <label className='mb-2' htmlFor={f.name} id='quartos'>
                numero minimo de quartos:
              </label>
              <SelectButton
                id={f.name}
                aria-labelledby='quartos'
                options={numberOfBathroomOrBedroomOption}
                {...f}
              />
            </div>
          )}
        />
        <Controller
          defaultValue={Number(searchParams.get('numberOfBathroom')) || 1}
          name='numberOfBathroom'
          control={control}
          render={({ field: f }) => (
            <div>
              <label className='mb-2' htmlFor={f.name} id='banheiros'>
                numero minimo de banheiros:
              </label>
              <SelectButton
                id={f.name}
                aria-labelledby='banheiros'
                options={numberOfBathroomOrBedroomOption}
                {...f}
              />
              {getFormErrorMessage(f.name)}
            </div>
          )}
        />

        <Button label='enviar' />
      </form>
    </div>
  )
}
