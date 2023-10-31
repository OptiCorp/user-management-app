import { Route, Routes } from 'react-router-dom'
import Users from './pages/users/Users'
import AddUser from './pages/users/AddUser'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/AddUser" element={<AddUser />} />
                <Route path="/EditUser/:id" element={<AddUser />} />
            </Routes>
        </>
    )
}

export default App
