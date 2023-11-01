import { useMsal } from '@azure/msal-react'
import { Button, Scrim, Typography } from '@equinor/eds-core-react'
import { FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COLORS } from '../../style/GlobalStyles'
import { LinkContainer, RouteName, StyledSheet } from './styles'

export type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}

const Sidebar: FunctionComponent<Props> = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const { instance } = useMsal()
    const handleSignOut = () => {
        navigate('/')
        instance.logoutPopup()
    }
    return (
        <>
            <Scrim
                open={open}
                onClose={() => setOpen(!open)}
                isDismissable
                style={{
                    overflow: 'hidden',
                }}
            >
                <StyledSheet open={open} onClose={() => setOpen(!open)}>
                    {/* <Container>
                        <img style={{ width: '100%' }} src={Logosidebar} />
                    </Container> */}
                    <LinkContainer>
                        <Button fullWidth variant="ghost" onClick={handleSignOut}>
                            <RouteName>
                                <Typography
                                    variant="body_long_bold"
                                    color={COLORS.white}
                                    token={{ fontSize: '1.6em' }}
                                    style={{ minWidth: '100px' }}
                                >
                                    Sign Out
                                </Typography>
                            </RouteName>
                        </Button>
                    </LinkContainer>
                </StyledSheet>
            </Scrim>
        </>
    )
}
export default Sidebar
