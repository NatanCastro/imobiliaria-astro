import { ChangeEventHandler, useState } from 'react'
import { Radio } from './'
import { UseFormRegister } from 'react-hook-form'
import { FormData } from '../'

interface IDropdownProps {
  displayText: string
  registerFn: UseFormRegister<FormData>
  name: keyof FormData
  options: string[]
  required?: boolean
  defaultOpt?: boolean
}

export const RadioDropdown = (props: IDropdownProps) => {
  const [selected, setSelected] = useState<string>('')
  const { displayText, required = false, defaultOpt = false, options, name, registerFn } = props

  const updateSelection: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelected(event.target.value)
  }

  return (
    <div className='group relative cursor-pointer rounded bg-gray-100' tabIndex={0}>
      <input
        className='w-full rounded bg-white px-3 py-2'
        placeholder={displayText}
        value={selected}
        type='text'
        disabled
      />
      <div className='odd absolute top-full hidden w-full flex-col gap-4 rounded bg-gray-100 px-3 py-2 odd:border-gray-50 group-focus-within:flex'>
        {options.map((option, index) => {
          return (
            <Radio
              key={index}
              value={option}
              registerName={name}
              defaultChecked={index === 0 && defaultOpt}
              required={required}
              registerFn={registerFn}
              updateItem={updateSelection}
            />
          )
        })}
      </div>
    </div>
  )
}
