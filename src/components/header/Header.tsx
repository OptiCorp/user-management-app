import { Icon, Menu, TopBar } from '@equinor/eds-core-react'
import { account_circle, arrow_back_ios, log_out } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { COLORS } from '../../style/GlobalStyles'
import { HeaderLocation, NewTopBar } from './styles'
import { User } from '../../services/apiTypes'
import apiService from '../../services/api'
import ProfilePicture from '../ProfileImage'
import { useMsal } from '@azure/msal-react'

export const Header = () => {
    const { instance } = useMsal()
    const api = apiService()
    const navigate = useNavigate()
    const { id } = useParams() as { id: string }
    const appLocation = useLocation()

    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const [activeUrl, setActiveUrl] = useState<string>('')
    const [title, setTitle] = useState<string | undefined>()

    const path = appLocation.pathname.split('/')

    const hasPath = (paths: string[]) => {
        for (let i = 1; i < paths.length; i++) {
            if (paths[i] === '') return false
        }
        return true
    }

    const openMenu = () => {
        setIsOpen((prev) => !prev)
    }

    const handleSignOut = () => {
        navigate('/')
        instance.logoutPopup()
    }

    useEffect(() => {
        setActiveUrl(window.location.pathname)
        if (!hasPath(path)) {
            setTitle('Users')
        }
        if (hasPath(path)) {
            const newPath = path.pop()
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
            <NewTopBar>
                <TopBar.Header>
                    {activeUrl === '/' ? null : (
                        <Icon data={arrow_back_ios} color={COLORS.white} onClick={navigateBack} />
                    )}
                </TopBar.Header>
                <TopBar.CustomContent>
                    <HeaderLocation>{title}</HeaderLocation>
                </TopBar.CustomContent>

                <Menu open={isOpen} anchorEl={anchorEl} onClose={() => setIsOpen(false)}>
                    <Menu.Item onClick={() => navigate('/AddUser')}>
                        <Icon data={account_circle} />
                        Profile
                    </Menu.Item>
                    <Menu.Item onClick={handleSignOut}>
                        <Icon data={log_out} />
                        Sign out
                    </Menu.Item>
                </Menu>
                <ProfilePicture ref={setAnchorEl} onClick={openMenu} />
            </NewTopBar>
        </>
    )
}
