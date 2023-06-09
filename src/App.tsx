import { Layout } from './components/Layout'
import { Router } from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Router />
			</Layout>
		</BrowserRouter>
	)
}

export default App
