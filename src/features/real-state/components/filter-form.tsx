import { zodResolver } from '@hookform/resolvers/zod'
import { SelectItemOptionsType } from 'primereact/selectitem'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { serializeFormQuery } from '../../../utils/serializeFormQuery'
import { InputNumber } from 'primereact/inputnumber'
import { SelectButton } from 'primereact/selectbutton'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import { SetURLSearchParams, useLoaderData } from 'react-router-dom'

const filterSchema = z.object({
  city: z.array(z.string()).optional(),
  sellType: z.array(z.string()).optional(),
  minPurchacePrice: z.coerce.number().gte(0).optional(),
  maxPurchacePrice: z.coerce.number().gte(0).optional(),
  minRentPrice: z.coerce.number().gte(0).optional(),
  maxRentPrice: z.coerce.number().gte(0).optional(),
  minArea: z.coerce.number().gte(0).optional(),
  maxArea: z.coerce.number().gte(0).optional(),
  numberOfBedroom: z.coerce.number().gte(1).optional(),
  numberOfBathroom: z.coerce.number().gte(1).optional()
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
}

export const FilterForm: React.FC<Props> = ({ searchParams, setSearchParams }) => {
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
          defaultValue={searchParams.get('city')?.split(',')}
          name='city'
          control={control}
          render={({ field: f }) => (
            <fieldset className='flex flex-col'>
              <label htmlFor={f.name}>cidades</label>
              <MultiSelect
                id={f.name}
                {...f}
                options={data}
                onChange={(e) => f.onChange(e.value)}
                onBlur={() => f.onBlur()}
                placeholder='cidades'
              />
            </fieldset>
          )}
        />
        <Controller
          defaultValue={searchParams.get('sellType')?.split(',')}
          name='sellType'
          control={control}
          render={({ field: f }) => (
            <fieldset className='flex flex-col'>
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
            </fieldset>
          )}
        />
        <div>
          <h3 className='mb-2 text-center text-xl'>valor de venda</h3>
          <div className='flex gap-5'>
            <Controller
              defaultValue={Number(searchParams.get('minPurchacePrice'))}
              name='minPurchacePrice'
              control={control}
              render={({ field: f }) => (
                <fieldset className='flex flex-col'>
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
                </fieldset>
              )}
            />
            <Controller
              defaultValue={Number(searchParams.get('maxPurchacePrice'))}
              name='maxPurchacePrice'
              control={control}
              render={({ field: f }) => (
                <fieldset className='flex flex-col'>
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
                </fieldset>
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
                <fieldset className='flex flex-col'>
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
                </fieldset>
              )}
            />
            <Controller
              defaultValue={Number(searchParams.get('maxPrice'))}
              name='maxRentPrice'
              control={control}
              render={({ field: f }) => (
                <fieldset className='flex flex-col'>
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
                </fieldset>
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
                <fieldset className='flex flex-col'>
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
                </fieldset>
              )}
            />
            <Controller
              defaultValue={Number(searchParams.get('maxArea'))}
              name='maxArea'
              control={control}
              render={({ field: f }) => (
                <fieldset className='flex flex-col'>
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
                </fieldset>
              )}
            />
          </div>
        </div>
        <Controller
          name='numberOfBedroom'
          control={control}
          render={({ field: f }) => (
            <fieldset>
              <label className='mb-2' htmlFor={f.name} id='quartos'>
                numero minimo de quartos:
              </label>
              <SelectButton
                id={f.name}
                aria-labelledby='quartos'
                options={numberOfBathroomOrBedroomOption}
                {...f}
              />
            </fieldset>
          )}
        />
        <Controller
          name='numberOfBathroom'
          control={control}
          render={({ field: f }) => (
            <fieldset>
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
            </fieldset>
          )}
        />

        <Button label='enviar' />
      </form>
    </div>
  )
}
