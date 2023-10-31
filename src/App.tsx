import { Route, Routes } from 'react-router-dom'
import Users from './pages/users/Users'
import AddUser from './pages/users/AddUser'
import { useIsAuthenticated } from '@azure/msal-react'
import { Login } from './pages/login'
import Layout from './Layout'

function App() {
    const isAuthenticated = useIsAuthenticated()
    return (
        <div className="wrapper">
            {isAuthenticated && (
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Users />} />
                        <Route path="/AddUser" element={<AddUser />} />
                        <Route path="/EditUser/:id" element={<AddUser />} />
                    </Route>
                </Routes>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
