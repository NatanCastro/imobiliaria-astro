import { FeaturedHouses } from '../components/home/FeaturedHouses'
import { SearchArea } from '../components/home/SearchArea'
import { Services } from '../components/home/Services'

export const Home = () => {
	return (
		<>
			<SearchArea />
			<FeaturedHouses />
			<Services />
		</>
	)
}
