import { InteractionStatus } from '@azure/msal-browser'
import { useAccount, useMsal } from '@azure/msal-react'
import { Typography } from '@equinor/eds-core-react'
import { createContext, useEffect, useState } from 'react'

export interface UmAppContextType {
    idToken: string
    accessToken: string
    account: any
    accounts: any
    instance: any
    snackbarText: string
    isSnackbarOpen: boolean
    openSnackbar: (message: string) => void
    closeSnackbar: () => void
}

const UmAppContext = createContext<UmAppContextType>({} as UmAppContextType)

export function UmAppContextProvider({ children }: { children: React.ReactNode }) {
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] || {})

    const [accessToken, setAccessToken] = useState('')
    const [idToken, setIdToken] = useState('')
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')

    const openSnackbar = (message: string) => {
        setSnackbarText(message)
        setIsSnackbarOpen(true)
    }

    const closeSnackbar = () => {
        setIsSnackbarOpen(false)
    }

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            instance.setActiveAccount(account)
            const accessTokenRequest = {
                scopes: ['3c926c2e-6b26-4c17-9087-5e2852f6309b/user_impersonation'],
                account: accounts.at(0),
            }
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((tokenResponse) => {
                    setAccessToken(tokenResponse.accessToken)
                    setIdToken(tokenResponse.idToken)
                })
                .catch((err) => {
                    console.error(err)
                    instance.loginRedirect()
                })
        } else {
            console.error('No account is available')
        }
    }, [account, inProgress, instance])

    if (accounts.length > 0) {
        return (
            <UmAppContext.Provider
                value={{
                    account,
                    idToken,
                    accessToken,
                    accounts,
                    instance,
                    snackbarText,
                    isSnackbarOpen,
                    openSnackbar,
                    closeSnackbar,
                }}
            >
                {children}
            </UmAppContext.Provider>
        )
    }
    if (inProgress === 'login') {
        return <Typography as="span">Login is currently in progress</Typography>
    }
}

export default UmAppContext
