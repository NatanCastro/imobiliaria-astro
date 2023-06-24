import { Analytics } from '@vercel/analytics/react'
import { Router } from './routes'

function App() {
	return (
		<>
			<Router />
			<Analytics />
		</>
	)
}

export default App
