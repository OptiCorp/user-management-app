import { useContext } from 'react'
import UmAppContext from '../contexts/UmAppContext'
import styled from 'styled-components'
import { Button, Typography } from '@equinor/eds-core-react'
import ProfilePicture from '../components/ProfileImage'
import userService from '../utils/user'
import { DefaultNavigation } from '../components/navigation/DefaultNavigation'

const Profile = () => {
    const { currentUser } = useContext(UmAppContext)
    const user = userService()

    return (
        <>
            <Container>
                <ProfilePicture />
                <Typography variant="h1">
                    {currentUser?.firstName} {currentUser?.lastName}
                </Typography>
                <Typography>{currentUser?.userRole.name}</Typography>
                <Button onClick={user.signOut}>Sign Out</Button>
            </Container>
            <>
                <DefaultNavigation />
            </>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export default Profile
