import axios from 'axios'
import { FindRealState } from '../types/find-real-state.params'
import { RealState } from '../features/components/real-state-card.type'

export const getRealStates = async (params: FindRealState) => {
  const { data } = await axios.get<RealState[]>('real-state', {
    baseURL: import.meta.env.VITE_BACKEND_URL,
    params
  })
  return data
}
