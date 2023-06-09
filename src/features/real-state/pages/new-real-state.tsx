import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { House } from '../../components/house-card.type'
import { redirect } from 'react-router-dom'

const schema = z.object({
  name: z.string().nonempty().min(5),
  description: z.string().nonempty(),
  bedroomNumber: z.number().gte(0),
  bathroomNumber: z.number().gte(0),
  parkingSpace: z.number().gte(0),
  area: z.number().gte(0),
  city: z.string(),
  district: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  rentValue: z.number().gt(0).optional(),
  purchaseValue: z.number().gt(0).optional(),
  hasSwimmingpool: z.boolean().default(false),
  onCondominium: z.boolean().default(false),
  images: z
    .instanceof(FileList)
    .transform((fl) => Array(...fl))
    .refine((fa) =>
      fa.every(
        (f) => /^image\/*/.test(f.type) && /\.(jpg|jpeg|png|gif|webp)$/.test(f.name)
      )
    )
})

type Data = z.infer<typeof schema>

const NewRealState = () => {
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm<Data>({
    resolver: zodResolver(schema)
  })
  const uploadImages = async (images: File[]) => {
    const fd = new FormData()
    images.forEach((image) => {
      fd.append('files', image, image.name)
    })

    const { data } = await axios.post<{ public_id: string; secure_url: string }[]>(
      'real-state/upload-images',
      fd,
      {
        baseURL: import.meta.env.VITE_BACKEND_URL
      }
    )
    return data
  }
  const createRealState = async (
    data: Omit<Data, 'images'> & { images: { public_id: string; secure_url: string }[] }
  ) => {
    console.log(data)
    const { data: result } = await axios.post<House>(
      'real-state',
      {
        name: data.name,
        city: data.city,
        description: data.description,
        parkingSpace: data.parkingSpace,
        bathroomNumber: data.bathroomNumber,
        swimmingPool: data.hasSwimmingpool,
        condominium: data.onCondominium,
        area: data.area,
        number: data.houseNumber,
        street: data.street,
        district: data.district,
        bedroomNumber: data.bedroomNumber,
        rentValue: data.rentValue,
        purchaseValue: data.purchaseValue,
        images: data.images.map(({ public_id, secure_url }) => ({
          cloudId: public_id,
          url: secure_url
        }))
      },
      {
        baseURL: import.meta.env.VITE_BACKEND_URL
      }
    )
    console.log(result)
    return result
  }

  const realStateMutation = useMutation({
    mutationFn: createRealState,
    onSuccess: (data) => {
      redirect(`imoveis/${data.id}`)
    }
  })
  const uploadImagesMutation = useMutation({
    mutationFn: uploadImages,
    onSuccess: async (uploadedImagesData) => {
      console.log(uploadedImagesData)
      const formData = getValues()
      realStateMutation.mutate({ ...formData, images: uploadedImagesData })
    }
  })

  const onSubmit = handleSubmit(({ images }) => {
    uploadImagesMutation.mutate(images)
  })
  const GetFormErrorMessage = ({ name }: { name: keyof Data }) => {
    return !errors[name] ? (
      <small>&nbsp;</small>
    ) : (
      <small className='p-error'>{errors[name]?.message}</small>
    )
  }

  return (
    <div className='my-8 flex items-center justify-center'>
      <form onSubmit={onSubmit} className='mx-8 flex max-w-3xl flex-col gap-4'>
        <Controller
          defaultValue=''
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
          defaultValue=''
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

        <div className='flex flex-wrap gap-x-8'>
          <Controller
            defaultValue={0}
            control={control}
            name='bedroomNumber'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Numbero de quartos</label>
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
            defaultValue={0}
            control={control}
            name='bathroomNumber'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Numbero de banheiros</label>
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
            defaultValue={0}
            control={control}
            name='parkingSpace'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Numbero de garagens</label>
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
            defaultValue={0}
            control={control}
            name='area'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Area do imóvel</label>
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
            defaultValue=''
            control={control}
            name='city'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>Cidade</label>
                <InputText placeholder='Votuporanga' id={f.name} {...f} />
              </div>
            )}
          />
          <Controller
            defaultValue=''
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
            defaultValue=''
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
            defaultValue=''
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
            defaultValue={0}
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
            defaultValue={0}
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
            defaultValue={false}
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
            defaultValue={false}
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
        <div className='flex flex-col'>
          <label htmlFor='images'>imagens</label>
          <input type='file' id='images' multiple {...register('images')} />
        </div>

        <Button type='submit' label='cadastrar' className='self-center lg:self-end' />
      </form>
    </div>
  )
}

export default NewRealState
