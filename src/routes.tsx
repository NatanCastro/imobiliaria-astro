import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'

export const Router = () => {
	return (
		<Routes>
			<Route element={<Home />} path='/' />
		</Routes>
	)
}
