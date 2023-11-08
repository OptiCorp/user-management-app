import { useEffect, useState } from 'react'
import apiService from '../services/api'
import styled from 'styled-components'

const ProfileImage = () => {
    const api = apiService()

    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const getPhoto = async () => {
        const response = await api.getUserImage()

        setImageUrl(response)
    }

    useEffect(() => {
        getPhoto()
    }, [])

    return <>{imageUrl && <Image src={imageUrl} />}</>
}

const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
`

export default ProfileImage
