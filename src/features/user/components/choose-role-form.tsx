import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const chooseRoleSchema = z.object({
  role: z.string()
})

type ChooseRoleData = z.infer<typeof chooseRoleSchema>

export const ChooseRoleForm = () => {
  const { control } = useForm<ChooseRoleData>({ resolver: zodResolver(chooseRoleSchema) })
  return (
    <form className='flex h-1/2 w-1/3 flex-col justify-between text-2xl'>
      <Controller
        name='role'
        control={control}
        render={({ field: f }) => (
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-x-2'>
              <RadioButton
                {...f}
                inputId='locador'
                inputRef={f.ref}
                value='locador'
                checked={f.value === 'locador'}
              />
              <label htmlFor='locador'>locador</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <RadioButton
                {...f}
                inputId='locatario'
                inputRef={f.ref}
                value='locatario'
                checked={f.value === 'locatario'}
              />
              <label htmlFor='locatario'>locatario</label>
            </div>
          </div>
        )}
      />
      <Button label='cadastrar' className='self-start' />
    </form>
  )
}
