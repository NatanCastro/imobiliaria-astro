import { FeaturedHouses } from '../components/home/FeaturedHouses'
import { MoreHouses } from '../components/home/MoreHouses'
import { SearchArea } from '../components/home/SearchArea'
import { Services } from '../components/home/Services'

const Home = () => {
  return (
    <>
      <SearchArea />
      <main>
        <FeaturedHouses />
        <Services />
        <MoreHouses />
      </main>
    </>
  )
}

export default Home
