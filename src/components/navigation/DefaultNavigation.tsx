import { group } from '@equinor/eds-icons'
import { NavItem } from './NavItem'
import { FooterContainer, StyledList, StyledTab } from './style'

export const DefaultNavigation: React.FC<{}> = () => {
    return (
        <FooterContainer>
            <StyledList>
                <StyledTab>{<NavItem icon={group} to="/" />}</StyledTab>
            </StyledList>
        </FooterContainer>
    )
}
