import { Icon, TopBar } from '@equinor/eds-core-react'
import { arrow_back_ios, menu } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { COLORS } from '../../style/GlobalStyles'
import Sidebar from '../sidebar/Sidebar'
import { HeaderLocation, NewTopBar } from './styles'
import { User } from '../../services/apiTypes'
import apiService from '../../services/api'

export const Header = () => {
    const api = apiService()
    const navigate = useNavigate()
    const { id } = useParams() as { id: string }
    const appLocation = useLocation()
    const [open, setOpen] = useState(false)
    const [activeUrl, setActiveUrl] = useState<string>('')
    const [title, setTitle] = useState<string | undefined>()

    const path = appLocation.pathname.split('/')

    const hasPath = (paths: string[]) => {
        for (let i = 1; i < paths.length; i++) {
            if (paths[i] === '') return false
        }
        return true
    }

    useEffect(() => {
        setActiveUrl(window.location.pathname)
        if (!hasPath(path)) {
            setTitle('Users')
        }
        if (hasPath(path)) {
            const newPath = path.pop()
            console.log(newPath === id)
            if (newPath === id) {
                api.getUser(id).then((userData: User) => {
                    if (userData) {
                        setTitle(`${userData.firstName} ${userData.lastName}`)
                    }
                })
            } else {
                const newTitle = newPath?.match(/[A-Z][a-z]+/g)?.join(' ')
                setTitle(newTitle)
            }
        }
    }, [location, path, id])

    const navigateBack = () => {
        navigate(-1)
    }

    return (
        <>
            <Sidebar open={open} setOpen={setOpen} />
            <NewTopBar>
                <TopBar.Header>
                    {activeUrl === '/' ? null : (
                        <Icon data={arrow_back_ios} color={COLORS.white} onClick={navigateBack} />
                    )}
                </TopBar.Header>
                <TopBar.CustomContent>
                    <HeaderLocation>{title}</HeaderLocation>
                </TopBar.CustomContent>
                <TopBar.Actions>
                    <Icon
                        data={menu}
                        size={40}
                        style={{
                            color: COLORS.white,
                        }}
                        onClick={() => setOpen(!open)}
                    />
                </TopBar.Actions>
            </NewTopBar>
        </>
    )
}
