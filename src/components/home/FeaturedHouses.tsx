import { useEffect, useState } from 'react'
import { HouseCard } from '../HouseCard/'
import { House } from '../HouseCard/types'
import axios from 'axios'

export const FeaturedHouses = () => {
	const [houses, setHouses] = useState<House[]>([])

	async function getHouses() {
		const houses = (
			await axios.get<House[]>('http://localhost:4242/real-state', {
				data: {
					take: 6
				}
			})
		).data
		console.log(houses)
		setHouses(houses)
	}

	useEffect(() => {
		getHouses()
	}, [])

	return (
		<div className='mx-auto my-4 max-w-5xl px-4'>
			<div className='flex justify-between'>
				<h2 className='text-3xl font-poppins'>Imoveis em alta</h2>
				<a className='text-dark-blue hover:underline' href='#'>
					Ver todos os imoveis
				</a>
			</div>
			<p className='text-md'>Veja os imoveis mais relevantes do momento</p>
			<div className='flex flex-wrap justify-center gap-4 mt-4'>
				{houses.map(({ id, ...rest }) => {
					return <HouseCard key={id} {...rest} />
				})}
			</div>
		</div>
	)
}
