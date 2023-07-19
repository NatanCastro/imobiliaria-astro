import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { RealState } from '../../components/real-state-card.type'
import { Loading } from '../../components/loading'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'

const schema = z.object({
  name: z.string().nonempty().min(5),
  description: z.string().nonempty(),
  bedroomNumber: z.number().gte(0),
  suiteNumber: z.number().gte(0),
  bathroomNumber: z.number().gte(0),
  parkingSpace: z.number().gte(0),
  area: z.number().gte(0),
  state: z.string(),
  city: z.string(),
  district: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  rentValue: z.number().gt(0).optional(),
  purchaseValue: z.number().gt(0).optional(),
  hasSwimmingpool: z.boolean().default(false),
  onCondominium: z.boolean().default(false)
  //images: z
  //  .instanceof(FileList)
  //  .transform((fl) => Array(...fl))
  //  .refine((fa) =>
  //    fa.every(
  //      (f) => /^image\/*/.test(f.type) && /\.(jpg|jpeg|png|gif|webp)$/.test(f.name)
  //    )
  //  )
})

type Data = z.infer<typeof schema>

const EditRealState = () => {
  const [state, setState] = useState<string>()
  const { guid } = useParams()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Data>({
    resolver: zodResolver(schema)
  })

  const { data: states } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const { data } = await axios.get<{ id: string; nome: string; sigla: string }[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      )
      return data.map((s) => s.sigla)
    }
  })

  const { data: cities } = useQuery({
    queryKey: ['states', state, 'cities'],
    queryFn: async () => {
      const { data } = await axios.get<{ id: number; nome: string }[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
      )
      return data.map((c) => c.nome)
    },
    enabled: Boolean(state)
  })

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

  const onSubmit = handleSubmit((d) => console.log(d))

  const GetFormErrorMessage = ({ name }: { name: keyof Data }) => {
    return !errors[name] ? (
      <small>&nbsp;</small>
    ) : (
      <small className='p-error'>{errors[name]?.message}</small>
    )
  }

  if (isLoading) return <Loading />
  if (isError) return <h1>Não foi possivel retornar os dados do imóvel</h1>

  return (
    <div className='my-8 flex items-center justify-center'>
      <form onSubmit={onSubmit} className='mx-8 flex max-w-3xl flex-col gap-4'>
        <Controller
          defaultValue={house.name}
          control={control}
          name='name'
          render={({ field: f }) => (
            <div className='flex flex-col'>
              <label htmlFor={f.name}>Nome</label>
              <InputText placeholder='imóvel pousada' id={f.name} {...f} />
              <GetFormErrorMessage name='name' />
            </div>
          )}
        />

        <Controller
          defaultValue={house.description}
          control={control}
          name='description'
          render={({ field: f }) => (
            <div className='flex flex-col'>
              <label htmlFor={f.name}>Descrição do imovel</label>
              <InputTextarea
                placeholder='imovel espaçoso...'
                id={f.name}
                {...f}
                rows={5}
              />
              <GetFormErrorMessage name='description' />
            </div>
          )}
        />

        <div className='flex flex-wrap gap-x-8 gap-y-4'>
          <Controller
            defaultValue={house.bedroomNumber}
            control={control}
            name='bedroomNumber'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Número de quartos</label>
                <InputNumber
                  id={f.name}
                  ref={f.ref}
                  value={f.value}
                  onBlur={f.onBlur}
                  onValueChange={(e) => f.onChange(e)}
                  min={0}
                />
              </div>
            )}
          />
          <Controller
            defaultValue={house.suiteNumber}
            control={control}
            name='suiteNumber'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Número de suites</label>
                <InputNumber
                  id={f.name}
                  ref={f.ref}
                  value={f.value}
                  onBlur={f.onBlur}
                  onValueChange={(e) => f.onChange(e)}
                  min={0}
                />
              </div>
            )}
          />
          <Controller
            defaultValue={house.bathroomNumber}
            control={control}
            name='bathroomNumber'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Número de banheiros</label>
                <InputNumber
                  id={f.name}
                  ref={f.ref}
                  value={f.value}
                  onBlur={f.onBlur}
                  onValueChange={(e) => f.onChange(e)}
                  min={0}
                />
              </div>
            )}
          />
          <Controller
            defaultValue={house.parkingSpace}
            control={control}
            name='parkingSpace'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Número de garagens</label>
                <InputNumber
                  id={f.name}
                  ref={f.ref}
                  value={f.value}
                  onBlur={f.onBlur}
                  onValueChange={(e) => f.onChange(e)}
                  min={0}
                />
              </div>
            )}
          />
          <Controller
            defaultValue={house.area}
            control={control}
            name='area'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Área do imóvel</label>
                <InputNumber
                  id={f.name}
                  ref={f.ref}
                  value={f.value}
                  onBlur={f.onBlur}
                  onValueChange={(e) => f.onChange(e)}
                  min={0}
                  suffix='m²'
                />
              </div>
            )}
          />
        </div>

        <div className='flex flex-wrap gap-8'>
          <Controller
            defaultValue='selecione o estado'
            control={control}
            name='state'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Estado</label>
                <Dropdown
                  placeholder='estado'
                  id={f.name}
                  {...f}
                  onChange={(e) => setState(e.target.value)}
                  options={states ?? []}
                />
              </div>
            )}
          />
          <Controller
            defaultValue=''
            control={control}
            name='city'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Cidade</label>
                <Dropdown
                  placeholder='Cidade'
                  id={f.name}
                  {...f}
                  options={cities ?? []}
                  disabled={!state}
                />
              </div>
            )}
          />
          <Controller
            defaultValue={house.district}
            control={control}
            name='district'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Bairro</label>
                <InputText placeholder='São luiz' id={f.name} {...f} />
              </div>
            )}
          />
          <Controller
            defaultValue={house.street}
            control={control}
            name='street'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Rua</label>
                <InputText placeholder='São João' id={f.name} {...f} />
              </div>
            )}
          />
          <Controller
            defaultValue={house.number}
            control={control}
            name='houseNumber'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Numero da casa/prédio</label>
                <InputText placeholder='1234' id={f.name} {...f} />
              </div>
            )}
          />
        </div>

        <div className='flex gap-8'>
          <Controller
            defaultValue={house.rentValue}
            control={control}
            name='rentValue'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Valor do aluguel</label>
                <InputNumber
                  id={f.name}
                  ref={f.ref}
                  value={f.value}
                  onBlur={f.onBlur}
                  onValueChange={(e) => f.onChange(e)}
                  min={0}
                  maxFractionDigits={2}
                  currency='BRL'
                  prefix='R$'
                />
              </div>
            )}
          />
          <Controller
            defaultValue={house.purchaseValue}
            control={control}
            name='purchaseValue'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Valor de venda</label>
                <InputNumber
                  id={f.name}
                  ref={f.ref}
                  value={f.value}
                  onBlur={f.onBlur}
                  onValueChange={(e) => f.onChange(e)}
                  min={0}
                  maxFractionDigits={2}
                  currency='BRL'
                  prefix='R$'
                />
              </div>
            )}
          />
        </div>

        <div className='flex flex-wrap gap-8'>
          <Controller
            defaultValue={house.swimmingpool}
            control={control}
            name='hasSwimmingpool'
            render={({ field: f }) => (
              <div className='flex items-center justify-center gap-x-2'>
                <Checkbox
                  inputId={f.name}
                  checked={f.value}
                  inputRef={f.ref}
                  onChange={(e) => f.onChange(e.checked)}
                />
                <label htmlFor={f.name}>Possui piscina</label>
              </div>
            )}
          />
          <Controller
            defaultValue={house.condominium}
            control={control}
            name='onCondominium'
            render={({ field: f }) => (
              <div className='flex items-center justify-center gap-x-2'>
                <Checkbox
                  inputId={f.name}
                  checked={f.value}
                  inputRef={f.ref}
                  onChange={(e) => f.onChange(e.checked)}
                />
                <label htmlFor={f.name}>É em condominio</label>
              </div>
            )}
          />
        </div>

        <Button type='submit' label='cadastrar' className='self-center lg:self-end' />
      </form>
    </div>
  )
}
export default EditRealState
