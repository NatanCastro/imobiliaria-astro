import axios from 'axios'
import { RealState } from '../features/components/real-state-card.type'

interface CreateRealStateDto {
	name: string
	description: string
	bedroomNumber: number
	suiteNumber: number
	bathroomNumber: number
	parkingSpace: number
	area: number
	state: string
	city: string
	district: string
	street: string
	houseNumber: string
	rentValue?: number
	purchaseValue?: number
	hasSwimmingpool: boolean
	onCondominium: boolean
	images: {
		public_id: string
		secure_url: string
	}[]
}

interface IRealStateService {
	getStates: () => Promise<string[]>
	getCitiesByState: (state: string) => Promise<string[]>
	uploadImages: (images: File[]) => Promise<{ public_id: string; secure_url: string }[]>
	createRealstate: (data: CreateRealStateDto) => Promise<RealState>
}

class RealStateService implements IRealStateService {
	async getStates() {
		const { data } = await axios.get<{ id: string; nome: string; sigla: string }[]>(
			'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
		)
		return data.map((s) => s.sigla)
	}

	async getCitiesByState(state: string) {
		const { data } = await axios.get<{ id: number; nome: string }[]>(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
		)
		return data.map((c) => c.nome)
	}

	async uploadImages(images: File[]) {
		const fd = new FormData()
		images.forEach((image) => {
			fd.append('files', image, image.name)
		})

		const { data } = await axios.post<{ public_id: string; secure_url: string }[]>(
			'real-state/upload-images',
			fd,
			{
				baseURL: import.meta.env.VITE_BACKEND_URL
			}
		)
		return data
	}

	async createRealstate(data: CreateRealStateDto) {
		const { data: result } = await axios.post<RealState>(
			'real-state',
			{
				name: data.name,
				state: data.state,
				city: data.city,
				description: data.description,
				parkingSpace: data.parkingSpace,
				bathroomNumber: data.bathroomNumber,
				swimmingpool: data.hasSwimmingpool,
				condominium: data.onCondominium,
				area: data.area,
				number: data.houseNumber,
				street: data.street,
				district: data.district,
				bedroomNumber: data.bedroomNumber,
				suiteNumber: data.suiteNumber,
				rentValue: data.rentValue,
				purchaseValue: data.purchaseValue,
				images: data.images.map(({ public_id, secure_url }) => ({
					cloudId: public_id,
					url: secure_url
				}))
			},
			{
				baseURL: import.meta.env.VITE_BACKEND_URL
			}
		)
		return result
	}
}

export const realStateService = new RealStateService()
