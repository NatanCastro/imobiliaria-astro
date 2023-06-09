'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckboxDropdown, RadioDropdown } from './'
import { z } from 'zod'

const schema = z
  .object({
    action: z.string().array(),
    action2: z.string()
  })
  .required()
export type FormData = z.infer<typeof schema>

const tipoCasas = ['alo', 'pamonha', 'alo2']

export const SearchForm = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data)
  return (
    <form
      className='grid grid-cols-2 place-items-center gap-3 rounded-md bg-gray-100 p-2 max-md:flex max-md:flex-wrap max-md:flex-grow max-md:mx-2'
      onSubmit={handleSubmit(onSubmit)}>
      <CheckboxDropdown
        displayText='comprar ou vender'
        options={tipoCasas}
        name='action'
        registerFn={register}
      />
      <RadioDropdown
        displayText='comprar ou vender'
        options={tipoCasas}
        name='action2'
        registerFn={register}
      />
      <input
        type='submit'
        value='enviar'
        className='h-auto w-full cursor-pointer rounded bg-dark-blue py-2 text-white'
      />
    </form>
  )
}
