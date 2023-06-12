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
  return <img className='w-full block' src={image} alt='' />
}

export const HouseCard = ({
  name,
  description,
  price,
  properties,
  images
}: Omit<House, 'id'>) => {
  return (
    <div className='max-w-[18rem] bg-gray-200 rounded-md shadow-black/50 shadow-md'>
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
      <div className='px-2 my-2'>
        <h3 className='font-poppins text-xl'>{name}</h3>
        <p className='text-gray-900'>{description}</p>
        <div className='flex flex-col gap-2 my-2'>
          {price.map(({ type, value }, index) => {
            const formatedPrice = value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
            return (
              <p
                className='text-dark-blue font-semibold font-poppins capitalize text-md'
                key={index}>
                {formatedPrice} / <span className='text-sm'>{type}</span>
              </p>
            )
          })}
        </div>
        <div className='flex gap-x-4 items-center my-2'>
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
