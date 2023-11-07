import { Route, Routes } from 'react-router-dom'
import Users from './pages/users/Users'
import AddUser from './pages/users/AddUser'
import { useIsAuthenticated } from '@azure/msal-react'
import { Login } from './pages/login'
import Layout from './Layout'
import SnackbarComponent from './utils/Snackbar'
import { UmAppContextProvider } from './contexts/UmAppContext'

function App() {
    const isAuthenticated = useIsAuthenticated()
    return (
        <div className="wrapper">
            {isAuthenticated && (
                <UmAppContextProvider>
                    <SnackbarComponent />

                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Users />} />
                            <Route path="/AddUser" element={<AddUser />} />
                            <Route path="/EditUser/:id" element={<AddUser />} />
                        </Route>
                    </Routes>
                </UmAppContextProvider>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
