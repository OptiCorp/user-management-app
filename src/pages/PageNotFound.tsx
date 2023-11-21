import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { DefaultNavigation } from '../components/navigation/DefaultNavigation'

const PageNotFound = () => {
    return (
        <>
            <Container>
                <Title>
                    <Typography variant="h3">Sorry,</Typography>
                    <Typography variant="h1_bold">
                        We can't seem to find the resource you're looking for.
                    </Typography>
                </Title>
                <Typography>Please check that address is spelled correctly.</Typography>
                <Typography>
                    Or go back to the{' '}
                    <Typography link href="/">
                        home page.
                    </Typography>
                </Typography>
            </Container>
            <>
                <DefaultNavigation />
            </>
        </>
    )
}

export default PageNotFound

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    gap: 20px;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
`
