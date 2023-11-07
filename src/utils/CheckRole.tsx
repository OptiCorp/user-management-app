import { User } from '../services/apiTypes'

const CheckRole = ({ currentUser }: { currentUser: User | null }) => {
    const isInspector = () => currentUser?.userRole.name === 'Inspector' || false

    return {
        isInspector,
    }
}

export default CheckRole
