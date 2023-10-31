import { Route, Routes } from 'react-router-dom'
import Users from './pages/users/Users'
import AddUser from './pages/users/AddUser'
import { useIsAuthenticated } from '@azure/msal-react'
import { Login } from './pages/login'

function App() {
    const isAuthenticated = useIsAuthenticated()
    return (
        <>
            {isAuthenticated && (
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/AddUser" element={<AddUser />} />
                    <Route path="/EditUser/:id" element={<AddUser />} />
                </Routes>
            )}
            {!isAuthenticated && <Login />}
        </>
    )
}

export default App
