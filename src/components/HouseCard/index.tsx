import type { House, HouseProperty, PropertyDescription } from './types'
import { FaBath, FaBed, FaRulerCombined, FaShower } from 'react-icons/fa'

const HouseProperties = ({ properties }: { properties: HouseProperty[] }) => {
  let baseLabel: string

  const getIcon = (propertyDesc: PropertyDescription) => {
    switch (propertyDesc) {
      case 'area':
        baseLabel = 'metros quadrados'
        return <FaRulerCombined />
      case 'quartos':
        baseLabel = 'quartos'
        return <FaBed />
      case 'banheiros':
        baseLabel = 'banheiros'
        return <FaBath />
    }
  }

  const icons = properties.map(({ description, value }, index) => (
    <div key={index} className='flex items-center gap-2'>
      {getIcon(description)}
      {value}
    </div>
  ))

  return <>{icons}</>
}

export const HouseCard = ({ url, title, price, properties }: House) => {
  return (
    <div className='max-w-[18rem] bg-gray-200 rounded-md shadow-black/50 shadow-md'>
      <img className='w-full rounded-t-md' src={url} alt={title} />
      <div className='px-2 my-2'>
        <h3 className='font-poppins text-xl'>{title}</h3>
        <p className='text-gold-900 font-semibold font-poppins capitalize text-md'>
          {price.value} / <span className='text-sm'>{price.type}</span>
        </p>
        <div className='flex gap-x-4 items-center'>
          <HouseProperties properties={properties} />
        </div>
      </div>
      <a
        className='w-full flex justify-center items-center py-2 text-white bg-dark-blue rounded-b-md'
        href=''>
        mais informações
      </a>
    </div>
  )
}
