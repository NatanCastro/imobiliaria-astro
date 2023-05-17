import { ChangeEventHandler, useId } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormData } from '../SearchForm'

interface IRadio {
  value: string
  registerName: keyof FormData
  required: boolean
  defaultChecked?: boolean
  registerFn: UseFormRegister<FormData>
  updateItem: ChangeEventHandler<HTMLInputElement>
}

export const Radio = (props: IRadio) => {
  const { value, registerName, required, defaultChecked, registerFn, updateItem } = props
  const { onChange, ...registerProps } = registerFn(registerName)

  const id = useId()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateItem(event)
    onChange(event)
  }

  return (
    <label htmlFor={id} className='flex grow items-center gap-3'>
      <input
        id={id}
        type='radio'
        className='text-darkBlue focus:ring-darkBlue'
        value={value}
        required={required}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        {...registerProps}
      />
      {value}
    </label>
  )
}
