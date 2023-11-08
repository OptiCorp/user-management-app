import { group, person_add } from '@equinor/eds-icons'
import { NavItem } from './NavItem'
import { FooterContainer, StyledList, StyledTab } from './style'
import { useLocation } from 'react-router'

export const DefaultNavigation: React.FC<{}> = () => {
    const appLocation = useLocation()
    const path = appLocation.pathname.split('/')
    const addUserPath = path.includes('AddUser')
    const editUserPath = path.includes('EditUser')
    const profilePath = path.includes('Profile')

    return (
        <FooterContainer>
            <StyledList>
                <StyledTab>
                    {!addUserPath && !editUserPath && !profilePath && (
                        <NavItem icon={person_add} to="/AddUser" />
                    )}
                </StyledTab>

                <StyledTab>{profilePath && <NavItem icon={group} to="/" />}</StyledTab>
                <StyledTab>{addUserPath && <NavItem icon={group} to="/" />}</StyledTab>
                <StyledTab>{editUserPath && <NavItem icon={group} to="/" />}</StyledTab>
            </StyledList>
        </FooterContainer>
    )
}
