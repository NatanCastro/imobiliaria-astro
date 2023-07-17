import { FeaturedRealStates } from '../components/featured-real-states'
import { MoreRealStates } from '../components/more-real-states'
import { SearchArea } from '../components/search-area'
import { Services } from '../components/services'

const Home = () => {
  return (
    <>
      <main className='overflow-hidden'>
        <SearchArea />
        <FeaturedRealStates />
        <Services />
        <MoreRealStates />
      </main>
    </>
  )
}

export default Home
