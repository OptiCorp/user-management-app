import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalStyles from './style/GlobalStyles.ts'
import { BrowserRouter } from 'react-router-dom'
import { MsalProvider } from '@azure/msal-react'
import { pca } from './msalConfig.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MsalProvider instance={pca}>
            <BrowserRouter>
                <GlobalStyles />
                <App />
            </BrowserRouter>
        </MsalProvider>
    </React.StrictMode>
)
