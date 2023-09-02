import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
  lessor: z.string().nonempty()
})

type Data = z.infer<typeof schema>

export const ChangeLessorButton = () => {
  const { guid } = useParams()
  const { control, handleSubmit } = useForm<Data>({
    resolver: zodResolver(schema)
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const changeLessorMutation = useMutation({
    mutationFn: async (lessorId: string) => {
      await axios.patch(`real-state/${guid}`, {
        lessorId
      })
    }
  })
  const onSubmit = handleSubmit(({ lessor }) => {
    changeLessorMutation.mutate(lessor)
  })

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)}>selecionar inquilino</Button>
      <Dialog
        header='mudar locador'
        onHide={() => setIsOpen((prev) => !prev)}
        visible={isOpen}>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name='lessor'
            render={({ field: f }) => (
              <div className='flex flex-col'>
                <label htmlFor={f.name}>novo inquilino</label>
                <Dropdown
                  id={f.name}
                  value={f.value}
                  focusInputRef={f.ref}
                  onChange={(e) => f.onChange(e.value)}
                />
              </div>
            )}
          />
          <Button label='confirmar' />
        </form>
      </Dialog>
    </>
  )
}
