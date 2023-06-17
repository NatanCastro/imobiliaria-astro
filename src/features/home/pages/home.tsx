import { FeaturedHouses } from '../components/featured-houses'
import { MoreHouses } from '../components/more-houses'
import { SearchArea } from '../components/search-area'
import { Services } from '../components/services'

const Home = () => {
  return (
    <>
      <main>
        <SearchArea />
        <FeaturedHouses />
        <Services />
        <MoreHouses />
      </main>
    </>
  )
}

export default Home
