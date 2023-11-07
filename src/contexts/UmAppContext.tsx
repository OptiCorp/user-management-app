import { InteractionStatus } from '@azure/msal-browser'
import { useAccount, useMsal } from '@azure/msal-react'
import decode from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import apiService from '../services/api'
import { ApiStatus, User } from '../services/apiTypes'
import { Loading } from '../components/Loading'
import NoAccessPage from '../pages/NoAccessPage'
import CheckRole from '../utils/CheckRole'

export interface UmAppContextType {
    idToken: string
    accessToken: string
    account: any
    accounts: any
    instance: any
    currentUser: User | null
    snackbarText: string
    isSnackbarOpen: boolean
    openSnackbar: (message: string) => void
    closeSnackbar: () => void
}

type AzureUserInfo = {
    preferred_username: string
    name: string
}

const UmAppContext = createContext<UmAppContextType>({} as UmAppContextType)

export function UmAppContextProvider({ children }: { children: React.ReactNode }) {
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] || {})
    const api = apiService()

    const [accessToken, setAccessToken] = useState('')
    const [idToken, setIdToken] = useState('')
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const role = CheckRole({ currentUser })

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')

    const openSnackbar = (message: string) => {
        setSnackbarText(message)
        setIsSnackbarOpen(true)
    }

    const closeSnackbar = () => {
        setIsSnackbarOpen(false)
    }

    async function createUser(userEmail: string, name: string) {
        const nameSplit = name.split(' ')
        const firstName = nameSplit[0]
        const lastName = nameSplit[nameSplit.length - 1]
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`
        try {
            const createUserResponse = await api.addUser({
                azureAdUserId: userEmail,
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: userEmail,
            })
            console.log('User creation response status:', createUserResponse.status)
            if (createUserResponse.status === 200) {
                await createUserResponse.json()
            } else {
                console.log('Error creating user:', createUserResponse.statusText)
                return null
            }
        } catch (error) {
            console.log('Error creating user:', error)
            return null
        }
    }

    function getUserInfoFromIdToken(token: string): {
        preferredUserName: string
        name: string
    } {
        const decodedToken: AzureUserInfo = decode(token)

        return {
            preferredUserName: decodedToken?.preferred_username || '',
            name: decodedToken.name || '',
        }
    }
    async function fetchUserByEmail(userEmail: string, name: string) {
        const response = await api.getUserByAzureAdUserId(userEmail)
        if (response) {
            const user = response

            setCurrentUser(user)
        } else if (!response) {
            const newUser = await createUser(userEmail, name)

            if (newUser) {
                setCurrentUser(newUser)
            }
        } else {
            console.error('Error fetching user by email')
        }
    }

    const fetchUserAndUpdateContext = async (token: string) => {
        setStatus(ApiStatus.LOADING)
        try {
            const userInfo = getUserInfoFromIdToken(token)
            await fetchUserByEmail(userInfo.preferredUserName, userInfo.name)
            setStatus(ApiStatus.SUCCESS)
        } catch (error) {
            console.error('Error fetching and updating user:', error)
            setStatus(ApiStatus.ERROR)
        }
    }

    useEffect(() => {
        if (idToken) {
            fetchUserAndUpdateContext(idToken)
        }
    }, [idToken])

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            instance.setActiveAccount(account)
            const accessTokenRequest = {
                scopes: ['https://graph.microsoft.com/.default'],
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
        console.log('Context access token: ', accessToken)
    }, [account, inProgress, instance])

    if (status === ApiStatus.LOADING) {
        return <Loading text="Loading .." />
    }

    if (role.isInspector()) {
        return <NoAccessPage />
    }

    if (accounts.length > 0) {
        return (
            <UmAppContext.Provider
                value={{
                    account,
                    idToken,
                    accessToken,
                    accounts,
                    instance,
                    currentUser,
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
    /* if (inProgress === 'login') {
        return <Typography as="span">Login is currently in progress</Typography>
    } */
}

export default UmAppContext
