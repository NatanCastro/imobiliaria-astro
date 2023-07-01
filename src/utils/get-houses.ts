import axios from 'axios'
import { FindRealState } from '../types/find-real-state.params'
import { House } from '../features/components/house-card.type'

export const getHouses = async (params: FindRealState) => {
  const { data } = await axios.get<House[]>('real-state', {
    baseURL: import.meta.env.VITE_BACKEND_URL,
    params
  })
  return data
}
