import { UseFormRegister } from 'react-hook-form'
import { Checkbox } from './'
import { FormData } from '../'
import { ChangeEventHandler, useEffect, useState } from 'react'

interface IDropdownProps {
  displayText: string
  registerFn: UseFormRegister<FormData>
  name: keyof FormData
  options: string[]
  required?: boolean
  defaultOpt?: boolean
}

interface ISelected {
  id: string
  value: string
}

export const CheckboxDropdown = (props: IDropdownProps) => {
  const [selected, setSelected] = useState<ISelected[]>([])
  const [value, setValue] = useState<string>('')

  const {
    displayText,
    required = false,
    defaultOpt = false,
    options,
    name,
    registerFn
  } = props

  const addSelected: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelected((prev) => [...prev, { id: event.target.id, value: event.target.value }])
  }

  const removeSelected: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelected((prev) => prev.filter((item) => item.id !== event.target.id))
  }

  const updateValue = () => {
    const values = selected.map((item) => item.value)
    setValue(values.sort().join(', '))
  }

  useEffect(updateValue, [updateValue, selected])

  return (
    <div
      className='group relative cursor-pointer rounded bg-gray-100 flex-grow'
      tabIndex={0}>
      <input
        className='w-full rounded bg-white px-3 py-2 min-w-full'
        placeholder={displayText}
        value={value}
        type='text'
        disabled
      />
      <div className='odd absolute top-full hidden w-full flex-col gap-4 rounded bg-gray-100 px-3 py-2 odd:border-gray-50 group-focus-within:flex'>
        {options.map((option, index) => {
          return (
            <Checkbox
              key={index}
              value={option}
              registerName={name}
              required={required}
              checked={index === 0 && defaultOpt}
              registerFn={registerFn}
              addItem={addSelected}
              removeItem={removeSelected}
            />
          )
        })}
      </div>
    </div>
  )
}
