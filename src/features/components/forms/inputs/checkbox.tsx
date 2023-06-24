import { ChangeEventHandler, useId } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormData } from '../../../home/components/search-form'

interface ICheckbox {
  value: string
  registerName: keyof FormData
  required: boolean
  checked?: boolean
  registerFn: UseFormRegister<FormData>
  addItem: ChangeEventHandler<HTMLInputElement>
  removeItem: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = (props: ICheckbox) => {
  const { value, registerName, required, checked, registerFn, addItem, removeItem } =
    props
  const { onChange, ...registerProps } = registerFn(registerName)

  const id = useId()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.checked) {
      removeItem(event)
    } else {
      addItem(event)
    }
    onChange(event)
  }

  return (
    <label htmlFor={id} className='flex grow items-center gap-3'>
      <input
        id={id}
        type='checkbox'
        className='rounded text-dark-blue focus:ring-dark-blue'
        value={value}
        required={required}
        defaultChecked={checked}
        onChange={handleChange}
        {...registerProps}
      />
      {value}
    </label>
  )
}
