import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './style/GlobalStyles.ts'
import { BrowserRouter } from 'react-router-dom'
import { MsalProvider } from '@azure/msal-react'
import { pca } from './msalConfig.ts'
import { UmAppContextProvider } from './contexts/UmAppContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MsalProvider instance={pca}>
            <UmAppContextProvider>
                <BrowserRouter>
                    <GlobalStyles />
                    <App />
                </BrowserRouter>
            </UmAppContextProvider>
        </MsalProvider>
    </React.StrictMode>
)
