import { credit_card, info_circle } from '@equinor/eds-icons'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { NavItem } from './NavItem'
import { FooterContainer, StyledList, StyledTab, StyledTabs } from './style'

export const DefaultNavigation: React.FC<{
    hideNavbar: boolean
}> = ({ hideNavbar }) => {
    const path = useLocation()
    const [activeTab, setActiveTab] = useState<number | undefined>(
        path.pathname.includes('Punches') || path.pathname.includes('punch')
            ? 0
            : path.pathname.includes('Checklists') ||
              path.pathname.includes('MyChecklists') ||
              path.pathname.includes('ForReviewChecklists')
            ? 1
            : path.pathname.includes('Invoice')
            ? 2
            : 1
    )

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    return (
        <FooterContainer>
            {!hideNavbar && (
                <StyledTabs activeTab={activeTab} onChange={handleChange} variant="fullWidth">
                    <StyledList>
                        <StyledTab>
                            <NavItem
                                icon={info_circle}
                                name="Punches"
                                isActive={activeTab === 0}
                                to="/Punches"
                            />
                        </StyledTab>

                        <StyledTab>
                            <NavItem
                                icon={credit_card}
                                name="Invoices"
                                isActive={activeTab === 2}
                                to="/Invoice"
                            />
                        </StyledTab>
                    </StyledList>
                </StyledTabs>
            )}
        </FooterContainer>
    )
}
