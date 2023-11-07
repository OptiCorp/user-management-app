import { Button, Progress } from '@equinor/eds-core-react'
import { BackgroundContainer, ButtonWrapper, Header, LoginContainer, TitleHeader } from './styles'
import { useMsal } from '@azure/msal-react'
import { useState } from 'react'

export const Login = () => {
    const { instance } = useMsal()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const onSubmit = async () => {
        setIsSubmitting(true)
        instance.loginPopup()
    }
    return (
        <BackgroundContainer>
            <LoginContainer>
                <Header>
                    <TitleHeader>Sign in to your Account</TitleHeader>
                </Header>
                <ButtonWrapper>
                    <Button
                        type="submit"
                        aria-disabled={isSubmitting ? true : false}
                        aria-label={isSubmitting ? 'loading data' : ''}
                        onClick={onSubmit}
                    >
                        {isSubmitting ? <Progress.Dots color={'primary'} /> : 'Log in'}
                    </Button>
                </ButtonWrapper>
            </LoginContainer>
        </BackgroundContainer>
    )
}
