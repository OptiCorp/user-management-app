import { person_add } from '@equinor/eds-icons'
import { NavItem } from './NavItem'
import { FooterContainer, StyledList, StyledTab, StyledTabs } from './style'

export const DefaultNavigation: React.FC<{
    hideNavbar: boolean
}> = ({ hideNavbar }) => {
    /* const path = useLocation() */
    /* const [activeTab, setActiveTab] = useState<number | undefined>(
        path.pathname.includes('Punches') || path.pathname.includes('punch')
            ? 0
            : path.pathname.includes('Checklists') ||
              path.pathname.includes('MyChecklists') ||
              path.pathname.includes('ForReviewChecklists')
            ? 1
            : path.pathname.includes('Invoice')
            ? 2
            : 1
    ) */

    /* const handleChange = (index: number) => {
        setActiveTab(index)
    } */

    return (
        <FooterContainer>
            {!hideNavbar && (
                <StyledTabs /* activeTab={activeTab} onChange={handleChange} */ variant="fullWidth">
                    <StyledList>
                        <StyledTab>
                            <NavItem
                                icon={person_add}
                                /* name="Add User" */
                                /* isActive={activeTab === 0} */
                                to="/AddUser"
                            />
                        </StyledTab>

                        {/* <StyledTab>
                            <NavItem
                                icon={credit_card}
                                name="Invoices"
                                isActive={activeTab === 2}
                                to="/Invoice"
                            />
                        </StyledTab> */}
                    </StyledList>
                </StyledTabs>
            )}
        </FooterContainer>
    )
}
