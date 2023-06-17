import { useParams } from 'react-router-dom'

export const RealState = () => {
  const { realStateId } = useParams()

  return (
    <>
      <h1>Lorem, ipsum dolor.</h1>
      <h2>{realStateId}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, sapiente?</p>
    </>
  )
}
