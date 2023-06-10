import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Loading } from './components/Loading'

const Home = lazy(() => import('./pages/Home'))

export const Router = () => {
	return (
		<Routes>
			<Route path='/'>
				<Route
					element={
						<Suspense fallback={<Loading />}>
							<Home />
						</Suspense>
					}
					index
				/>
			</Route>
		</Routes>
	)
}
