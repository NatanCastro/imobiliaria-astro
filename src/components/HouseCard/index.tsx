import type { House, HouseProperty, PropertyDescription } from './types'
import { SquareFoot, Bed, Bathtub } from '@mui/icons-material'

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

export const HouseCard = ({
	name,
	description,
	price,
	properties
}: Omit<House, 'id'>) => {
	return (
		<div className='max-w-[18rem] bg-gray-200 rounded-md shadow-black/50 shadow-md'>
			<img className='w-full rounded-t-md' src='/livingRoom.webp' alt={name} />
			<div className='px-2 my-2'>
				<h3 className='font-poppins text-xl'>{name}</h3>
				<p className='text-gray-900'>{description.slice(0, 30)}</p>
				<div>
					{price.map((p, index) => (
						<p
							className='text-gold-900 font-semibold font-poppins capitalize text-md'
							key={index}>
							{p.value} / <span className='text-sm'>{p.type}</span>
						</p>
					))}
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
