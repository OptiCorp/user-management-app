import { User } from '../services/apiTypes'

const CheckRole = ({ currentUser }: { currentUser: User | null }) => {
    const isAdmin = () => currentUser?.userRole.name === 'Admin' || false

    return {
        isAdmin,
    }
}

export default CheckRole
