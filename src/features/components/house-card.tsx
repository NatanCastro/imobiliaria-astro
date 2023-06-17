import type { House, HouseProperty, PropertyDescription } from './house-card.type'
import { SquareFoot, Bed, Bathtub } from '@mui/icons-material'
import { Galleria } from 'primereact/galleria'
import { NavLink } from 'react-router-dom'

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
  id,
  name,
  price,
  properties,
  images,
  district,
  city
}: House) => {
  return (
    <div className='max-w-[18rem] overflow-hidden rounded-md bg-gray-200 shadow-md shadow-black/50'>
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
        <p className='text-md text-gray-900'>
          {city} no bairro {district}
        </p>
        <div className='my-2 flex items-center gap-x-4'>
          <HouseProperties properties={properties} />
        </div>
        <div className='my-4 flex flex-row justify-evenly gap-2'>
          {price.map(({ type, value }, index) => {
            const formatedPrice = value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })
            return (
              <p
                className='font-poppins text-base font-semibold capitalize text-dark-blue'
                key={index}>
                {formatedPrice}
                {type === 'aluguel' && <>/Mês</>}
              </p>
            )
          })}
        </div>
      </div>
      <NavLink
        className='flex w-full items-center justify-center rounded-b-md bg-dark-blue py-2 text-white'
        to={`/real-state/${id}`}>
        mais informações
      </NavLink>
    </div>
  )
}
