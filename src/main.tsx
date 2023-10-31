import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalStyles from './style/GlobalStyles.ts'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalStyles />
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
