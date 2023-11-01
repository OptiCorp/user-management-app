import { Button, Progress, Typography } from '@equinor/eds-core-react'
import {
    BackgroundContainer,
    ButtonWrapper,
    Header,
    InfoText,
    LoginContainer,
    TitleHeader,
} from './styles'
import { useMsal } from '@azure/msal-react'
import { useState } from 'react'

export const Login = () => {
    const { instance } = useMsal()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const onSubmit = () => {
        setIsSubmitting(true)
        instance.loginPopup()
    }
    return (
        <BackgroundContainer>
            <LoginContainer>
                <Header>
                    <TitleHeader>Sign in to your Account</TitleHeader>
                    <Typography color="white" link href="#">
                        Or get access here
                    </Typography>
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
                <InfoText>
                    Having Trouble with your account?
                    <Typography color="white" link href="#">
                        Contact Support
                    </Typography>
                </InfoText>
            </LoginContainer>
        </BackgroundContainer>
    )
}
