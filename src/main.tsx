import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/tailwind-light/theme.css'
import 'primeicons/primeicons.css'
import './index.css'
import reportWebVitals from './reportWebVitals.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

reportWebVitals()
