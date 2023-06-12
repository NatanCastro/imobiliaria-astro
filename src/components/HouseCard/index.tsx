import type { House, HouseProperty, PropertyDescription } from './types'
import { SquareFoot, Bed, Bathtub } from '@mui/icons-material'
import { Galleria } from 'primereact/galleria'

const HouseProperties = ({ properties }: { properties: HouseProperty[] }) => {
  const getIcon = (propertyDesc: PropertyDescription) => {
    switch (propertyDesc) {
      case 'area':
        return <SquareFoot />
      case 'quartos':
        return <Bed />
      case 'banheiros':
        return <Bathtub />
    }
  }

  return (
    <>
      {properties.map(({ description, value }, index) => (
        <div key={index} className='flex items-center gap-2'>
          {getIcon(description)}
          <span>
            {value}
            {description == 'area' && (
              <>
                m<sup>2</sup>
              </>
            )}
          </span>
        </div>
      ))}
    </>
  )
}

const imageTemplate = (image: string) => {
  return <img className='block w-full' src={image} alt='' />
}

export const HouseCard = ({
  name,
  description,
  price,
  properties,
  images
}: Omit<House, 'id'>) => {
  return (
    <div className='max-w-[18rem] rounded-md bg-gray-200 shadow-md shadow-black/50'>
      <Galleria
        value={images}
        item={imageTemplate}
        circular
        showThumbnails={false}
        showIndicators
        showIndicatorsOnItem={true}
        showItemNavigators
        showItemNavigatorsOnHover
        autoPlay
        transitionInterval={4000}
      />
      <div className='my-2 px-2'>
        <h3 className='mb-4 font-poppins text-xl'>{name}</h3>
        <p className='text-md text-gray-900'>{description}</p>
        <div className='my-4 flex flex-col gap-2'>
          {price.map(({ type, value }, index) => {
            const formatedPrice = value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
            return (
              <p
                className='text-md font-poppins font-semibold capitalize text-dark-blue'
                key={index}>
                {formatedPrice} / <span className='text-sm'>{type}</span>
              </p>
            )
          })}
        </div>
        <div className='my-2 flex items-center gap-x-4'>
          <HouseProperties properties={properties} />
        </div>
      </div>
      <a
        className='flex w-full items-center justify-center rounded-b-md bg-dark-blue py-2 text-white'
        href=''>
        mais informações
      </a>
    </div>
  )
}
