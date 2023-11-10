import { group } from '@equinor/eds-icons'
import { NavItem } from './NavItem'
import { FooterContainer, StyledList, StyledTab } from './style'
import { useLocation } from 'react-router'
import { COLORS } from '../../style/GlobalStyles'

export const DefaultNavigation: React.FC<{}> = () => {
    const appLocation = useLocation()
    const path = appLocation.pathname.replace(/^\/|\/$/g, '')

    return (
        <FooterContainer>
            <StyledList>
                <StyledTab>
                    {
                        <NavItem
                            icon={group}
                            color={path === '' ? COLORS.gray : COLORS.white}
                            to="/"
                        />
                    }
                </StyledTab>
            </StyledList>
        </FooterContainer>
    )
}
