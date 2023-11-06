import { group, person_add } from '@equinor/eds-icons'
import { NavItem } from './NavItem'
import { FooterContainer, StyledList, StyledTab } from './style'
import { useLocation } from 'react-router'

export const DefaultNavigation: React.FC<{
    hideNavbar: boolean
}> = ({ hideNavbar }) => {
    const appLocation = useLocation()
    const path = appLocation.pathname.split('/')
    const addUserPath = path.includes('AddUser')
    const editUserPath = path.includes('EditUser')

    return (
        <FooterContainer>
            {!hideNavbar && (
                <StyledList>
                    <StyledTab>
                        {!addUserPath && !editUserPath && (
                            <NavItem icon={person_add} to="/AddUser" />
                        )}
                    </StyledTab>

                    <StyledTab>{addUserPath && <NavItem icon={group} to="/" />}</StyledTab>
                    <StyledTab>{editUserPath && <NavItem icon={group} to="/" />}</StyledTab>
                </StyledList>
            )}
        </FooterContainer>
    )
}
