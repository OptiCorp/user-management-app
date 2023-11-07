import { useEffect, useState, forwardRef } from 'react'
import styled from 'styled-components'
import { Avatar, Button, Icon } from '@equinor/eds-core-react'
import apiService from '../services/api'
import { person } from '@equinor/eds-icons'

const ProfilePicture = forwardRef<HTMLButtonElement, { onClick: () => void }>((props, ref) => {
    const api = apiService()

    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const getPhoto = async () => {
        const response = await api.getUserImage()

        setImageUrl(response)
    }

    useEffect(() => {
        getPhoto()
    }, [])

    return (
        <>
            {imageUrl && (
                <AvatarButton ref={ref} onClick={props.onClick}>
                    <Avatar size={40} src={imageUrl} alt="profile picture" />
                </AvatarButton>
            )}
            {!imageUrl && (
                <AvatarButton ref={ref} onClick={props.onClick}>
                    <Icon data={person} />
                </AvatarButton>
            )}
        </>
    )
})

const AvatarButton = styled(Button)`
    background: none;
    border: none;
    outline: none;
    &:hover {
        background: none;
    }
`

export default ProfilePicture
