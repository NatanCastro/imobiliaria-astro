import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { House } from '../../components/house-card.type'

export const RealState = () => {
  const [house, setHouse] = useState<House>()
  const { guid } = useParams()

  const getHouseData = useCallback(async () => {
    const { data } = await axios.get<House>(`real-state/${guid}`, {
      baseURL: import.meta.env.VITE_BACKEND_URL
    })
    setHouse(data)
  }, [guid])

  useEffect(() => {
    getHouseData()
  }, [getHouseData])

  return (
    <>
      <h1>Lorem, ipsum dolor.</h1>
      <h2>{guid}</h2>
      <pre>{house?.city}</pre>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, sapiente?</p>
    </>
  )
}
