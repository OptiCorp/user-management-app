import styled from 'styled-components'
import { Typography } from '@equinor/eds-core-react'
import { COLORS, TEXT_SHADOW } from '../style/GlobalStyles'

const NoAccessPage = () => {
    return (
        <BackgroundContainer>
            <Container>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h1" color={COLORS.white}>
                        User Management
                    </Typography>
                    <Typography variant="h3" color={COLORS.white}>
                        No Access
                    </Typography>
                </div>
                <CustomTypography
                    as="a"
                    href="https://turbinsikker-app-win-prod.azurewebsites.net/"
                >
                    Go to Turbinsikker
                </CustomTypography>
                <CustomTypography as="a" href="https://inventory-app-prod.azurewebsites.net/">
                    Go to Inventory
                </CustomTypography>
            </Container>
        </BackgroundContainer>
    )
}

export default NoAccessPage

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CustomTypography = styled(Typography)`
    margin: 10px;
    color: ${COLORS.white};
    text-shadow: ${TEXT_SHADOW};
    font-size: 1rem;
`
const BackgroundContainer = styled.div`
    background-image: url('/phoneBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh;

    @media (min-width: 1025px) {
        background-image: url('/desktopBackground.png');
        background-size: cover;
        background-position: center;
    }
`
