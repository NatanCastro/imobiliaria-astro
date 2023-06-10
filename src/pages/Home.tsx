import { FeaturedHouses } from '../components/home/FeaturedHouses'
import { SearchArea } from '../components/home/SearchArea'
import { Services } from '../components/home/Services'

const Home = () => {
  return (
    <>
      <SearchArea />
      <FeaturedHouses />
      <Services />
    </>
  )
}

export default Home
