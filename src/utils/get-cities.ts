import axios from 'axios'

export const getCities = async () => {
  const { data } = await axios.get<{ city: string }[]>('real-state/cities', {
    baseURL: import.meta.env.VITE_BACKEND_URL
  })
  return data.map((d) => d.city)
}
